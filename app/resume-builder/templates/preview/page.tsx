"use client"

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, Download, Eye, Edit, RefreshCw, Palette, Type, Space } from 'lucide-react'
import { PDFGenerator } from '@/components/resume/pdf-generator'
import { LiveResumeEditor } from '@/components/resume/live-resume-editor'
import { TemplateId, TemplateInfo, resumeTemplates, getTemplate } from '@/lib/resume/template-types'
import { useLocalStorage } from '@/lib/hooks/useLocalStorage'
import { ResumeStorage, DEFAULT_RESUME_DATA } from '@/lib/resume/resume-storage'
import { ResumeData } from '@/lib/resume/resume-data'
import { getAvailableFonts, getFontOptions } from '@/lib/resume/resume-fonts'
import { TemplateCustomization, DEFAULT_CUSTOMIZATION } from '@/lib/resume/template-types'

const PREDEFINED_COLORS = [
  '#397DC2', '#2563eb', '#059669', '#dc2626', '#7c3aed', '#ea580c', '#0891b2', '#be185d', '#374151', '#1f2937', '#92400e', '#065f46', '#7c2d12', '#581c87', '#991b1b', '#0c4a6e',
]

// Get available fonts dynamically
const availableFonts = getAvailableFonts()
const fontOptions = getFontOptions()

function TemplatePreviewPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateParam = searchParams.get('template')
  
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | undefined>(templateParam as TemplateId)
  const [resumeData, setResumeData, , isLoaded] = useLocalStorage<ResumeData>('mockstars_resume_data', DEFAULT_RESUME_DATA)
  const [customization, setCustomization] = useState<TemplateCustomization>(DEFAULT_CUSTOMIZATION)
  const [viewMode, setViewMode] = useState<'preview' | 'live-edit'>('preview')

  // Load template and customization from localStorage
  useEffect(() => {
    if (isLoaded) {
      if (!templateParam) {
        const savedTemplate = ResumeStorage.loadTemplate()
        setSelectedTemplate(savedTemplate as TemplateId)
      }
      const savedCustomization = localStorage.getItem('mockstars_template_customization')
      if (savedCustomization) {
        try { setCustomization(JSON.parse(savedCustomization)) } catch {}
      }
    }
  }, [isLoaded, templateParam])

  useEffect(() => {
    localStorage.setItem('mockstars_template_customization', JSON.stringify(customization))
  }, [customization])

  const calculateCompleteness = (): number => {
    let score = 0
    if (resumeData.personalInfo.name) score += 5
    if (resumeData.personalInfo.email) score += 5
    if (resumeData.personalInfo.phone) score += 5
    if (resumeData.personalInfo.location) score += 5
    if (resumeData.summary && resumeData.summary.length > 50) score += 15
    if (resumeData.experience.length > 0) {
      score += 10
      if (resumeData.experience[0].title && resumeData.experience[0].company) score += 10
    }
    if (resumeData.education.length > 0 && resumeData.education[0].degree && resumeData.education[0].school) {
      score += 15
    }
    if (resumeData.skills.length >= 3) score += 10
    if (resumeData.skills.length >= 6) score += 10
    return score
  }

  const completeness = calculateCompleteness()
  const isComplete = completeness >= 80
  const currentTemplate = getTemplate(selectedTemplate!)

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!selectedTemplate || !currentTemplate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Template not found</h2>
          <Button onClick={() => router.push('/resume-builder/templates')}>
            Choose Template
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 text-gray-800 font-outfit">
      {/* Header */}
      <div className="bg-white/30 border-gray-200 backdrop-blur-sm top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold font-mattone">
                <span className="text-blue">
                  {viewMode === 'live-edit' ? 'Live Resume Editor' : 'Resume Preview'}
                </span>
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span>Upload</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span>Edit</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="font-medium text-green-600">Template</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
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
                  onClick={() => setViewMode(viewMode === 'live-edit' ? 'preview' : 'live-edit')}
                  variant={viewMode === 'live-edit' ? 'default' : 'outline'}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {viewMode === 'live-edit' ? 'Exit Live Editor' : 'Live Editor'}
                </Button>
                <Button 
                  onClick={() => router.push('/resume-builder/templates')}
                  variant="outline"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Template Selection
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quality Check */}
        {!isComplete && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900 mb-2">Improve Your Resume Quality</h3>
                <p className="text-orange-800 mb-4">
                  Your resume is {completeness}% complete. Consider adding more details to make it stand out:
                </p>
                <ul className="text-sm text-orange-700 space-y-1">
                  {resumeData.summary && resumeData.summary.length < 50 && <li>• Add a compelling professional summary</li>}
                  {resumeData.experience.length === 0 && <li>• Include your work experience</li>}
                  {resumeData.skills.length < 6 && <li>• List more relevant skills</li>}
                  {(!resumeData.education[0]?.degree || !resumeData.education[0]?.school) && <li>• Complete education details</li>}
                </ul>
                <div className="flex gap-3 mt-4">
                  <Button 
                    onClick={() => router.push('/resume-builder/edit')}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                    size="sm"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Form Editor
                  </Button>
                  <Button 
                    onClick={() => setViewMode('live-edit')}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Live Editor
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Editor Mode */}
        {viewMode === 'live-edit' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 font-mattone mb-4">
                Live Resume Editor
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                Edit your resume directly on the page. Click any text to modify it in real-time. 
                Toggle between edit and preview modes to see how it looks.
              </p>
            </div>

            <LiveResumeEditor
              data={resumeData}
              onChange={setResumeData}
              template={selectedTemplate}
              customization={customization}
            />
          </div>
        )}

        {/* Preview Mode - Side by side layout */}
        {viewMode === 'preview' && (
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Resume Preview</h2>
                <p className="text-gray-600">Template: {currentTemplate.name}</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg">
                <PDFGenerator 
                  resumeData={resumeData}
                  template={selectedTemplate as TemplateId}
                  customization={customization as TemplateCustomization}
                  showPreview={false}
                  showButtons={true}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Customization Panel */}
              <div className="lg:col-span-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
                  <div className="flex items-center gap-2 mb-6">
                    <Palette className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Customize Your Resume</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Color Theme */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Color Theme</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {PREDEFINED_COLORS.map((color) => (
                          <button
                            key={color}
                            onClick={() => setCustomization(prev => ({ ...prev, primaryColor: color }))}
                            className={`w-10 h-10 rounded-lg border-2 transition-all ${
                              customization.primaryColor === color 
                                ? 'border-gray-800 ring-2 ring-gray-300' 
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                      <div className="mt-2 text-xs text-gray-600">
                        Selected: {customization.primaryColor}
                      </div>
                    </div>

                    {/* Font Family */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Font Family</h4>
                      <select
                        value={customization.fontFamily}
                        onChange={(e) => setCustomization(prev => ({ ...prev, fontFamily: e.target.value }))}
                        className="w-full p-3 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      >
                        {fontOptions.map((font) => (
                          <option key={font.value} value={font.value}>
                            {font.label}
                          </option>
                        ))}
                      </select>
                      <div
                        className="mt-2 text-sm text-gray-600 p-2 bg-gray-50 rounded"
                        style={{ fontFamily: `${customization.fontFamily}, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, 'Helvetica Neue', sans-serif` }}
                      >
                        Preview: The quick brown fox jumps over the lazy dog
                      </div>
                    </div>

                    {/* Font Size */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Font Size</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {(['small', 'default', 'large'] as const).map((size) => (
                          <button
                            key={size}
                            onClick={() => setCustomization(prev => ({ ...prev, fontSize: size }))}
                            className={`px-3 py-2 rounded-lg border transition-all text-sm ${
                              customization.fontSize === size
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex flex-col items-center">
                              <span className="capitalize">{size}</span>
                              <span className={`mt-1 ${
                                size === 'small' ? 'text-xs' : 
                                size === 'large' ? 'text-base' : 'text-sm'
                              }`}>
                                Aa
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Spacing Controls */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Spacing & Layout</h4>
                      <div className="space-y-4">
                        {/* Section Spacing */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Spacing: {customization.sectionSpacing}px
                          </label>
                          <input
                            type="range"
                            min="8"
                            max="32"
                            step="2"
                            value={customization.sectionSpacing}
                            onChange={(e) => setCustomization(prev => ({ 
                              ...prev, 
                              sectionSpacing: parseInt(e.target.value) 
                            }))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Compact</span>
                            <span>Spacious</span>
                          </div>
                        </div>

                        {/* Paragraph Spacing */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Paragraph Spacing: {customization.paragraphSpacing}px
                          </label>
                          <input
                            type="range"
                            min="4"
                            max="16"
                            step="1"
                            value={customization.paragraphSpacing}
                            onChange={(e) => setCustomization(prev => ({ 
                              ...prev, 
                              paragraphSpacing: parseInt(e.target.value) 
                            }))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Tight</span>
                            <span>Loose</span>
                          </div>
                        </div>

                        {/* Line Spacing */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Line Spacing: {customization.lineSpacing}
                          </label>
                          <input
                            type="range"
                            min="1.0"
                            max="2.0"
                            step="0.1"
                            value={customization.lineSpacing}
                            onChange={(e) => setCustomization(prev => ({ 
                              ...prev, 
                              lineSpacing: parseFloat(e.target.value) 
                            }))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Single</span>
                            <span>Double</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Preview Sample */}
                    {/* <div>
                      <h4 className="font-medium text-gray-900 mb-3">Live Preview</h4>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <div 
                          className="space-y-2"
                          style={{
                            color: customization.primaryColor,
                            fontFamily: customization.fontFamily,
                            fontSize: customization.fontSize === 'small' ? '12px' : 
                                     customization.fontSize === 'large' ? '16px' : '14px',
                            lineHeight: customization.lineSpacing
                          }}
                        >
                          <div className="font-bold">John Doe</div>
                          <div className="text-gray-600 text-sm">Software Engineer</div>
                          <div 
                            className="text-gray-800 text-xs"
                            style={{ 
                              marginTop: `${customization.paragraphSpacing}px`,
                              lineHeight: customization.lineSpacing 
                            }}
                          >
                            Experienced developer with expertise in React and Node.js...
                          </div>
                        </div>
                      </div>
                    </div> */}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button
                        onClick={() => setCustomization(DEFAULT_CUSTOMIZATION)}
                        variant="outline"
                        className="w-full"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset to Default
                      </Button>
                      
                      <div className="text-xs text-gray-500 text-center">
                        Changes are saved automatically
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Preview */}
              <div className="lg:col-span-8">
                <div className="">
                  <PDFGenerator 
                    resumeData={resumeData}
                    template={selectedTemplate as TemplateId}
                    customization={customization}
                    showPreview={true}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <Button 
            onClick={() => router.push('/resume-builder/templates')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Template Selection
          </Button>

          <div className="flex gap-3">
            <Button 
              onClick={() => router.push('/resume-builder/edit')}
              variant="outline"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Content
            </Button>
            
            <Button 
              onClick={() => setViewMode('live-edit')}
              variant="outline"
            >
              <Eye className="w-4 h-4 mr-2" />
              Live Editor
            </Button>
          </div>
        </div>
      </div>

      {/* Custom CSS for sliders */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #397DC2;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #397DC2;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}

export default function TemplatePreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <TemplatePreviewPageInner />
    </Suspense>
  )
}
