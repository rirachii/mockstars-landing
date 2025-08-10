import { ResumeData } from '@/lib/pdf'

export const STORAGE_KEYS = {
  RESUME_DATA: 'mockstars_resume_data',
  SELECTED_TEMPLATE: 'mockstars_selected_template',
  RESUME_PROGRESS: 'mockstars_resume_progress',
  TEMP_TEXT_DATA: 'mockstars_temp_text_data'
} as const

export const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: []
}

export const SAMPLE_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: "Your Name",
    title: "Your Professional Title",
    email: "your.email@example.com",
    phone: "(555) 123-4567",
    location: "City, State",
    linkedin: "linkedin.com/in/yourprofile",
    website: "yourwebsite.com"
  },
  summary: "Professional summary showcasing your experience, skills, and career objectives. This section should be 2-3 sentences highlighting your most relevant qualifications.",
  experience: [
    {
      title: "Your Job Title",
      company: "Company Name",
      startDate: "Jan 2022",
      endDate: "Present",
      location: "City, State",
      description: [
        "Quantified achievement that demonstrates impact and results",
        "Technical accomplishment showing relevant skills and expertise",
        "Leadership or collaboration example highlighting soft skills"
      ]
    },
    {
      title: "Previous Position",
      company: "Previous Company",
      startDate: "Jun 2020",
      endDate: "Dec 2021",
      location: "City, State",
      description: [
        "Measurable outcome or improvement you delivered",
        "Process optimization or efficiency gain you implemented"
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Your Field",
      school: "University Name",
      year: "2020",
      gpa: "3.8"
    }
  ],
  skills: [
    "Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5",
    "Skill 6", "Skill 7", "Skill 8", "Skill 9", "Skill 10"
  ],
  projects: [
    {
      name: "Notable Project",
      description: "Brief description of a significant project that demonstrates your skills and impact.",
      technologies: ["Technology 1", "Technology 2", "Technology 3"]
    }
  ]
}
// Helper functions for localStorage operations
export const ResumeStorage = {
  saveResumeData: (data: ResumeData) => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESUME_DATA, JSON.stringify(data))
    } catch (error) {
      console.warn('Failed to save resume data:', error)
    }
  },

  loadResumeData: (): ResumeData => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RESUME_DATA)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Merge with default to ensure all fields exist
        return { ...DEFAULT_RESUME_DATA, ...parsed }
      }
    } catch (error) {
      console.warn('Failed to load resume data:', error)
    }
    return { ...DEFAULT_RESUME_DATA }
  },

  saveTemplate: (templateId: string) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SELECTED_TEMPLATE, templateId)
    } catch (error) {
      console.warn('Failed to save template:', error)
    }
  },

  loadTemplate: (): string => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SELECTED_TEMPLATE) || 'modern'
    } catch (error) {
      console.warn('Failed to load template:', error)
      return 'modern'
    }
  },

  saveProgress: (step: string, completed: boolean) => {
    try {
      const current = ResumeStorage.loadProgress()
      current[step] = completed
      localStorage.setItem(STORAGE_KEYS.RESUME_PROGRESS, JSON.stringify(current))
    } catch (error) {
      console.warn('Failed to save progress:', error)
    }
  },

  loadProgress: (): Record<string, boolean> => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RESUME_PROGRESS)
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.warn('Failed to load progress:', error)
      return {}
    }
  },

  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.warn('Failed to clear storage:', error)
    }
  }
}
