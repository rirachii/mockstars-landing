import { 
  MockstarsTemplate,
  OwenTemplate,
  TheGilfoyleTemplate,
  PiedPiperTemplate,
  AviatoTemplate,
  MarblesTemplate,
  JobsBroJobsTemplate,
  SiliconIvyTemplate,
  IpoReadyTemplate,
  ChromeBoneTemplate,
  PaulAllenTemplate,
  LavenderDuskTemplate,
  VeranoGlowTemplate,
  ConejoLuxeTemplate,
  RizzumeTemplate,
  ItsGivingProfessionalTemplate,
  NoCapTemplate,
  DeluluModeTemplate,
  MainCharacterEnergyTemplate,
  OneHundredHPTemplate,
  NPCEnergyTemplate,
  GyattPointsTemplate,
  WorldBestResumeTemplate,
} from '@/components/resume/pdf-templates';

export type TemplateId = 
  | 'mockstars'
  | 'owen'
  | 'no-cap'
  | 'world-best-resume'
  | '100-hp'
  | 'npc-energy'
  | 'rizzume'
  | 'its-giving-professional'
  | 'delulu-mode'
  | 'main-character-energy'
  | 'gyatt-points'
  | 'the-gilfoyle'
  | 'pied-piper'
  | 'aviato'
  | 'marbles'
  | 'jobs-bro-jobs'
  | 'silicon-ivy'
  | 'ipo-ready'
  | 'chrome-bone'
  | 'paul-allen'
  | 'lavender-dusk'
  | 'conejo-luxe'
  

export type Section = "summary" | "experience" | "projects" | "education" | "skills" | "certifications" | "awards" | "languages" | "publications" | "volunteering" | "interests";


export interface TemplateCustomization {
  primaryColor: string;
  accentColor?: string; // CSS color
  fontFamily: string;
  fontSize: 'small' | 'default' | 'large'
  density: "compact" | "cozy";
  columns: 1 | 2;
  sectionSpacing: number
  paragraphSpacing: number
  lineSpacing: number
  sectionOrder: Section[]; // ["summary","experience","projects","education","skills",...]
  page: {
    size?: "letter" | "a4";
    margin?: string; // e.g., '0.5in'
  };
}

export const DEFAULT_CUSTOMIZATION: TemplateCustomization = {
  primaryColor: '#397DC2',
  fontSize: 'default',
  fontFamily: 'Helvetica',
  sectionSpacing: 16,
  paragraphSpacing: 8,
  lineSpacing: 1.4,
  sectionOrder: ['summary', 'experience', 'projects', 'education', 'skills', 'certifications', 'publications', 'volunteering', 'interests'],
  page: {
    size: 'letter',
    margin: '0.5in',
  },
  density: 'compact',
  columns: 1,
} 


export interface TemplateInfo {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  personality: string;
  idealFor: string[];
  preview: string;
  features: string[];
  component: React.ComponentType<any>;
  category: keyof typeof TemplateCategories;
  customization: TemplateCustomization;
  layout: 'single-column' | 'two-column' | 'sidebar' | 'header-focus';
  isPro: boolean;
}

// Categories for UI organization
export const TemplateCategories: Record<string, {
  name: string;
  description: string;
  icon: string;
}> = {
  modern: {
    name: 'Modern',
    description: 'Bold, innovative designs for disruptors',
    icon: 'M',
  },
  corporate: {
    name: 'Corporate', 
    description: 'Professional layouts for business leaders',
    icon: '🏢',
  },
  creative: {
    name: 'Creative',
    description: 'Expressive designs that stand out',
    icon: '🎨',
  },
  tech: {
    name: 'Tech',
    description: 'Tech-forward designs for tech professionals',
    icon: '💻',
  },
} as const;

