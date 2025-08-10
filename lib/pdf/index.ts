// PDF System Exports
export { PDFParser } from './parser';
export type { ParsedResumeData } from './parser';

// PDF Templates
export type { TemplateId, TemplateInfo, TemplateCustomization } from '@/lib/resume/resume-types';

// PDF Components
export { PDFGenerator, ResumeBuilder } from '@/components/resume/pdf-generator';
export { PDFUpload } from '@/components/resume/pdf-upload';
export { TemplateSelector, ResumeBuilderWithTemplates } from '@/components/resume/template-selector';

// Types
export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  summary?: string;
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string[];
    location?: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
    gpa?: string;
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}
