'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, User, Briefcase, GraduationCap, Code2, FileText } from 'lucide-react'
import { ResumeData } from '@/lib/resume/resume-data'

interface ResumeFormProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
  onSave?: () => void
  className?: string
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ 
  data, 
  onChange, 
  onSave,
  className = '' 
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

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Personal Information */}
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

      

      {/* Work Experience */}
      {/* <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
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
              {data.experience.length > 1 && (
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
                placeholder="Start Date (e.g., Jan 2022)"
                value={exp.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
              />
              <Input
                placeholder="End Date (e.g., Present)"
                value={exp.endDate}
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
                <label className="text-sm font-medium text-gray-700">Key Achievements</label>
                <Button 
                  onClick={() => addDescriptionBullet(index)} 
                  variant="ghost" 
                  size="sm"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Point
                </Button>
              </div>
              {exp.description.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex gap-2 mb-2">
                  <Textarea
                    placeholder="Describe your achievement with specific metrics and impact..."
                    value={bullet}
                    onChange={(e) => updateDescriptionBullet(index, bulletIndex, e.target.value)}
                    rows={2}
                    className="flex-1"
                  />
                  {exp.description.length > 1 && (
                    <Button
                      onClick={() => removeDescriptionBullet(index, bulletIndex)}
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
      </div> */}

      {/* Education */}
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

      {/* Professional Summary */}
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

      {/* Skills */}
      {/* <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
        </div>
        <Textarea
          placeholder="Enter your skills separated by commas (e.g., JavaScript, React, Node.js, Python, AWS, Docker...)"
          value={data.skills.join(', ')}
          onChange={(e) => updateSkills(e.target.value)}
          rows={3}
        />
        <p className="text-sm text-gray-500 mt-2">
          Separate skills with commas. Include technical skills, tools, programming languages, and relevant soft skills.
        </p>
      </div> */}

      {/* Projects */}
      {/* <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Projects (Optional)</h3>
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
                value={project.description}
                onChange={(e) => updateProjects(index, 'description', e.target.value)}
                rows={3}
              />
              <Input
                placeholder="Technologies used (comma-separated)"
                value={project.technologies.join(', ')}
                onChange={(e) => updateProjects(index, 'technologies', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div> */}

      {/* Save Button */}
      {/* {onSave && (
        <div className="flex justify-end">
          <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
            Save Resume Data
          </Button>
        </div>
      )} */}
    </div>
  )
}
