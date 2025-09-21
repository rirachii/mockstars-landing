'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Upload, AlertCircle, CheckCircle, Eye, Download } from 'lucide-react'
import { parseResumeTextWithAI, AIParseResult } from '@/lib/resume/ai-text-parser'
import { ResumeData } from '@/lib/resume/resume-data'
import { createTemplateResumeData } from '@/lib/resume/data-adapter'
import { PDFGenerator } from './pdf-generator'
import { TemplateId } from '@/lib/resume/template-types'

interface TextResumeBuilderProps {
  onResumeGenerated?: (resumeData: ResumeData) => void
  className?: string
}

export const TextResumeBuilder: React.FC<TextResumeBuilderProps> = ({
  onResumeGenerated,
  className = ''
}) => {
  const [inputText, setInputText] = useState('')
  const [parseResult, setParseResult] = useState<AIParseResult | null>(null)
  const [isParsing, setIsParsing] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('mockstars')
  const [showPreview, setShowPreview] = useState(false)

  const handleParse = async () => {
    if (!inputText.trim()) {
      setParseResult({
        success: false,
        errors: ['Please enter some text to parse']
      })
      return
    }

    setIsParsing(true)
    
    try {
      const result = await parseResumeTextWithAI(inputText)
      setParseResult(result)
      
      if (result.success && result.data) {
        onResumeGenerated?.(result.data)
        setShowPreview(true)
      }
    } catch (error) {
      setParseResult({
        success: false,
        errors: ['Failed to parse resume text']
      })
    } finally {
      setIsParsing(false)
    }
  }

  const handleClear = () => {
    setInputText('')
    setParseResult(null)
    setShowPreview(false)
  }

  const sampleText = `John Smith
Software Engineer
john.smith@email.com
(555) 123-4567
San Francisco, CA
https://linkedin.com/in/johnsmith
https://github.com/johnsmith

SUMMARY
Experienced software engineer with 5+ years developing scalable web applications. Passionate about clean code and mentoring junior developers. Led teams that delivered projects improving user engagement by 40%.

EXPERIENCE
Senior Software Engineer at TechCorp
Jan 2022 - Present
San Francisco, CA
• Led development of microservices architecture serving 2M+ daily users
• Mentored 5 junior engineers and implemented code review processes
• Designed real-time analytics dashboard using React and WebSocket
• Collaborated with product team to deliver 15+ features ahead of schedule

Software Engineer at StartupXYZ
June 2020 - Dec 2021
Remote
• Developed RESTful APIs handling 100K+ requests per day using Python
• Implemented automated testing suite with 90% code coverage
• Built responsive web application with React and TypeScript
• Optimized database queries improving performance by 40%

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley
2018
GPA: 3.7

SKILLS
JavaScript, TypeScript, Python, React, Node.js, Express.js, PostgreSQL, MongoDB, AWS, Docker, Kubernetes, Git, Jest, Agile/Scrum

PROJECTS
EcoTracker - Sustainability Dashboard
Full-stack web application helping users track carbon footprint with data visualization. Implemented real-time data sync and gamification elements.
Technologies: React, Node.js, PostgreSQL, Chart.js, WebSocket

DevCollab - Code Review Platform
Open-source platform for distributed code reviews with integrated chat and video calls. Built with emphasis on security and scalability.
Technologies: TypeScript, Express.js, MongoDB, Socket.io, Docker`

  const handleLoadSample = () => {
    setInputText(sampleText)
  }

  return (
    <div className={`max-w-6xl mx-auto p-6 space-y-6 ${className}`}>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Text-Based Resume Builder
        </h1>
        <p className="text-gray-600">
          Paste your resume text and we'll automatically format it into a professional resume
        </p>
      </div>

      <Tabs defaultValue="input" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="input">Input Text</TabsTrigger>
          <TabsTrigger value="preview" disabled={!parseResult?.success}>
            Preview
          </TabsTrigger>
          <TabsTrigger value="download" disabled={!parseResult?.success}>
            Download
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Resume Text Input
              </CardTitle>
              <CardDescription>
                Paste your resume text below. We'll automatically detect and parse the different sections.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleLoadSample}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Load Sample
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClear}
                  disabled={!inputText}
                >
                  Clear
                </Button>
              </div>

              <Textarea
                placeholder="Paste your resume text here...

Example format:
Name
Title
Email
Phone
Location

SUMMARY
Your professional summary here...

EXPERIENCE
Job Title at Company
Start Date - End Date
Location
• Achievement 1
• Achievement 2

EDUCATION
Degree
School
Year

SKILLS
Skill1, Skill2, Skill3..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={20}
                className="font-mono text-sm"
              />

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {inputText.length} characters
                </div>
                <Button
                  onClick={handleParse}
                  disabled={!inputText.trim() || isParsing}
                  className="flex items-center gap-2"
                >
                  {isParsing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Parsing...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Parse & Preview
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {parseResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {parseResult.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  Parse Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {parseResult.success ? (
                  <div className="space-y-3">
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Successfully parsed your resume! Found the following sections:
                      </AlertDescription>
                    </Alert>
                    
                    <div className="flex flex-wrap gap-2">
                      {parseResult.data?.personalInfo.name && (
                        <Badge variant="secondary">Personal Info</Badge>
                      )}
                      {parseResult.data?.summary && (
                        <Badge variant="secondary">Summary</Badge>
                      )}
                      {parseResult.data?.experience.length && (
                        <Badge variant="secondary">
                          Experience ({parseResult.data.experience.length})
                        </Badge>
                      )}
                      {parseResult.data?.education.length && (
                        <Badge variant="secondary">
                          Education ({parseResult.data.education.length})
                        </Badge>
                      )}
                      {parseResult.data?.skills.length && (
                        <Badge variant="secondary">
                          Skills ({parseResult.data.skills.length})
                        </Badge>
                      )}
                      {parseResult.data?.projects && parseResult.data.projects.length > 0 && (
                        <Badge variant="secondary">
                          Projects ({parseResult.data.projects.length})
                        </Badge>
                      )}
                    </div>

                    {parseResult.warnings && parseResult.warnings.length > 0 && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="space-y-1">
                            <p className="font-medium">Warnings:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {parseResult.warnings.map((warning, index) => (
                                <li key={index} className="text-sm">{warning}</li>
                              ))}
                            </ul>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ) : (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-1">
                        <p className="font-medium">Failed to parse resume:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {parseResult.errors?.map((error, index) => (
                            <li key={index} className="text-sm">{error}</li>
                          ))}
                        </ul>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          {parseResult?.success && parseResult.data && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Resume Preview
                </CardTitle>
                <CardDescription>
                  Preview your formatted resume. You can change the template below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Select Template:
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value as TemplateId)}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="mockstars">Mockstars</option>
                    <option value="owen">Owen</option>
                    <option value="world-best-resume">World Best Resume</option>
                    <option value="paul-allen">Paul Allen</option>
                    <option value="the-gilfoyle">The Gilfoyle</option>
                    <option value="pied-piper">Pied Piper</option>
                    <option value="aviato">Aviato</option>
                    <option value="marbles">Marbles</option>
                    <option value="jobs-bro-jobs">Jobs Bro Jobs</option>
                    <option value="silicon-ivy">Silicon Ivy</option>
                    <option value="ipo-ready">IPO Ready</option>
                    <option value="chrome-bone">Chrome Bone</option>
                    <option value="lavender-dusk">Lavender Dusk</option>
                    <option value="conejo-luxe">Conejo Luxe</option>
                    <option value="rizzume">Rizzume</option>
                    <option value="its-giving-professional">It's Giving Professional</option>
                    <option value="no-cap">No Cap</option>
                    <option value="delulu-mode">Delulu Mode</option>
                    <option value="main-character-energy">Main Character Energy</option>
                    <option value="100-hp">100 HP</option>
                    <option value="npc-energy">NPC Energy</option>
                    <option value="gyatt-points">Gyatt Points</option>
                  </select>
                </div>
                
                <PDFGenerator
                  resumeData={createTemplateResumeData(parseResult.data)}
                  template={selectedTemplate}
                  showPreview={true}
                  showButtons={false}
                  customization={{
                    primaryColor: '#397DC2',
                    accentColor: '#0f172a',
                    fontSize: 'default',
                    fontFamily: 'Helvetica',
                    sectionSpacing: 16,
                    paragraphSpacing: 12,
                    lineSpacing: 1.4,
                    density: 'cozy',
                    columns: 1,
                    sectionOrder: ['summary', 'experience', 'projects', 'education', 'skills'],
                    page: { size: 'letter', margin: '0.5in' }
                  }}
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="download" className="space-y-4">
          {parseResult?.success && parseResult.data && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Resume
                </CardTitle>
                <CardDescription>
                  Generate and download your resume as a PDF.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PDFGenerator
                  resumeData={createTemplateResumeData(parseResult.data)}
                  template={selectedTemplate}
                  showPreview={false}
                  showButtons={true}
                  customization={{
                    primaryColor: '#397DC2',
                    accentColor: '#0f172a',
                    fontSize: 'default',
                    fontFamily: 'Helvetica',
                    sectionSpacing: 16,
                    paragraphSpacing: 12,
                    lineSpacing: 1.4,
                    density: 'cozy',
                    columns: 1,
                    sectionOrder: ['summary', 'experience', 'projects', 'education', 'skills'],
                    page: { size: 'letter', margin: '0.5in' }
                  }}
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
