// app/templates/page.tsx
'use client';

import React, { useState } from 'react';
import { resumeTemplates, getTemplatesByCategory, TemplateCategories } from '@/lib/resume/resume-types';
import { TemplateCard,  } from '@/components/resume/TemplateCard';

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const filteredTemplates = selectedCategory === 'all' 
    ? resumeTemplates 
    : getTemplatesByCategory(selectedCategory as any);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    // Navigate to resume builder with selected template
    console.log('Selected template:', templateId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mattone">
              Professional Resume Templates
            </h1>
            <p className="text-lg text-gray-600 font-outfit">
              Choose from our collection of ATS-friendly, professionally designed resume templates.
              Each template is optimized to help you stand out to employers and pass applicant tracking systems.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-outfit transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={handleTemplateSelect}
                isSelected={selectedTemplate === template.id}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 font-mattone">
              Ready to build your professional resume?
            </h3>
            <p className="text-gray-600 mb-6 font-outfit">
              Get started with our AI-powered resume builder and create a job-winning resume in minutes.
            </p>
            <button className="bg-blue text-white px-8 py-3 rounded-lg font-mattone hover:bg-blue/90 transition-colors">
              Start Building Your Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
