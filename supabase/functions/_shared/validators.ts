import { TIER_LIMITS, RateLimitInfo, ERROR_CODES } from './types.ts';
import { createLogEntry } from './utils.ts';

// In-memory rate limiting (for Edge Functions)
// In production, you'd want to use Redis or Supabase for persistence
const rateLimitStore = new Map<string, { requests: number; lastReset: number; tokens: number }>();

export class RateLimiter {
  private static getKey(userId?: string, ip?: string): string {
    return userId || ip || 'anonymous';
  }

  private static resetIfNeeded(key: string, now: number): void {
    const data = rateLimitStore.get(key);
    if (!data) return;

    // Reset hourly request count
    const hoursSinceReset = (now - data.lastReset) / (1000 * 60 * 60);
    if (hoursSinceReset >= 1) {
      data.requests = 0;
      data.lastReset = now;
    }

    // Reset daily token count
    const daysSinceReset = (now - data.lastReset) / (1000 * 60 * 60 * 24);
    if (daysSinceReset >= 1) {
      data.tokens = 0;
    }
  }

  static async checkRateLimit(rateLimitInfo: RateLimitInfo): Promise<{
    allowed: boolean;
    remaining: {
      requests: number;
      tokens: number;
    };
    resetTime: number;
  }> {
    const { userId, ip, tier, timestamp } = rateLimitInfo;
    const key = this.getKey(userId, ip);
    const limits = TIER_LIMITS[tier] || TIER_LIMITS.anonymous;
    
    this.resetIfNeeded(key, timestamp);
    
    const data = rateLimitStore.get(key) || {
      requests: 0,
      lastReset: timestamp,
      tokens: 0
    };

    // Check request limit
    const requestsAllowed = data.requests < limits.requestsPerHour;
    const tokensAllowed = data.tokens < limits.tokensPerDay;

    if (requestsAllowed && tokensAllowed) {
      data.requests += 1;
      rateLimitStore.set(key, data);
      
      createLogEntry('info', 'Rate limit check passed', {
        key,
        tier,
        requests: data.requests,
        tokens: data.tokens,
        limits
      });

      return {
        allowed: true,
        remaining: {
          requests: limits.requestsPerHour - data.requests,
          tokens: limits.tokensPerDay - data.tokens
        },
        resetTime: data.lastReset + (60 * 60 * 1000) // Next hour
      };
    }

    createLogEntry('warn', 'Rate limit exceeded', {
      key,
      tier,
      requests: data.requests,
      tokens: data.tokens,
      limits,
      requestsAllowed,
      tokensAllowed
    });

    return {
      allowed: false,
      remaining: {
        requests: Math.max(0, limits.requestsPerHour - data.requests),
        tokens: Math.max(0, limits.tokensPerDay - data.tokens)
      },
      resetTime: data.lastReset + (60 * 60 * 1000)
    };
  }

  static async recordTokenUsage(rateLimitInfo: RateLimitInfo, tokensUsed: number): Promise<void> {
    const { userId, ip } = rateLimitInfo;
    const key = this.getKey(userId, ip);
    
    const data = rateLimitStore.get(key);
    if (data) {
      data.tokens += tokensUsed;
      rateLimitStore.set(key, data);
      
      createLogEntry('info', 'Token usage recorded', {
        key,
        tokensUsed,
        totalTokens: data.tokens
      });
    }
  }
}

export class Validator {
  static validateUploadRequest(body: any): {
    isValid: boolean;
    errors: string[];
    data?: any;
  } {
    const errors: string[] = [];
    
    if (!body) {
      errors.push('Request body is required');
      return { isValid: false, errors };
    }

    if (!body.fileUrl || typeof body.fileUrl !== 'string') {
      errors.push('fileUrl is required and must be a string');
    }

    if (!body.fileName || typeof body.fileName !== 'string') {
      errors.push('fileName is required and must be a string');
    }

    if (!body.fileType || typeof body.fileType !== 'string') {
      errors.push('fileType is required and must be a string');
    }

    if (body.fileType && !this.isValidFileType(body.fileType)) {
      errors.push(`Unsupported file type: ${body.fileType}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      data: errors.length === 0 ? {
        fileUrl: body.fileUrl,
        fileName: body.fileName,
        fileType: body.fileType.toLowerCase(),
        userId: body.userId || null,
        userTier: body.userTier || 'anonymous'
      } : undefined
    };
  }

  private static isValidFileType(fileType: string): boolean {
    const supportedTypes = [
      'pdf', 'doc', 'docx', 'html', 'rtf', 'txt',
      'jpeg', 'jpg', 'png'
    ];
    return supportedTypes.includes(fileType.toLowerCase());
  }

  static validateFileSize(fileSize: number, tier: string): {
    isValid: boolean;
    error?: string;
  } {
    const limits = TIER_LIMITS[tier] || TIER_LIMITS.anonymous;
    
    if (fileSize > limits.maxFileSize) {
      return {
        isValid: false,
        error: `File size (${Math.round(fileSize / 1024 / 1024)}MB) exceeds limit for ${tier} tier (${Math.round(limits.maxFileSize / 1024 / 1024)}MB)`
      };
    }

    return { isValid: true };
  }

  static validateImageDimensions(width: number, height: number, tier: string): {
    isValid: boolean;
    error?: string;
  } {
    const limits = TIER_LIMITS[tier] || TIER_LIMITS.anonymous;
    
    if (!limits.maxDimensions) {
      return { isValid: true };
    }

    if (width > limits.maxDimensions.width || height > limits.maxDimensions.height) {
      return {
        isValid: false,
        error: `Image dimensions (${width}x${height}) exceed limit for ${tier} tier (${limits.maxDimensions.width}x${limits.maxDimensions.height})`
      };
    }

    return { isValid: true };
  }
}

// Security helpers
export class SecurityValidator {
  static sanitizeFileName(fileName: string): string {
    // Remove potentially dangerous characters
    return fileName.replace(/[^\w\-_\. ]/g, '').trim();
  }

  static validateUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      // Only allow HTTPS for security
      return parsedUrl.protocol === 'https:';
    } catch {
      return false;
    }
  }

  static detectSuspiciousContent(text: string): {
    isSuspicious: boolean;
    reasons: string[];
  } {
    const suspiciousPatterns = [
      /\b(virus|malware|trojan|hack|exploit)\b/i,
      /\b(password|credit card|ssn|social security)\b/i,
      /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, // Credit card pattern
      /\b\d{3}-\d{2}-\d{4}\b/, // SSN pattern
    ];

    const reasons: string[] = [];
    
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(text)) {
        reasons.push(`Suspicious pattern detected: ${pattern.source}`);
      }
    }

    return {
      isSuspicious: reasons.length > 0,
      reasons
    };
  }
}
