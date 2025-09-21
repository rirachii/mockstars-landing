import { ResumeData } from './resume-data';

/**
 * Text-based resume parser that extracts structured resume data from plain text
 * Supports various formats and automatically detects sections
 */

export interface ParseResult {
  success: boolean;
  data?: ResumeData;
  errors?: string[];
  warnings?: string[];
}

export class ResumeTextParser {
  private text: string;
  private lines: string[];

  constructor(text: string) {
    this.text = text.trim();
    this.lines = this.text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  }

  /**
   * Parse the text and return structured resume data
   */
  parse(): ParseResult {
    try {
      const data = this.extractResumeData();
      return {
        success: true,
        data,
        warnings: this.generateWarnings(data)
      };
    } catch (error) {
      return {
        success: false,
        errors: [error instanceof Error ? error.message : 'Unknown parsing error']
      };
    }
  }

  private extractResumeData(): ResumeData {
    const personalInfo = this.extractPersonalInfo();
    const summary = this.extractSummary();
    const experience = this.extractExperience();
    const education = this.extractEducation();
    const skills = this.extractSkills();
    const projects = this.extractProjects();

    return {
      id: `text-parsed-${Date.now()}`,
      personalInfo,
      summary,
      experience,
      education,
      skills,
      projects,
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    };
  }

  private extractPersonalInfo() {
    const personalInfo = {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      links: [] as Array<{ id: string; label: string; url: string; icon?: string; order: number }>
    };

    // Look for name (usually first line or after "Name:")
    const nameMatch = this.findSection('name', ['name:', 'full name:', 'contact:']);
    if (nameMatch) {
      personalInfo.name = nameMatch;
    } else if (this.lines.length > 0) {
      // Assume first line is name if no explicit section found
      personalInfo.name = this.lines[0];
    }

    // Look for title/position
    const titleMatch = this.findSection('title', ['title:', 'position:', 'job title:', 'role:', 'profession:']);
    if (titleMatch) {
      personalInfo.title = titleMatch;
    }

    // Look for email
    const emailMatch = this.findEmail();
    if (emailMatch) {
      personalInfo.email = emailMatch;
    }

    // Look for phone
    const phoneMatch = this.findPhone();
    if (phoneMatch) {
      personalInfo.phone = phoneMatch;
    }

    // Look for location
    const locationMatch = this.findSection('location', ['location:', 'address:', 'city:', 'based in:']);
    if (locationMatch) {
      personalInfo.location = locationMatch;
    }

    // Look for links/URLs
    const links = this.findLinks();
    personalInfo.links = links.map((link, index) => ({
      id: `l${index + 1}`,
      label: this.extractLinkLabel(link),
      url: link,
      order: index + 1
    }));

    return personalInfo;
  }

  private extractSummary(): string {
    const summaryMatch = this.findSection('summary', [
      'summary:', 'profile:', 'about:', 'objective:', 'professional summary:',
      'career summary:', 'overview:', 'introduction:'
    ]);
    return summaryMatch || '';
  }

  private extractExperience() {
    const experience: ResumeData['experience'] = [];
    
    // Look for experience section
    const experienceStart = this.findSectionStart('experience', [
      'experience:', 'work experience:', 'employment:', 'career:', 'professional experience:',
      'work history:', 'employment history:'
    ]);

    if (experienceStart === -1) return experience;

    const experienceText = this.extractSectionContent(experienceStart);
    const jobs = this.parseJobEntries(experienceText);

    jobs.forEach((job, index) => {
      if (job.title && job.company) {
        experience.push({
          id: `e${index + 1}`,
          title: job.title,
          company: job.company,
          location: job.location || '',
          startDate: job.startDate || '',
          endDate: job.endDate || '',
          isCurrent: job.isCurrent || false,
          bullets: job.bullets.map((bullet, bulletIndex) => ({
            id: `b${index + 1}-${bulletIndex + 1}`,
            text: bullet
          })),
          technologies: job.technologies || [],
          order: index + 1
        });
      }
    });

    return experience;
  }

  private extractEducation() {
    const education: ResumeData['education'] = [];
    
    const educationStart = this.findSectionStart('education', [
      'education:', 'academic:', 'qualifications:', 'degrees:', 'academic background:'
    ]);

    if (educationStart === -1) return education;

    const educationText = this.extractSectionContent(educationStart);
    const degrees = this.parseEducationEntries(educationText);

    degrees.forEach((degree, index) => {
      if (degree.degree && degree.school) {
        education.push({
          id: `ed${index + 1}`,
          degree: degree.degree,
          school: degree.school,
          startYear: degree.startYear || '',
          endYear: degree.endYear || '',
          gpa: degree.gpa || '',
          coursework: degree.coursework || [],
          honors: degree.honors || [],
          order: index + 1
        });
      }
    });

    return education;
  }

  private extractSkills() {
    const skillsStart = this.findSectionStart('skills', [
      'skills:', 'technical skills:', 'competencies:', 'expertise:', 'technologies:',
      'programming languages:', 'tools:', 'software:'
    ]);

    if (skillsStart === -1) return [];

    const skillsText = this.extractSectionContent(skillsStart);
    const skillNames = this.parseSkillsList(skillsText);

    return skillNames.map(name => ({ name: name.trim() }));
  }

