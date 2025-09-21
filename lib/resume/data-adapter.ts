import { ResumeData } from './resume-data';

/**
 * Data adapter to convert ResumeData to different template formats
 * Each template expects slightly different data structures
 */

export interface TemplateResumeData {
  id: string;
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
    links?: Array<{ id: string; label: string; url: string; icon?: string; order: number }>;
  };
  summary?: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    isCurrent?: boolean;
    location?: string;
    bullets: Array<{ id: string; text: string; impact?: { value: number; unit?: string; baseline?: number } }>;
    technologies?: string[];
    order: number;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    startYear?: string;
    endYear?: string;
    gpa?: string;
    coursework?: string[];
    honors?: string[];
    order: number;
  }>;
  skills: Array<{ name: string; level?: "beginner" | "intermediate" | "advanced" | "expert"; category?: string }>;
  projects?: Array<{
    id: string;
    name: string;
    role?: string;
    description?: string;
    highlights?: string[];
    technologies?: string[];
    links?: Array<{ label: string; url: string }>;
    order: number;
  }>;
}

export class ResumeDataAdapter {
  /**
   * Convert ResumeData to template-compatible format
   */
  static adaptForTemplate(data: ResumeData): TemplateResumeData {
    return {
      id: data.id,
      personalInfo: this.adaptPersonalInfo(data.personalInfo),
      summary: data.summary,
      experience: this.adaptExperience(data.experience),
      education: this.adaptEducation(data.education),
      skills: this.adaptSkills(data.skills),
      projects: this.adaptProjects(data.projects)
    };
  }

  private static adaptPersonalInfo(personalInfo: ResumeData['personalInfo']) {
    const adapted: TemplateResumeData['personalInfo'] = {
      name: personalInfo.name || '',
      title: personalInfo.title || '',
      email: personalInfo.email || '',
      phone: personalInfo.phone || '',
      location: personalInfo.location || '',
      links: personalInfo.links || []
    };

    // Extract LinkedIn and website from links
    if (personalInfo.links) {
      for (const link of personalInfo.links) {
        const url = link.url.toLowerCase();
        if (url.includes('linkedin.com')) {
          adapted.linkedin = link.url;
        } else if (url.includes('github.com') || url.includes('.com') || url.includes('.dev')) {
          adapted.website = link.url;
        }
      }
    }

    return adapted;
  }

  private static adaptExperience(experience: ResumeData['experience']) {
    return experience.map(exp => ({
      id: exp.id,
      title: exp.title || '',
      company: exp.company || '',
      startDate: this.formatDate(exp.startDate),
      endDate: this.formatDate(exp.endDate) || (exp.isCurrent ? 'Present' : ''),
      isCurrent: exp.isCurrent,
      location: exp.location || '',
      bullets: exp.bullets?.map(bullet => ({ 
        id: bullet.id, 
        text: bullet.text, 
        impact: bullet.impact 
      })) || [],
      technologies: exp.technologies || [],
      order: exp.order
    }));
  }

  private static adaptEducation(education: ResumeData['education']) {
    return education.map(edu => ({
      id: edu.id,
      degree: edu.degree || '',
      school: edu.school || '',
      startYear: edu.startYear || '',
      endYear: edu.endYear || '',
      gpa: edu.gpa || '',
      coursework: edu.coursework || [],
      honors: edu.honors || [],
      order: edu.order
    }));
  }

  private static adaptSkills(skills: ResumeData['skills']) {
    return skills.map(skill => ({
      name: skill.name,
      level: skill.level,
      category: skill.category
    }));
  }

  private static adaptProjects(projects?: ResumeData['projects']) {
    if (!projects) return undefined;
    
    return projects.map(project => ({
      id: project.id,
      name: project.name || '',
      role: project.role || '',
      description: project.description || '',
      highlights: project.highlights || [],
      technologies: project.technologies || [],
      links: project.links || [],
      order: project.order
    }));
  }

  private static formatDate(dateString?: string): string {
    if (!dateString) return '';
    
    // If it's already in a good format, return as is
    if (dateString.match(/^\d{4}-\d{2}$/) || dateString.match(/^[A-Za-z]{3} \d{4}$/)) {
      return dateString;
    }
    
    // Try to parse and format the date
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short' 
        });
      }
    } catch (error) {
      // If parsing fails, return the original string
    }
    
    return dateString;
  }
}

/**
 * Create a template-compatible resume data object
 */
export function createTemplateResumeData(data: ResumeData): TemplateResumeData {
  return ResumeDataAdapter.adaptForTemplate(data);
}
