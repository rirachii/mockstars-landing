import React from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { DEFAULT_CUSTOMIZATION, TemplateCustomization, TemplateId, getTemplate } from '@/lib/resume/template-types';
import { pdf as renderPdf } from '@react-pdf/renderer'
import { Document as PdfDoc, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import { ResumeData } from '@/lib/resume/resume-data';
import { DemoResume } from '@/lib/resume/resume-storage';

interface PDFGeneratorProps {
  resumeData: ResumeData;
  template: TemplateId;
  showPreview?: boolean;
  customization: TemplateCustomization;
  showButtons?: boolean;
}

export const PDFGenerator: React.FC<PDFGeneratorProps> = ({ 
  resumeData, 
  template,
  showPreview = false,
  showButtons = false,
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
      {showButtons && (
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
      )}

      {/* PDF Preview */}
      {showPreview && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="h-[100vh]">
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
  

  // This would typically come from a form or state management
  

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
          resumeData={DemoResume}
          template={template}
          showPreview={true}
          customization={DEFAULT_CUSTOMIZATION}
          showButtons={true}
        />
      </div>
    </div>
  );
};
