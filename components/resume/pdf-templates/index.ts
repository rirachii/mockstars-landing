import { ModernTemplate } from './modern-template';
import { ClassicTemplate } from './classic-template';
import { ModernExecutiveTemplate } from './modern-executive-template';
import { ModernTechTwoColumnTemplate } from './modern-tech-two-column-template';
import { MarketingProfessionalTemplate } from './marketing-professional-template';
import { TechDeveloperTemplate } from './tech-developer-template';
import { TwoColumnMarketingTemplate } from './two-column-marketing-template';
import { AcademicPurpleTemplate } from './academic-purple-template';
import { ClassicLegalTemplate } from './classic-legal-template';
import { ModernBlueTemplate } from './modern-blue-template';

export type TemplateType = 
  | 'modern' 
  | 'classic' 
  | 'modern-executive' 
  | 'modern-tech-two-column'
  | 'marketing-professional'
  | 'tech-developer'
  | 'two-column-marketing'
  | 'academic-purple'
  | 'classic-legal'
  | 'modern-blue';

export interface TemplateInfo {
  id: TemplateType;
  name: string;
  description: string;
  preview: string;
  component: React.ComponentType<any>;
  category: 'modern' | 'traditional' | 'creative' | 'tech' | 'executive';
}

export const templates: TemplateInfo[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, contemporary design with blue accents. Perfect for tech and creative roles.',
    preview: '/template-previews/modern.png',
    component: ModernTemplate,
    category: 'modern',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional, professional layout. Ideal for corporate and traditional industries.',
    preview: '/template-previews/classic.png',
    component: ClassicTemplate,
    category: 'traditional',
  },
  {
    id: 'modern-executive',
    name: 'Modern Executive',
    description: 'Modern, executive-style design with blue accents. Perfect for leadership roles.',
    preview: '/template-previews/modern-executive.png',
    component: ModernExecutiveTemplate,
    category: 'executive',
  },
  {
    id: 'modern-tech-two-column',
    name: 'Modern Tech Two Column',
    description: 'Modern, tech-focused design with two columns. Perfect for technical roles.',
    preview: '/template-previews/modern-tech-two-column.png',
    component: ModernTechTwoColumnTemplate,
    category: 'tech',
  },
  {
    id: 'marketing-professional',
    name: 'Marketing Professional',
    description: 'Orange-accented design perfect for marketing and sales professionals.',
    preview: '/template-previews/marketing-professional.png',
    component: MarketingProfessionalTemplate,
    category: 'modern',
  },
  {
    id: 'tech-developer',
    name: 'Tech Developer',
    description: 'Clean, teal-accented template ideal for software developers and engineers.',
    preview: '/template-previews/tech-developer.png',
    component: TechDeveloperTemplate,
    category: 'tech',
  },
  {
    id: 'two-column-marketing',
    name: 'Two Column Marketing',
    description: 'Two-column layout with dedicated skills sidebar for marketing professionals.',
    preview: '/template-previews/two-column-marketing.png',
    component: TwoColumnMarketingTemplate,
    category: 'modern',
  },
  {
    id: 'academic-purple',
    name: 'Academic Purple',
    description: 'Traditional academic template with purple header and formal structure.',
    preview: '/template-previews/academic-purple.png',
    component: AcademicPurpleTemplate,
    category: 'traditional',
  },
  {
    id: 'classic-legal',
    name: 'Classic Legal',
    description: 'Traditional legal resume format with horizontal dividers and serif typography.',
    preview: '/template-previews/classic-legal.png',
    component: ClassicLegalTemplate,
    category: 'traditional',
  },
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Clean, modern design with blue accents. Suitable for various industries.',
    preview: '/template-previews/modern-blue.png',
    component: ModernBlueTemplate,
    category: 'modern',
  },
];

export const getTemplate = (templateId: TemplateType) => {
  return templates.find(template => template.id === templateId);
};

export const getTemplatesByCategory = (category: TemplateInfo['category']) => {
  return templates.filter(template => template.category === category);
};

export { 
  ModernTemplate, 
  ClassicTemplate, 
  ModernExecutiveTemplate, 
  ModernTechTwoColumnTemplate,
  MarketingProfessionalTemplate,
  TechDeveloperTemplate,
  TwoColumnMarketingTemplate,
  AcademicPurpleTemplate,
  ClassicLegalTemplate,
  ModernBlueTemplate
};
