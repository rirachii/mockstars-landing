// CORS headers for all functions
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Response helpers
export function createResponse(data: any, status = 200) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    }
  );
}

export function createErrorResponse(code: string, message: string, details?: any, status = 400) {
  return createResponse({
    success: false,
    error: {
      code,
      message,
      details,
    },
  }, status);
}

export function createSuccessResponse(data: any) {
  return createResponse({
    success: true,
    ...data,
  });
}

// Validation helpers
export function validateFileType(fileType: string): boolean {
  const allFormats = [
    'pdf', 'doc', 'docx', 'html', 'rtf', 'txt',
    'jpeg', 'jpg', 'png'
  ];
  return allFormats.includes(fileType.toLowerCase());
}

export function isImageFile(fileType: string): boolean {
  return ['jpeg', 'jpg', 'png'].includes(fileType.toLowerCase());
}

export function isDocumentFile(fileType: string): boolean {
  return ['pdf', 'doc', 'docx', 'html', 'rtf', 'txt'].includes(fileType.toLowerCase());
}

// Utility functions
export function getClientIP(request: Request): string {
  // Try different headers in order of preference
  const headers = [
    'cf-connecting-ip',      // Cloudflare
    'x-forwarded-for',       // Standard proxy header
    'x-real-ip',            // Nginx
    'x-client-ip',          // Apache
  ];

  for (const header of headers) {
    const ip = request.headers.get(header);
    if (ip) {
      // Handle comma-separated IPs (take the first one)
      return ip.split(',')[0].trim();
    }
  }

  // Fallback to unknown
  return 'unknown';
}

export function extractUserAgent(request: Request): string {
  return request.headers.get('user-agent') || 'unknown';
}

export function getCurrentTimestamp(): number {
  return Date.now();
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Logging helper
export function createLogEntry(
  level: 'info' | 'warn' | 'error',
  message: string,
  metadata?: any
): void {
  const logData = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...metadata,
  };
  
  console.log(JSON.stringify(logData));
}
