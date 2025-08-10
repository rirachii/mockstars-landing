// Resume Template Showcase - Demo Component
import React from 'react';
import { FilledClassicTemplate } from './filled-classic-template';
import { FilledModernTemplate } from './filled-modern-template';
import { FilledPiedPiperTemplate } from './filled-pied-piper-template';
import { FilledGyattPointsTemplate } from './filled-gyatt-points-template';
import { mockProfile, mockProfiles } from './mock-profile';

// Export all the filled templates for easy use
export const resumeTemplateShowcase = {
  classic: FilledClassicTemplate,
  modern: FilledModernTemplate,
  piedPiper: FilledPiedPiperTemplate,
  gyattPoints: FilledGyattPointsTemplate,
};

// Template descriptions for documentation
export const templateDescriptions = {
  classic: {
    name: 'Classic Professional',
    description: 'Traditional, timeless design with clean typography and structured layout. Perfect for conservative industries like finance, law, or academia.',
    features: ['Times Roman font', 'Two-column layout for education/skills', 'Traditional black borders', 'Formal structure'],
    bestFor: 'Finance, Legal, Healthcare, Government, Academia'
  },
  modern: {
    name: 'Modern Professional',
    description: 'Contemporary design with MockStars brand colors, clean spacing, and modern typography. Great for tech and creative industries.',
    features: ['MockStars brand colors (#397DC2)', 'Colored skill tags', 'Modern spacing and typography', 'Highlighted sections'],
    bestFor: 'Tech, Startups, Design, Marketing, Consulting'
  },
  rizzume: {
    name: 'Rizzume',
    description: 'Clean and professional with subtle modern touches. Balanced design that works well across most industries.',
    features: ['Subtle background colors', 'Card-based layout', 'Professional yet approachable', 'Good use of whitespace'],
    bestFor: 'General purpose, Business, Sales, Operations'
  },
  piedPiper: {
    name: 'Pied Piper (Silicon Valley)',
    description: 'Tech-focused design with green accents and startup-friendly layout. Perfect for engineers and tech professionals.',
    features: ['Silicon Valley inspired', 'Green color scheme', 'Technical skills emphasis', 'Clean, minimal design'],
    bestFor: 'Software Engineering, Tech Startups, DevOps, Data Science'
  },
  gyattPoints: {
    name: 'Gyatt Points (Creative)',
    description: 'Bold, colorful, and attention-grabbing design. Perfect for creative fields where standing out is important.',
    features: ['Bright colors and emojis', 'Eye-catching design', 'Playful typography', 'Creative section headers'],
    bestFor: 'Creative Industries, Entertainment, Social Media, Youth-oriented roles'
  }
};

// Mock profile options for testing different scenarios
export const profileOptions = {
  senior_engineer: mockProfile,
  junior_designer: mockProfiles.juniorDesigner,
  marketing_manager: mockProfiles.marketingManager,
};

// Usage examples for developers
export const usageExamples = `
// Import templates
import { resumeTemplateShowcase, templateDescriptions } from './resume-template-showcase';

// Generate PDF with specific template
import { PDFDownloadLink } from '@react-pdf/renderer';

function ResumeDownloadButton({ templateKey, userData }) {
  const TemplateComponent = resumeTemplateShowcase[templateKey];
  
  return (
    <PDFDownloadLink
      document={<TemplateComponent data={userData} />}
      fileName={userData.personalInfo.name + '_resume.pdf'}
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download PDF'
      }
    </PDFDownloadLink>
  );
}

// Preview templates
function TemplatePreview({ templateKey }) {
  const TemplateComponent = resumeTemplateShowcase[templateKey];
  const description = templateDescriptions[templateKey];
  
  return (
    <div>
      <h3>{description.name}</h3>
      <p>{description.description}</p>
      <PDFViewer>
        <TemplateComponent />
      </PDFViewer>
    </div>
  );
}
`;

// Template comparison matrix
export const templateComparison = {
  formality: {
    classic: 9,      // Most formal
    modern: 7,       // Professional but modern
    rizzume: 6,      // Balanced
    piedPiper: 5,    // Tech casual
    gyattPoints: 2   // Very casual/creative
  },
  creativity: {
    classic: 2,      // Very conservative
    modern: 6,       // Some creative elements
    rizzume: 5,      // Moderately creative
    piedPiper: 7,    // Tech-creative
    gyattPoints: 10  // Highly creative
  },
  techFriendly: {
    classic: 3,      // Traditional
    modern: 8,       // Good for tech
    rizzume: 6,      // Decent for tech
    piedPiper: 10,   // Perfect for tech
    gyattPoints: 4   // Too creative for most tech roles
  },
  atsOptimized: {
    classic: 9,      // Simple structure, ATS-friendly
    modern: 7,       // Good structure with some styling
    rizzume: 8,      // Clean structure
    piedPiper: 8,    // Good for tech ATS systems
    gyattPoints: 3   // Complex styling may confuse ATS
  }
};

// Color schemes used across templates
export const colorSchemes = {
  classic: {
    primary: '#000000',
    secondary: '#666666',
    background: '#ffffff',
    accent: '#000000'
  },
  modern: {
    primary: '#397DC2',  // MockStars main color
    secondary: '#666666',
    background: '#FBF5E2', // MockStars background
    accent: '#D3D0CE'    // MockStars dark grey
  },
  rizzume: {
    primary: '#212529',
    secondary: '#6C757D',
    background: '#F8F9FA',
    accent: '#0D6EFD'
  },
  piedPiper: {
    primary: '#00A651',  // Pied Piper green
    secondary: '#666666',
    background: '#FAFAFA',
    accent: '#333333'
  },
  gyattPoints: {
    primary: '#FF1493',  // Deep pink
    secondary: '#FF4500', // Orange red
    background: '#FF69B4', // Hot pink
    accent: '#FFD700'    // Gold
  }
};

console.log('Resume Template Showcase initialized with:');
console.log('- 5 filled templates with mock data');
console.log('- Template descriptions and comparisons');
console.log('- Multiple mock profiles for testing');
console.log('- Usage examples and documentation');
