// components/resume/TemplateShowcase.tsx
'use client';

import React, { useState } from 'react';
import { resumeTemplates } from '@/lib/resume-templates';
import { TemplateCard } from './TemplateCard';

export const TemplateShowcase: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    // Add your logic here to handle template selection
    console.log('Selected template:', templateId);
  };

  const handleViewMore = () => {
    // Navigate to templates page or show more templates
    console.log('View more templates');
  };

  return (
    <section className="py-16 bg-white/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-2xs uppercase tracking-widest text-blue mb-4 font-mattone">
              PROFESSIONAL TEMPLATES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mattone">
              Job-Winning Resume Templates
            </h2>
            <p className="text-lg text-gray-600 font-outfit max-w-4xl mx-auto">
              Our templates are designed and approved by HR experts to fit a wide range of jobs and experience 
              levels. Choose your favorite to showcase your professional background and make your resume 
              stand out among the competition.
            </p>
            <button 
              onClick={handleViewMore}
              className="mt-6 px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-blue hover:text-blue transition-colors font-outfit"
            >
              View More Resume Templates
            </button>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {resumeTemplates.slice(0, 6).map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={handleTemplateSelect}
                isSelected={selectedTemplate === template.id}
              />
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
