'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resumeTemplates } from '@/lib/resume/resume-types';
import { TemplateCard } from './TemplateCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

export const TemplateShowcase: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

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
              Choose Your Perfect Resume Style
            </h2>
            <p className="text-lg text-gray-600 font-outfit max-w-4xl mx-auto">
              From Silicon Valley startups to Wall Street boardrooms, we've got the perfect template 
              for your career journey. Each design is crafted with personality and optimized for ATS systems.
            </p>
            <button 
              onClick={() => console.log('View more templates')}
              className="mt-6 px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-blue hover:text-blue transition-colors font-outfit"
            >
              Explore All Templates
            </button>
          </div>

          {/* Carousel */}
          <div className="relative">
            <Carousel className="mx-8">
              <CarouselContent>
                {resumeTemplates.map((template) => (
                  <CarouselItem key={template.id} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <TemplateCard
                      template={template}
                      onSelect={setSelectedTemplate}
                      isSelected={selectedTemplate === template.id}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-blue" />
              <CarouselNext className="bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-blue" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};
