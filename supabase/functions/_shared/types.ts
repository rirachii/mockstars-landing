// Shared types for all resume functions

export interface PersonalInfo {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  location?: string;
  description: string[];
  achievements?: string[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  gpa?: string;
  relevant_courses?: string[];
  achievements?: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary?: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  projects?: Project[];
  certifications?: string[];
  languages?: string[];
}

export interface FileMetadata {
  originalName: string;
  fileType: string;
  fileSize: number;
  processingMethod: 'direct' | 'ocr';
  uploadedAt: string;
}

export interface ParsedResponse {
  success: boolean;
  data?: {
    rawText: string;
    extractedInfo: ResumeData;
    metadata: FileMetadata;
    confidence: number;
    warnings?: string[];
    suggestions?: string[];
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  processingTime: number;
  tokensUsed: number;
  costs?: {
    ocrTokens?: number;
    parsingTokens: number;
    totalEstimatedCost: number;
  };
}

export interface UploadRequest {
  fileUrl: string;
  fileName: string;
  fileType: 'pdf' | 'doc' | 'docx' | 'html' | 'rtf' | 'txt' | 'jpeg' | 'jpg' | 'png';
  userId?: string;
  userTier?: 'anonymous' | 'registered' | 'premium';
}

export interface RateLimitInfo {
  userId?: string;
  ip: string;
  tier: 'anonymous' | 'registered' | 'premium';
  timestamp: number;
}

export interface ProcessingLimits {
  maxFileSize: number;
  maxDimensions?: { width: number; height: number };
  requestsPerHour: number;
  tokensPerDay: number;
}

export const TIER_LIMITS: Record<string, ProcessingLimits> = {
  anonymous: {
    maxFileSize: 2 * 1024 * 1024, // 2MB
    maxDimensions: { width: 2048, height: 2048 },
    requestsPerHour: 5,
    tokensPerDay: 10000
  },
  registered: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxDimensions: { width: 4096, height: 4096 },
    requestsPerHour: 20,
    tokensPerDay: 50000
  },
  premium: {
    maxFileSize: 25 * 1024 * 1024, // 25MB
    maxDimensions: { width: 8192, height: 8192 },
    requestsPerHour: 100,
    tokensPerDay: 200000
  }
};

export const SUPPORTED_FORMATS = {
  documents: ['pdf', 'doc', 'docx', 'html', 'rtf', 'txt'],
  images: ['jpeg', 'jpg', 'png']
};

export const ERROR_CODES = {
  // Validation errors
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_REQUEST: 'INVALID_REQUEST',
  
  // Rate limiting
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  DAILY_LIMIT_EXCEEDED: 'DAILY_LIMIT_EXCEEDED',
  
  // Processing errors
  FILE_DOWNLOAD_FAILED: 'FILE_DOWNLOAD_FAILED',
  PARSING_FAILED: 'PARSING_FAILED',
  OCR_FAILED: 'OCR_FAILED',
  AI_PROCESSING_FAILED: 'AI_PROCESSING_FAILED',
  
  // System errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE'
} as const;