  private extractProjects() {
    const projects: ResumeData['projects'] = [];
    
    const projectsStart = this.findSectionStart('projects', [
      'projects:', 'portfolio:', 'personal projects:', 'side projects:', 'work samples:'
    ]);

    if (projectsStart === -1) return projects;

    const projectsText = this.extractSectionContent(projectsStart);
    const projectEntries = this.parseProjectEntries(projectsText);

    projectEntries.forEach((project, index) => {
      if (project.name) {
        projects.push({
          id: `p${index + 1}`,
          name: project.name,
          role: project.role || '',
          description: project.description || '',
          highlights: project.highlights || [],
          technologies: project.technologies || [],
          links: project.links || [],
          order: index + 1
        });
      }
    });

    return projects;
  }

  // Helper methods
  private findSection(keyword: string, variations: string[]): string {
    for (const line of this.lines) {
      const lowerLine = line.toLowerCase();
      for (const variation of variations) {
        if (lowerLine.includes(variation)) {
          return line.split(':').slice(1).join(':').trim();
        }
      }
    }
    return '';
  }

  private findSectionStart(keyword: string, variations: string[]): number {
    for (let i = 0; i < this.lines.length; i++) {
      const lowerLine = this.lines[i].toLowerCase();
      for (const variation of variations) {
        if (lowerLine.includes(variation)) {
          return i;
        }
      }
    }
    return -1;
  }

  private extractSectionContent(startIndex: number): string[] {
    const content: string[] = [];
    let i = startIndex + 1;

    while (i < this.lines.length) {
      const line = this.lines[i];
      
      // Stop if we hit another major section
      if (this.isMajorSection(line)) {
        break;
      }
      
      content.push(line);
      i++;
    }

    return content;
  }

  private isMajorSection(line: string): boolean {
    const majorSections = [
      'experience', 'education', 'skills', 'projects', 'summary', 'profile',
      'employment', 'work', 'academic', 'qualifications', 'portfolio'
    ];
    
    const lowerLine = line.toLowerCase();
    return majorSections.some(section => lowerLine.includes(section + ':'));
  }

  private findEmail(): string {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    for (const line of this.lines) {
      const match = line.match(emailRegex);
      if (match) {
        return match[0];
      }
    }
    return '';
  }

  private findPhone(): string {
    const phoneRegex = /(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/;
    for (const line of this.lines) {
      const match = line.match(phoneRegex);
      if (match) {
        return match[0];
      }
    }
    return '';
  }

  private findLinks(): string[] {
    const urlRegex = /https?:\/\/[^\s]+/g;
    const links: string[] = [];
    
    for (const line of this.lines) {
      const matches = line.match(urlRegex);
      if (matches) {
        links.push(...matches);
      }
    }
    
    return [...new Set(links)]; // Remove duplicates
  }

  private extractLinkLabel(url: string): string {
    // Extract domain name as label
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return 'Link';
    }
  }

  private parseJobEntries(content: string[]): Array<{
    title: string;
    company: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    bullets: string[];
    technologies?: string[];
  }> {
    const jobs: any[] = [];
    let currentJob: any = null;

    for (const line of content) {
      // Check if this looks like a job title/company line
      if (this.looksLikeJobHeader(line)) {
        if (currentJob) {
          jobs.push(currentJob);
        }
        currentJob = this.parseJobHeader(line);
      } else if (currentJob && line.trim()) {
        // Check if it's a bullet point
        if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
          currentJob.bullets.push(line.substring(1).trim());
        } else if (this.looksLikeDateRange(line)) {
          // Parse date range
          const dates = this.parseDateRange(line);
          currentJob.startDate = dates.start;
          currentJob.endDate = dates.end;
          currentJob.isCurrent = dates.isCurrent;
        } else if (this.looksLikeLocation(line)) {
          currentJob.location = line;
        } else {
          // Treat as description/bullet
          currentJob.bullets.push(line);
        }
      }
    }

    if (currentJob) {
      jobs.push(currentJob);
    }

