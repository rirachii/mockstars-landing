'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, User, Briefcase, GraduationCap, Code2, FileText, ArrowLeft } from 'lucide-react'
import { ResumeData } from '@/lib/resume/resume-data'
import { Section } from '@/lib/resume/template-types'
import router from 'next/router'

interface ResumeFormProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
  onSave?: () => void
  className?: string
  activeSection?: 'personalInfo' | Section
  isLastSection?: boolean
  onPreview?: () => void
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ 
  data, 
  onChange, 
  onSave,
  className = '',
  activeSection,
  isLastSection,
  onPreview,
}) => {
  const updatePersonalInfo = (field: string, value: string | Array<{ id: string; label: string; url: string; icon?: string; order: number }>) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    })
  }

  const updateSummary = (value: string) => {
    onChange({ ...data, summary: value })
  }

  const updateExperience = (index: number, field: string, value: string | string[]) => {
    const newExperience = [...data.experience]
    // @ts-ignore
    newExperience[index] = { ...newExperience[index], [field]: value }
    onChange({ ...data, experience: newExperience })
  }

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        {
          id: `e${Date.now()}`,
          title: '',
          company: '',
          startDate: '',
          endDate: '',
          location: '',
          bullets: [{ id: `b${Date.now()}`, text: '' }],
          order: (data.experience.length || 0) + 1,
        }
      ]
    })
  }

  const removeExperience = (index: number) => {
    onChange({
      ...data,
      experience: data.experience.filter((_, i) => i !== index)
    })
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...data.education]
    // @ts-ignore
    newEducation[index] = { ...newEducation[index], [field]: value }
    onChange({ ...data, education: newEducation })
  }

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        { id: `ed${Date.now()}`, degree: '', school: '', startYear: '', endYear: '', gpa: '', coursework: [], honors: [], order: (data.education.length || 0) + 1 }
      ]
    })
  }

  const removeEducation = (index: number) => {
    onChange({
      ...data,
      education: data.education.filter((_, i) => i !== index)
    })
  }

  const updateSkills = (value: string) => {
    const skills = value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(name => ({ name }))
    onChange({ ...data, skills })
  }

  const updateProjects = (index: number, field: string, value: string | string[]) => {
    const newProjects = [...(data.projects || [])]
    if (field === 'technologies' && typeof value === 'string') {
      newProjects[index] = { 
        ...newProjects[index], 
        technologies: value.split(',').map(s => s.trim()).filter(Boolean)
      }
    } else {
      // @ts-ignore
      newProjects[index] = { ...newProjects[index], [field]: value }
    }
    onChange({ ...data, projects: newProjects })
  }

  const addProject = () => {
    onChange({
      ...data,
      projects: [
        ...(data.projects || []),
        { id: `p${Date.now()}`, name: '', description: '', technologies: [], highlights: [], order: ((data.projects || []).length) + 1 }
      ]
    })
  }

  const removeProject = (index: number) => {
    onChange({
      ...data,
      projects: (data.projects || []).filter((_, i) => i !== index)
    })
  }

  const addBullet = (expIndex: number) => {
    const newExperience = [...data.experience]
    const next = [...(newExperience[expIndex].bullets || [])]
    next.push({ id: `b${Date.now()}`, text: '' })
    newExperience[expIndex].bullets = next
    onChange({ ...data, experience: newExperience })
  }

  const updateBullet = (expIndex: number, bulletIndex: number, value: string) => {
    const newExperience = [...data.experience]
    const bullets = [...(newExperience[expIndex].bullets || [])]
    if (bullets[bulletIndex]) bullets[bulletIndex] = { ...bullets[bulletIndex], text: value }
    newExperience[expIndex].bullets = bullets
    onChange({ ...data, experience: newExperience })
  }

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    const newExperience = [...data.experience]
    const bullets = [...(newExperience[expIndex].bullets || [])].filter((_, i) => i !== bulletIndex)
    newExperience[expIndex].bullets = bullets
    onChange({ ...data, experience: newExperience })
  }

  // Certifications
  const addCertification = () => {
    onChange({
      ...data,
      certifications: [
        ...(data.certifications || []),
        { id: `c${Date.now()}`, name: '', issuer: '', date: '', credentialId: '', url: '', order: ((data.certifications || []).length) + 1 }
      ]
    })
  }
  const updateCertification = (index: number, field: string, value: string) => {
    const items = [...(data.certifications || [])]
    // @ts-ignore
    items[index] = { ...items[index], [field]: value }
    onChange({ ...data, certifications: items })
  }
  const removeCertification = (index: number) => {
    onChange({ ...data, certifications: (data.certifications || []).filter((_, i) => i !== index) })
  }

  // Awards
  const addAward = () => {
    onChange({
      ...data,
      awards: [
        ...(data.awards || []),
        { id: `a${Date.now()}`, name: '', issuer: '', date: '', description: '', order: ((data.awards || []).length) + 1 }
      ]
    })
  }
  const updateAward = (index: number, field: string, value: string) => {
    const items = [...(data.awards || [])]
    // @ts-ignore
    items[index] = { ...items[index], [field]: value }
    onChange({ ...data, awards: items })
  }
  const removeAward = (index: number) => {
    onChange({ ...data, awards: (data.awards || []).filter((_, i) => i !== index) })
  }

  // Publications
  const addPublication = () => {
    onChange({
      ...data,
      publications: [
        ...(data.publications || []),
        { id: `p${Date.now()}`, title: '', venue: '', date: '', url: '', order: ((data.publications || []).length) + 1 }
      ]
    })
  }
  const updatePublication = (index: number, field: string, value: string) => {
    const items = [...(data.publications || [])]
    // @ts-ignore
    items[index] = { ...items[index], [field]: value }
    onChange({ ...data, publications: items })
  }
  const removePublication = (index: number) => {
    onChange({ ...data, publications: (data.publications || []).filter((_, i) => i !== index) })
  }

  // Languages
  const addLanguage = () => {
    onChange({
      ...data,
      languages: [
        ...(data.languages || []),
        { name: '', level: 'B1' as const }
      ]
    })
  }
  const updateLanguage = (index: number, field: 'name'|'level', value: string) => {
    const items = [...(data.languages || [])]
    // @ts-ignore
    items[index] = { ...items[index], [field]: value }
    onChange({ ...data, languages: items })
  }
  const removeLanguage = (index: number) => {
    onChange({ ...data, languages: (data.languages || []).filter((_, i) => i !== index) })
  }

  // Volunteering
  const addVolunteering = () => {
    onChange({
      ...data,
      volunteering: [
        ...(data.volunteering || []),
        { id: `v${Date.now()}`, org: '', role: '', startDate: '', endDate: '', bullets: [], order: ((data.volunteering || []).length) + 1 }
      ]
    })
  }
  const updateVolunteering = (index: number, field: string, value: string) => {
    const items = [...(data.volunteering || [])]
    // @ts-ignore
    items[index] = { ...items[index], [field]: value }
    onChange({ ...data, volunteering: items })
  }
  const removeVolunteering = (index: number) => {
    onChange({ ...data, volunteering: (data.volunteering || []).filter((_, i) => i !== index) })
  }

  // Interests
  const updateInterests = (value: string) => {
    const interests = value.split(',').map(s => s.trim()).filter(Boolean)
    onChange({ ...data, interests })
  }

  const shouldShow = (key: 'personalInfo' | Section) => {
    if (!activeSection) return true
    return activeSection === key
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Personal Information */}
      {shouldShow('personalInfo') && (
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              value={data.personalInfo.name}
              onChange={(e) => updatePersonalInfo('name', e.target.value)}
            />
            <Input
              placeholder="Professional Title"
              value={data.personalInfo.title}
              onChange={(e) => updatePersonalInfo('title', e.target.value)}
            />
            <Input
              placeholder="Email Address"
              type="email"
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
            />
            <Input
              placeholder="Phone Number"
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            />
            <Input
              placeholder="Location (City, State)"
              value={data.personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
            />
            <Input
              placeholder="Links (comma-separated URLs)"
              value={(data.personalInfo.links || []).map(link => link.url).join(', ')}
              onChange={(e) => {
                const urls = e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                const links = urls.map((url, i) => ({ id: `l${i+1}`, label: url, url, order: i + 1 }))
                updatePersonalInfo('links', links)
              }}  
            />
          </div>
        </div>
      )}

      {/* Education */}
      {shouldShow('education') && (
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Education</h3>
            </div>
            <Button onClick={addEducation} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>
          {data.education.map((edu, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
                {data.education.length > 1 && (
                  <Button 
                    onClick={() => removeEducation(index)} 
                    variant="ghost" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Degree (e.g., Bachelor of Science)"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                />
                <Input
                  placeholder="School/University"
                  value={edu.school}
                  onChange={(e) => updateEducation(index, 'school', e.target.value)}
                />
                <Input
                  placeholder="Start Year"
                  value={edu.startYear || ''}
                  onChange={(e) => updateEducation(index, 'startYear', e.target.value)}
                />
                <Input
                  placeholder="End Year"
                  value={edu.endYear || ''}
                  onChange={(e) => updateEducation(index, 'endYear', e.target.value)}
                />
                <Input
                  placeholder="GPA (optional)"
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Professional Summary */}
      {shouldShow('summary') && (
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Professional Summary</h3>
          </div>
          <Textarea
            placeholder="Write a compelling 2-3 sentence summary highlighting your experience, skills, and career objectives..."
            value={data.summary}
            onChange={(e) => updateSummary(e.target.value)}
            rows={3}
          />
        </div>
      )}

      {/* Skills */}
      {shouldShow('skills') && (
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
          </div>
          <Textarea
            placeholder="Enter your skills separated by commas (e.g., JavaScript, React, Node.js, Python, AWS, Docker...)"
            value={(data.skills || []).map(s => s.name).join(', ')}
            onChange={(e) => updateSkills(e.target.value)}
            rows={3}
          />
          <p className="text-sm text-gray-500 mt-2">
            Separate skills with commas. Include technical skills, tools, programming languages, and relevant soft skills.
          </p>
        </div>
      )}

      {/* Projects */}
      {shouldShow('projects') && (
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
            </div>
            <Button onClick={addProject} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
          {(data.projects || []).map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Project {index + 1}</h4>
                <Button 
                  onClick={() => removeProject(index)} 
                  variant="ghost" 
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <Input
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) => updateProjects(index, 'name', e.target.value)}
                />
                <Textarea
                  placeholder="Project description highlighting your role, challenges solved, and impact..."
                  value={project.description || ''}
                  onChange={(e) => updateProjects(index, 'description', e.target.value)}
                  rows={3}
                />
                <Input
                  placeholder="Technologies used (comma-separated)"
                  value={(project.technologies || []).join(', ')}
                  onChange={(e) => updateProjects(index, 'technologies', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {shouldShow('experience') && (
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
            </div>
            <Button onClick={addExperience} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Position
            </Button>
          </div>
          {data.experience.map((exp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Position {index + 1}</h4>
                {data.experience.length > 0 && (
                  <Button 
                    onClick={() => removeExperience(index)} 
                    variant="ghost" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) => updateExperience(index, 'title', e.target.value)}
                />
                <Input
                  placeholder="Company Name"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                />
                <Input
                  placeholder="Start Date (YYYY-MM or e.g., Jan 2022)"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                />
                <Input
                  placeholder="End Date (YYYY-MM or Present)"
                  value={exp.endDate || ''}
                  onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Input
                  placeholder="Location (optional)"
                  value={exp.location || ''}
                  onChange={(e) => updateExperience(index, 'location', e.target.value)}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Impact Bullets</label>
                  <Button 
                    onClick={() => addBullet(index)} 
                    variant="ghost" 
                    size="sm"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Point
                  </Button>
                </div>
                {(exp.bullets || []).map((b, bulletIndex) => (
                  <div key={b.id} className="flex gap-2 mb-2">
                    <Textarea
                      placeholder="Describe your achievement with specific metrics and impact..."
                      value={b.text}
                      onChange={(e) => updateBullet(index, bulletIndex, e.target.value)}
                      rows={2}
                      className="flex-1"
                    />
                    {(exp.bullets || []).length > 1 && (
                      <Button
                        onClick={() => removeBullet(index, bulletIndex)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 self-start"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {shouldShow('certifications') && (
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
            <Button onClick={addCertification} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Certification
            </Button>
          </div>
          {(data.certifications || []).map((c, index) => (
            <div key={c.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input placeholder="Name" value={c.name} onChange={(e) => updateCertification(index, 'name', e.target.value)} />
              <Input placeholder="Issuer" value={c.issuer || ''} onChange={(e) => updateCertification(index, 'issuer', e.target.value)} />
              <Input placeholder="Date" value={c.date || ''} onChange={(e) => updateCertification(index, 'date', e.target.value)} />
              <Input placeholder="Credential ID" value={c.credentialId || ''} onChange={(e) => updateCertification(index, 'credentialId', e.target.value)} />
              <div className="flex gap-2">
                <Input className="flex-1" placeholder="URL" value={c.url || ''} onChange={(e) => updateCertification(index, 'url', e.target.value)} />
                <Button onClick={() => removeCertification(index)} variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {shouldShow('awards') && (
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Awards</h3>
            <Button onClick={addAward} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Award
            </Button>
          </div>
          {(data.awards || []).map((a, index) => (
            <div key={a.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input placeholder="Name" value={a.name} onChange={(e) => updateAward(index, 'name', e.target.value)} />
              <Input placeholder="Issuer" value={a.issuer || ''} onChange={(e) => updateAward(index, 'issuer', e.target.value)} />
              <Input placeholder="Date" value={a.date || ''} onChange={(e) => updateAward(index, 'date', e.target.value)} />
              <div className="flex gap-2 md:col-span-2">
                <Textarea className="flex-1" placeholder="Description (optional)" value={a.description || ''} onChange={(e) => updateAward(index, 'description', e.target.value)} rows={2} />
                <Button onClick={() => removeAward(index)} variant="ghost" size="sm" className="text-red-600 hover:text-red-700 self-start">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {shouldShow('languages') && (
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
            <Button onClick={addLanguage} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Language
            </Button>
          </div>
          {(data.languages || []).map((l, index) => (
            <div key={`${l.name}-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input placeholder="Language" value={l.name} onChange={(e) => updateLanguage(index, 'name', e.target.value)} />
              <select className="border border-gray-300 bg-white rounded-md px-2 py-2" value={l.level} onChange={(e) => updateLanguage(index, 'level', e.target.value)}>
                {['A1','A2','B1','B2','C1','C2','Native'].map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <div className="md:col-span-2">
                <Button onClick={() => removeLanguage(index)} variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" /> Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Publications */}
      {shouldShow('publications') && (
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Publications</h3>
            <Button onClick={addPublication} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Publication
            </Button>
          </div>
          {(data.publications || []).map((p, index) => (
            <div key={p.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input placeholder="Title" value={p.title} onChange={(e) => updatePublication(index, 'title', e.target.value)} />
              <Input placeholder="Venue (e.g., Conference/Journal)" value={p.venue || ''} onChange={(e) => updatePublication(index, 'venue', e.target.value)} />
              <Input placeholder="Date" value={p.date || ''} onChange={(e) => updatePublication(index, 'date', e.target.value)} />
              <div className="flex gap-2">
                <Input className="flex-1" placeholder="URL" value={p.url || ''} onChange={(e) => updatePublication(index, 'url', e.target.value)} />
                <Button onClick={() => removePublication(index)} variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Volunteering */}
      {shouldShow('volunteering') && (
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Volunteering</h3>
            <Button onClick={addVolunteering} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Role
            </Button>
          </div>
          {(data.volunteering || []).map((v, index) => (
            <div key={v.id} className="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input placeholder="Organization" value={v.org} onChange={(e) => updateVolunteering(index, 'org', e.target.value)} />
                <Input placeholder="Role" value={v.role} onChange={(e) => updateVolunteering(index, 'role', e.target.value)} />
                <Input placeholder="Start Date" value={v.startDate} onChange={(e) => updateVolunteering(index, 'startDate', e.target.value)} />
                <Input placeholder="End Date" value={v.endDate || ''} onChange={(e) => updateVolunteering(index, 'endDate', e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Highlights</label>
                {/* Simple single text area list for brevity */}
                <Textarea
                  placeholder=" Describe your contribution, impact, and outcomes..."
                  value={(v.bullets || []).join('\n')}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n')
                    updateVolunteering(index, 'bullets', lines as any)
                  }}
                  rows={3}
                />
              </div>
              <div className="mt-2">
                <Button onClick={() => removeVolunteering(index)} variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" /> Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interests */}
      {shouldShow('interests') && (
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests</h3>
          <Textarea
            placeholder="Enter interests separated by commas (e.g., Trail running, Synthwave, Coffee)"
            value={(data.interests || []).join(', ')}
            onChange={(e) => updateInterests(e.target.value)}
            rows={2}
          />
        </div>
      )}
    </div>
  )
}
