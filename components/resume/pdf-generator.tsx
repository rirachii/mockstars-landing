import React from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { TemplateCustomization, TemplateId, getTemplate } from '@/lib/resume/resume-types';

interface ResumeData {
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

interface PDFGeneratorProps {
  resumeData: ResumeData;
  template: TemplateId;
  showPreview?: boolean;
  customization: TemplateCustomization;
}

export const PDFGenerator: React.FC<PDFGeneratorProps> = ({ 
  resumeData, 
  template,
  showPreview = false,
  customization
}) => {
  // Select template component based on template prop
  const getTemplateComponent = () => {
    const templateInfo = getTemplate(template);
    if (templateInfo) {
      const TemplateComponent = templateInfo.component;
      return <TemplateComponent data={resumeData} customization={customization} />;
    }
    // Fallback to modern template
    const fallbackTemplate = getTemplate('mockstars')!;
    const FallbackComponent = fallbackTemplate.component;
    return <FallbackComponent data={resumeData} customization={customization} />;
  };

  const fileName = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;

  return (
    <div className="space-y-4">
      {/* Download Button */}
      <div className="flex gap-4">
        <PDFDownloadLink
          document={getTemplateComponent()}
          fileName={fileName}
          className="inline-flex"
        >
          {({ blob, url, loading, error }) => (
            <Button 
              disabled={loading}
              className="bg-blue hover:bg-blue/90 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              {loading ? 'Generating PDF...' : 'Download Resume'}
            </Button>
          )}
        </PDFDownloadLink>

        <Button
          variant="outline"
          onClick={() => window.open('', '_blank')}
          className="border-blue text-blue hover:bg-blue/10"
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
      </div>

      {/* PDF Preview */}
      {showPreview && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="h-[600px]">
            <PDFViewer width="100%" height="100%">
              {getTemplateComponent()}
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
};

// Example usage component
export const ResumeBuilder: React.FC<{ template: TemplateId }> = ({ template } ) => {
  // Example customization - this would come from your customization state
  const exampleCustomization: TemplateCustomization = {
    primaryColor: '#397DC2',
    fontSize: 'default',
    fontFamily: 'Helvetica',
    sectionSpacing: 16,
    paragraphSpacing: 8,
    lineSpacing: 1.4
  };

  // This would typically come from a form or state management
  const sampleResumeData: ResumeData = {
    personalInfo: {
      name: "John Doe",
      title: "Senior Software Engineer",
      email: "john.doe@email.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johndoe",
      website: "johndoe.dev"
    },
    summary: "Experienced software engineer with 5+ years developing scalable web applications. Specialized in React, Node.js, and cloud infrastructure.",
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Corp",
        startDate: "Jan 2022",
        endDate: "Present",
        location: "San Francisco, CA",
        description: [
          "Led development of microservices architecture serving 1M+ users",
          "Improved application performance by 40% through optimization",
          "Mentored 3 junior developers and conducted code reviews"
        ]
      },
      {
        title: "Software Engineer",
        company: "StartupXYZ",
        startDate: "Jun 2020",
        endDate: "Dec 2021",
        location: "Remote",
        description: [
          "Built responsive web applications using React and TypeScript",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
          "Collaborated with design team to improve user experience"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of California, Berkeley",
        year: "2020",
        gpa: "3.8"
      }
    ],
    skills: [
      "JavaScript", "TypeScript", "React", "Node.js", "Python", 
      "AWS", "Docker", "MongoDB", "PostgreSQL", "Git"
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Full-stack e-commerce solution with payment integration",
        technologies: ["React", "Node.js", "Stripe", "MongoDB"]
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Resume Builder</h1>
      
      <div className="space-y-8">
        {/* Form would go here */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            Resume form components would go here...
          </p>
        </div>

        {/* PDF Generator */}
        <PDFGenerator 
          resumeData={sampleResumeData}
          template={template}
          showPreview={true}
          customization={exampleCustomization}
        />
      </div>
    </div>
  );
};
