import { isImageFile } from './utils.ts';
import { createLogEntry } from './utils.ts';

// Document parsers for different file types
export class DocumentParser {
  // Parse PDF files
  static async parsePDF(buffer: Uint8Array): Promise<string> {
    try {
      // For Deno environment, we'll use a simple approach
      // In production, you might want to use a more robust PDF parser
      
      // Convert to text (simplified - you'd use a proper PDF library)
      const text = await this.extractPDFText(buffer);
      return text;
    } catch (error) {
      createLogEntry('error', 'PDF parsing failed', { error: error.message });
      throw new Error(`Failed to parse PDF: ${error.message}`);
    }
  }

  // Parse Word documents (.doc, .docx)
  static async parseWord(buffer: Uint8Array, fileType: string): Promise<string> {
    try {
      // For .docx files, we can extract text from the XML
      if (fileType === 'docx') {
        return await this.parseDocx(buffer);
      } else {
        // .doc files are more complex, might need external service
        throw new Error('Legacy .doc format not supported yet');
      }
    } catch (error) {
      createLogEntry('error', 'Word document parsing failed', { error: error.message });
      throw new Error(`Failed to parse Word document: ${error.message}`);
    }
  }

  // Parse HTML files
  static async parseHTML(buffer: Uint8Array): Promise<string> {
    try {
      const html = new TextDecoder().decode(buffer);
      
      // Remove HTML tags and extract text
      const text = html
        .replace(/<style[^>]*>.*?<\/style>/gi, '') // Remove style tags
        .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
        .replace(/<[^>]*>/g, ' ') // Remove all HTML tags
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
      
      return text;
    } catch (error) {
      createLogEntry('error', 'HTML parsing failed', { error: error.message });
      throw new Error(`Failed to parse HTML: ${error.message}`);
    }
  }

  // Parse RTF files
  static async parseRTF(buffer: Uint8Array): Promise<string> {
    try {
      const rtf = new TextDecoder().decode(buffer);
      
      // Basic RTF parsing - remove RTF control codes
      const text = rtf
        .replace(/\\[a-z]+\d*\s?/g, '') // Remove RTF control words
        .replace(/[{}]/g, '') // Remove braces
        .replace(/\s+/g, ' ')
        .trim();
      
      return text;
    } catch (error) {
      createLogEntry('error', 'RTF parsing failed', { error: error.message });
      throw new Error(`Failed to parse RTF: ${error.message}`);
    }
  }

  // Parse plain text files
  static async parseText(buffer: Uint8Array): Promise<string> {
    try {
      return new TextDecoder().decode(buffer);
    } catch (error) {
      createLogEntry('error', 'Text parsing failed', { error: error.message });
      throw new Error(`Failed to parse text file: ${error.message}`);
    }
  }

  // Helper method for PDF text extraction (simplified)
  private static async extractPDFText(buffer: Uint8Array): Promise<string> {
    // This is a simplified implementation
    // In production, you'd use a proper PDF parsing library
    
    try {
      // Convert buffer to string and try to extract readable text
      const text = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
      
      // Look for text patterns in PDF
      const textMatches = text.match(/\((.*?)\)/g);
      if (textMatches) {
        return textMatches
          .map(match => match.replace(/[()]/g, ''))
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
      }
      
      // If no text patterns found, throw error to trigger OCR
      throw new Error('No readable text found in PDF');
    } catch (error) {
      throw new Error('PDF requires OCR processing');
    }
  }

  // Helper method for DOCX parsing
  private static async parseDocx(buffer: Uint8Array): Promise<string> {
    try {
      // DOCX is a ZIP file, we need to extract the document.xml
      // This is a simplified implementation
      // In production, you'd use a proper DOCX parser
      
      // For now, try to extract text patterns
      const text = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
      
      // Look for text content in XML structure
      const xmlTextMatches = text.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
      if (xmlTextMatches) {
        return xmlTextMatches
          .map(match => match.replace(/<[^>]*>/g, ''))
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
      }
      
      throw new Error('No text content found in DOCX');
    } catch (error) {
      throw new Error(`DOCX parsing failed: ${error.message}`);
    }
  }
}

// Image processing utilities
export class ImageProcessor {
  static async validateImage(buffer: Uint8Array, fileType: string): Promise<{
    isValid: boolean;
    dimensions?: { width: number; height: number };
    fileSize: number;
    mimeType: string;
  }> {
    const fileSize = buffer.length;
    const mimeType = this.getMimeType(fileType);
    
    try {
      // Basic validation - check file signature
      const isValid = this.validateFileSignature(buffer, fileType);
      
      if (!isValid) {
        return { isValid: false, fileSize, mimeType };
      }
      
      // Try to extract dimensions (simplified)
      const dimensions = await this.extractDimensions(buffer, fileType);
      
      return {
        isValid: true,
        dimensions,
        fileSize,
        mimeType
      };
    } catch (error) {
      createLogEntry('error', 'Image validation failed', { error: error.message });
      return { isValid: false, fileSize, mimeType };
    }
  }

  private static getMimeType(fileType: string): string {
    const mimeTypes: Record<string, string> = {
      'jpeg': 'image/jpeg',
      'jpg': 'image/jpeg',
      'png': 'image/png'
    };
    return mimeTypes[fileType.toLowerCase()] || 'application/octet-stream';
  }

  private static validateFileSignature(buffer: Uint8Array, fileType: string): boolean {
    if (buffer.length < 8) return false;
    
    const signatures: Record<string, number[][]> = {
      'jpeg': [[0xFF, 0xD8, 0xFF]],
      'jpg': [[0xFF, 0xD8, 0xFF]],
      'png': [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]]
    };
    