    return jobs;
  }

  private looksLikeJobHeader(line: string): boolean {
    // Look for patterns like "Software Engineer at Company" or "Title - Company"
    const patterns = [
      /^[^,]+ at [^,]+/i,
      /^[^,]+ - [^,]+/i,
      /^[^,]+ \| [^,]+/i,
      /^[^,]+ @ [^,]+/i
    ];
    
    return patterns.some(pattern => pattern.test(line));
  }

  private parseJobHeader(line: string): any {
    const separators = [' at ', ' - ', ' | ', ' @ '];
    
    for (const sep of separators) {
      if (line.includes(sep)) {
        const parts = line.split(sep);
        return {
          title: parts[0].trim(),
          company: parts[1].trim(),
          bullets: [],
          technologies: []
        };
      }
    }
    
    return {
      title: line,
      company: '',
      bullets: [],
      technologies: []
    };
  }

  private looksLikeDateRange(line: string): boolean {
    const datePatterns = [
      /\d{4}\s*[-–]\s*\d{4}/,
      /\d{4}\s*[-–]\s*present/i,
      /\d{4}\s*[-–]\s*current/i,
      /jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i
    ];
    
    return datePatterns.some(pattern => pattern.test(line));
  }

  private parseDateRange(line: string): { start: string; end: string; isCurrent: boolean } {
    const parts = line.split(/[-–]/).map(p => p.trim());
    const isCurrent = /present|current/i.test(parts[1] || '');
    
    return {
      start: parts[0] || '',
      end: parts[1] || '',
      isCurrent
    };
  }

  private looksLikeLocation(line: string): boolean {
    // Simple heuristic: if it contains common location indicators
    const locationIndicators = [',', 'CA', 'NY', 'TX', 'FL', 'WA', 'remote', 'hybrid'];
    return locationIndicators.some(indicator => 
      line.toLowerCase().includes(indicator.toLowerCase())
    );
  }

  private parseEducationEntries(content: string[]): Array<{
    degree: string;
    school: string;
    startYear?: string;
    endYear?: string;
    gpa?: string;
    coursework?: string[];
    honors?: string[];
  }> {
    const degrees: any[] = [];
    let currentDegree: any = null;

    for (const line of content) {
      if (this.looksLikeDegreeHeader(line)) {
        if (currentDegree) {
          degrees.push(currentDegree);
        }
        currentDegree = this.parseDegreeHeader(line);
      } else if (currentDegree && line.trim()) {
        if (line.toLowerCase().includes('gpa')) {
          currentDegree.gpa = line;
        } else if (line.toLowerCase().includes('honors')) {
          currentDegree.honors = [line];
        } else {
          currentDegree.coursework = currentDegree.coursework || [];
          currentDegree.coursework.push(line);
        }
      }
    }

    if (currentDegree) {
      degrees.push(currentDegree);
    }

    return degrees;
  }

  private looksLikeDegreeHeader(line: string): boolean {
    const degreeKeywords = ['bachelor', 'master', 'phd', 'associate', 'certificate', 'diploma'];
    return degreeKeywords.some(keyword => 
      line.toLowerCase().includes(keyword)
    );
  }

  private parseDegreeHeader(line: string): any {
    // Try to extract degree and school
    const parts = line.split(',').map(p => p.trim());
    
    return {
      degree: parts[0] || line,
      school: parts[1] || '',
      coursework: [],
      honors: []
    };
  }

  private parseSkillsList(content: string[]): string[] {
    const skills: string[] = [];
    
    for (const line of content) {
      // Split by common separators
      const lineSkills = line.split(/[,;|•\n]/)
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);
      
      skills.push(...lineSkills);
    }
    
    return [...new Set(skills)]; // Remove duplicates
  }

  private parseProjectEntries(content: string[]): Array<{
    name: string;
    role?: string;
    description?: string;
    highlights?: string[];
    technologies?: string[];
    links?: Array<{ label: string; url: string }>;
  }> {
    const projects: any[] = [];
    let currentProject: any = null;

    for (const line of content) {
      if (this.looksLikeProjectHeader(line)) {
        if (currentProject) {
          projects.push(currentProject);
        }
        currentProject = {
          name: line,
          highlights: [],
          technologies: [],
          links: []
        };
      } else if (currentProject && line.trim()) {
        if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
          currentProject.highlights.push(line.substring(1).trim());
        } else if (line.includes('http')) {
          // Extract URL
          const urlMatch = line.match(/https?:\/\/[^\s]+/);
          if (urlMatch) {
            currentProject.links.push({
              label: 'Project Link',
              url: urlMatch[0]
            });
          }
        } else {
          currentProject.description = (currentProject.description || '') + ' ' + line;
        }
      }
    }

    if (currentProject) {
      projects.push(currentProject);
    }

    return projects;
  }

  private looksLikeProjectHeader(line: string): boolean {
    // Simple heuristic: if it's not a bullet point and doesn't contain common job/education keywords
    const excludeKeywords = ['experience', 'education', 'skills', 'summary', 'at ', 'university', 'college'];
    const hasExcludeKeyword = excludeKeywords.some(keyword => 
      line.toLowerCase().includes(keyword)
    );
    
    return !hasExcludeKeyword && !line.startsWith('•') && !line.startsWith('-') && !line.startsWith('*');
  }

  private generateWarnings(data: ResumeData): string[] {
    const warnings: string[] = [];
    
    if (!data.personalInfo.name) {
      warnings.push('Name not found - please ensure your name is clearly indicated');
    }
    
    if (!data.personalInfo.email) {
      warnings.push('Email not found - please include your email address');
    }
    
    if (data.experience.length === 0) {
      warnings.push('No work experience found - please include your work history');
    }
    
    if (data.education.length === 0) {
      warnings.push('No education found - please include your educational background');
    }
    
    if (data.skills.length === 0) {
      warnings.push('No skills found - please include your skills and technologies');
    }
    
    return warnings;
  }
}

/**
 * Convenience function to parse text into resume data
 */
export function parseResumeText(text: string): ParseResult {
  const parser = new ResumeTextParser(text);
  return parser.parse();
}


