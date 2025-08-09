// lib/resume-templates.ts
export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'traditional' | 'creative' | 'tech' | 'corporate';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  colors: string[];
  preview: string;
  features: string[];
  bestFor: string[];
  isPopular?: boolean;
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Clean and professional design with balanced whitespace',
    category: 'traditional',
    difficulty: 'beginner',
    colors: ['#2563eb', '#059669', '#dc2626', '#7c3aed'],
    preview: '/templates/elegant-preview.png',
    features: ['ATS-friendly', 'Clean layout', 'Professional styling'],
    bestFor: ['Recent graduates', 'Corporate roles', 'Traditional industries']
  },
  {
    id: 'chicago',
    name: 'Chicago',
    description: 'Modern layout with accent colors and clear sections',
    category: 'modern',
    difficulty: 'intermediate',
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
    preview: '/templates/chicago-preview.png',
    features: ['Modern design', 'Color accents', 'Clear hierarchy'],
    bestFor: ['Mid-career professionals', 'Creative industries', 'Marketing roles']
  },
  {
    id: 'clean',
    name: 'Clean',
    description: 'Minimalist approach with orange accents and sidebar',
    category: 'modern',
    difficulty: 'beginner',
    colors: ['#ea580c', '#3b82f6', '#059669', '#7c3aed'],
    preview: '/templates/clean-preview.png',
    features: ['Sidebar layout', 'Bold colors', 'Minimalist'],
    bestFor: ['Tech roles', 'Startups', 'Creative professionals'],
    isPopular: true
  },
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    description: 'Sophisticated design with photo placement and elegant typography',
    category: 'creative',
    difficulty: 'advanced',
    colors: ['#7c3aed', '#059669', '#dc2626', '#3b82f6'],
    preview: '/templates/taj-mahal-preview.png',
    features: ['Photo integration', 'Creative layout', 'Elegant typography'],
    bestFor: ['Creative roles', 'Design positions', 'Media professionals']
  },
  {
    id: '2025',
    name: '2025',
    description: 'Contemporary design with dark header and modern elements',
    category: 'modern',
    difficulty: 'intermediate',
    colors: ['#1f2937', '#3b82f6', '#10b981', '#f59e0b'],
    preview: '/templates/2025-preview.png',
    features: ['Dark header', 'Modern layout', 'Professional styling'],
    bestFor: ['Tech industry', 'Modern companies', 'Progressive roles']
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Traditional corporate style with clean lines and structure',
    category: 'corporate',
    difficulty: 'beginner',
    colors: ['#1f2937', '#374151', '#6b7280', '#3b82f6'],
    preview: '/templates/corporate-preview.png',
    features: ['Corporate styling', 'Traditional layout', 'Conservative design'],
    bestFor: ['Corporate roles', 'Finance', 'Legal positions']
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Sophisticated layout for experienced professionals',
    category: 'traditional',
    difficulty: 'advanced',
    colors: ['#374151', '#3b82f6', '#059669', '#7c3aed'],
    preview: '/templates/advanced-preview.png',
    features: ['Advanced layout', 'Multiple sections', 'Executive styling'],
    bestFor: ['Senior roles', 'Executive positions', 'Experienced professionals']
  }
];

export const getTemplatesByCategory = (category: string) => {
  return resumeTemplates.filter(template => template.category === category);
};

export const getTemplateById = (id: string) => {
  return resumeTemplates.find(template => template.id === id);
};

export const getPopularTemplates = () => {
  return resumeTemplates.filter(template => template.isPopular);
};

export const getTemplatesByDifficulty = (difficulty: string) => {
  return resumeTemplates.filter(template => template.difficulty === difficulty);
};
