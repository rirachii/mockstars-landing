// components/resume/TemplateCard.tsx
import React from 'react';
import { TemplateInfo } from '@/lib/resume/resume-types';
import TemplatePreview from './TemplatePreview';

interface TemplateCardProps {
  template: TemplateInfo;
  onSelect: (templateId: string) => void;
  isSelected?: boolean;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ 
  template, 
  onSelect, 
  isSelected = false 
}) => {
  return (
    <div className="group cursor-pointer" onClick={() => onSelect(template.id)}>
      <div className={`
        bg-white rounded-lg shadow-lg overflow-hidden border-2 transition-all duration-300 transform group-hover:scale-105
        ${isSelected ? 'border-blue' : 'border-transparent group-hover:border-blue'}
      `}>
        <div className="aspect-[8/11] bg-gray-50 p-4 relative overflow-hidden">
          {/* Template Preview */}
          <TemplatePreview templateId={template.id} />
          
          {/* Use This Template Button */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-all duration-300 flex items-center justify-center">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-outfit">
              📄 Use This Template
            </button>
          </div>
          
          {/* Selected Badge */}
          {isSelected && (
            <div className="absolute top-2 right-2 bg-blue text-white rounded-full p-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}

          {/* Popular Badge */}
          {template.isPro && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-outfit">
              Pro
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center mt-3">
        <h3 className="font-bold text-gray-800 font-mattone">{template.name}</h3>
        <p className="text-sm text-gray-600 font-outfit mt-1">{template.description}</p>
        
        {/* Template Features */}
        <div className="flex justify-center gap-1 mt-2">
          {template.features.slice(0, 2).map((feature: string, index: number) => (
            <span 
              key={index} 
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-outfit"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
