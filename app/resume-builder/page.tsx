'use client';
export const runtime = 'edge';
export const fetchCache = 'force-no-store';
import React from 'react';
import NextDynamic from 'next/dynamic';
import { TemplateSelector } from '@/components/resume/template-selector';
import { TemplateType } from '@/components/resume/pdf-templates';
import { Button } from '@/components/ui/button';
import { extractResumeData as extractResumeDataLite } from '@/lib/pdf/parser-lite';
import { CheckCircle2, Plus } from 'lucide-react';

const PDFUpload = NextDynamic(() => import('@/components/resume/pdf-upload').then(m => m.PDFUpload), { ssr: false });
const PDFGenerator = NextDynamic(() => import('@/components/resume/pdf-generator').then(m => m.PDFGenerator), { ssr: false });

export default function ResumeBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = React.useState<TemplateType>('modern');
  const [showUpload, setShowUpload] = React.useState(true);
  const [showTextInput, setShowTextInput] = React.useState(false);
  const [creationStep, setCreationStep] = React.useState<1 | 2>(1);
  const [freeText, setFreeText] = React.useState('');
  const [isParsingText, setIsParsingText] = React.useState(false);
  const [textError, setTextError] = React.useState<string | null>(null);
  const [showTemplatesOnly, setShowTemplatesOnly] = React.useState(false);

  // Sample resume data - this would be managed by your form state
  const [resumeData, setResumeData] = React.useState({
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      linkedin: ""
    },
    summary: "",
    experience: [
      {
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        location: "",
        description: [""]
      }
    ],
    education: [
      {
        degree: "",
        school: "",
        field: "",
        year: "",
        details: ""
      }
    ],
    skills: ["Skill 1", "Skill 2", "Skill 3"]
  });

  const coverage = React.useMemo(() => {
    const t = freeText.toLowerCase();
    const hasContact = Boolean(resumeData.personalInfo.name && resumeData.personalInfo.email);
    const hasExperience = /(worked|experience|engineer|manager|developer|at\s+\w+|responsible for|led|built|managed)/.test(t);
    const hasDates = /(\b20\d{2}\b|\b19\d{2}\b|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/.test(t);
    const hasEducation = /(university|college|bachelor|master|degree|school)/.test(t) || Boolean(resumeData.education?.[0]?.degree || resumeData.education?.[0]?.school);
    const hasSkills = /(skills?:|proficient|expert|familiar|\bjs\b|react|python|sql|java|aws|azure|docker|kubernetes)/.test(t);
    const hasSummary = /(i am|i'm|seasoned|motivated|seeking|summary|profile)/.test(t);
    const hasCerts = /(certification|certified|pmp|aws|azure|gcp|security\+|license)/.test(t);
    const sections = {
      contact: hasContact,
      experience: hasExperience && hasDates,
      education: hasEducation,
      skills: hasSkills,
      summary: hasSummary,
      certifications: hasCerts,
    } as const;
    const count = Object.values(sections).filter(Boolean).length;
    const total = Object.values(sections).length;
    const percent = Math.round((count / total) * 100);
    return { sections, count, total, percent };
  }, [freeText, resumeData.personalInfo.name, resumeData.personalInfo.email, resumeData.education]);

  const templates: Record<string, string> = {
    summary: "I'm a [TITLE] with [X] years of experience in [AREAS]. I love [WHAT YOU DO] and I'm strongest at [TOP SKILLS]. Recent wins: [IMPACT METRICS].",
    experience: "From [START MONTH/YEAR] to [END MONTH/YEAR], [JOB TITLE] at [COMPANY] in [CITY]. I led [TEAM/SCOPE] and accomplished [RESULT] by [ACTION]. Another win: [RESULT] by [ACTION].",
    education: "Graduated [MONTH/YEAR] with a [DEGREE] in [FIELD] from [SCHOOL], [LOCATION]. Relevant coursework: [COURSES].",
    skills: "Skills: [SKILL 1], [SKILL 2], [SKILL 3], [SKILL 4], [SKILL 5].",
    certifications: "Certifications: [CERT NAME] ([YEAR]), [CERT NAME] ([YEAR]).",
  };

  const appendTemplate = (key: keyof typeof templates) => {
    setFreeText(prev => (prev ? prev + '\n\n' : '') + templates[key]);
  };

  function deriveEducationFromText(text: string): Array<{ degree: string; school: string; year: string }> {
    const results: Array<{ degree: string; school: string; year: string }> = [];
    const chunks = text
      .split(/\n|[.;]+/)
      .map(s => s.trim())
      .filter(Boolean);

    const degreeRegex = /(Bachelor(?:'s)?|Master(?:'s)?|Associate(?:'s)?|B\.\s?S\.?|BSc|B\.A\.?|BA|M\.\s?S\.?|MSc|M\.A\.?|MA|MBA|Ph\.\s?D\.?|PhD)/i;
    const schoolRegex = /([A-Z][A-Za-z&.'-]+(?:\s[A-Z][A-Za-z&.'-]+)*\s(?:University|College|Institute|School|Academy|Polytechnic|Conservatory|Institute of Technology))/;
    const yearRegex = /(20\d{2}|19\d{2})/;

    for (const line of chunks) {
      if (!degreeRegex.test(line)) continue;
      const degreeMatch = line.match(degreeRegex);
      const schoolMatch = line.match(schoolRegex);
      const yearMatch = line.match(yearRegex);

      const degree = degreeMatch?.[0]?.replace(/\s+/g, ' ').trim() || '';
      const school = schoolMatch?.[1]?.trim() || '';
      const year = yearMatch?.[1] || '';
      if (degree || school || year) {
        const key = `${degree}|${school}|${year}`;
        if (!results.some(r => `${r.degree}|${r.school}|${r.year}` === key)) {
          results.push({ degree, school, year });
        }
      }
    }

    return results.slice(0, 3);
  }

  const handleGenerateFromText = async () => {
    if (!freeText.trim()) {
      setTextError('Please paste or type something about your background.');
      return;
    }
    setIsParsingText(true);
    setTextError(null);
    try {
      const extracted: any = extractResumeDataLite(freeText);
      const educationParsed = deriveEducationFromText(
        [extracted?.sections?.education, freeText].filter(Boolean).join('\n')
      );
      setResumeData(prev => {
        const shouldOverrideEducation = (
          (prev.education?.[0]?.degree === '' || !prev.education?.[0]?.degree) &&
          (prev.education?.[0]?.school === '' || !prev.education?.[0]?.school) &&
          (prev.education?.[0]?.year === '' || !prev.education?.[0]?.year) &&
          !prev.education?.[0]?.field && !prev.education?.[0]?.details
        );
        return ({
          ...prev,
          // Keep user's contact inputs as source of truth
          summary: extracted?.sections?.summary || prev.summary,
          education: educationParsed.length && shouldOverrideEducation
            ? educationParsed.map(e => ({ degree: e.degree || 'Degree', school: e.school || 'School', field: '', year: e.year || '', details: '' }))
            : prev.education,
        });
      });
      setShowUpload(false);
      setShowTextInput(false);
      setCreationStep(2);
      setShowTemplatesOnly(true);
    } catch (e) {
      setTextError('Sorry, we could not understand that. Please try adding more details.');
    } finally {
      setIsParsingText(false);
    }
  }

  return (
    <div className="min-h-screen text-gray-800 font-outfit">
      {/* Header */}
      <div className="bg-white/30 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-xl md:text-2xl font-bold font-mattone">
            <span className="text-blue">Mockstars Resume Builder</span>
          </h1>
          {/* <p className="mt-2 text-gray-700">
            Create a professional resume in minutes with our AI-powered templates
          </p> */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Form and Upload */}
          <div className="col-span-4 space-y-16">

            {/* Upload Section */}
            {showUpload && (
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6">
                <div className="flex flex-col gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 font-mattone">
                    {showTextInput ? 'Step 1 — Bring your story' : 'Step 1 — Upload your resume'}
                  </h2>
                </div>
                {!showTextInput ? (
                  <PDFUpload
                    onParsed={(data) => {
                      console.log('Parsed resume:', data);
                      // Process parsed data and move to next step
                      setShowUpload(false);
                    }}
                    onError={(error) => {
                      console.error('Upload error:', error);
                    }}
                  />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-gray-900 font-mattone">{creationStep === 1 ? 'Contact & Education' : 'Guided brain dump'}</h3>
                        <div className="text-sm text-gray-600">Coverage: <span className="font-semibold text-blue">{coverage.percent}%</span></div>
                      </div>
                      {/* Step 1: Contact + Education */}
                      {creationStep === 1 && (
                        <>
                        <div className="mb-4 p-4 rounded-xl border border-gray-200 bg-white/70">
                          <div className="font-semibold mb-3">Contact details</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="Full name"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={resumeData.personalInfo.name}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, name: e.target.value }
                              }))}
                            />
                            <input
                              type="email"
                              placeholder="Email"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={resumeData.personalInfo.email}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, email: e.target.value }
                              }))}
                            />
                            <input
                              type="tel"
                              placeholder="Phone"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={resumeData.personalInfo.phone}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, phone: e.target.value }
                              }))}
                            />
                            <input
                              type="text"
                              placeholder="City, State"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={resumeData.personalInfo.location}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, location: e.target.value }
                              }))}
                            />
                            <input
                              type="url"
                              placeholder="LinkedIn URL (optional)"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                              value={resumeData.personalInfo.linkedin}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                              }))}
                            />
                          </div>
                        </div>
                        {/* Education quick section */}
                        <div className="mb-4 p-4 rounded-xl border border-gray-200 bg-white/70">
                          <div className="font-semibold mb-3">Education</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="School / University"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={resumeData.education[0].school}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                education: [{ ...prev.education[0], school: e.target.value }]
                              }))}
                            />
                            <input
                              type="text"
                              placeholder="Degree (e.g., B.S.)"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={resumeData.education[0].degree}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                education: [{ ...prev.education[0], degree: e.target.value }]
                              }))}
                            />
                            <input
                              type="text"
                              placeholder="Field of Study (optional)"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={resumeData.education[0].field || ''}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                education: [{ ...prev.education[0], field: e.target.value }]
                              }))}
                            />
                            <input
                              type="text"
                              placeholder="Graduation Year"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={resumeData.education[0].year}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                education: [{ ...prev.education[0], year: e.target.value }]
                              }))}
                            />
                            <textarea
                              placeholder="Relevant coursework, honors, scholarships (optional)"
                              className="md:col-span-2 w-full min-h-20 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={resumeData.education[0].details || ''}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                education: [{ ...prev.education[0], details: e.target.value }]
                              }))}
                            />
                          </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                          <Button onClick={() => setCreationStep(2)} className="bg-blue hover:bg-blue/90 text-white px-6 py-3 text-base md:text-lg rounded-lg">
                            Next
                          </Button>
                        </div>
                        </>
                      )}

                      {/* Step 2: Brain dump */}
                      {creationStep === 2 && (
                        <>
                        <div className="mb-3 text-lg leading-relaxed text-gray-800">
                          Tell us everything — run-on sentences welcome. We’ll parse it into a polished resume you can edit.
                        </div>
                        {/* Tips moved under intro */}
                        <div className="p-4 rounded-xl border border-gray-200 bg-white/70 mb-3">
                          <div className="font-semibold mb-1">Tips</div>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                            <li>Quantify results (%, $, time saved).</li>
                            <li>Mention tools/tech (React, AWS, SQL).</li>
                            <li>Newest experience first.</li>
                          </ul>
                        </div>
                        <textarea
                          value={freeText}
                          onChange={(e) => setFreeText(e.target.value)}
                          placeholder="Start with experience wins → skills → certifications. Include dates and impact metrics when you can."
                          className="w-full min-h-72 md:min-h-80 rounded-xl border-2 border-gray-300 px-4 py-3 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {textError && <p className="text-sm text-red-600 mt-2">{textError}</p>}
                        <div className="mt-6 flex justify-end gap-3">
                          <Button variant="outline" onClick={() => setCreationStep(1)} className="px-6 py-3 text-base md:text-lg rounded-lg">Back</Button>
                          <Button onClick={handleGenerateFromText} className="bg-blue hover:bg-blue/90 text-white px-6 py-3 text-base md:text-lg rounded-lg" disabled={isParsingText}>
                            {isParsingText ? 'Analyzing...' : 'Generate from text'}
                          </Button>
                        </div>
                        </>
                      )}
                    </div>
                    <div className="lg:col-span-1">
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl border border-gray-200 bg-white/70">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">Checklist</h4>
                            <span className="text-xs text-gray-500">Make sure you hit these</span>
                          </div>
                          <ul className="space-y-2 text-sm">
                            {[
                              { key: 'contact', label: 'Contact (email, phone, city)' },
                              { key: 'experience', label: 'Experience with dates + impact' },
                              { key: 'education', label: 'Education' },
                              { key: 'skills', label: 'Skills (comma-separated)' },
                              { key: 'summary', label: '1–2 line professional summary' },
                              { key: 'certifications', label: 'Certifications (optional)' },
                            ].map(item => (
                              <li key={item.key} className="flex items-center gap-2">
                                <CheckCircle2 className={`w-4 h-4 ${coverage.sections[item.key as keyof typeof coverage.sections] ? 'text-green-600' : 'text-gray-300'}`} />
                                <span className={coverage.sections[item.key as keyof typeof coverage.sections] ? 'text-gray-800' : 'text-gray-500'}>{item.label}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {creationStep === 2 && (
                          <div className="p-4 rounded-xl border border-blue/20 bg-blue/5">
                            <div className="font-semibold mb-2">Quick inserts</div>
                            <div className="space-y-2">
                              {(['summary','experience','education','skills','certifications'] as const).map((k) => (
                                <Button key={k} variant="outline" className="w-full justify-start" onClick={() => appendTemplate(k)}>
                                  <Plus className="w-4 h-4 mr-2" /> Insert {k}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* Big switch CTA below upload to enter text mode */}
                {!showTextInput && (
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      className="w-full bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 py-4 text-base md:text-lg"
                      onClick={() => {
                        setShowTextInput(true);
                        setCreationStep(1);
                      }}
                    >
                      Or create from text input
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Template Selection (only) after Generate-from-text, or after upload handling if you choose to gate similarly) */}
            {showTemplatesOnly && (
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6">
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onTemplateSelect={setSelectedTemplate}
                />
              </div>
            )}

            {/* Resume Form (hidden when templates-only mode) */}
            {!showUpload && !showTemplatesOnly && (
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6">
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

                  <div className="p-4 bg-blue/5 rounded-lg border border-blue/10">
                    <p className="text-sm text-blue-900">
                      💡 Complete resume form components would be implemented here, including:
                    </p>
                    <ul className="text-sm text-blue-800 mt-2 space-y-1">
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
            )}
          </div>

          {/* Right Column - Preview and Download (hidden when templates-only mode) */}
          {!showUpload && !showTemplatesOnly && (
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Preview & Download
                  </h2>

                  <PDFGenerator
                    resumeData={resumeData}
                    template={selectedTemplate}
                    showPreview={false}
                  />

                  <div className="mt-6 p-4 bg-blue/5 rounded-lg border border-blue/10">
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
          )}
        </div>
      </div>
    </div>
  );
}
