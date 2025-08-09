'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { TemplateSelector } from '@/components/resume/template-selector';
import { TemplateType } from '@/components/resume/pdf-templates';

const PDFUpload = dynamic(() => import('@/components/resume/pdf-upload').then(m => m.PDFUpload), { ssr: false });
const PDFGenerator = dynamic(() => import('@/components/resume/pdf-generator').then(m => m.PDFGenerator), { ssr: false });

export default function ResumeBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = React.useState<TemplateType>('modern');
  const [showUpload, setShowUpload] = React.useState(true);
  
  // Sample resume data - this would be managed by your form state
  const [resumeData, setResumeData] = React.useState({
    personalInfo: {
      name: "Your Name",
      title: "Your Professional Title",
      email: "your.email@example.com",
      phone: "(555) 123-4567",
      location: "Your City, State",
    },
    summary: "Professional summary will appear here...",
    experience: [
      {
        title: "Job Title",
        company: "Company Name",
        startDate: "Start Date",
        endDate: "End Date",
        location: "Location",
        description: ["Key achievement or responsibility"]
      }
    ],
    education: [
      {
        degree: "Your Degree",
        school: "Your School",
        year: "Graduation Year"
      }
    ],
    skills: ["Skill 1", "Skill 2", "Skill 3"]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
          <p className="mt-2 text-gray-600">
            Create a professional resume in minutes with our AI-powered templates
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Form and Upload */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Upload Section */}
            {showUpload && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Upload Existing Resume (Optional)
                  </h2>
                  <button 
                    onClick={() => setShowUpload(false)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Skip Upload
                  </button>
                </div>
                <PDFUpload
                  onParsed={(data) => {
                    console.log('Parsed resume:', data);
                    // Here you would process the parsed data and populate your form
                    setShowUpload(false);
                  }}
                  onError={(error) => {
                    console.error('Upload error:', error);
                  }}
                />
              </div>
            )}

            {/* Template Selection */}
            <div className="bg-white rounded-lg shadow p-6">
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onTemplateSelect={setSelectedTemplate}
              />
            </div>

            {/* Resume Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Resume Information
              </h2>
              
              {/* This is where your resume form would go */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                      value={resumeData.personalInfo.name}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, name: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Senior Software Engineer"
                      value={resumeData.personalInfo.title}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, title: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 Complete resume form components would be implemented here, including:
                  </p>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• Personal Information</li>
                    <li>• Professional Summary</li>
                    <li>• Work Experience (with dynamic add/remove)</li>
                    <li>• Education</li>
                    <li>• Skills</li>
                    <li>• Projects (optional)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Preview and Download */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Preview & Download
                </h2>
                
                <PDFGenerator
                  resumeData={resumeData}
                  template={selectedTemplate}
                  showPreview={false}
                />

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Selected Template: {selectedTemplate}
                  </h3>
                  <p className="text-xs text-gray-600">
                    Your resume will be generated using the {selectedTemplate} template with your information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
