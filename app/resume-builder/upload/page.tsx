'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import NextLink from 'next/link'
import NextDynamic from 'next/dynamic'
import { PencilLine, Upload, FileText, ArrowRight, CheckCircle, GraduationCap, School, Building2, Ban } from 'lucide-react'
import { ResumeStorage, DEFAULT_RESUME_DATA } from '@/lib/resume/resume-storage'
import { ResumeData } from '@/lib/resume/resume-data'
import { DEFAULT_CUSTOMIZATION, Section } from '@/lib/resume/template-types'

const PDFUpload = NextDynamic(() => import('@/components/resume/pdf-upload').then(m => m.PDFUpload), { ssr: false })

type InSchool = 'HS' | 'UNI' | 'Other' | 'No'

type FlowQuestion = {
  id: string
  question: string
  type: 'single' | 'multi'
  options: string[]
  followups?: Record<string, FlowQuestion>
}

type FlowPresets = {
  sectionOrder?: string[]
  theme?: string
  length_hint?: string
}

const FALLBACK_GOALS_BY_SCHOOL: Record<InSchool, string[]> = {
  HS: [
    'Club Leadership',
    'First Job / Part-time',
    'Internship / Summer Program',
    'Scholarship / Competition',
    'College Applications',
  ],
  UNI: [
    'On-campus Leadership',
    'Internship / Co-op',
    'Research Assistant / Lab',
    'Part-time / Campus Job',
    'Scholarship / Fellowship',
    'Grad School',
  ],
  Other: [
    'Program Leadership / Mentor',
    'Apprenticeship / Entry Role',
    'Portfolio Review / Showcase',
    'Certification Application',
  ],
  No: [
    'First Job / Internship',
    'Continue in Field',
    'Switch Careers',
    'Leadership / Management',
  ],
}

const FALLBACK_MAPPING_TABLE: Array<{ inSchool: InSchool; goal: string; sectionOrder: Section[] }> = [
  { inSchool: 'HS', goal: 'Club Leadership', sectionOrder: ['summary','education','experience','projects','skills','awards','volunteering','interests','languages'] },
  { inSchool: 'HS', goal: 'First Job / Part-time', sectionOrder: ['summary','education','projects','skills','experience','awards','volunteering','languages','interests'] },
  { inSchool: 'HS', goal: 'Internship / Summer Program', sectionOrder: ['summary','education','projects','skills','experience','awards','volunteering','languages','interests'] },
  { inSchool: 'HS', goal: 'Scholarship / Competition', sectionOrder: ['summary','education','awards','volunteering','projects','skills','experience','interests','languages'] },
  { inSchool: 'HS', goal: 'College Applications', sectionOrder: ['summary','education','awards','volunteering','projects','skills','experience','interests','languages'] },

  { inSchool: 'UNI', goal: 'On-campus Leadership', sectionOrder: ['summary','education','experience','projects','skills','awards','volunteering','interests','languages'] },
  { inSchool: 'UNI', goal: 'Internship / Co-op', sectionOrder: ['summary','education','projects','skills','experience','awards','volunteering','languages','interests'] },
  { inSchool: 'UNI', goal: 'Research Assistant / Lab', sectionOrder: ['summary','education','projects','experience','skills','publications','awards','languages','interests'] },
  { inSchool: 'UNI', goal: 'Part-time / Campus Job', sectionOrder: ['summary','education','projects','skills','experience','awards','volunteering','languages','interests'] },
  { inSchool: 'UNI', goal: 'Scholarship / Fellowship', sectionOrder: ['summary','education','awards','volunteering','projects','skills','experience','interests','languages'] },
  { inSchool: 'UNI', goal: 'Grad School', sectionOrder: ['summary','education','projects','experience','skills','publications','awards','languages','interests'] },

  { inSchool: 'Other', goal: 'Program Leadership / Mentor', sectionOrder: ['summary','education','experience','projects','skills','awards','volunteering','interests','languages'] },
  { inSchool: 'Other', goal: 'Apprenticeship / Entry Role', sectionOrder: ['summary','education','projects','skills','experience','certifications','awards','languages','interests'] },
  { inSchool: 'Other', goal: 'Portfolio Review / Showcase', sectionOrder: ['summary','education','projects','skills','experience','awards','volunteering','languages','interests'] },
  { inSchool: 'Other', goal: 'Certification Application', sectionOrder: ['summary','education','projects','skills','experience','certifications','awards','languages','interests'] },

  { inSchool: 'No', goal: 'First Job / Internship', sectionOrder: ['summary','experience','projects','skills','education','awards','volunteering','languages','interests'] },
  { inSchool: 'No', goal: 'Continue in Field', sectionOrder: ['summary','experience','projects','skills','education','certifications','awards','languages','interests'] },
  { inSchool: 'No', goal: 'Switch Careers', sectionOrder: ['summary','projects','skills','experience','education','certifications','awards','languages','interests'] },
  { inSchool: 'No', goal: 'Leadership / Management', sectionOrder: ['summary','experience','skills','projects','education','awards','certifications','languages','interests'] },
]

