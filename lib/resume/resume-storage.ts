import { ResumeData } from '@/lib/resume/resume-data'
import { Section } from '@/lib/resume/template-types'

export const STORAGE_KEYS = {
  RESUME_DATA: 'mockstars_resume_data',
  SELECTED_TEMPLATE: 'mockstars_selected_template',
  RESUME_PROGRESS: 'mockstars_resume_progress',
  TEMP_TEXT_DATA: 'mockstars_temp_text_data',
  ONBOARDING: 'mockstars_onboarding',
  RECOMMENDED_SECTION_ORDER: 'mockstars_recommended_section_order'
} as const

export const DEFAULT_RESUME_DATA: ResumeData = {
  id: "default",
  personalInfo: {
    name: "",
    title: "",
    email: "",
    location: "",
  },
  summary: "",
  experience: [],
  projects: [],
  education: [],
  skills: [],
  certifications: [],
  awards: [],
  languages: [],
  interests: [],
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
} 

export const DemoResume: ResumeData = {
  id: "demo",
  personalInfo: {
    name: "Alex Kim",
    title: "Software Engineer",
    email: "alex@example.com",
    location: "New York, NY",
    links: [
      { id: "l1", label: "LinkedIn", url: "https://linkedin.com/in/example", order: 1 },
      { id: "l2", label: "GitHub", url: "https://github.com/example", order: 2 },
    ],
  },
  summary:
    "Software engineer with 5+ years building data-intensive web apps. Led projects improving latency by 35% and onboarding by 20%. Passionate about clean architecture and mentoring.",
  experience: [
    {
      id: "e1",
      title: "Senior Software Engineer",
      company: "Acme Co",
      location: "Remote",
      startDate: "2022-06",
      isCurrent: true,
      bullets: [
        { id: "b1", text: "Designed and shipped event-driven ETL pipeline handling 1B+ events/mo", impact: { value: 1.2, unit: "s", baseline: 2.0 } },
        { id: "b2", text: "Cut P95 latency by 35% through query tuning and caching" },
        { id: "b3", text: "Mentored 3 engineers; introduced RFC process and code health KPIs" },
      ],
      technologies: ["TypeScript", "PostgreSQL", "Kafka", "GCP"],
      order: 1,
    },
    {
      id: "e0",
      title: "Software Engineer",
      company: "Globex",
      location: "NYC",
      startDate: "2019-08",
      endDate: "2022-05",
      bullets: [
        { id: "b4", text: "Built internal component library adopted by 6 teams" },
        { id: "b5", text: "Improved onboarding docs reducing ramp time by 20%" },
      ],
      technologies: ["React", "Node.js", "GraphQL"],
      order: 2,
    },
  ],
  projects: [
    {
      id: "p1",
      name: "Realtime Dashboard",
      role: "Lead",
      description: "Streaming metrics dashboard for ops teams",
      highlights: [
        "WebSocket fanout to 5k concurrent clients",
        "Accessible and keyboard navigable components",
      ],
      technologies: ["Vite", "React", "WebSocket"],
      links: [{ label: "Repo", url: "https://github.com/example/repo" }],
      order: 1,
    },
  ],
  education: [
    {
      id: "ed1",
      degree: "B.S. Computer Science",
      school: "State University",
      startYear: "2015",
      endYear: "2019",
      gpa: "3.8/4.0",
      honors: ["Dean's List"],
      order: 1,
    },
  ],
  skills: [
    { name: "TypeScript", category: "Frontend" },
    { name: "React", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "PostgreSQL", category: "Data" },
    { name: "Kafka", category: "Data" },
  ],
  certifications: [
    { id: "c1", name: "AWS SAA", issuer: "Amazon", date: "2024", order: 1 },
  ],
  awards: [
    { id: "a1", name: "Engineering Excellence", issuer: "Acme Co", date: "2023", description: "For leading reliability improvements", order: 1 },
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "B2" },
  ],
  interests: ["Trail running", "Synthwave", "Coffee"],
  metadata: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
};

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

  saveOnboarding: (data: { inSchool: 'HS'|'UNI'|'Other'|'No'; goal?: string }) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ONBOARDING, JSON.stringify(data))
    } catch (error) {
      console.warn('Failed to save onboarding:', error)
    }
  },

  loadOnboarding: (): { inSchool?: 'HS'|'UNI'|'Other'|'No'; goal?: string } => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ONBOARDING)
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.warn('Failed to load onboarding:', error)
      return {}
    }
  },

  saveRecommendedSectionOrder: (order: Section[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECOMMENDED_SECTION_ORDER, JSON.stringify(order))
    } catch (error) {
      console.warn('Failed to save section order:', error)
    }
  },

  loadRecommendedSectionOrder: (): Section[] | undefined => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECOMMENDED_SECTION_ORDER)
      return stored ? JSON.parse(stored) : undefined
    } catch (error) {
      console.warn('Failed to load section order:', error)
      return undefined
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
