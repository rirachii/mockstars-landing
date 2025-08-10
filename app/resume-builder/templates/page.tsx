'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, Download, Eye, Edit, RefreshCw, Palette, Type, Space } from 'lucide-react'
import { TemplateSelector } from '@/components/resume/template-selector'
import { PDFGenerator } from '@/components/resume/pdf-generator'
import { LiveResumeEditor } from '@/components/resume/live-resume-editor'
import { TemplateId, TemplateInfo } from '@/lib/resume/resume-types'
import { useLocalStorage } from '@/lib/hooks/useLocalStorage'
import { ResumeStorage, DEFAULT_RESUME_DATA } from '@/lib/resume/resume-storage'
import { ResumeData } from '@/lib/pdf'
import { getAvailableFonts, getFontOptions } from '@/lib/resume/resume-fonts'
import { TemplateCustomization, DEFAULT_CUSTOMIZATION } from '@/lib/resume/resume-types'

// Template customization options
// (moved to '@/lib/template-customization')

const PREDEFINED_COLORS = [
  '#397DC2', // Mockstars Blue
  '#2563eb', // Blue
  '#059669', // Green
  '#dc2626', // Red
  '#7c3aed', // Purple
  '#ea580c', // Orange
  '#0891b2', // Cyan
  '#be185d', // Pink
  '#374151', // Gray
  '#1f2937', // Dark Gray
  '#92400e', // Brown
  '#065f46', // Dark Green
  '#7c2d12', // Dark Orange
  '#581c87', // Dark Purple
  '#991b1b', // Dark Red
  '#0c4a6e', // Dark Blue
]

// Get available fonts dynamically
const availableFonts = getAvailableFonts()
const fontOptions = getFontOptions()