export default function UploadPage() {
  const router = useRouter()
  const [flow, setFlow] = useState<any | null>(null)
  const [flowError, setFlowError] = useState<string | null>(null)
  const [uploadedData, setUploadedData] = useState<ResumeData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [mode, setMode] = useState<'ask' | 'upload' | 'school'>('ask')
  const searchParams = useSearchParams()
  useEffect(() => {
    const param = searchParams.get('mode')
    if (param === 'upload' || param === 'school' || param === 'ask') {
      setMode(param)
    }
  }, [searchParams])
  useEffect(() => {
    let isMounted = true
    fetch('/api/resume-flow')
      .then(res => res.json())
      .then(json => {
        if (!isMounted) return
        if (json?.ok) {
          setFlow(json.data)
        } else {
          setFlowError('Failed to load flow; using defaults')
        }
      })
      .catch(() => {
        if (!isMounted) return
        setFlowError('Failed to load flow; using defaults')
      })
    return () => { isMounted = false }
  }, [])
  const [inSchool, setInSchool] = useState<InSchool | null>(null)
  const [goal, setGoal] = useState<string | null>(null)

  // Stepper state for deeper questions
  const [sequence, setSequence] = useState<FlowQuestion[]>([])
  const [presets, setPresets] = useState<FlowPresets | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [activeFollowup, setActiveFollowup] = useState<FlowQuestion | null>(null)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})

  const goals = useMemo(() => {
    if (!inSchool) return []
    try {
      const root = flow?.root
      if (!root) return FALLBACK_GOALS_BY_SCHOOL[inSchool]
      const branches = root?.branches || {}
      const branchKey = inSchool === 'No' ? 'No' : inSchool
      const branch = branches[branchKey]
      const opts: string[] = Array.isArray(branch?.options) ? branch.options : []
      return opts.length ? opts : FALLBACK_GOALS_BY_SCHOOL[inSchool]
    } catch {
      return FALLBACK_GOALS_BY_SCHOOL[inSchool]
    }
  }, [inSchool, flow])

  const goToEdit = (seed?: Partial<ResumeData>) => {
    const next: ResumeData = { ...DEFAULT_RESUME_DATA, ...(seed || {}) }
    ResumeStorage.saveResumeData(next)
    ResumeStorage.saveProgress('upload', true)
    router.push('/resume-builder/edit')
  }

  const handleParsed = async (data: ResumeData) => {
    setUploadedData(data)
    setIsProcessing(true)

    try {
      const resumeData: ResumeData = {
        ...DEFAULT_RESUME_DATA,
        personalInfo: {
          name: data.personalInfo.name || '',
          title: data.personalInfo.title || '',
          email: data.personalInfo.email || '',
          phone: data.personalInfo.phone || '',
          location: data.personalInfo.location || '',
          links: data.personalInfo.links || []
        },
        summary: data.summary || '',
        experience: data.experience || [],
        education: data.education || [],
        skills: data.skills || [],
        projects: data.projects || [],
        certifications: data.certifications || [],
        awards: data.awards || [],
        languages: data.languages || [],
        volunteering: data.volunteering || [],
        publications: data.publications || [],
        interests: data.interests || [],
        metadata: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      }

      ResumeStorage.saveResumeData(resumeData)
      ResumeStorage.saveProgress('upload', true)

      setTimeout(() => {
        setIsProcessing(false)
        router.push('/resume-builder/edit')
      }, 1200)

    } catch (error) {
      console.error('Error processing resume:', error)
      setIsProcessing(false)
    }
  }

  const handleError = (error: string) => {
    console.error('Upload error:', error)
  } 

  const selectInSchool = (val: InSchool) => {
    setInSchool(val)
    setGoal(null)
    setSequence([])
    setCurrentStep(0)
    setActiveFollowup(null)
    setAnswers({})
    setPresets(null)
    ResumeStorage.saveOnboarding({ inSchool: val })
  }

  const hydratePathFromFlow = (school: InSchool, goalValue: string) => {
    try {
      const root = flow?.root
      const branches = root?.branches || {}
      const branchKey = school === 'No' ? 'No' : school
      const branch = branches[branchKey]
      const paths = branch?.paths || {}
      const goalPath = paths[goalValue]
      const seq: FlowQuestion[] = Array.isArray(goalPath?.sequence) ? goalPath.sequence : []
      const presetsObj: FlowPresets | null = goalPath?.presets || null
      return { seq, presetsObj }
    } catch {
      return { seq: [], presetsObj: null }
    }
  }

  const selectGoal = (val: string) => {
    if (!inSchool) return
    setGoal(val)
    const { seq, presetsObj } = hydratePathFromFlow(inSchool, val)
    if (seq.length) {
      setSequence(seq)
      setCurrentStep(0)
      setActiveFollowup(null)
      setAnswers({})
      setPresets(presetsObj)
      ResumeStorage.saveOnboarding({ inSchool, goal: val })
      return
    }
    // Fallback: no sequence available → compute order and proceed
    let order: Section[] | undefined
    const mapped = FALLBACK_MAPPING_TABLE.find(m => m.inSchool === inSchool && m.goal === val)
    order = mapped?.sectionOrder || DEFAULT_CUSTOMIZATION.sectionOrder
    ResumeStorage.saveRecommendedSectionOrder(order)
    ResumeStorage.saveOnboarding({ inSchool, goal: val })
    router.push('/resume-builder/templates')
  }

  const onSelectSingle = (q: FlowQuestion, value: string) => {
    const newAnswers = { ...answers, [q.id]: value }
    setAnswers(newAnswers)
    // handle followup
    const f = q.followups?.[value]
    if (f) {
      setActiveFollowup(f)
      return
    }
    // advance to next base question
    setCurrentStep(prev => prev + 1)
  }

  const onToggleMulti = (q: FlowQuestion, value: string) => {
    const prev = (answers[q.id] as string[] | undefined) || []
    const exists = prev.includes(value)
    const next = exists ? prev.filter(v => v !== value) : [...prev, value]
    setAnswers({ ...answers, [q.id]: next })
  }

  const onNextFromMulti = () => {
    setCurrentStep(prev => prev + 1)
  }

  const onBack = () => {
    if (!inSchool) return
    // If answering a followup, go back to the base question
    if (activeFollowup) {
      setActiveFollowup(null)
      return
    }
    // If within the base sequence, step back one, or if at first question, go back to goal selection
    if (goal && sequence.length > 0) {
      if (currentStep > 0) {
        setCurrentStep(s => s - 1)
        return
      }
      // currentStep === 0 → back to goal selection
      setGoal(null)
      setSequence([])
      setAnswers({})
      setPresets(null)
      setCurrentStep(0)
      return
    }
    // If at goal selection, go back to the root school question
    if (inSchool && !goal) {
      setInSchool(null)
      setSequence([])
      setAnswers({})
      setPresets(null)
      setCurrentStep(0)
      setActiveFollowup(null)
      return
    }
  }

  const onAnswerFollowup = (fq: FlowQuestion, value: string) => {
    const newAnswers = { ...answers, [fq.id]: value }
    setAnswers(newAnswers)
    setActiveFollowup(null)
    setCurrentStep(prev => prev + 1)
  }

  const onComplete = () => {
    if (!inSchool || !goal) return
    // Determine order
    let order: Section[] | undefined
    try {
      const sectionOrder = presets?.sectionOrder
      if (Array.isArray(sectionOrder) && sectionOrder.length) {
        order = sectionOrder as Section[]
      }
    } catch {}
    if (!order) {
      const mapped = FALLBACK_MAPPING_TABLE.find(m => m.inSchool === inSchool && m.goal === goal)
      order = mapped?.sectionOrder || DEFAULT_CUSTOMIZATION.sectionOrder
    }
    ResumeStorage.saveRecommendedSectionOrder(order)
    ResumeStorage.saveOnboarding({
      inSchool,
      goal,
      steps: Object.entries(answers).map(([id, answer]) => ({ id, answer })),
      lengthHint: presets?.length_hint,
    })
    router.push('/resume-builder/templates')
  }

  const totalSteps = sequence.length + (activeFollowup ? 1 : 0)
  const currentQuestion: FlowQuestion | null = activeFollowup || sequence[currentStep] || null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 text-gray-800 font-outfit">
      {/* Header */}
      <div className="bg-white/30 border-gray-200 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold font-mattone">
                <span className="text-blue">
                  {mode === 'ask' ? 'Welcome' : 'Upload Your Resume'}
                </span>
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <span>Start</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span>Template</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span className="font-medium text-blue-600">Edit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {mode === 'ask' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 font-mattone mb-3 text-center">Do you have a resume to start with?</h2>
              <p className="text-gray-600 text-center mb-6">Answer a couple of quick questions and we'll help you set up.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onClick={() => setMode('upload')} className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition text-left">
                  <div className="flex items-center gap-3 mb-2"><Upload className="w-5 h-5 text-blue" /><span className="font-semibold">Yes, upload my resume</span></div>
                  <p className="text-sm text-gray-600">We’ll extract your details so you can edit instantly.</p>
                </button>
                <button onClick={() => setMode('school')} className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition text-left">
                  <div className="flex items-center gap-3 mb-2"><FileText className="w-5 h-5 text-orange-600" /><span className="font-semibold">No, help me start</span></div>
                  <p className="text-sm text-gray-600">Answer a couple of quick questions and we’ll get you set up.</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {mode === 'school' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8">
              {!inSchool && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 font-mattone mb-3 text-center">Are you currently in school?</h2>
                  <p className="text-gray-600 text-center mb-6">Choose the option that best describes you.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button onClick={() => selectInSchool('HS')} className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md transition text-left">
                      <div className="flex items-center gap-3"><School className="w-5 h-5 text-blue" /><span className="font-semibold">High School</span></div>
                    </button>
                    <button onClick={() => selectInSchool('UNI')} className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md transition text-left">
                      <div className="flex items-center gap-3"><GraduationCap className="w-5 h-5 text-blue" /><span className="font-semibold">College / University</span></div>
                    </button>
                    <button onClick={() => selectInSchool('Other')} className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md transition text-left">
                      <div className="flex items-center gap-3"><Building2 className="w-5 h-5 text-blue" /><span className="font-semibold">Other</span></div>
                    </button>
                    <button onClick={() => selectInSchool('No')} className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md transition text-left">
                      <div className="flex items-center gap-3"><Ban className="w-5 h-5 text-blue" /><span className="font-semibold">No</span></div>
                    </button>
                  </div>
                </>
              )}

              {inSchool && !goal && (
                <>
                  <button className="text-sm text-blue mb-4" onClick={onBack}>&larr; Back</button>
                  <h2 className="text-2xl font-bold text-gray-900 font-mattone mb-3 text-center">What's your current resume goal?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {goals.map((g) => (
                      <button key={g} onClick={() => selectGoal(g)} className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md transition text-left">
                        <div className="font-semibold">{g}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Deeper sequence after goal selection */}
              {inSchool && goal && currentQuestion && (
                <div className="mt-2">
                  <button className="text-sm text-blue mb-4" onClick={onBack}>&larr; Back</button>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold font-mattone">{currentQuestion.question}</h3>
                    <div className="text-sm text-gray-600">Step {Math.min(currentStep + 1, sequence.length)} of {sequence.length}</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQuestion.type === 'single' && currentQuestion.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => (activeFollowup ? onAnswerFollowup(currentQuestion, opt) : onSelectSingle(currentQuestion, opt))}
                        className={`p-4 rounded-xl border transition text-left ${answers[currentQuestion.id] === opt ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:shadow-md'}`}
                      >
                        <span className="font-medium">{opt}</span>
                      </button>
                    ))}
                    {currentQuestion.type === 'multi' && currentQuestion.options.map(opt => {
                      const selected = Array.isArray(answers[currentQuestion.id]) && (answers[currentQuestion.id] as string[]).includes(opt)
                      return (
                        <button
                          key={opt}
                          onClick={() => onToggleMulti(currentQuestion, opt)}
                          className={`p-4 rounded-xl border transition text-left ${selected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:shadow-md'}`}
                        >
                          <span className="font-medium">{opt}</span>
                        </button>
                      )
                    })}
                  </div>
                  {currentQuestion.type === 'multi' && (
                    <div className="mt-4 flex justify-end">
                      <button onClick={onComplete} className="px-4 py-2 rounded-lg bg-blue text-white font-semibold">Start</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {mode === 'upload' && !uploadedData && !isProcessing && (
          <>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8 mb-8">
              <PDFUpload 
                onParsed={handleParsed} 
                onError={handleError}
                className="w-full"
              />
            </div>

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
                    <div className="font-medium">Name</div>
                    <div>{uploadedData.personalInfo.name}</div>
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div>{uploadedData.personalInfo.email}</div>
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div>{uploadedData.personalInfo.phone}</div>
                  </div>
                  <div>
                    <div className="font-medium">Location</div>
                    <div>{uploadedData.personalInfo.location}</div>
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
  const experienceSection = extractSection(text, ['experience', 'work history', 'employment'])
  if (!experienceSection) return []
  return [{
    id: '1',
    order: 0,
    title: 'Previous Position',
    company: 'Company Name',
    startDate: '',
    endDate: '',
    location: '',
    bullets: [{ id: '1', text: 'Please edit this placeholder with your actual experience' }]
  }]
}

function parseEducation(text: string): ResumeData['education'] {
  const educationSection = extractSection(text, ['education', 'academic'])
  if (!educationSection) return []
  return [{
    id: '1',
    degree: 'Your Degree',
    school: 'Your School',
    startYear: '',
    endYear: '',
    coursework: [],
    honors: [],
    order: 0,
    gpa: ''
  }]
}

function parseSkills(text: string): string[] {
  const skillsSection = extractSection(text, ['skills', 'technical skills', 'competencies'])
  if (!skillsSection) return []
  return skillsSection.split(/[ ,\n]/).map(s => s.trim()).filter(Boolean).slice(0, 10)
}
