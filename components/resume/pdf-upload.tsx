'use client';

import React, { useState } from 'react';
import { PDFParser, ParsedResumeData } from '@/lib/pdf/parser';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PDFUploadProps {
  onParsed?: (data: ParsedResumeData) => void;
  onError?: (error: string) => void;
  className?: string;
}

export const PDFUpload: React.FC<PDFUploadProps> = ({ 
  onParsed, 
  onError, 
  className 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parseResult, setParseResult] = useState<ParsedResumeData | null>(null);
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
      if (extension === 'pdf') {
        const result = await PDFParser.parseFile(file);
        setParseResult(result);
        onParsed?.(result);
      } else {
        // For non-PDF types, allow upload and proceed without parsing
        const minimal: ParsedResumeData = {
          text: '',
          pages: [],
          metadata: { title: file.name }
        };
        setParseResult(minimal);
        onParsed?.(minimal);
      }
    } catch (err) {
      const errorMsg = 'Failed to parse PDF. Please try another file.';
      setError(errorMsg);
      onError?.(errorMsg);
      console.error('PDF parsing error:', err);
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
          parseResult ? "border-green-300 bg-green-50" : ""
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
              <p className="text-lg font-medium text-gray-900">Parsing your resume...</p>
              <p className="text-sm text-gray-600">This may take a few moments</p>
            </div>
          </div>
        ) : parseResult ? (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <div>
              <p className="text-lg font-medium text-gray-900">Resume uploaded successfully!</p>
              <p className="text-sm text-gray-600">
                {parseResult.pages.length > 0
                  ? <>Extracted {parseResult.text.length} characters from {parseResult.pages.length} page(s)</>
                  : <>Uploaded {uploadedFile?.name}</>
                }
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setParseResult(null);
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
      {parseResult && (
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <FileText className="w-5 h-5 text-blue" />
            <h3 className="text-lg font-medium text-gray-900">Parsed Content</h3>
          </div>
          
          <div className="space-y-3">
            {parseResult.metadata?.title && (
              <div>
                <span className="text-sm font-medium text-gray-700">Title: </span>
                <span className="text-sm text-gray-600">{parseResult.metadata.title}</span>
              </div>
            )}
            
            <div>
              <span className="text-sm font-medium text-gray-700">Content Preview: </span>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {parseResult.text.substring(0, 300)}...
              </p>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>Pages: {parseResult.pages.length}</span>
              <span>Characters: {parseResult.text.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Example usage component
export const ResumeUploadDemo: React.FC = () => {
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload Your Resume</h1>
      
      <PDFUpload
        onParsed={(data) => {
          setParsedData(data);
          console.log('Parsed resume data:', data);
        }}
        onError={(error) => {
          console.error('Upload error:', error);
        }}
      />

      {/* Show extracted data for demo */}
      {parsedData && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Extracted Data (for development)</h3>
          <pre className="text-xs overflow-x-auto">
            {JSON.stringify(PDFParser.extractResumeData(parsedData.text), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
