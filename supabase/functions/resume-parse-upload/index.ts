import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders, createErrorResponse, createSuccessResponse, getClientIP, getCurrentTimestamp, createLogEntry } from '../_shared/utils.ts';
import { UploadRequest, ParsedResponse, RateLimitInfo, ERROR_CODES, TIER_LIMITS } from '../_shared/types.ts';
import { RateLimiter, Validator, SecurityValidator } from '../_shared/validators.ts';
import { AIClientManager } from '../_shared/ai-clients.ts';
import { FileProcessor, ImageProcessor, TextQualityAssessor } from '../_shared/parsers.ts';

serve(async (req) => {
  const startTime = getCurrentTimestamp();
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return createErrorResponse(
      ERROR_CODES.INVALID_REQUEST,
      'Only POST requests are allowed',
      undefined,
      405
    );
  }

  let requestBody: any;
  let validatedData: UploadRequest;
  let clientIP: string;
  let tokensUsed = 0;
  let totalCost = 0;

  try {
    // Get client information
    clientIP = getClientIP(req);
    
    createLogEntry('info', 'Processing upload request', {
      ip: clientIP,
      userAgent: req.headers.get('user-agent')
    });

    // Parse and validate request body
    try {
      requestBody = await req.json();
    } catch {
      return createErrorResponse(
        ERROR_CODES.INVALID_REQUEST,
        'Invalid JSON in request body'
      );
    }

    // Validate request structure
    const validation = Validator.validateUploadRequest(requestBody);
    if (!validation.isValid) {
      return createErrorResponse(
        ERROR_CODES.INVALID_REQUEST,
        'Request validation failed',
        { errors: validation.errors }
      );
    }

    validatedData = validation.data!;

    // Security validation
    if (!SecurityValidator.validateUrl(validatedData.fileUrl)) {
      return createErrorResponse(
        ERROR_CODES.INVALID_REQUEST,
        'Invalid or insecure file URL'
      );
    }

    const sanitizedFileName = SecurityValidator.sanitizeFileName(validatedData.fileName);

    // Rate limiting check
    const rateLimitInfo: RateLimitInfo = {
      userId: validatedData.userId,
      ip: clientIP,
      tier: validatedData.userTier || 'anonymous',
      timestamp: startTime
    };

    const rateLimitResult = await RateLimiter.checkRateLimit(rateLimitInfo);
    if (!rateLimitResult.allowed) {
      return createErrorResponse(
        ERROR_CODES.RATE_LIMIT_EXCEEDED,
        'Rate limit exceeded',
        {
          remaining: rateLimitResult.remaining,
          resetTime: rateLimitResult.resetTime
        },
        429
      );
    }

    createLogEntry('info', 'Rate limit check passed', {
      userId: validatedData.userId,
      tier: validatedData.userTier,
      remaining: rateLimitResult.remaining
    });

    // Download the file
    let fileData: { buffer: Uint8Array; contentType: string; fileSize: number };
    try {
      fileData = await FileProcessor.downloadFile(validatedData.fileUrl);
    } catch (error) {
      return createErrorResponse(
        ERROR_CODES.FILE_DOWNLOAD_FAILED,
        'Failed to download file',
        { error: error.message }
      );
    }

    // Validate file size
    const fileSizeValidation = Validator.validateFileSize(
      fileData.fileSize,
      validatedData.userTier || 'anonymous'
    );
    
    if (!fileSizeValidation.isValid) {
      return createErrorResponse(
        ERROR_CODES.FILE_TOO_LARGE,
        fileSizeValidation.error!
      );
    }

    createLogEntry('info', 'File downloaded and validated', {
      fileName: sanitizedFileName,
      fileType: validatedData.fileType,
      fileSize: fileData.fileSize,
      contentType: fileData.contentType
    });

    // Initialize AI client
    const aiClient = new AIClientManager();
    let extractedText: string;
    let processingMethod: 'direct' | 'ocr';
    let confidence: number;
    let warnings: string[] = [];
    let ocrTokens = 0;

    // Process the file based on type
    if (['jpeg', 'jpg', 'png'].includes(validatedData.fileType)) {
      // Handle image files with OCR
      try {
        // Validate image
        const imageValidation = await ImageProcessor.validateImage(
          fileData.buffer,
          validatedData.fileType
        );

        if (!imageValidation.isValid) {
          return createErrorResponse(
            ERROR_CODES.INVALID_FILE_TYPE,
            'Invalid or corrupted image file'
          );
        }

        // Check image dimensions if available
        if (imageValidation.dimensions) {
          const dimensionValidation = Validator.validateImageDimensions(
            imageValidation.dimensions.width,
            imageValidation.dimensions.height,
            validatedData.userTier || 'anonymous'
          );

          if (!dimensionValidation.isValid) {
            return createErrorResponse(
              ERROR_CODES.FILE_TOO_LARGE,
              dimensionValidation.error!
            );
          }
        }

        // Preprocess image if needed
        const preprocessResult = await ImageProcessor.preprocessImage(fileData.buffer);
        
        createLogEntry('info', 'Image preprocessed', {
          enhancements: preprocessResult.enhancements
        });

        // Extract text using OCR
        const ocrResult = await aiClient.extractTextFromImage(
          preprocessResult.processedBuffer,
          imageValidation.mimeType
        );

        extractedText = ocrResult.text;
        processingMethod = 'ocr';
        confidence = ocrResult.confidence;
        ocrTokens = ocrResult.tokensUsed;
        totalCost += ocrResult.cost;

        createLogEntry('info', 'OCR processing completed', {
          textLength: extractedText.length,
          confidence: confidence,
          tokensUsed: ocrTokens
        });

      } catch (error) {
        return createErrorResponse(
          ERROR_CODES.OCR_FAILED,
          'Failed to extract text from image',
          { error: error.message }
        );
      }
    } else {
      // Handle document files with direct parsing
      try {
        const processingResult = await FileProcessor.processFile(
          fileData.buffer,
          validatedData.fileType,
          sanitizedFileName
        );

        extractedText = processingResult.text;
        processingMethod = processingResult.processingMethod;
        confidence = processingResult.confidence;
        warnings = processingResult.warnings;

        createLogEntry('info', 'Document parsing completed', {
          method: processingMethod,
          textLength: extractedText.length,
          warnings: warnings
        });

      } catch (error) {
        // If direct parsing fails, try OCR for PDFs
        if (validatedData.fileType === 'pdf') {
          try {
            createLogEntry('info', 'Falling back to OCR for PDF');
            
            const ocrResult = await aiClient.extractTextFromImage(
              fileData.buffer,
              'application/pdf'
            );

            extractedText = ocrResult.text;
            processingMethod = 'ocr';
            confidence = ocrResult.confidence;
            ocrTokens = ocrResult.tokensUsed;
            totalCost += ocrResult.cost;
            warnings.push('PDF required OCR processing - text may be less accurate');

          } catch (ocrError) {
            return createErrorResponse(
              ERROR_CODES.PARSING_FAILED,
              'Failed to parse document with both direct parsing and OCR',
              { 
                directError: error.message,
                ocrError: ocrError.message
              }
            );
          }
        } else {
          return createErrorResponse(
            ERROR_CODES.PARSING_FAILED,
            'Failed to parse document',
            { error: error.message }
          );
        }
      }
    }

    // Assess text quality
    const qualityAssessment = TextQualityAssessor.assessQuality(extractedText);
    if (qualityAssessment.issues.length > 0) {
      warnings.push(...qualityAssessment.issues);
    }

    // Security check on extracted text
    const securityCheck = SecurityValidator.detectSuspiciousContent(extractedText);
    if (securityCheck.isSuspicious) {
      createLogEntry('warn', 'Suspicious content detected', {
        reasons: securityCheck.reasons,
        userId: validatedData.userId
      });
      warnings.push('Content contains potentially sensitive information');
    }

    // Parse the extracted text with AI
    let parsedData;
    let parsingTokens = 0;
    try {
      const aiResult = await aiClient.parseWithFallback(extractedText);
      parsedData = aiResult.data;
      parsingTokens = aiResult.tokensUsed;
      totalCost += aiResult.cost;
      tokensUsed = ocrTokens + parsingTokens;

      createLogEntry('info', 'AI parsing completed', {
        model: aiResult.model,
        tokensUsed: parsingTokens,
        confidence: aiResult.confidence
      });

    } catch (error) {
      return createErrorResponse(
        ERROR_CODES.AI_PROCESSING_FAILED,
        'Failed to parse resume content with AI',
        { error: error.message }
      );
    }

    // Record token usage for rate limiting
    await RateLimiter.recordTokenUsage(rateLimitInfo, tokensUsed);

    // Prepare response
    const processingTime = getCurrentTimestamp() - startTime;
    const response: ParsedResponse = {
      success: true,
      data: {
        rawText: extractedText,
        extractedInfo: parsedData,
        metadata: {
          originalName: sanitizedFileName,
          fileType: validatedData.fileType,
          fileSize: fileData.fileSize,
          processingMethod,
          uploadedAt: new Date(startTime).toISOString()
        },
        confidence: Math.min(confidence, qualityAssessment.score),
        warnings,
        suggestions: qualityAssessment.suggestions
      },
      processingTime,
      tokensUsed,
      costs: {
        ocrTokens,
        parsingTokens,
        totalEstimatedCost: totalCost
      }
    };

    createLogEntry('info', 'Request completed successfully', {
      userId: validatedData.userId,
      fileName: sanitizedFileName,
      processingTime,
      tokensUsed,
      totalCost
    });

    return createSuccessResponse(response);

  } catch (error) {
    createLogEntry('error', 'Unexpected error during processing', {
      error: error.message,
      stack: error.stack,
      userId: validatedData?.userId,
      ip: clientIP
    });

    return createErrorResponse(
      ERROR_CODES.INTERNAL_ERROR,
      'An unexpected error occurred during processing',
      { error: error.message },
      500
    );
  }
});
