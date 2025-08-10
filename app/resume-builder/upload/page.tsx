'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import NextLink from 'next/link'
import NextDynamic from 'next/dynamic'
import { PencilLine, Upload, FileText, ArrowRight, CheckCircle } from 'lucide-react'
import { ParsedResumeData } from '@/lib/pdf/parser'
import { ResumeStorage, DEFAULT_RESUME_DATA } from '@/lib/resume/resume-storage'
import { ResumeData } from '@/lib/pdf'

const PDFUpload = NextDynamic(() => import('@/components/resume/pdf-upload').then(m => m.PDFUpload), { ssr: false })

export default function UploadPage() {
  const router = useRouter()
  const [uploadedData, setUploadedData] = useState<ParsedResumeData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleParsed = async (data: ParsedResumeData) => {
    setUploadedData(data)
    setIsProcessing(true)

    try {
      // Extract basic information from parsed PDF
      const resumeData: ResumeData = {
        ...DEFAULT_RESUME_DATA,
        personalInfo: {
          name: extractName(data.text) || '',
          title: '',
          email: extractEmail(data.text) || '',
          phone: extractPhone(data.text) || '',
          location: extractLocation(data.text) || '',
          linkedin: '',
          website: ''
        },
        summary: extractSection(data.text, ['summary', 'objective', 'profile']) || '',
        experience: parseExperience(data.text),
        education: parseEducation(data.text),
        skills: parseSkills(data.text),
        projects: []
      }

      // Save to localStorage
      ResumeStorage.saveResumeData(resumeData)
      ResumeStorage.saveProgress('upload', true)

      // Small delay to show processing state
      setTimeout(() => {
        setIsProcessing(false)
        router.push('/resume-builder/edit')
      }, 1500)

    } catch (error) {
      console.error('Error processing resume:', error)
      setIsProcessing(false)
    }
  }

  const handleError = (error: string) => {
    console.error('Upload error:', error)
  } 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 text-gray-800 font-outfit">
      {/* Header */}
      <div className="bg-white/30 border-b border-gray-200 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold font-mattone">
                <span className="text-blue">
                  Upload Your Resume
                </span>
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <span>Upload</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span>Edit</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span className="font-medium text-blue-600">Template</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!uploadedData && !isProcessing && (
          <>
            {/* Upload Section */}
            {/* <div className="text-center mb-12">
              <div className="mb-6">
                <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 font-mattone mb-4">
                  Upload Your Existing Resume
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Upload your current resume and we'll extract the information to help you create a professional, 
                  ATS-friendly version with our modern templates.
                </p>
              </div>
            </div> */}

            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8 mb-8">
              <PDFUpload 
                onParsed={handleParsed} 
                onError={handleError}
                className="w-full"
              />
            </div>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600 " />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-6 py-2 bg-white border border-gray-300 rounded-full text-gray-800 font-bold">
                  OR
                </span>
              </div>
            </div>

            {/* Create from Scratch */}
            <div className="text-center">
              <NextLink href="/resume-builder/edit" aria-label="Create from scratch" className="group block">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8 transition-shadow cursor-pointer group-hover:shadow-2xl">
                  <FileText className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 font-mattone mb-3">
                    Create from Scratch
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Start with a blank template and build your resume step-by-step with our guided form.
                  </p>
                  {/* <div className="inline-flex items-center bg-orange-600 group-hover:bg-orange-700 text-gray-800 px-8 py-3 rounded-lg">
                    <PencilLine className="w-5 h-5 mr-2" />
                    Start Building
                  </div> */}
                </div>
              </NextLink>
            </div>
          </>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-12">
              <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-gray-900 font-mattone mb-3">
                Processing Your Resume
              </h3>
              <p className="text-gray-600">
                We're extracting information from your resume and preparing it for editing...
              </p>
            </div>
          </div>
        )}

        {/* Success State */}
        {uploadedData && !isProcessing && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl shadow-xl p-12">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 font-mattone mb-4">
                Resume Uploaded Successfully!
              </h3>
              <p className="text-gray-600 mb-8">
                We've extracted your information and you'll be redirected to edit your resume in just a moment.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="font-medium">Pages</div>
                    <div>{uploadedData.pages.length}</div>
                  </div>
                  <div>
                    <div className="font-medium">Characters</div>
                    <div>{uploadedData.text.length.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="font-medium">File Type</div>
                    <div>PDF</div>
                  </div>
                  <div>
                    <div className="font-medium">Status</div>
                    <div className="text-green-600 font-medium">✓ Processed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        {/* {!uploadedData && !isProcessing && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Parsing</h4>
              <p className="text-sm text-gray-600">
                AI-powered extraction of your resume data with high accuracy
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Multiple Formats</h4>
              <p className="text-sm text-gray-600">
                Support for PDF, DOC, DOCX, and image files
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Professional Output</h4>
              <p className="text-sm text-gray-600">
                Generate ATS-friendly resumes with modern templates
              </p>
            </div>
          </div>
        )} */}
      </div>
    </div>
  )
}

// Helper functions for parsing resume data
function extractName(text: string): string | null {
  const lines = text.split('\n').filter(line => line.trim())
  const potentialName = lines.find(line => 
    line.length > 5 && 
    line.length < 50 && 
    !line.includes('@') && 
    !line.match(/\d{4}/) &&
    !/^(summary|objective|experience|education|skills)/i.test(line)
  )
  return potentialName || null
}

function extractEmail(text: string): string | null {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  return text.match(emailRegex)?.[0] || null
}

function extractPhone(text: string): string | null {
  const phoneRegex = /(\+?1?[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/
  return text.match(phoneRegex)?.[0] || null
}

function extractLocation(text: string): string | null {
  // Look for city, state patterns
  const locationRegex = /([A-Z][a-zA-Z\s]+),\s*([A-Z]{2}|[A-Z][a-zA-Z\s]+)/
  return text.match(locationRegex)?.[0] || null
}

function extractSection(text: string, keywords: string[]): string | null {
  const lowercaseText = text.toLowerCase()
  for (const keyword of keywords) {
    const index = lowercaseText.indexOf(keyword)
    if (index !== -1) {
      const afterKeyword = text.substring(index + keyword.length)
      const nextSectionIndex = afterKeyword.search(/\b(experience|education|skills|summary|objective|projects)\b/i)
      if (nextSectionIndex !== -1) {
        return afterKeyword.substring(0, nextSectionIndex).trim()
      } else {
        return afterKeyword.substring(0, 300).trim()
      }
    }
  }
  return null
}

function parseExperience(text: string): ResumeData['experience'] {
  // Basic experience parsing - can be enhanced
  const experienceSection = extractSection(text, ['experience', 'work history', 'employment'])
  if (!experienceSection) return []
  
  // This is a simplified parser - in practice, you'd want more sophisticated parsing
  return [{
    title: 'Previous Position',
    company: 'Company Name',
    startDate: '',
    endDate: '',
    location: '',
    description: ['Please edit this placeholder with your actual experience']
  }]
}

function parseEducation(text: string): ResumeData['education'] {
  const educationSection = extractSection(text, ['education', 'academic'])
  if (!educationSection) return []
  
  return [{
    degree: 'Your Degree',
    school: 'Your School',
    year: '',
    gpa: ''
  }]
}

function parseSkills(text: string): string[] {
  const skillsSection = extractSection(text, ['skills', 'technical skills', 'competencies'])
  if (!skillsSection) return []
  
  // Basic skills extraction
  return skillsSection.split(/[,\n]/).map(s => s.trim()).filter(Boolean).slice(0, 10)
}
