// app/templates/page.tsx
'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { resumeTemplates, getTemplatesByCategory, TemplateCategories, TemplateInfo } from '@/lib/resume/template-types';
import { TemplateCard } from '@/components/resume/TemplateCard';
import CTA from '@/components/common/CTA';

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const router = useRouter();

  const filteredTemplates = selectedCategory === 'all' 
    ? resumeTemplates 
    : getTemplatesByCategory(selectedCategory as keyof typeof TemplateCategories);

  const categories = useMemo(() => {
    const entries = Object.entries(TemplateCategories).map(([id, meta]) => ({
      id,
      name: meta.name,
      count: resumeTemplates.filter(t => t.category === (id as keyof typeof TemplateCategories)).length,
    }))
    const total = resumeTemplates.length
    return [{ id: 'all', name: 'All', count: total }, ...entries]
  }, [])

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    // Navigate to resume builder with selected template
    console.log('Selected template:', templateId);
  };

  return (
    <div className="flex flex-col min-h-screen text-gray-800 font-outfit relative z-10">
      {/* Header */}
      <div className="">
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
            {filteredTemplates.map((template: TemplateInfo) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={handleTemplateSelect}
                isSelected={selectedTemplate === template.id}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center ">
            <CTA
              title="Ready to build your professional resume?"
              subtitle="Get started with our AI-powered resume builder and create a job-winning resume in minutes."
              primaryButtonText="Start Building Your Resume"
              onPrimaryClick={() => {
                router.push('/resume-builder')
              }}
            />
          </div>
          {/* <div className="mt-12 text-center bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 font-mattone">
              Ready to build your professional resume?
            </h3>
            <p className="text-gray-600 mb-6 font-outfit">
              Get started with our AI-powered resume builder and create a job-winning resume in minutes.
            </p>
            <button className="bg-blue text-white px-8 py-3 rounded-lg font-mattone hover:bg-blue/90 transition-colors">
              Start Building Your Resume
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
