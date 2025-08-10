'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Edit3, 
  Plus, 
  Trash2, 
  Save, 
  Download, 
  Eye, 
  EyeOff,
  Move,
  Type,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin
} from 'lucide-react'
import { ResumeData } from '@/lib/pdf'
import { cn } from '@/lib/utils'
import { TemplateType } from './pdf-templates'
import { TemplateCustomization } from '@/lib/template-customization'

interface LiveResumeEditorProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
  template?: TemplateType
  className?: string
  customization: TemplateCustomization
}

type EditingField = {
  section: string
  index?: number
  field: string
  subIndex?: number
} | null

export const LiveResumeEditor: React.FC<LiveResumeEditorProps> = ({
  data,
  onChange,
  template,
  className = '',
  customization
}) => {
  const [editingField, setEditingField] = useState<EditingField>(null)
  const [isEditMode, setIsEditMode] = useState(true)
  const [hoveredField, setHoveredField] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  // Focus input when editing starts
  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editingField])

  const handleFieldClick = (section: string, field: string, index?: number, subIndex?: number) => {
    if (!isEditMode) return
    setEditingField({ section, field, index, subIndex })
  }

  const handleFieldChange = (value: string) => {
    if (!editingField) return

    const newData = { ...data }
    const { section, field, index, subIndex } = editingField

    if (section === 'personalInfo') {
      newData.personalInfo = { ...newData.personalInfo, [field]: value }
    } else if (section === 'summary') {
      newData.summary = value
    } else if (section === 'experience' && typeof index === 'number') {
      const newExperience = [...newData.experience]
      if (field === 'description' && typeof subIndex === 'number') {
        newExperience[index].description[subIndex] = value
      } else {
        newExperience[index] = { ...newExperience[index], [field]: value }
      }
      newData.experience = newExperience
    } else if (section === 'education' && typeof index === 'number') {
      const newEducation = [...newData.education]
      newEducation[index] = { ...newEducation[index], [field]: value }
      newData.education = newEducation
    } else if (section === 'skills') {
      newData.skills = value.split(',').map(s => s.trim()).filter(Boolean)
    } else if (section === 'projects' && typeof index === 'number') {
      const newProjects = [...(newData.projects || [])]
      if (field === 'technologies') {
        newProjects[index].technologies = value.split(',').map(s => s.trim()).filter(Boolean)
      } else {
        newProjects[index] = { ...newProjects[index], [field]: value }
      }
      newData.projects = newProjects
    }

    onChange(newData)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      setEditingField(null)
    } else if (e.key === 'Escape') {
      setEditingField(null)
    }
  }

  const addExperience = () => {
    const newData = { ...data }
    newData.experience.push({
      title: 'New Position',
      company: 'Company Name',
      startDate: 'Start Date',
      endDate: 'End Date',
      location: 'Location',
      description: ['Add your achievements here']
    })
    onChange(newData)
  }

  const addEducation = () => {
    const newData = { ...data }
    newData.education.push({
      degree: 'Degree',
      school: 'School Name',
      year: 'Year',
      gpa: ''
    })
    onChange(newData)
  }

  const addProject = () => {
    const newData = { ...data }
    newData.projects = [...(newData.projects || []), {
      name: 'Project Name',
      description: 'Project description',
      technologies: ['Tech1', 'Tech2']
    }]
    onChange(newData)
  }

  const removeExperience = (index: number) => {
    const newData = { ...data }
    newData.experience = newData.experience.filter((_, i) => i !== index)
    onChange(newData)
  }

  const removeEducation = (index: number) => {
    const newData = { ...data }
    newData.education = newData.education.filter((_, i) => i !== index)
    onChange(newData)
  }

  const removeProject = (index: number) => {
    const newData = { ...data }
    newData.projects = (newData.projects || []).filter((_, i) => i !== index)
    onChange(newData)
  }

  const addDescriptionBullet = (expIndex: number) => {
    const newData = { ...data }
    newData.experience[expIndex].description.push('New achievement')
    onChange(newData)
  }

  const removeDescriptionBullet = (expIndex: number, bulletIndex: number) => {
    const newData = { ...data }
    newData.experience[expIndex].description = newData.experience[expIndex].description.filter((_, i) => i !== bulletIndex)
    onChange(newData)
  }

  const EditableField: React.FC<{
    value: string
    onChange: (value: string) => void
    className?: string
    multiline?: boolean
    placeholder?: string
    fieldKey: string
  }> = ({ value, onChange, className, multiline, placeholder, fieldKey }) => {
    const isEditing = editingField && 
      `${editingField.section}-${editingField.field}-${editingField.index}-${editingField.subIndex}` === fieldKey
    const isHovered = hoveredField === fieldKey

    if (isEditing) {
      const Component = multiline ? Textarea : Input
      return (
        <Component
          ref={inputRef as any}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setEditingField(null)}
          onKeyDown={handleKeyDown}
          className={cn("min-h-[inherit] resize-none border-0 p-0 bg-transparent", className)}
          placeholder={placeholder}
          rows={multiline ? 3 : undefined}
        />
      )
    }

    return (
      <div
        className={cn(
          "relative cursor-pointer transition-all duration-200",
          isEditMode && "hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-300 hover:outline-offset-1 rounded",
          className
        )}
        onClick={() => {
          const [section, field, index, subIndex] = fieldKey.split('-')
          handleFieldClick(section, field, index ? parseInt(index) : undefined, subIndex ? parseInt(subIndex) : undefined)
        }}
        onMouseEnter={() => isEditMode && setHoveredField(fieldKey)}
        onMouseLeave={() => setHoveredField(null)}
      >
        {value || placeholder}
        {isEditMode && isHovered && (
          <Edit3 className="absolute -top-1 -right-1 w-3 h-3 text-blue-600 bg-white rounded-full border border-blue-300" />
        )}
      </div>
    )
  }

  return (
    <div className={cn("bg-white shadow-lg rounded-lg overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsEditMode(!isEditMode)}
            variant={isEditMode ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-2"
          >
            {isEditMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {isEditMode ? 'Preview Mode' : 'Edit Mode'}
          </Button>
          
          {isEditMode && (
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Click any text to edit
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b-2 border-blue-600 pb-6 mb-8">
          <EditableField
            value={data.personalInfo.name}
            onChange={(value) => handleFieldChange(value)}
            className="text-4xl font-bold text-blue-600 mb-3"
            placeholder="Your Name"
            fieldKey="personalInfo-name"
          />
          
          <EditableField
            value={data.personalInfo.title}
            onChange={(value) => handleFieldChange(value)}
            className="text-xl text-gray-600 mb-4"
            placeholder="Your Professional Title"
            fieldKey="personalInfo-title"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <EditableField
                value={data.personalInfo.email}
                onChange={(value) => handleFieldChange(value)}
                placeholder="email@example.com"
                fieldKey="personalInfo-email"
              />
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <EditableField
                value={data.personalInfo.phone}
                onChange={(value) => handleFieldChange(value)}
                placeholder="(555) 123-4567"
                fieldKey="personalInfo-phone"
              />
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <EditableField
                value={data.personalInfo.location}
                onChange={(value) => handleFieldChange(value)}
                placeholder="City, State"
                fieldKey="personalInfo-location"
              />
            </div>
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                <EditableField
                  value={data.personalInfo.linkedin}
                  onChange={(value) => handleFieldChange(value)}
                  placeholder="LinkedIn URL"
                  fieldKey="personalInfo-linkedin"
                />
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <EditableField
                  value={data.personalInfo.website}
                  onChange={(value) => handleFieldChange(value)}
                  placeholder="Website URL"
                  fieldKey="personalInfo-website"
                />
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-blue-600 mb-3 uppercase border-b border-blue-600 pb-1">
              Professional Summary
            </h3>
            <EditableField
              value={data.summary}
              onChange={(value) => handleFieldChange(value)}
              className="text-gray-800 leading-relaxed"
              multiline
              placeholder="Write a compelling summary of your professional experience..."
              fieldKey="summary-summary"
            />
          </div>
        )}

        {/* Experience */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-blue-600 uppercase border-b border-blue-600 pb-1">
              Professional Experience
            </h3>
            {isEditMode && (
              <Button onClick={addExperience} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Position
              </Button>
            )}
          </div>

          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6 relative group">
              {isEditMode && (
                <Button
                  onClick={() => removeExperience(index)}
                  size="sm"
                  variant="ghost"
                  className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
              
              <div className="flex justify-between items-start mb-2">
                <EditableField
                  value={exp.title}
                  onChange={(value) => handleFieldChange(value)}
                  className="font-bold text-gray-800 text-lg"
                  placeholder="Job Title"
                  fieldKey={`experience-title-${index}`}
                />
                <div className="text-sm text-gray-600">
                  <EditableField
                    value={`${exp.startDate} - ${exp.endDate}`}
                    onChange={(value) => {
                      const [start, end] = value.split(' - ')
                      const newData = { ...data }
                      newData.experience[index].startDate = start || ''
                      newData.experience[index].endDate = end || ''
                      onChange(newData)
                    }}
                    placeholder="Start Date - End Date"
                    fieldKey={`experience-dates-${index}`}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mb-3">
                <EditableField
                  value={exp.company}
                  onChange={(value) => handleFieldChange(value)}
                  className="text-gray-700 font-medium"
                  placeholder="Company Name"
                  fieldKey={`experience-company-${index}`}
                />
                {exp.location && (
                  <EditableField
                    value={exp.location}
                    onChange={(value) => handleFieldChange(value)}
                    className="text-sm text-gray-600"
                    placeholder="Location"
                    fieldKey={`experience-location-${index}`}
                  />
                )}
              </div>

              <div className="space-y-2">
                {exp.description.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex items-start gap-2 group/bullet">
                    <span className="text-gray-800 mt-1">•</span>
                    <EditableField
                      value={bullet}
                      onChange={(value) => handleFieldChange(value)}
                      className="text-gray-800 leading-relaxed flex-1"
                      multiline
                      placeholder="Describe your achievement with specific metrics..."
                      fieldKey={`experience-description-${index}-${bulletIndex}`}
                    />
                    {isEditMode && (
                      <div className="opacity-0 group-hover/bullet:opacity-100 flex gap-1">
                        <Button
                          onClick={() => addDescriptionBullet(index)}
                          size="sm"
                          variant="ghost"
                          className="p-1 h-6 w-6"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        {exp.description.length > 1 && (
                          <Button
                            onClick={() => removeDescriptionBullet(index, bulletIndex)}
                            size="sm"
                            variant="ghost"
                            className="p-1 h-6 w-6 text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-blue-600 uppercase border-b border-blue-600 pb-1">
              Education
            </h3>
            {isEditMode && (
              <Button onClick={addEducation} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            )}
          </div>

          {data.education.map((edu, index) => (
            <div key={index} className="mb-4 relative group">
              {isEditMode && data.education.length > 1 && (
                <Button
                  onClick={() => removeEducation(index)}
                  size="sm"
                  variant="ghost"
                  className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
              
              <EditableField
                value={edu.degree}
                onChange={(value) => handleFieldChange(value)}
                className="font-bold text-gray-800"
                placeholder="Degree Name"
                fieldKey={`education-degree-${index}`}
              />
              <EditableField
                value={edu.school}
                onChange={(value) => handleFieldChange(value)}
                className="text-gray-700"
                placeholder="School Name"
                fieldKey={`education-school-${index}`}
              />
              <div className="flex justify-between text-sm text-gray-600">
                <EditableField
                  value={edu.year}
                  onChange={(value) => handleFieldChange(value)}
                  placeholder="Graduation Year"
                  fieldKey={`education-year-${index}`}
                />
                {edu.gpa && (
                  <EditableField
                    value={`GPA: ${edu.gpa}`}
                    onChange={(value) => {
                      const gpa = value.replace('GPA: ', '')
                      const newData = { ...data }
                      newData.education[index].gpa = gpa
                      onChange(newData)
                    }}
                    placeholder="GPA: 3.8"
                    fieldKey={`education-gpa-${index}`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-blue-600 mb-3 uppercase border-b border-blue-600 pb-1">
            Technical Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <EditableField
              value={data.skills.join(', ')}
              onChange={(value) => handleFieldChange(value)}
              className="text-gray-800"
              placeholder="Skill 1, Skill 2, Skill 3, ..."
              fieldKey="skills-skills"
            />
          </div>
          {isEditMode && (
            <p className="text-xs text-gray-500 mt-2">
              Separate skills with commas
            </p>
          )}
        </div>

        {/* Projects */}
        {(data.projects && data.projects.length > 0) && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-blue-600 uppercase border-b border-blue-600 pb-1">
                Notable Projects
              </h3>
              {isEditMode && (
                <Button onClick={addProject} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              )}
            </div>

            {data.projects.map((project, index) => (
              <div key={index} className="mb-6 relative group">
                {isEditMode && (
                  <Button
                    onClick={() => removeProject(index)}
                    size="sm"
                    variant="ghost"
                    className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
                
                <EditableField
                  value={project.name}
                  onChange={(value) => handleFieldChange(value)}
                  className="font-bold text-gray-800 mb-2"
                  placeholder="Project Name"
                  fieldKey={`projects-name-${index}`}
                />
                <EditableField
                  value={project.description}
                  onChange={(value) => handleFieldChange(value)}
                  className="text-gray-800 leading-relaxed mb-2"
                  multiline
                  placeholder="Project description highlighting your role and impact..."
                  fieldKey={`projects-description-${index}`}
                />
                <div className="text-gray-600 text-sm">
                  <strong>Technologies: </strong>
                  <EditableField
                    value={project.technologies.join(', ')}
                    onChange={(value) => handleFieldChange(value)}
                    placeholder="Technology 1, Technology 2, ..."
                    fieldKey={`projects-technologies-${index}`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Projects Section if none exist */}
        {isEditMode && (!data.projects || data.projects.length === 0) && (
          <div className="mb-8 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Add Projects Section</h3>
            <p className="text-gray-500 mb-4">Showcase your notable projects and side work</p>
            <Button onClick={addProject} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add First Project
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LiveResumeEditor
