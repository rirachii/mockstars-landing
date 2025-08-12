'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, Eye, Edit } from 'lucide-react'
import { TemplateId, TemplateInfo, resumeTemplates } from '@/lib/resume/template-types'
import { useLocalStorage } from '@/lib/hooks/useLocalStorage'
import { ResumeStorage, DEFAULT_RESUME_DATA } from '@/lib/resume/resume-storage'
import { ResumeData } from '@/lib/resume/resume-data'
import { TemplateCard } from '@/components/resume/TemplateCard'

function getRecommendedTemplate(onboarding: ReturnType<typeof ResumeStorage.loadOnboarding>): TemplateInfo | undefined {
  const goal = onboarding?.goal || ''
  const inSchool = onboarding?.inSchool || ''
  // Very simple heuristic mapping for now
  // Can expand based on steps/answers later
  if (goal.includes('Leadership')) return resumeTemplates.find(t => t.id === 'paul-allen')
  if (goal.includes('Research') || goal.includes('Grad School')) return resumeTemplates.find(t => t.id === 'the-gilfoyle')
  if (goal.includes('Internship') || goal.includes('Co-op') || goal.includes('First Job')) return resumeTemplates.find(t => t.id === 'mockstars')
  if (goal.includes('Portfolio')) return resumeTemplates.find(t => t.id === 'rizzume')
  if (goal.includes('Certification')) return resumeTemplates.find(t => t.id === 'no-cap')
  if (inSchool === 'HS') return resumeTemplates.find(t => t.id === '100-hp')
  return resumeTemplates[0]
}

export default function TemplateSelectionPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | undefined>(undefined)
  const [resumeData, setResumeData, , isLoaded] = useLocalStorage<ResumeData>('mockstars_resume_data', DEFAULT_RESUME_DATA)
  const [recommended, setRecommended] = useState<TemplateInfo | undefined>(undefined)

  useEffect(() => {
    const onboarding = ResumeStorage.loadOnboarding()
    const rec = getRecommendedTemplate(onboarding)
    setRecommended(rec)
  }, [])

  // Load template preference from localStorage
  useEffect(() => {
    if (isLoaded) {
      const savedTemplate = ResumeStorage.loadTemplate()
      setSelectedTemplate(savedTemplate as TemplateId)
    }
  }, [isLoaded])

  // Handle template selection and navigation to editor directly
  const handleTemplateSelect = (template: TemplateInfo) => {
    setSelectedTemplate(template.id as TemplateId)
    ResumeStorage.saveTemplate(template.id as TemplateId)
    router.push(`/resume-builder/edit`)
  }

  const calculateCompleteness = (): number => {
    let score = 0
    
    // Personal info (20 points)
    if (resumeData.personalInfo.name) score += 5
    if (resumeData.personalInfo.email) score += 5
    if (resumeData.personalInfo.phone) score += 5
    if (resumeData.personalInfo.location) score += 5
    
    // Summary (15 points)
    if (resumeData.summary && resumeData.summary.length > 50) score += 15
    
    // Experience (30 points)
    if (resumeData.experience.length > 0) {
      score += 10
      if (resumeData.experience[0].title && resumeData.experience[0].company) score += 10
    }
    
    // Education (15 points)  
    if (resumeData.education.length > 0 && resumeData.education[0].degree && resumeData.education[0].school) {
      score += 15
    }
    
    // Skills (20 points)
    if (resumeData.skills.length >= 3) score += 10
    if (resumeData.skills.length >= 6) score += 10
    
    return score
  }

  const completeness = calculateCompleteness()
  const isComplete = completeness >= 80

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  // Prepare ordered list: recommended first (if present), then the rest excluding it
  const orderedTemplates: TemplateInfo[] = recommended
    ? [recommended, ...resumeTemplates.filter(t => t.id !== recommended.id)]
    : resumeTemplates

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 text-gray-800 font-outfit">
      {/* Header */}
      <div className="bg-white/30 border-gray-200 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold font-mattone">
                <span className="text-blue">Choose Your Template</span>
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span>Start</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span className="font-medium text-blue-600">Template</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span>Edit</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            {/* <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3">
                <div className="text-sm">
                  <div className="text-gray-600">Resume</div>
                  <div className={`font-bold ${isComplete ? 'text-green-600' : 'text-orange-600'}`}>
                    {completeness}%
                  </div>
                </div>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 rounded-full ${
                      isComplete ? 'bg-green-600' : 'bg-orange-500'
                    }`}
                    style={{ width: `${completeness}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => router.push('/resume-builder/edit')}
                  variant="outline"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Form Editor
                </Button>
                <Button 
                  onClick={() => router.push('/resume-builder/live-edit')}
                  variant="outline"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Live Editor
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 font-mattone mb-4">
              Select Your Professional Template
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We picked one based on your answers. You can choose a different one if you want.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-8">
            {recommended && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Recommended for you</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <TemplateCard
                    template={recommended}
                    isSelected={selectedTemplate === recommended.id}
                    onSelect={() => handleTemplateSelect(recommended)}
                    recommendedLabel="Recommended"
                  />
                </div>
              </div>
            )}

            <h3 className="text-lg font-semibold mb-3">All templates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {orderedTemplates.map((template: TemplateInfo) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate === template.id}
                  onSelect={() => handleTemplateSelect(template)}
                />
              ))}
            </div>

            <div className="mt-6 text-center space-y-4">
              <p className="text-sm text-gray-600">Pick a template to continue to the editor</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8">
          <Button 
            onClick={() => router.push('/resume-builder/upload?mode=school')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Questions
          </Button>

          {/* <div className="flex gap-3">
            <Button 
              onClick={() => router.push('/resume-builder/live-edit')}
              variant="outline"
            >
              <Eye className="w-4 h-4 mr-2" />
              Live Editor
            </Button>
          </div> */}
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">ATS-Friendly</h4>
            <p className="text-sm text-gray-600">
              All templates are optimized for Applicant Tracking Systems
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Instant Download</h4>
            <p className="text-sm text-gray-600">
              Download your resume as a high-quality PDF instantly
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Easy Updates</h4>
            <p className="text-sm text-gray-600">
              Edit your data anytime and regenerate with any template
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
