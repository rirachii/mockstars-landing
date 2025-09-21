# Text-Based Resume Builder

## Overview

The text-based resume builder allows users to paste their resume text and automatically converts it into a professionally formatted resume. The system uses AI-enhanced parsing to intelligently extract and structure resume data.

## How It Works

### 1. Text Input
Users paste their resume text in any format. The system is flexible and can handle various formats:

```
John Smith
Software Engineer
john.smith@email.com
(555) 123-4567
San Francisco, CA

SUMMARY
Experienced software engineer with 5+ years developing scalable web applications...

EXPERIENCE
Senior Software Engineer at TechCorp
Jan 2022 - Present
• Led development of microservices architecture...
```

### 2. AI-Enhanced Parsing
The `AIResumeTextParser` class:
- Cleans and normalizes the input text
- Detects section headers automatically
- Extracts structured data from each section
- Handles various date formats, bullet points, and separators
- Provides helpful warnings for missing information

### 3. Data Adaptation
The `ResumeDataAdapter` converts the parsed data to the format expected by different resume templates:
- Standardizes date formats
- Converts skills arrays to the correct format
- Adapts experience bullets and descriptions
- Extracts LinkedIn/website links from personal info

### 4. Template Rendering
The adapted data is passed to the PDF generator, which supports 20+ professional templates.

## Data Format Requirements

### Input Text Format
The parser is flexible and supports various formats:

**Section Headers** (case-insensitive):
- `SUMMARY`, `PROFILE`, `ABOUT`, `OBJECTIVE`
- `EXPERIENCE`, `WORK EXPERIENCE`, `EMPLOYMENT`, `CAREER`
- `EDUCATION`, `ACADEMIC`, `QUALIFICATIONS`, `DEGREES`
- `SKILLS`, `TECHNICAL SKILLS`, `COMPETENCIES`, `EXPERTISE`
- `PROJECTS`, `PORTFOLIO`, `PERSONAL PROJECTS`
- `CERTIFICATIONS`, `CERTIFICATES`, `LICENSES`
- `AWARDS`, `HONORS`, `ACHIEVEMENTS`
- `LANGUAGES`, `LANGUAGE SKILLS`
- `PUBLICATIONS`, `PAPERS`, `RESEARCH`
- `VOLUNTEERING`, `VOLUNTEER WORK`, `COMMUNITY SERVICE`
- `INTERESTS`, `HOBBIES`, `ACTIVITIES`

**Experience Format**:
```
Job Title at Company Name
Start Date - End Date (or Present)
Location (optional)
• Achievement 1
• Achievement 2
• Achievement 3
```

**Education Format**:
```
Degree Name
School/University Name
Year (or Start Year - End Year)
GPA: 3.7 (optional)
```

**Skills Format**:
```
Skill1, Skill2, Skill3, Skill4
```

**Projects Format**:
```
Project Name
Project description here...
Technologies: Tech1, Tech2, Tech3
```

### Output Data Structure

The parser generates a `ResumeData` object with this structure:

```typescript
interface ResumeData {
  id: string;
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    location?: string;
    links?: Array<{ id: string; label: string; url: string; order: number }>;
  };
  summary?: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate?: string;
    isCurrent?: boolean;
    bullets: Array<{ id: string; text: string }>;
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
  skills: Array<{ name: string; level?: SkillLevel; category?: string }>;
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
  // ... other optional sections
}
```

### Template-Compatible Format

The `ResumeDataAdapter` converts the data to the format expected by templates:

```typescript
interface TemplateResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
    links?: Array<{ id: string; label: string; url: string }>;
  };
  summary?: string;
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    location?: string;
    bullets?: Array<{ text: string }>;
    description?: string[];
  }>;
  education: Array<{
    degree: string;
    school: string;
    startYear?: string;
    endYear?: string;
    year?: string;
    gpa?: string;
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}
```

## Key Features

### Smart Section Detection
- Automatically recognizes section headers
- Handles variations in naming (e.g., "Work Experience" vs "Employment")
- Maps different section names to standard categories

### Flexible Date Parsing
- Supports various date formats: "Jan 2022", "2022-01", "January 2022"
- Handles "Present" and "Current" for ongoing positions
- Converts dates to ISO format for consistency

### Intelligent Bullet Point Recognition
- Detects bullet points with different symbols (•, -, *, etc.)
- Preserves formatting and structure
- Handles multi-line descriptions

### Contact Information Extraction
- Automatically finds email addresses
- Extracts phone numbers in various formats
- Identifies and categorizes URLs (LinkedIn, GitHub, personal websites)

### Skills Processing
- Handles comma-separated, semicolon-separated, or line-separated skills
- Removes duplicates automatically
- Preserves original formatting

## Usage Examples

### Basic Usage
```typescript
import { parseResumeTextWithAI } from '@/lib/resume/ai-text-parser'
import { createTemplateResumeData } from '@/lib/resume/data-adapter'

const result = await parseResumeTextWithAI(userText)
if (result.success && result.data) {
  const templateData = createTemplateResumeData(result.data)
  // Use templateData with PDF generator
}
```

### Error Handling
```typescript
const result = await parseResumeTextWithAI(userText)
if (!result.success) {
  console.error('Parse errors:', result.errors)
} else {
  if (result.warnings?.length > 0) {
    console.warn('Parse warnings:', result.warnings)
  }
  // Proceed with parsed data
}
```

## File Structure

```
lib/resume/
├── ai-text-parser.ts          # AI-enhanced text parser
├── data-adapter.ts            # Template data adapter
├── text-parser.ts             # Original basic parser
├── resume-data.ts             # Type definitions
└── ai-parser-demo.ts          # Demo and testing

components/resume/
└── text-resume-builder.tsx    # Main UI component

app/resume-builder/
├── text/page.tsx              # Text builder page
└── page.tsx                   # Main builder landing page
```

## Testing

Run the demo to test the parser:

```typescript
import { testAIParser } from '@/lib/resume/ai-parser-demo'
await testAIParser()
```

## Future Enhancements

1. **Real AI Integration**: Connect to OpenAI/Claude for even better parsing
2. **Format Suggestions**: Provide suggestions for improving text format
3. **Batch Processing**: Handle multiple resumes at once
4. **Custom Templates**: Allow users to create custom parsing rules
5. **Validation**: Add more sophisticated data validation and correction

## Troubleshooting

### Common Issues

1. **Missing Sections**: Ensure section headers are clearly marked
2. **Date Format**: Use consistent date formats (e.g., "Jan 2022" or "2022-01")
3. **Bullet Points**: Use consistent bullet symbols (•, -, or *)
4. **Contact Info**: Include email and phone in a clear format

### Debug Mode

Enable debug mode to see raw parsed data:

```typescript
const result = await parseResumeTextWithAI(text)
console.log('Raw data:', result.rawData)
```