export default function TemplatesPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | undefined>(undefined)
  const [resumeData, setResumeData, , isLoaded] = useLocalStorage<ResumeData>('mockstars_resume_data', DEFAULT_RESUME_DATA)
  const [customization, setCustomization] = useState<TemplateCustomization>(DEFAULT_CUSTOMIZATION)
  const [viewMode, setViewMode] = useState<'templates' | 'preview' | 'live-edit' | 'customize'>('templates')
  const [showCustomizationPanel, setShowCustomizationPanel] = useState(false)

  // Load template preference and customization from localStorage
  useEffect(() => {
    if (isLoaded) {
      const savedTemplate = ResumeStorage.loadTemplate()
      setSelectedTemplate(savedTemplate as TemplateId)
      
      // Load saved customization
      const savedCustomization = localStorage.getItem('mockstars_template_customization')
      if (savedCustomization) {
        try {
          setCustomization(JSON.parse(savedCustomization))
        } catch (error) {
          console.error('Failed to load customization:', error)
        }
      }
    }
  }, [isLoaded])

  // Save template selection
  const handleTemplateSelect = (template: TemplateInfo) => {
    setSelectedTemplate(template.id as TemplateId)
    ResumeStorage.saveTemplate(template.id as TemplateId)
    setViewMode('preview')
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
      if (resumeData.experience[0].description.length > 0 && resumeData.experience[0].description[0]) score += 10
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 text-gray-800 font-outfit">
      {/* Header */}
      <div className="bg-white/30 border-b border-gray-200 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold font-mattone">
                <span className="text-blue">
                  {viewMode === 'live-edit' ? 'Live Resume Editor' : 
                   viewMode === 'preview' ? 'Resume Preview' : 'Choose Your Template'}
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
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span className="font-medium text-blue-600">Template</span>
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
                  onClick={() => setViewMode(viewMode === 'live-edit' ? 'templates' : 'live-edit')}
                  variant={viewMode === 'live-edit' ? 'default' : 'outline'}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {viewMode === 'live-edit' ? 'Exit Live Editor' : 'Live Editor'}
                </Button>
                <Button 
                  onClick={() => setShowCustomizationPanel(!showCustomizationPanel)}
                  variant={showCustomizationPanel ? 'default' : 'outline'}
                  className="relative"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Customize
                </Button>
                {viewMode !== 'templates' && (
                  <Button onClick={() => setViewMode('templates')} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Change Template
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customization Panel */}
      {showCustomizationPanel && (
        <div className="bg-white border-b border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Color Selection */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Color Theme</h3>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {PREDEFINED_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setCustomization(prev => ({ ...prev, color }))}
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
                <div className="mt-3 text-xs text-gray-600">
                  Selected: {customization.primaryColor}
                </div>
              </div>

              {/* Font Size */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Type className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Font Size</h3>
                </div>
                <div className="space-y-2">
                  {(['small', 'default', 'large'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setCustomization(prev => ({ ...prev, fontSize: size }))}
                      className={`w-full text-left px-3 py-2 rounded-lg border transition-all ${
                        customization.fontSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="capitalize">{size}</span>
                        <span className={`${
                          size === 'small' ? 'text-sm' : 
                          size === 'large' ? 'text-lg' : 'text-base'
                        }`}>
                          Sample
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Family */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Type className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Font Family</h3>
                </div>
                <select
                  value={customization.fontFamily}
                  onChange={(e) => setCustomization(prev => ({ ...prev, fontFamily: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {fontOptions.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
                <div className="mt-2 text-sm text-gray-600" style={{ fontFamily: customization.fontFamily }}>
                  Preview: The quick brown fox jumps
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {availableFonts.find(f => f.name === customization.fontFamily)?.description || 'Professional resume font'}
                </div>
              </div>

              {/* Spacing Settings */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Space className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Spacing</h3>
                </div>
                <div className="space-y-3">
                  {/* Section Spacing */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Paragraph Spacing */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Line Spacing */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Customization Actions */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setCustomization(DEFAULT_CUSTOMIZATION)}
                  variant="outline"
                  size="sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset to Default
                </Button>
                
                {/* Live Preview Sample */}
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Preview:</span>
                  <div 
                    className="inline-block ml-2 px-3 py-1 rounded border"
                    style={{
                      color: customization.primaryColor,
                      fontFamily: customization.fontFamily,
                      fontSize: customization.fontSize === 'small' ? '12px' : 
                               customization.fontSize === 'large' ? '16px' : '14px',
                      lineHeight: customization.lineSpacing
                    }}
                  >
                    Sample Text
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowCustomizationPanel(false)}
                  variant="outline"
                  size="sm"
                >
                  Close Panel
                </Button>
                <Button
                  onClick={() => {
                    // Save customization to localStorage
                    localStorage.setItem('mockstars_template_customization', JSON.stringify(customization))
                    setShowCustomizationPanel(false)
                  }}
                  size="sm"
                >
                  Apply Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Template Selection Mode */}
        {viewMode === 'templates' && (
          <div className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 font-mattone mb-4">
                Select Your Professional Template
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose from our collection of ATS-friendly, recruiter-approved templates. 
                Each template is designed to highlight your experience effectively.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-8">
              <TemplateSelector
                selectedTemplate={selectedTemplate as TemplateInfo}
                onTemplateSelect={handleTemplateSelect}
              />
              
              <div className="mt-6 text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Click any template above to see how your resume will look
                </p>
                <div className="flex justify-center gap-3">
                  <Button 
                    onClick={() => setViewMode('live-edit')}
                    className="bg-blue-600 hover:bg-blue-700 text-blue-600"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Try Live Editor Instead
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

        {/* Preview Mode */}
        {viewMode === 'preview' && (
          <div className="space-y-8">
            {/* Quality Check */}
            {!isComplete && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
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

            {/* Preview */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Resume Preview</h2>
                  <p className="text-gray-600">Template: {selectedTemplate}</p>
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => setViewMode('templates')} variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Change Template
                  </Button>
                  <Button onClick={() => setViewMode('live-edit')} variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Live Edit
                  </Button>
                </div>
              </div>

              <PDFGenerator 
                resumeData={resumeData}
                template={selectedTemplate as TemplateId}
                customization={customization}
                showPreview={true}
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <Button 
            onClick={() => router.push('/resume-builder/edit')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Edit
          </Button>

          {viewMode !== 'templates' && (
            <div className="flex gap-3">
              <Button onClick={() => setViewMode('templates')} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Different Template
              </Button>
              
              {viewMode === 'preview' && (
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-1">
                  <PDFGenerator 
                    resumeData={resumeData}
                    template={selectedTemplate as TemplateId}
                    customization={customization as TemplateCustomization}
                    showPreview={false}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Features */}
        {/* {viewMode === 'templates' && (
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
                <Download className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Instant Download</h4>
              <p className="text-sm text-gray-600">
                Download your resume as a high-quality PDF instantly
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Easy Updates</h4>
              <p className="text-sm text-gray-600">
                Edit your data anytime and regenerate with any template
              </p>
            </div>
          </div>
        )} */}
      </div>
    </div>
  )
}