export const resumeTemplates: TemplateInfo[] = [
  {
    id: 'mockstars',
    name: 'Mockstars',
    tagline: 'Clean, functional, almost too earnest',
    description: 'Straightforward and honest design that gets straight to the point. No frills, just results.',
    personality: 'Earnest, reliable, methodical',
    idealFor: ['Product Managers', 'Operations', 'Business Analysts', 'Consultants'],
    preview: '/template-previews/mockstars.png',
    component: MockstarsTemplate,
    category: 'modern',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Clean typography', 'Logical flow', 'Results-focused', 'ATS-optimized'],
    isPro: false,
  },
  {
    id: 'owen',
    name: 'Owen',
    tagline: 'Clean, functional, almost too earnest',
    description: 'Straightforward and honest design that gets straight to the point. No frills, just results.',
    personality: 'Earnest, reliable, methodical',
    idealFor: ['Product Managers', 'Operations', 'Business Analysts', 'Consultants'],
    preview: '/template-previews/owen.png',
    component: OwenTemplate,
    category: 'corporate',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Clean typography', 'Logical flow', 'Results-focused', 'ATS-optimized'],
    isPro: false,
  },
  {
    id: 'world-best-resume',
    name: 'World Best Resume',
    tagline: 'Professional, corporate, and corporate-y',
    description: 'A professional, corporate, and corporate-y template.',
    personality: 'Professional, corporate, and corporate-y',
    idealFor: ['Product Managers', 'Operations', 'Business Analysts', 'Consultants'],
    preview: '/template-previews/world-best-resume.png',
    component: WorldBestResumeTemplate,
    category: 'corporate',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Clean typography', 'Logical flow', 'Results-focused', 'ATS-optimized'],
    isPro: false,
  },
  {
    id: 'its-giving-professional',
    name: "It's Giving Professional",
    tagline: 'Playful but polished',
    description: 'The perfect balance of Gen-Z energy and professional polish. It\'s giving main character energy but make it corporate.',
    personality: 'Playful, polished, trendy',
    idealFor: ['Social Media Managers', 'Digital Marketing', 'Content Creators', 'Brand Strategists'],
    preview: '/template-previews/its-giving-professional.png',
    component: ItsGivingProfessionalTemplate,
    category: 'creative',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Gen-Z language', 'Professional polish', 'Trendy aesthetics', 'Playful sections'],
    isPro: false,
  },
  {
    id: 'rizzume',
    name: 'Rizzumé',
    tagline: 'Smooth, charisma-heavy layout',
    description: 'For those with natural charisma who need a resume that matches their smooth personality and magnetic presence.',
    personality: 'Charismatic, smooth, confident',
    idealFor: ['Sales Representatives', 'Account Managers', 'Business Development', 'Public Relations'],
    preview: '/template-previews/rizzume.png',
    component: RizzumeTemplate,
    category: 'tech',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Smooth design', 'Professional polish', 'Charisma-focused', 'Clean layout'],
    isPro: false,
  },
  {
    id: 'no-cap',
    name: 'No Cap',
    tagline: 'Straightforward, ultra-clear',
    description: 'No lies, no fluff, just pure facts. This template tells it like it is with crystal-clear formatting and honest presentation.',
    personality: 'Honest, straightforward, authentic',
    idealFor: ['Software Engineers', 'Data Analysts', 'Project Managers', 'Technical Writers'],
    preview: '/template-previews/no-cap.png',
    component: NoCapTemplate,
    category: 'modern',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Ultra-minimal', 'Straightforward', 'No-nonsense', 'Clean typography'],
    isPro: false,
  },
  {
    id: 'delulu-mode',
    name: 'Delulu Mode',
    tagline: 'Whimsical, bright, hopeful',
    description: 'Sometimes being a little delusional about your dreams is exactly what you need. This template embraces optimism and possibility.',
    personality: 'Optimistic, whimsical, hopeful',
    idealFor: ['Creative Writers', 'Art Teachers', 'Event Planners', 'Non-profit Workers'],
    preview: '/template-previews/delulu-mode.png',
    component: DeluluModeTemplate,
    category: 'creative',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Whimsical design', 'Bright colors', 'Optimistic tone', 'Emoji accents'],
    isPro: false,
  },
  {
    id: 'main-character-energy',
    name: 'Main Character Energy',
    tagline: 'Clean but dramatic',
    description: 'You\'re the protagonist of your career story, and this template makes sure everyone knows it. Bold presence meets clean execution.',
    personality: 'Dramatic, confident, protagonist',
    idealFor: ['Theater Professionals', 'Brand Managers', 'Creative Directors', 'Entertainment Industry'],
    preview: '/template-previews/main-character-energy.png',
    component: MainCharacterEnergyTemplate,
    category: 'creative',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Dramatic presence', 'Clean execution', 'Bold typography', 'Protagonist energy'],
    isPro: false,
  },
  {
    id: 'lavender-dusk',
    name: 'Lavender Dusk',
    tagline: 'Soft, dreamy, professional-friendly',
    description: 'A gentle, calming design with soft lavender tones perfect for creative professionals who want to stand out softly.',
    personality: 'Dreamy, gentle, approachable',
    idealFor: ['UX Designers', 'Content Creators', 'Marketing Coordinators', 'Social Media Managers'],
    preview: '/template-previews/lavender-dusk.png',
    component: LavenderDuskTemplate,
    category: 'creative',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Soft aesthetics', 'Calming colors', 'Gen-Z friendly', 'Creative appeal'],
    isPro: false,
  },
  {
    id: 'conejo-luxe',
    name: 'Conejo Luxe',
    tagline: 'Bold but still classy',
    description: 'Luxury meets boldness in this sophisticated template that commands attention while maintaining professionalism.',
    personality: 'Bold, luxurious, confident',
    idealFor: ['Creative Directors', 'Fashion Industry', 'Luxury Brand Managers', 'Art Directors'],
    preview: '/template-previews/conejo-luxe.png',
    component: ConejoLuxeTemplate,
    category: 'corporate',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'two-column',
    features: ['Luxury design', 'Bold typography', 'Two-column layout', 'Executive presence'],
    isPro: false,
  },
  {
    id: '100-hp',
    name: '100 HP',
    tagline: 'Minimal, survival-focused',
    description: 'When you need maximum impact with minimum resources. This template gets straight to the point and never wastes space.',
    personality: 'Efficient, focused, essential',
    idealFor: ['Startup Employees', 'Freelancers', 'Recent Graduates', 'Career Changers'],
    preview: '/template-previews/100-hp.png',
    component: OneHundredHPTemplate,
    category: 'modern',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Ultra-minimal', 'Space-efficient', 'Essential info only', 'Gaming reference'],
    isPro: false,
  },
  {
    id: 'npc-energy',
    name: 'NPC Energy',
    tagline: 'Ironic minimalism',
    description: 'Sometimes blending in is the ultimate power move. This template embraces the art of understated professionalism.',
    personality: 'Understated, ironic, minimalist',
    idealFor: ['Backend Developers', 'Data Analysts', 'Support Specialists', 'Quality Assurance'],
    preview: '/template-previews/npc-energy.png',
    component: NPCEnergyTemplate,
    category: 'modern',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Ironic design', 'Understated style', 'Minimal aesthetics', 'Subtle humor'],
    isPro: false,
  },
  {
    id: 'gyatt-points',
    name: 'Gyatt Points',
    tagline: 'Over-the-top emphasis sections',
    description: 'When subtle just won\'t cut it. This template puts your achievements front and center with maximum visual impact and energy.',
    personality: 'Bold, energetic, attention-grabbing',
    idealFor: ['Influencers', 'Creative Artists', 'Performance Artists', 'Brand Ambassadors'],
    preview: '/template-previews/gyatt-points.png',
    component: GyattPointsTemplate,
    category: 'creative',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Maximum impact', 'Bold colors', 'Over-the-top design', 'Eye-catching'],
    isPro: false,
  },
  
  {
    id: 'the-gilfoyle',
    name: 'The Gilfoyle',
    tagline: 'Dark mode aesthetic, minimalist sarcasm',
    description: 'For those who prefer their resumes like their terminals - dark, efficient, and superior.',
    personality: 'Minimalist, technical, sophisticated',
    idealFor: ['DevOps Engineers', 'Backend Developers', 'Security Engineers', 'System Architects'],
    preview: '/template-previews/the-gilfoyle.png',
    component: TheGilfoyleTemplate,
    category: 'tech',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Dark theme', 'Terminal aesthetic', 'Code-friendly fonts', 'Minimalist design'],
    isPro: false,
  },
  {
    id: 'pied-piper',
    name: 'Pied Piper',
    tagline: 'Fresh, startup-y, green accents',
    description: 'Compression algorithm not included. But this fresh design will compress your competition.',
    personality: 'Innovative, optimistic, disruptive',
    idealFor: ['Startup Founders', 'Frontend Developers', 'UX Designers', 'Growth Hackers'],
    preview: '/template-previews/pied-piper.png',
    component: PiedPiperTemplate,
    category: 'tech',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Startup vibes', 'Green accent colors', 'Modern layout', 'Innovation-focused'],
    isPro: false,
  },
  {
    id: 'aviato',
    name: 'Aviato',
    tagline: 'Over-the-top branding, playful type',
    description: 'My Aviato? This is MY resume template. Bold, confident, and impossible to ignore.',
    personality: 'Confident, bold, attention-grabbing',
    idealFor: ['Sales Executives', 'Marketing Directors', 'Brand Managers', 'Entrepreneurs'],
    preview: '/template-previews/aviato.png',
    component: AviatoTemplate,
    category: 'tech',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'header-focus',
    features: ['Bold typography', 'Eye-catching colors', 'Personality-driven', 'Memorable design'],
    isPro: false,
  },
  {
    id: 'marbles',
    name: 'Marbles',
    tagline: 'Warm, human, storytelling-focused layout',
    description: 'Like finding your marbles, this template helps you tell your story with warmth and humanity.',
    personality: 'Warm, approachable, storytelling',
    idealFor: ['HR Professionals', 'Teachers', 'Non-profit Workers', 'Healthcare Workers'],
    preview: '/template-previews/marbles.png',
    component: MarblesTemplate,
    category: 'corporate',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'sidebar',
    features: ['Warm colors', 'Storytelling flow', 'Human-centered', 'Approachable design'],
    isPro: false,
  },
  {
    id: 'jobs-bro-jobs',
    name: 'Jobs bro... Jobs',
    tagline: 'Classic, traditional, old-school prestige',
    description: 'The original. The classic. The template that started it all. Timeless prestige never goes out of style.',
    personality: 'Traditional, prestigious, timeless',
    idealFor: ['Lawyers', 'Investment Bankers', 'Executives', 'Academia'],
    preview: '/template-previews/jobs-bro-jobs.png',
    component: JobsBroJobsTemplate,
    category: 'corporate',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Serif typography', 'Traditional layout', 'Timeless design', 'Executive presence'],
    isPro: false,
  },
  {
    id: 'silicon-ivy',
    name: 'Silicon Ivy',
    tagline: 'Tech meets prestige',
    description: 'Where Silicon Valley innovation meets Ivy League tradition. The best of both worlds.',
    personality: 'Sophisticated, innovative, prestigious',
    idealFor: ['Tech Executives', 'Engineering Managers', 'VCs', 'Tech Consultants'],
    preview: '/template-previews/silicon-ivy.png',
    component: SiliconIvyTemplate,
    category: 'corporate',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Premium feel', 'Tech-forward', 'Executive presence', 'Sophisticated design'],
    isPro: false,
  },
  {
    id: 'ipo-ready',
    name: 'IPO Ready',
    tagline: 'Polished, investor-facing layout',
    description: 'Ready for the big leagues. This template means business and so do you.',
    personality: 'Polished, professional, investor-grade',
    idealFor: ['C-Suite Executives', 'Investment Bankers', 'Strategic Consultants', 'Board Members'],
    preview: '/template-previews/ipo-ready.png',
    component: IpoReadyTemplate,
    category: 'corporate',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Executive polish', 'Investor-grade', 'Premium typography', 'Results-focused'],
    isPro: false,
  },
  {
    id: 'chrome-bone',
    name: 'Chrome & Bone',
    tagline: 'Modern meets classic',
    description: 'The perfect fusion of modern design sensibilities with classic elegance. Timeless yet contemporary.',
    personality: 'Balanced, elegant, sophisticated',
    idealFor: ['Creative Directors', 'Architects', 'Design Leads', 'Brand Strategists'],
    preview: '/template-previews/chrome-bone.png',
    component: ChromeBoneTemplate,
    category: 'corporate',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'two-column',
    features: ['Modern-classic fusion', 'Elegant typography', 'Balanced design', 'Sophisticated palette'],
    isPro: false,
  },
  {
    id: 'paul-allen',
    name: "Paul Allen",
    tagline: 'White, classy, embossed feel',
    description: "Look at that subtle off-white coloring. The tasteful thickness. Oh my God, it even has a watermark.",
    personality: 'Luxurious, refined, exclusive',
    idealFor: ['Private Equity', 'Luxury Brand Managers', 'Art Directors', 'High-end Consultants'],
    preview: '/template-previews/paul-allen.png',
    component: PaulAllenTemplate,
    category: 'corporate',
    customization: DEFAULT_CUSTOMIZATION,
    layout: 'single-column',
    features: ['Luxury aesthetic', 'Premium typography', 'Subtle elegance', 'Exclusive feel'],
    isPro: false,
  }
];

// Helper Functions
export const getTemplate = (templateId: TemplateId) => {
  return resumeTemplates.find(template => template.id === templateId);
};

export const getTemplatesByCategory = (category: TemplateInfo['category']) => {
  return resumeTemplates.filter(template => template.category === category);
};

export const getTemplatePersonalities = () => {
  return resumeTemplates.map(template => ({
    id: template.id,
    name: template.name,
    personality: template.personality,
    tagline: template.tagline,
  }));
};

export const getTemplateByPersonality = (personality: string) => {
  return resumeTemplates.find(template => 
    template.personality.toLowerCase().includes(personality.toLowerCase()) ||
    template.tagline.toLowerCase().includes(personality.toLowerCase())
  );
};

// export const getFeaturedTemplates = () => {
//   // Return a curated selection of popular templates
//   const featuredIds: TemplateId[] = ['mockstars', 'owen', 'rizzume', 'ipo-ready', 'paul-allen-card'];
//   return resumeTemplates.filter(template => featuredIds.includes(template.id));
// };


