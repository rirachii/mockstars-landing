'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResumeData } from '@/lib/resume/resume-data';

interface PDFUploadProps {
  onParsed?: (data: ResumeData) => void;
  onError?: (error: string) => void;
  onApiResponse?: (resp: unknown) => void;
  className?: string;
}

export const PDFUpload: React.FC<PDFUploadProps> = ({ 
  onParsed, 
  onError, 
  onApiResponse,
  className 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedText, setParsedText] = useState<string | null>(null);
  const [pagesCount, setPagesCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allowedExtensions = ['pdf', 'doc', 'docx', 'txt', 'html', 'rtf', 'png', 'jpg', 'jpeg', 'webp'];

  const handleFile = async (file: File) => {
    // Validate extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !allowedExtensions.includes(extension)) {
      const errorMsg = 'Please upload a supported file type.';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      const errorMsg = 'File size must be less than 10MB.';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadedFile(file);

    try {
      const formData = new FormData();
      let fileToSend: File = file;

      if (extension === 'pdf') {
        // Defer-load the heavy parser only when needed
        const { PDFParser } = await import('@/lib/files/pdf-parser');
        const result = await PDFParser.parseFile(file);
        const text = result.text || '';
        setParsedText(text);
        setPagesCount(result.pages?.length || null);

        // Convert parsed text to a .txt file for upload
        const txtBlob = new Blob([text], { type: 'text/plain' });
        const base = file.name.replace(/\.[^/.]+$/, '');
        const convertedName = `${base}.txt`;
        fileToSend = new File([txtBlob], convertedName, { type: 'text/plain' });
      } else {
        // For non-PDF files, send as-is; backend may convert
        setParsedText(null);
        setPagesCount(null);
      }

      formData.append('resume', fileToSend);

      const endpoint = process.env.NEXT_PUBLIC_RESUME_UPLOAD_ENDPOINT || 'http://localhost:3001/api/v1/guest/resume/upload-and-parse';
      const resp = await fetch(endpoint, { method: 'POST', body: formData });
      const json = await resp.json().catch(() => null);

      if (!resp.ok) {
        const msg = (json && (json.message || json.error)) || 'Upload failed';
        throw new Error(msg);
      }

      onApiResponse?.(json);
      // Optional: if callers still expect onParsed, we won't fabricate ResumeData here per instruction
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to upload/parse resume. Please try another file.';
      setError(errorMsg);
      onError?.(errorMsg);
      console.error('Resume upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          isDragging ? "border-blue bg-blue/5" : "border-gray-300",
          error ? "border-red-300 bg-red-50" : "",
          parsedText ? "border-green-300 bg-green-50" : ""
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt,.html,.rtf,.png,.jpg,.jpeg,.webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/html,application/rtf,image/png,image/jpeg,image/webp"
          onChange={handleFileInput}
          className="hidden"
          id="pdf-upload"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-12 h-12 text-blue animate-spin" />
            <div>
              <p className="text-lg font-medium text-gray-900">Processing your resume...</p>
              <p className="text-sm text-gray-600">Converting and sending for parsing</p>
            </div>
          </div>
        ) : parsedText ? (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <div>
              <p className="text-lg font-medium text-gray-900">Resume sent successfully!</p>
              <p className="text-sm text-gray-600">
                {pagesCount ? <>Extracted {pagesCount} page(s) from {uploadedFile?.name}</> : <>Uploaded {uploadedFile?.name}</>}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setParsedText(null);
                setPagesCount(null);
                setUploadedFile(null);
                setError(null);
              }}
            >
              Upload Another Resume
            </Button>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="w-12 h-12 text-red-600" />
            <div>
              <p className="text-lg font-medium text-red-900">Upload failed</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setError(null)}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <Upload className="w-12 h-12 text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drop your resume here or{' '}
                <label htmlFor="pdf-upload" className="text-blue hover:text-blue/80 cursor-pointer">
                  browse files
                </label>
              </p>
              <p className="text-sm text-gray-600">
                PDF, DOCX, DOC, TXT, HTML, RTF, PNG, JPG, JPEG, WEBP
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Parsed Content Preview */}
      {parsedText && (
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <FileText className="w-5 h-5 text-blue" />
            <h3 className="text-lg font-medium text-gray-900">Extracted Text Preview</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-700">Content Preview: </span>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {parsedText.substring(0, 300)}...
              </p>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>Pages: {pagesCount ?? '-'}</span>
              <span>Characters: {parsedText.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Note: Removed the in-file demo export to avoid bundling heavy parser code unnecessarily.
