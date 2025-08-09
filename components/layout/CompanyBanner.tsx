import React from 'react';
import Image from 'next/image';

const companies = [
  { name: 'Google', logo: '/logos/logos.png' },
  { name: 'Amazon', logo: '/logos/logos.png' }, 
  { name: 'Meta', logo: '/logos/logos.png' },
  { name: 'J.P.Morgan', logo: '/logos/jpmorgan.png' },
  { name: 'Palantir', logo: '/logos/logos.png' },
  { name: 'Microsoft', logo: '/logos/logos.png' }
];

interface CompanyBannerProps {
  showLogos?: boolean;
  title?: string;
  speed?: number; // Animation duration in seconds
}

export function CompanyBanner({ 
  showLogos = false, 
  title = "Trusted by professionals at:",
  speed = 12
}: CompanyBannerProps) {
  return (
    <div className="w-full py-8 overflow-hidden">
      {title && (
        <div className="text-center mb-4">
          <p className="text-sm md:text-base font-medium text-gray-600 uppercase tracking-wider">
            {title}
          </p>
        </div>
      )}
      
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        {/* <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div> */}
        
        {/* Scrolling content */}
        <div 
          className="flex animate-scroll"
          style={{ 
            '--scroll-duration': `${speed}s`,
          } as React.CSSProperties}
        >
          {/* First set of companies */}
          <div className="flex items-center space-x-12 md:space-x-16 px-8 whitespace-nowrap">
            {companies.map((company, index) => (
              <div key={`first-${index}`} className="flex items-center justify-center">
                {showLogos ? (
                  <div className="h-8 md:h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      width={120}
                      height={48}
                      className="h-full w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                ) : (
                    <div className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-600 opacity-60 hover:opacity-100 transition-opacity duration-500 font-mattone">
                    {company.name}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Duplicate set for seamless loop - exact same spacing */}
          <div className="flex items-center space-x-12 md:space-x-16 px-8 whitespace-nowrap">
            {companies.map((company, index) => (
              <div key={`second-${index}`} className="flex items-center justify-center">
                {showLogos ? (
                  <div className="h-8 md:h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      width={120}
                      height={48}
                      className="h-full w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                ) : (
                  <div className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-600 opacity-60 hover:opacity-100 transition-opacity duration-500 font-mattone">
                    {company.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}