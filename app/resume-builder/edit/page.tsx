'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, Save, Eye } from 'lucide-react'
import { ResumeForm } from '@/components/resume/resume-form'
import { useLocalStorage } from '@/lib/hooks/useLocalStorage'
import { ResumeStorage, DEFAULT_RESUME_DATA, SAMPLE_RESUME_DATA } from '@/lib/storage/resume-storage'
import { ResumeData } from '@/lib/pdf'

export default function EditPage() {
  const router = useRouter()
  const [resumeData, setResumeData, , isLoaded] = useLocalStorage<ResumeData>('mockstars_resume_data', DEFAULT_RESUME_DATA)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Load sample data if no data exists
  useEffect(() => {
    if (isLoaded && (!resumeData.personalInfo.name && !resumeData.personalInfo.email)) {
      setResumeData(SAMPLE_RESUME_DATA)
    }
  }, [isLoaded, resumeData, setResumeData])

  const handleDataChange = (newData: ResumeData) => {
    setResumeData(newData)
    setHasUnsavedChanges(true)
  }

  const handleSave = () => {
    ResumeStorage.saveResumeData(resumeData)
    ResumeStorage.saveProgress('edit', true)
    setHasUnsavedChanges(false)
    setLastSaved(new Date())
  }

  const handleContinue = () => {
    if (hasUnsavedChanges) {
      handleSave()
    }
    router.push('/resume-builder/templates')
  }

  const handlePreview = () => {
    if (hasUnsavedChanges) {
      handleSave()
    }
    router.push('/resume-builder/templates')
  }

  const calculateCompleteness = (): number => {
    let completed = 0
    let total = 0

    // Personal info (5 fields required)
    const personalFields = ['name', 'title', 'email', 'phone', 'location']
    personalFields.forEach(field => {
      total++
      if (resumeData.personalInfo[field as keyof typeof resumeData.personalInfo]) {
        completed++
      }
    })

    // Summary
    total++
    if (resumeData.summary && resumeData.summary.length > 20) {
      completed++
    }

    // Experience (at least one position with title and company)
    total++
    if (resumeData.experience.length > 0 && 
        resumeData.experience[0].title && 
        resumeData.experience[0].company) {
      completed++
    }

    // Education (at least one degree)
    total++
    if (resumeData.education.length > 0 && 
        resumeData.education[0].degree && 
        resumeData.education[0].school) {
      completed++
    }

    // Skills (at least 3)
    total++
    if (resumeData.skills.length >= 3) {
      completed++
    }

    return Math.round((completed / total) * 100)
  }

  const completeness = calculateCompleteness()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
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
                  Edit Your Resume
                </span>
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
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

            {/* Progress and Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3">
                <div className="text-sm">
                  <div className="text-gray-600">Completeness</div>
                  <div className="font-bold text-blue-600">{completeness}%</div>
                </div>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                    style={{ width: `${completeness}%` }}
                  />
                </div>
              </div>
              
              {lastSaved && (
                <div className="text-xs text-gray-500">
                  Saved {lastSaved.toLocaleTimeString()}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleSave}
                  variant="outline"
                  className={hasUnsavedChanges ? 'border-orange-500 text-orange-600' : ''}
                  disabled={!hasUnsavedChanges}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handlePreview} variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Complete Your Resume Information</h2>
          <p className="text-blue-800 mb-4">
            Fill out all sections below to create a comprehensive resume. Don't worry about perfection—you can always edit later.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${resumeData.personalInfo.name ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span>Personal Information</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${resumeData.experience.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span>Education</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${resumeData.skills.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span>Experience Dump</span>
            </div>
          </div>
        </div>

        {/* Resume Form */}
        <ResumeForm
          data={resumeData}
          onChange={handleDataChange}
          onSave={handleSave}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <Button 
            onClick={() => router.push('/resume-builder/upload')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Upload
          </Button>

          <div className="flex gap-3">
            <Button 
              onClick={handleSave}
              variant="outline"
              disabled={!hasUnsavedChanges}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            
            <Button 
              onClick={handleContinue}
              className="bg-blue hover:bg-blue-700 text-white flex items-center gap-2"
              disabled={completeness < 60}
            >
              Continue to Templates
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Completion Warning */}
        {completeness < 60 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <span className="font-medium">Complete at least 60% of your resume</span> to continue to template selection. 
              Current progress: {completeness}%
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
