'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resumeTemplates } from '@/lib/resume/resume-types';
import { TemplateCard } from './TemplateCard';

export const TemplateShowcase: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Update visible count based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1); // mobile
      } else if (width < 768) {
        setVisibleCount(2); // small tablet
      } else if (width < 1024) {
        setVisibleCount(3); // tablet
      } else if (width < 1280) {
        setVisibleCount(4); // small desktop
      } else if (width < 1536) {
        setVisibleCount(5); // large desktop
      } else {
        setVisibleCount(6); // xl desktop
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const totalTemplates = resumeTemplates.length;

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    console.log('Selected template:', templateId);
  };

  const handleViewMore = () => {
    console.log('View more templates');
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= totalTemplates ? 0 : nextIndex;
    });
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? totalTemplates - 1 : nextIndex;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Calculate if we should show navigation arrows
  const showNavigation = totalTemplates > visibleCount;

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
              onClick={handleViewMore}
              className="mt-6 px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-blue hover:text-blue transition-colors font-outfit"
            >
              Explore All Templates
            </button>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            {showNavigation && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 
                             w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg 
                             flex items-center justify-center text-gray-600 hover:text-blue 
                             hover:bg-white transition-all duration-200 border border-gray-200
                             hover:border-blue hover:shadow-xl"
                  aria-label="Previous templates"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 
                             w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg 
                             flex items-center justify-center text-gray-600 hover:text-blue 
                             hover:bg-white transition-all duration-200 border border-gray-200
                             hover:border-blue hover:shadow-xl"
                  aria-label="Next templates"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Templates Carousel */}
            <div 
              ref={carouselRef}
              className="overflow-hidden mx-8"
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{ 
                  transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                  width: `${(totalTemplates * 100) / visibleCount}%`
                }}
              >
                {resumeTemplates.slice(0, 6).map((template, index) => (
                  <div 
                    key={template.id} 
                    className="flex-shrink-0"
                    style={{ width: `${100 / totalTemplates}%` }}
                  >
                    <TemplateCard
                      template={template}
                      onSelect={handleTemplateSelect}
                      isSelected={selectedTemplate === template.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: Math.ceil(totalTemplates/visibleCount) }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-blue w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to template ${index + 1}`}
              />
            ))}
          </div>

          {/* Template Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500 font-outfit">
              {currentIndex + 1} of {Math.ceil(totalTemplates/visibleCount)} templates
            </span>
          </div>

          {/* Template Categories Quick Nav */}
          {/* <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['startup', 'corporate', 'creative', 'traditional', 'executive'].map((category) => (
              <button
                key={category}
                onClick={() => {
                  // Find first template in category and navigate to it
                  const categoryIndex = resumeTemplates.findIndex(t => t.category === category);
                  if (categoryIndex !== -1) {
                    goToSlide(categoryIndex);
                  }
                }}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-blue hover:text-white 
                           rounded-full transition-colors duration-200 font-outfit capitalize"
              >
                {category}
              </button>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
};
