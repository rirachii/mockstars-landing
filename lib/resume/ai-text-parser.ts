import { ResumeData } from './resume-data';

/**
 * AI-enhanced text parser that uses structured prompts to clean and format resume data
 * This version provides better parsing and data cleaning for the preview system
 */

export interface AIParseResult {
  success: boolean;
  data?: ResumeData;
  errors?: string[];
  warnings?: string[];
  rawData?: any; // For debugging
}

export class AIResumeTextParser {
  private text: string;

  constructor(text: string) {
    this.text = text.trim();
  }

  /**
   * Parse text using AI-like structured approach with better data cleaning
   */
  async parse(): Promise<AIParseResult> {
    try {
      // First, do basic text cleaning and structure detection
      const cleanedText = this.cleanText(this.text);
      const sections = this.detectSections(cleanedText);
      
      // Then parse each section with improved logic
      const parsedData = this.parseSections(sections);
      
      // Finally, clean and validate the data for template compatibility
      const cleanedData = this.cleanDataForTemplates(parsedData);
      
      return {
        success: true,
        data: cleanedData,
        warnings: this.generateWarnings(cleanedData),
        rawData: parsedData // For debugging
      };
    } catch (error) {
      return {
        success: false,
        errors: [error instanceof Error ? error.message : 'Unknown parsing error']
      };
    }
  }

