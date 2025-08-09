import { ModernTemplate } from './modern-template';
import { ClassicTemplate } from './classic-template';

export type TemplateType = 'modern' | 'classic' | 'creative';

export interface TemplateInfo {
  id: TemplateType;
  name: string;
  description: string;
  preview: string;
  component: React.ComponentType<any>;
}

export const templates: TemplateInfo[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, contemporary design with blue accents. Perfect for tech and creative roles.',
    preview: '/template-previews/modern.png',
    component: ModernTemplate,
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional, professional layout. Ideal for corporate and traditional industries.',
    preview: '/template-previews/classic.png',
    component: ClassicTemplate,
  },
  // Future templates can be added here
  // {
  //   id: 'creative',
  //   name: 'Creative',
  //   description: 'Bold, eye-catching design for creative professionals.',
  //   preview: '/template-previews/creative.png',
  //   component: CreativeTemplate,
  // },
];

export const getTemplate = (templateId: TemplateType) => {
  return templates.find(template => template.id === templateId);
};

export { ModernTemplate, ClassicTemplate };
