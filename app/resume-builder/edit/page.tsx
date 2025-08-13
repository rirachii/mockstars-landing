'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, Save, Eye } from 'lucide-react'
import { ResumeForm } from '@/components/resume/resume-form'
import { useLocalStorage } from '@/lib/hooks/useLocalStorage'
  import { ResumeStorage, DEFAULT_RESUME_DATA, DemoResume } from '@/lib/resume/resume-storage'
import { ResumeData } from '@/lib/resume/resume-data'
import { Section, DEFAULT_CUSTOMIZATION } from '@/lib/resume/template-types'

export default function EditPage() {
  const router = useRouter()
  const [resumeData, setResumeData, , isLoaded] = useLocalStorage<ResumeData>('mockstars_resume_data', DEFAULT_RESUME_DATA)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [order, setOrder] = useState<Section[]>(DEFAULT_CUSTOMIZATION.sectionOrder)
  const [activeIdx, setActiveIdx] = useState<number>(-1) // -1 = personalInfo first

  useEffect(() => {
    const stored = ResumeStorage.loadRecommendedSectionOrder()
    if (stored && stored.length) {
      setOrder(stored)
    }
    setActiveIdx(-1)
  }, [])

  // Load sample data if no data exists
  useEffect(() => {
    if (isLoaded && (!resumeData.personalInfo.name && !resumeData.personalInfo.email)) {
      setResumeData(DemoResume)
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

  const handlePreview = () => {
    if (hasUnsavedChanges) {
      handleSave()
    }
    const templateId = ResumeStorage.loadTemplate()
    router.push(`/resume-builder/templates/preview?template=${encodeURIComponent(templateId)}`)
  }

  const goPrev = () => {
    setActiveIdx(prev => Math.max(-1, prev - 1))
  }

  const goNext = () => {
    setActiveIdx(prev => Math.min(order.length - 1, prev + 1))
  }

  const activeSection: 'personalInfo' | Section | undefined = activeIdx === -1 ? 'personalInfo' : order[activeIdx]
  const canPrev = activeIdx > -1
  const canNext = activeIdx < order.length - 1

  const calculateCompleteness = (): number => {
    let completed = 0
    let total = 0
    const personalFields = ['name', 'title', 'email', 'phone', 'location']
    personalFields.forEach(field => {
      total++
      if (resumeData.personalInfo[field as keyof typeof resumeData.personalInfo]) {
        completed++
      }
    })
    total++
    if (resumeData.summary && resumeData.summary.length > 20) completed++
    total++
    if (resumeData.experience.length > 0 && resumeData.experience[0].title && resumeData.experience[0].company) completed++
    total++
    if (resumeData.education.length > 0 && resumeData.education[0].degree && resumeData.education[0].school) completed++
    total++
    if (resumeData.skills.length >= 3) completed++
    return Math.round((completed / total) * 100)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 text-gray-800 font-outfit">
      {/* Header */}
      <div className="bg-white/30 border-gray-200 backdrop-blur-sm sticky top-0 z-10">
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
                  <span>Start</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span>Template</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span className="font-medium text-blue-600">Edit</span>
                </div>
              </div>
            </div>

            {/* Progress and Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3">
                <div className="text-sm">
                  <div className="text-gray-600">Completeness</div>
                  <div className={`font-bold ${isComplete ? 'text-green-600' : 'text-blue-600'}`}>{completeness}%</div>
                </div>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 rounded-full ${isComplete ? 'bg-green-600' : 'bg-blue-600'}`}
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
                <Button onClick={handleSave} variant="outline" className={hasUnsavedChanges ? 'text-orange-600' : ''} disabled={!hasUnsavedChanges}>
                  <Save className="w-4 h-4 mr-2" /> Save
                </Button>
                {/* <Button onClick={handlePreview} variant="outline">
                  <Eye className="w-4 h-4 mr-2" /> Live Preview
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simple stepper controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-700">Section {activeIdx + 2} of {order.length + 1}</div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={goPrev} disabled={!canPrev}>Back</Button>
            <Button className="bg-blue hover:bg-blue/90 text-white" variant="default" onClick={goNext} disabled={!canNext}>Next</Button>
          </div>
        </div>

        <ResumeForm
          data={resumeData}
          onChange={handleDataChange}
          onSave={handleSave}
          activeSection={activeSection}
          isLastSection={activeIdx === order.length - 1}
          onPreview={handlePreview}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <Button 
            onClick={() => router.push('/resume-builder/templates')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Templates
          </Button>
          <Button onClick={handlePreview} className="bg-blue hover:bg-blue/90 text-white px-4 py-2 rounded-lg">
            See my resume
          </Button>
        </div>
      </div>
    </div>
  )
}
