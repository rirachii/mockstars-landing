'use client'

import React, { useState } from 'react'
import { LiveResumeEditor } from '@/components/resume/live-resume-editor'
import { useLocalStorage } from '@/lib/hooks/useLocalStorage'
import { ResumeData } from '@/lib/pdf'
import { SAMPLE_RESUME_DATA } from '@/lib/resume/resume-storage'
import { DEFAULT_CUSTOMIZATION } from '@/lib/resume/template-customization'

export default function LiveEditPage() {
  const [resumeData, setResumeData] = useLocalStorage<ResumeData>('mockstars_resume_data', SAMPLE_RESUME_DATA)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/30 border-b border-gray-200 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold font-mattone text-blue-600 mb-2">
              Live Resume Editor
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Edit your resume directly on the page. Click any text to modify it in real-time. 
              Toggle between edit and preview modes to see how it looks.
            </p>
          </div>
        </div>
      </div>

      {/* Live Editor */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LiveResumeEditor
          data={resumeData}
          onChange={setResumeData}
          template="modern"
          customization={DEFAULT_CUSTOMIZATION}
        />
      </div>
    </div>
  )
}
