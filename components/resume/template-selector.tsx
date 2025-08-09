'use client';

import React from 'react';
import { templates, TemplateType } from './resume/pdf-templates';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onTemplateSelect: (template: TemplateType) => void;
  className?: string;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateSelect,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Choose Your Template
        </h3>
        <p className="text-sm text-gray-600">
          Select a professional template that matches your industry and style.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={cn(
              "relative border-2 rounded-lg overflow-hidden transition-all cursor-pointer hover:shadow-lg",
              selectedTemplate === template.id
                ? "border-blue shadow-md" 
                : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() => onTemplateSelect(template.id)}
          >
            {/* Template Preview */}
            <div className="relative h-64 bg-gray-100">
              {/* You would replace this with actual template previews */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-20 bg-white border border-gray-300 mx-auto mb-2 rounded shadow-sm">
                    <div className="p-2 space-y-1">
                      <div className="h-1 bg-gray-300 rounded"></div>
                      <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-px bg-gray-200 my-1"></div>
                      <div className="space-y-0.5">
                        <div className="h-0.5 bg-gray-300 rounded"></div>
                        <div className="h-0.5 bg-gray-200 rounded w-4/5"></div>
                        <div className="h-0.5 bg-gray-200 rounded w-3/5"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Preview Coming Soon</p>
                </div>
              </div>
              
              {/* Selection Indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-blue rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-1">
                {template.name}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {template.description}
              </p>
              
              <Button
                variant={selectedTemplate === template.id ? "default" : "outline"}
                size="sm"
                className={cn(
                  "w-full mt-3",
                  selectedTemplate === template.id 
                    ? "bg-blue hover:bg-blue/90" 
                    : "border-gray-300"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onTemplateSelect(template.id);
                }}
              >
                {selectedTemplate === template.id ? "Selected" : "Select Template"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Complete Resume Builder with Template Selection
export const ResumeBuilderWithTemplates: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = React.useState<TemplateType>('modern');
  
  // Sample data - this would come from your form
  const sampleResumeData = {
    personalInfo: {
      name: "John Doe",
      title: "Senior Software Engineer",
      email: "john.doe@email.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
    },
    experience: [],
    education: [],
    skills: [],
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Your Professional Resume
        </h1>
        <p className="text-gray-600">
          Build a standout resume with our AI-powered templates
        </p>
      </div>

      {/* Template Selection */}
      <TemplateSelector
        selectedTemplate={selectedTemplate}
        onTemplateSelect={setSelectedTemplate}
      />

      {/* Resume Form would go here */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Resume Information</h3>
        <p className="text-gray-600">
          Resume form components will be integrated here...
        </p>
      </div>

      {/* Live Preview would go here */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
        <p className="text-gray-600">
          PDF preview with selected template will appear here...
        </p>
      </div>
    </div>
  );
};