  private cleanText(text: string): string {
    // Remove excessive whitespace and normalize line breaks
    return text
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]+/g, ' ')
      .trim();
  }

  private detectSections(text: string): Record<string, string[]> {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const sections: Record<string, string[]> = {};
    let currentSection = 'personalInfo';
    let currentContent: string[] = [];

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      // Check if this is a section header
      if (this.isSectionHeader(lowerLine)) {
        // Save previous section
        if (currentContent.length > 0) {
          sections[currentSection] = [...currentContent];
        }
        
        // Start new section
        currentSection = this.mapSectionHeader(lowerLine);
        currentContent = [];
      } else {
        currentContent.push(line);
      }
    }

    // Save the last section
    if (currentContent.length > 0) {
      sections[currentSection] = currentContent;
    }

    return sections;
  }

  private isSectionHeader(line: string): boolean {
    const sectionKeywords = [
      'summary', 'profile', 'about', 'objective', 'professional summary',
      'experience', 'work experience', 'employment', 'career', 'work history',
      'education', 'academic', 'qualifications', 'degrees',
      'skills', 'technical skills', 'competencies', 'expertise', 'technologies',
      'projects', 'portfolio', 'personal projects', 'side projects',
      'certifications', 'certificates', 'licenses',
      'awards', 'honors', 'achievements',
      'languages', 'language skills',
      'publications', 'papers', 'research',
      'volunteering', 'volunteer work', 'community service',
      'interests', 'hobbies', 'activities'
    ];

    return sectionKeywords.some(keyword => 
      line.includes(keyword + ':') || line === keyword
    );
  }

  private mapSectionHeader(line: string): string {
    if (line.includes('summary') || line.includes('profile') || line.includes('about') || line.includes('objective')) {
      return 'summary';
    }
    if (line.includes('experience') || line.includes('employment') || line.includes('career') || line.includes('work')) {
      return 'experience';
    }
    if (line.includes('education') || line.includes('academic') || line.includes('qualifications') || line.includes('degrees')) {
      return 'education';
    }
    if (line.includes('skills') || line.includes('competencies') || line.includes('expertise') || line.includes('technologies')) {
      return 'skills';
    }
    if (line.includes('projects') || line.includes('portfolio')) {
      return 'projects';
    }
    if (line.includes('certifications') || line.includes('certificates')) {
      return 'certifications';
    }
    if (line.includes('awards') || line.includes('honors')) {
      return 'awards';
    }
    if (line.includes('languages')) {
      return 'languages';
    }
    if (line.includes('publications') || line.includes('papers')) {
      return 'publications';
    }
    if (line.includes('volunteering') || line.includes('volunteer')) {
      return 'volunteering';
    }
    if (line.includes('interests') || line.includes('hobbies')) {
      return 'interests';
    }
    
    return 'personalInfo';
  }

  private parseSections(sections: Record<string, string[]>): any {
    const result: any = {
      personalInfo: this.parsePersonalInfo(sections.personalInfo || []),
      summary: this.parseSummary(sections.summary || []),
      experience: this.parseExperience(sections.experience || []),
      education: this.parseEducation(sections.education || []),
      skills: this.parseSkills(sections.skills || []),
      projects: this.parseProjects(sections.projects || []),
      certifications: this.parseCertifications(sections.certifications || []),
      awards: this.parseAwards(sections.awards || []),
      languages: this.parseLanguages(sections.languages || []),
      publications: this.parsePublications(sections.publications || []),
      volunteering: this.parseVolunteering(sections.volunteering || []),
      interests: this.parseInterests(sections.interests || [])
    };

    return result;
  }

  private parsePersonalInfo(content: string[]): any {
    const personalInfo: any = {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      links: []
    };

    // Extract email
    const emailMatch = content.join(' ').match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    if (emailMatch) {
      personalInfo.email = emailMatch[0];
    }

    // Extract phone
    const phoneMatch = content.join(' ').match(/(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/);
    if (phoneMatch) {
      personalInfo.phone = phoneMatch[0];
    }

    // Extract URLs
    const urlRegex = /https?:\/\/[^\s]+/g;
    const urls = content.join(' ').match(urlRegex) || [];
    personalInfo.links = urls.map((url, index) => ({
      id: `l${index + 1}`,
      label: this.extractLinkLabel(url),
      url,
      order: index + 1
    }));

    // Parse name and title from first few lines
    const cleanContent = content.filter(line => 
      !line.includes('@') && 
      !line.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/) &&
      !line.match(/(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/) &&
      !line.match(/https?:\/\/[^\s]+/)
    );

    if (cleanContent.length > 0) {
      personalInfo.name = cleanContent[0];
    }
    if (cleanContent.length > 1) {
      personalInfo.title = cleanContent[1];
    }
    if (cleanContent.length > 2) {
      personalInfo.location = cleanContent[2];
    }

    return personalInfo;
  }

  private parseSummary(content: string[]): string {
    return content.join(' ').trim();
  }

  private parseExperience(content: string[]): any[] {
    const experiences: any[] = [];
    let currentExp: any = null;

    for (const line of content) {
      if (this.looksLikeJobHeader(line)) {
        if (currentExp) {
          experiences.push(currentExp);
        }
        currentExp = this.parseJobHeader(line);
      } else if (currentExp && line.trim()) {
        if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
          currentExp.bullets.push({
            id: `b${Date.now()}-${currentExp.bullets.length + 1}`,
            text: line.substring(1).trim()
          });
        } else if (this.looksLikeDateRange(line)) {
          const dates = this.parseDateRange(line);
          currentExp.startDate = dates.start;
          currentExp.endDate = dates.end;
          currentExp.isCurrent = dates.isCurrent;
        } else if (this.looksLikeLocation(line)) {
          currentExp.location = line;
        } else {
          // Treat as description
          currentExp.bullets.push({
            id: `b${Date.now()}-${currentExp.bullets.length + 1}`,
            text: line
          });
        }
      }
    }

    if (currentExp) {
      experiences.push(currentExp);
    }

    return experiences.map((exp, index) => ({
      ...exp,
      id: `e${index + 1}`,
      order: index + 1
    }));
  }

  private parseEducation(content: string[]): any[] {
    const educations: any[] = [];
    let currentEdu: any = null;

    for (const line of content) {
      if (this.looksLikeDegreeHeader(line)) {
        if (currentEdu) {
          educations.push(currentEdu);
        }
        currentEdu = this.parseDegreeHeader(line);
      } else if (currentEdu && line.trim()) {
        if (line.toLowerCase().includes('gpa')) {
          currentEdu.gpa = line;
        } else if (line.toLowerCase().includes('honors')) {
          currentEdu.honors = [line];
        } else {
          currentEdu.coursework = currentEdu.coursework || [];
          currentEdu.coursework.push(line);
        }
      }
    }

    if (currentEdu) {
      educations.push(currentEdu);
    }

    return educations.map((edu, index) => ({
      ...edu,
      id: `ed${index + 1}`,
      order: index + 1
    }));
  }

  private parseSkills(content: string[]): any[] {
    const allSkills: string[] = [];
    
    for (const line of content) {
      const skills = line.split(/[,;|•\n]/)
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);
      allSkills.push(...skills);
    }
    
    return [...new Set(allSkills)].map(name => ({ name }));
  }

  private parseProjects(content: string[]): any[] {
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
          const urlMatch = line.match(/https?:\/\/[^\s]+/);
          if (urlMatch) {
            currentProject.links.push({
              label: 'Project Link',
              url: urlMatch[0]
            });
          }
        } else if (line.toLowerCase().includes('technologies:')) {
          const techs = line.split(':')[1]?.split(',').map(t => t.trim()).filter(Boolean) || [];
          currentProject.technologies.push(...techs);
        } else {
          currentProject.description = (currentProject.description || '') + ' ' + line;
        }
      }
    }

    if (currentProject) {
      projects.push(currentProject);
    }

    return projects.map((project, index) => ({
      ...project,
      id: `p${index + 1}`,
      order: index + 1
    }));
  }

  private parseCertifications(content: string[]): any[] {
    return content.map((line, index) => ({
      id: `c${index + 1}`,
      name: line,
      order: index + 1
    }));
  }

  private parseAwards(content: string[]): any[] {
    return content.map((line, index) => ({
      id: `a${index + 1}`,
      name: line,
      order: index + 1
    }));
  }

  private parseLanguages(content: string[]): any[] {
    return content.map(line => {
      const parts = line.split('-').map(p => p.trim());
      return {
        name: parts[0] || line,
        level: parts[1] || 'Native'
      };
    });
  }

  private parsePublications(content: string[]): any[] {
    return content.map((line, index) => ({
      id: `pub${index + 1}`,
      title: line,
      order: index + 1
    }));
  }

  private parseVolunteering(content: string[]): any[] {
    return content.map((line, index) => ({
      id: `v${index + 1}`,
      org: line,
      role: '',
      startDate: '',
      bullets: [],
      order: index + 1
    }));
  }

  private parseInterests(content: string[]): string[] {
    const allInterests: string[] = [];
    for (const line of content) {
      const interests = line.split(/[,;|•\n]/)
        .map(interest => interest.trim())
        .filter(interest => interest.length > 0);
      allInterests.push(...interests);
    }
    return [...new Set(allInterests)];
  }

  // Helper methods (same as before but cleaned up)
  private looksLikeJobHeader(line: string): boolean {
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
    const locationIndicators = [',', 'CA', 'NY', 'TX', 'FL', 'WA', 'remote', 'hybrid'];
    return locationIndicators.some(indicator => 
      line.toLowerCase().includes(indicator.toLowerCase())
    );
  }

  private looksLikeDegreeHeader(line: string): boolean {
    const degreeKeywords = ['bachelor', 'master', 'phd', 'associate', 'certificate', 'diploma'];
    return degreeKeywords.some(keyword => 
      line.toLowerCase().includes(keyword)
    );
  }

  private parseDegreeHeader(line: string): any {
    const parts = line.split(',').map(p => p.trim());
    
    return {
      degree: parts[0] || line,
      school: parts[1] || '',
      coursework: [],
      honors: []
    };
  }

  private looksLikeProjectHeader(line: string): boolean {
    const excludeKeywords = ['experience', 'education', 'skills', 'summary', 'at ', 'university', 'college'];
    const hasExcludeKeyword = excludeKeywords.some(keyword => 
      line.toLowerCase().includes(keyword)
    );
    
    return !hasExcludeKeyword && !line.startsWith('•') && !line.startsWith('-') && !line.startsWith('*');
  }

  private extractLinkLabel(url: string): string {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return 'Link';
    }
  }

  private cleanDataForTemplates(data: any): ResumeData {
    // Ensure all required fields are present and properly formatted
    return {
      id: `ai-parsed-${Date.now()}`,
      personalInfo: {
        name: data.personalInfo.name || '',
        title: data.personalInfo.title || '',
        email: data.personalInfo.email || '',
        phone: data.personalInfo.phone || '',
        location: data.personalInfo.location || '',
        links: data.personalInfo.links || []
      },
      summary: data.summary || '',
      experience: data.experience || [],
      education: data.education || [],
      skills: data.skills || [],
      projects: data.projects || [],
      certifications: data.certifications || [],
      awards: data.awards || [],
      languages: data.languages || [],
      publications: data.publications || [],
      volunteering: data.volunteering || [],
      interests: data.interests || [],
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    };
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
 * Convenience function to parse text using AI-enhanced approach
 */
export async function parseResumeTextWithAI(text: string): Promise<AIParseResult> {
  const parser = new AIResumeTextParser(text);
  return await parser.parse();
}