    const fileSignatures = signatures[fileType.toLowerCase()];
    if (!fileSignatures) return false;
    
    return fileSignatures.some(signature => {
      return signature.every((byte, index) => buffer[index] === byte);
    });
  }

  private static async extractDimensions(buffer: Uint8Array, fileType: string): Promise<{ width: number; height: number }> {
    // Simplified dimension extraction
    // In production, you'd use a proper image processing library
    
    if (fileType.toLowerCase() === 'png') {
      // PNG dimensions are at bytes 16-23
      if (buffer.length >= 24) {
        const width = (buffer[16] << 24) | (buffer[17] << 16) | (buffer[18] << 8) | buffer[19];
        const height = (buffer[20] << 24) | (buffer[21] << 16) | (buffer[22] << 8) | buffer[23];
        return { width, height };
      }
    } else if (fileType.toLowerCase().includes('jpeg') || fileType.toLowerCase() === 'jpg') {
      // JPEG dimension extraction is more complex
      // For now, return default dimensions
      return { width: 1920, height: 1080 }; // Default assumption
    }
    
    throw new Error('Could not extract image dimensions');
  }

  static async preprocessImage(buffer: Uint8Array): Promise<{
    processedBuffer: Uint8Array;
    enhancements: string[];
  }> {
    // For now, return the original buffer
    // In production, you might want to:
    // - Resize large images
    // - Enhance contrast/brightness
    // - Rotate if needed
    // - Convert to optimal format for OCR
    
    return {
      processedBuffer: buffer,
      enhancements: ['No preprocessing applied']
    };
  }
}

// File download and processing
export class FileProcessor {
  static async downloadFile(url: string): Promise<{
    buffer: Uint8Array;
    contentType: string;
    fileSize: number;
  }> {
    try {
      createLogEntry('info', 'Downloading file', { url });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type') || 'application/octet-stream';
      const arrayBuffer = await response.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      
      createLogEntry('info', 'File downloaded successfully', {
        fileSize: buffer.length,
        contentType
      });
      
      return {
        buffer,
        contentType,
        fileSize: buffer.length
      };
    } catch (error) {
      createLogEntry('error', 'File download failed', { url, error: error.message });
      throw new Error(`Failed to download file: ${error.message}`);
    }
  }

  static async processFile(
    buffer: Uint8Array,
    fileType: string,
    fileName: string
  ): Promise<{
    text: string;
    processingMethod: 'direct' | 'ocr';
    confidence: number;
    warnings: string[];
  }> {
    const warnings: string[] = [];
    
    try {
      // Try direct text extraction first
      if (isImageFile(fileType)) {
        // Images require OCR
        throw new Error('Image file requires OCR processing');
      }
      
      let text: string;
      
      switch (fileType.toLowerCase()) {
        case 'pdf':
          text = await DocumentParser.parsePDF(buffer);
          break;
        case 'doc':
        case 'docx':
          text = await DocumentParser.parseWord(buffer, fileType);
          break;
        case 'html':
          text = await DocumentParser.parseHTML(buffer);
          break;
        case 'rtf':
          text = await DocumentParser.parseRTF(buffer);
          break;
        case 'txt':
          text = await DocumentParser.parseText(buffer);
          break;
        default:
          throw new Error(`Unsupported file type: ${fileType}`);
      }
      
      // Validate extracted text
      if (!text || text.trim().length < 50) {
        warnings.push('Very little text extracted from document');
      }
      
      return {
        text: text.trim(),
        processingMethod: 'direct',
        confidence: 95,
        warnings
      };
      
    } catch (error) {
      createLogEntry('warn', 'Direct text extraction failed, will try OCR', {
        fileName,
        fileType,
        error: error.message
      });
      
      // If direct extraction fails, the calling function should try OCR
      throw error;
    }
  }
}

// Text quality assessment
export class TextQualityAssessor {
  static assessQuality(text: string): {
    quality: 'excellent' | 'good' | 'fair' | 'poor';
    score: number; // 0-100
    issues: string[];
    suggestions: string[];
  } {
    const issues: string[] = [];
    const suggestions: string[] = [];
    let score = 100;
    
    // Check text length
    if (text.length < 100) {
      issues.push('Text is very short');
      suggestions.push('Consider uploading a more complete resume');
      score -= 30;
    }
    
    // Check for common OCR errors
    const ocrErrorPatterns = [
      /[0O]{3,}/, // Multiple zeros/O's
      /[1Il]{3,}/, // Multiple 1's/I's/l's
      /\s[a-z]\s/g, // Single letters (common OCR error)
    ];
    
    for (const pattern of ocrErrorPatterns) {
      if (pattern.test(text)) {
        issues.push('Possible OCR errors detected');
        suggestions.push('Try uploading a higher quality image or PDF');
        score -= 15;
        break;
      }
    }
    
    // Check for resume-like content
    const resumeKeywords = ['experience', 'education', 'skills', 'work', 'job', 'company', 'university', 'degree'];
    const keywordCount = resumeKeywords.filter(keyword => 
      text.toLowerCase().includes(keyword)
    ).length;
    
    if (keywordCount < 3) {
      issues.push('Does not appear to contain typical resume content');
      suggestions.push('Ensure the uploaded file is a resume or CV');
      score -= 25;
    }
    
    // Determine quality level
    let quality: 'excellent' | 'good' | 'fair' | 'poor';
    if (score >= 90) quality = 'excellent';
    else if (score >= 70) quality = 'good';
    else if (score >= 50) quality = 'fair';
    else quality = 'poor';
    
    return {
      quality,
      score: Math.max(0, score),
      issues,
      suggestions
    };
  }
}
