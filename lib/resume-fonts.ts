// lib/resume-fonts.ts
import { Font } from '@react-pdf/renderer';

// Font registration for React-PDF
export const registerResumefonts = () => {
  // Note: For custom fonts, you'll need to download and add font files to /public/fonts/
  
  // Example font registrations (uncomment when you have the font files)
  /*
  Font.register({
    family: 'Inter',
    fonts: [
      { src: '/fonts/Inter-Regular.ttf', fontWeight: 'normal' },
      { src: '/fonts/Inter-Bold.ttf', fontWeight: 'bold' },
    ]
  });

  Font.register({
    family: 'Roboto',
    fonts: [
      { src: '/fonts/Roboto-Regular.ttf', fontWeight: 'normal' },
      { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' },
    ]
  });
  */
};

// Professional resume font options
export interface ResumeFont {
  name: string;
  displayName: string;
  category: 'sans-serif' | 'serif' | 'custom';
  description: string;
  bestFor: string[];
  available: boolean; // Whether the font is currently available
}

export const RESUME_FONTS: ResumeFont[] = [
  // Built-in PDF fonts (always available)
  {
    name: 'Helvetica',
    displayName: 'Helvetica',
    category: 'sans-serif',
    description: 'Clean, professional, and universally readable',
    bestFor: ['Tech', 'Modern companies', 'General use'],
    available: true
  },
  {
    name: 'Times-Roman',
    displayName: 'Times New Roman',
    category: 'serif',
    description: 'Traditional, academic, and formal',
    bestFor: ['Legal', 'Academic', 'Traditional industries'],
    available: true
  },
  {
    name: 'Helvetica-Bold',
    displayName: 'Helvetica (Bold variant)',
    category: 'sans-serif', 
    description: 'Bold version of Helvetica for emphasis',
    bestFor: ['Modern', 'Clean design', 'Tech'],
    available: true
  },

  // Custom fonts (need to be added)
  {
    name: 'Inter',
    displayName: 'Inter',
    category: 'sans-serif',
    description: 'Modern, highly readable, designed for screens',
    bestFor: ['Tech', 'Startups', 'Modern companies'],
    available: false // Set to true when font files are added
  },
  {
    name: 'Roboto',
    displayName: 'Roboto',
    category: 'sans-serif',
    description: 'Google\'s system font, friendly and professional',
    bestFor: ['Tech', 'Modern', 'Accessible design'],
    available: false
  },
  {
    name: 'Open Sans',
    displayName: 'Open Sans',
    category: 'sans-serif',
    description: 'Humanist sans-serif, optimized for legibility',
    bestFor: ['General use', 'Corporate', 'Non-profit'],
    available: false
  },
  {
    name: 'Lato',
    displayName: 'Lato',
    category: 'sans-serif',
    description: 'Friendly but serious, professional appearance',
    bestFor: ['Corporate', 'Marketing', 'Communications'],
    available: false
  },
  {
    name: 'Source Sans Pro',
    displayName: 'Source Sans Pro',
    category: 'sans-serif',
    description: 'Adobe\'s first open source font, clean and readable',
    bestFor: ['Design', 'Tech', 'Professional services'],
    available: false
  },
  {
    name: 'Calibri',
    displayName: 'Calibri',
    category: 'sans-serif',
    description: 'Microsoft\'s default font, warm and soft',
    bestFor: ['Corporate', 'Business', 'Microsoft environments'],
    available: false
  },
  {
    name: 'Georgia',
    displayName: 'Georgia',
    category: 'serif',
    description: 'Designed for screen reading, elegant serif',
    bestFor: ['Academic', 'Publishing', 'Traditional'],
    available: false
  }
];

// Get available fonts only
export const getAvailableFonts = (): ResumeFont[] => {
  return RESUME_FONTS.filter(font => font.available);
};

// Get font options for dropdown
export const getFontOptions = () => {
  return getAvailableFonts().map(font => ({
    value: font.name,
    label: font.displayName,
    description: font.description
  }));
};

// Font loading utility
export const loadCustomFonts = async () => {
  try {
    registerResumefonts();
    console.log('Custom fonts loaded successfully');
  } catch (error) {
    console.warn('Some custom fonts failed to load:', error);
  }
};
