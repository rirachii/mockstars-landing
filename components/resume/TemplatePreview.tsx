// components/resume/TemplatePreview.tsx
import React from 'react';

interface TemplatePreviewProps {
  templateId: string;
  color?: string;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ 
  templateId, 
  color = '#1d4ed8' // default blue
}) => {
  const renderPreview = () => {
    switch (templateId) {
      case 'elegant':
        return (
          <div className="h-full">
            <div className="border-gray-200 pb-2 mb-3">
              <div className="text-center">
                <div className="h-3 bg-gray-800 rounded mb-1"></div>
                <div className="h-1 bg-gray-400 rounded w-2/3 mx-auto"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex">
                <div className="w-1/3 pr-2">
                  <div className="h-1 bg-gray-300 rounded mb-1"></div>
                  <div className="h-1 bg-gray-300 rounded mb-1 w-3/4"></div>
                  <div className="h-1 bg-gray-300 rounded mb-2 w-1/2"></div>
                  <div className="h-1 bg-gray-300 rounded mb-1"></div>
                  <div className="h-1 bg-gray-300 rounded w-2/3"></div>
                </div>
                <div className="w-2/3 pl-2">
                  <div className="h-1 bg-gray-600 rounded mb-1"></div>
                  <div className="h-1 bg-gray-300 rounded mb-1"></div>
                  <div className="h-1 bg-gray-300 rounded mb-1 w-4/5"></div>
                  <div className="h-1 bg-gray-300 rounded mb-2 w-3/5"></div>
                  <div className="h-1 bg-gray-600 rounded mb-1"></div>
                  <div className="h-1 bg-gray-300 rounded mb-1"></div>
                  <div className="h-1 bg-gray-300 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'chicago':
        return (
          <div className="h-full">
            <div className="text-center border-gray-300 pb-2 mb-3">
              <div className="h-3 rounded mb-1" style={{ backgroundColor: color }}></div>
              <div className="h-1 bg-gray-400 rounded w-1/2 mx-auto"></div>
            </div>
            <div className="space-y-2">
              <div className="h-1 rounded mb-1" style={{ backgroundColor: color }}></div>
              <div className="space-y-1 mb-2">
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-300 rounded w-4/5"></div>
                <div className="h-1 bg-gray-300 rounded w-3/5"></div>
              </div>
              <div className="h-1 rounded mb-1" style={{ backgroundColor: color }}></div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-300 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        );
      
      case 'clean':
        return (
          <div className="h-full">
            <div className="bg-orange-400 text-white p-2 mb-3">
              <div className="h-2 bg-white bg-opacity-80 rounded mb-1"></div>
              <div className="h-1 bg-white bg-opacity-60 rounded w-2/3"></div>
            </div>
            <div className="space-y-2">
              <div className="flex">
                <div className="w-1/3 pr-2 space-y-1">
                  <div className="h-1 bg-orange-400 rounded"></div>
                  <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="w-2/3 pl-2 space-y-1">
                  <div className="h-1 bg-orange-400 rounded"></div>
                  <div className="h-1 bg-gray-300 rounded"></div>
                  <div className="h-1 bg-gray-300 rounded w-4/5"></div>
                  <div className="h-1 bg-gray-300 rounded w-3/5"></div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'taj-mahal':
        return (
          <div className="h-full">
            <div className="text-center mb-3">
              <div className="h-3 bg-gray-800 rounded mb-1"></div>
              <div className="h-1 bg-gray-400 rounded w-2/3 mx-auto mb-2"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto"></div>
            </div>
            <div className="space-y-2">
              <div className="border-l-2 border-purple-400 pl-2">
                <div className="h-1 bg-purple-400 rounded mb-1"></div>
                <div className="h-1 bg-gray-300 rounded mb-1"></div>
                <div className="h-1 bg-gray-300 rounded w-4/5"></div>
              </div>
              <div className="border-l-2 border-purple-400 pl-2">
                <div className="h-1 bg-purple-400 rounded mb-1"></div>
                <div className="h-1 bg-gray-300 rounded w-3/5"></div>
              </div>
            </div>
          </div>
        );
      
      case '2025':
        return (
          <div className="h-full">
            <div className="bg-gray-800 text-white p-2 mb-3">
              <div className="h-2 bg-white bg-opacity-80 rounded mb-1"></div>
              <div className="h-1 bg-white bg-opacity-60 rounded w-1/2"></div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-1 bg-gray-800 rounded mb-1"></div>
                  <div className="h-1 bg-gray-400 rounded w-2/3"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-600 rounded"></div>
                <div className="flex space-x-1">
                  <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                  <div className="w-8 h-1 bg-gray-400 rounded"></div>
                </div>
                <div className="h-1 bg-gray-300 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        );
      
      case 'corporate':
        return (
          <div className="h-full">
            <div className="border-gray-800 pb-2 mb-3">
              <div className="h-3 bg-gray-800 rounded mb-1"></div>
              <div className="h-1 bg-gray-400 rounded w-2/3"></div>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div className="h-1 bg-gray-800 rounded"></div>
                  <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-1 bg-gray-800 rounded"></div>
                  <div className="h-1 bg-gray-300 rounded w-4/5"></div>
                  <div className="h-1 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
              <div className="space-y-1 mt-3">
                <div className="h-1 bg-gray-800 rounded"></div>
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-300 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        );
      
      case 'advanced':
        return (
          <div className="h-full">
            <div className="text-right mb-3">
              <div className="h-3 bg-gray-800 rounded mb-1"></div>
              <div className="h-1 bg-gray-400 rounded w-1/2 ml-auto"></div>
            </div>
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="h-1 bg-gray-600 rounded"></div>
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-300 rounded w-4/5"></div>
                <div className="h-1 bg-gray-300 rounded w-3/5"></div>
              </div>
              <div className="space-y-1 mt-3">
                <div className="h-1 bg-gray-600 rounded"></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-1 bg-gray-300 rounded"></div>
                  <div className="h-1 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-xs text-gray-400">{templateId} Preview</div>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-white shadow-sm">
      {renderPreview()}
    </div>
  );
};

export default TemplatePreview;
