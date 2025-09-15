'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function generateCoverLetter({ companyDesc, jobDesc, resumeText }: { companyDesc: string; jobDesc: string; resumeText: string; }) {
  // Simple template for MVP
  return `Dear Hiring Manager,\n\nI am excited to apply for the position at your company.\n\nCompany Description: ${companyDesc}\n\nJob Description: ${jobDesc}\n\nMy Resume Highlights: ${resumeText.substring(0, 500)}...\n\nThank you for considering my application.\n\nSincerely,\n[Your Name]`;
}

const CoverLetterPage = () => {
  const [companyDesc, setCompanyDesc] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setLoading(true);
      try {
        const text = await extractTextFromFile(file);
        setResumeText(text);
      } catch {
        setResumeText('');
      }
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    if (!companyDesc || !jobDesc || !resumeText) return;
    setCoverLetter(generateCoverLetter({ companyDesc, jobDesc, resumeText }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
  };

  return (
  <div className="relative max-h-[80vh] flex items-center justify-center">
      {/* Cover Image Background */}
      <img
        src="/images/cover.jpg"
        alt="Cover"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.7)' }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/10 z-10" />
      {/* Content */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center">
        {/* Hero Section */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center drop-shadow-lg">Cover Letter Generator</h1>
          <p className="text-lg text-gray-700 text-center max-w-xl drop-shadow">Paste your company and job descriptions, upload your resume, and instantly generate a professional cover letter you can download or copy.</p>
        </div>
        {/* Input Card Overlay */}
  <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-lg flex flex-col gap-6">
          <div className="space-y-2">
            <label className="font-medium text-gray-700">Company Description</label>
            <Textarea
              placeholder="Paste company description here..."
              value={companyDesc}
              onChange={e => setCompanyDesc(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="font-medium text-gray-700">Job Description</label>
            <Textarea
              placeholder="Paste job description here..."
              value={jobDesc}
              onChange={e => setJobDesc(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="font-medium text-gray-700">Upload Resume</label>
            <div
              className="border-2 border-dashed border-blue-400 rounded-xl bg-blue-50 flex flex-col items-center justify-center py-10 cursor-pointer transition hover:bg-blue-100"
              onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={e => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleResumeUpload({ target: { files: e.dataTransfer.files } } as any);
                }
              }}
              onClick={() => document.getElementById('resume-upload-input')?.click()}
            >
              {/* Up Arrow Icon */}
              <svg width="40" height="40" fill="none" viewBox="0 0 40 40" className="mb-2 text-blue-500">
                <rect width="40" height="40" rx="20" fill="#DBEAFE"/>
                <path d="M20 28V14" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 20l6-6 6 6" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-blue-700 font-medium">Drop your resume here or click to upload</span>
              <input
                id="resume-upload-input"
                type="file"
                accept=".txt,.pdf,.docx"
                className="hidden"
                onChange={handleResumeUpload}
              />
              {resumeFile && <span className="mt-2 text-sm text-green-600">{resumeFile.name} uploaded</span>}
            </div>
          </div>
          <Button className="w-full" onClick={handleGenerate} disabled={loading || !companyDesc || !jobDesc || !resumeFile}>
            {loading ? 'Processing...' : 'Generate Cover Letter'}
          </Button>
          {coverLetter && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Generated Cover Letter</h2>
              <Textarea value={coverLetter} readOnly rows={10} />
              <div className="flex gap-2 mt-2">
                <Button onClick={handleCopy}>Copy Text</Button>
                {/* Download buttons for PDF, TXT, MD, DOCX will be added next */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPage;
