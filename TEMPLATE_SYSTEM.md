# Resume Template System

This document explains how to use and extend the resume template system for Mockstars.

## Overview

The template system consists of:
- **Template Data**: Structured data defining available templates (`lib/resume-templates.ts`)
- **Components**: Reusable React components for displaying templates (`components/resume/`)
- **Pages**: Full template gallery page (`app/templates/page.tsx`)

## Key Files

### 1. Template Data (`lib/resume-templates.ts`)
Defines the structure and metadata for all available templates:
```typescript
interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'traditional' | 'creative' | 'tech' | 'corporate';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  colors: string[];
  preview: string;
  features: string[];
  bestFor: string[];
  isPopular?: boolean;
}
```

### 2. Template Components

#### TemplateCard (`components/resume/TemplateCard.tsx`)
- Displays individual template preview cards
- Handles hover effects and selection states
- Shows template metadata (name, features, etc.)

#### TemplatePreview (`components/resume/TemplatePreview.tsx`)
- Renders miniature template previews
- Currently supports 7 different template designs
- Uses CSS to create template-specific layouts

#### TemplateShowcase (`components/resume/TemplateShowcase.tsx`)
- Complete section for homepage display
- Shows grid of 6 templates with navigation dots
- Includes header text and "View More" button

### 3. Pages

#### Homepage Integration (`app/page.tsx`)
The template showcase is integrated into the homepage between the "What You Actually Get" and "CTA Section with Pricing" sections.

#### Templates Gallery (`app/templates/page.tsx`)
- Full-page template browser
- Category filtering (All, Modern, Traditional, Creative, Corporate, Tech)
- Grid layout with responsive design
- Template selection functionality

## Usage

### Adding the Template Showcase to Homepage
The template showcase is already integrated into your homepage. The section includes:
- Professional header with description
- Grid of 6 template previews
- "View More Resume Templates" button linking to `/templates`
- Navigation dots for future carousel functionality

### Using Individual Components
```typescript
import { TemplateCard, TemplateShowcase } from '@/components/resume';
import { resumeTemplates } from '@/lib/resume-templates';

// Use individual template card
<TemplateCard 
  template={resumeTemplates[0]} 
  onSelect={(id) => console.log(id)}
  isSelected={false}
/>

// Use complete showcase section
<TemplateShowcase />
```

### Template Selection Flow
1. User sees templates on homepage or visits `/templates`
2. User clicks on a template card
3. `onSelect` callback is triggered with template ID
4. You can redirect to resume builder with selected template:
   ```typescript
   const handleTemplateSelect = (templateId: string) => {
     router.push(`/resume-builder?template=${templateId}`);
   };
   ```

## Customization

### Adding New Templates
1. Add template data to `resumeTemplates` array in `lib/resume-templates.ts`
2. Add preview rendering logic to `TemplatePreview.tsx`
3. Template will automatically appear in all UI components

### Styling Templates
- Templates use your existing Tailwind CSS classes
- Colors can be customized using the `color` prop in TemplatePreview
- Layout adjustments can be made in the individual template cases

### Template Categories
Current categories:
- `modern`: Contemporary designs with bold colors
- `traditional`: Classic, conservative layouts
- `creative`: Artistic designs with unique elements
- `tech`: Optimized for technology roles
- `corporate`: Professional business layouts

## Integration with Resume Builder

To connect with your resume builder:

1. **Template Selection**: Pass selected template ID via URL params or state
2. **Template Rendering**: Use the same preview components as starting points for full-size templates
3. **Color Customization**: Allow users to change template colors using the `colors` array from template data
4. **Content Population**: Map user data to template structures

## Future Enhancements

### Carousel Functionality
The navigation dots are ready for carousel implementation:
```typescript
// Add state for current template set
const [currentPage, setCurrentPage] = useState(0);
const templatesPerPage = 6;

// Implement pagination logic
const visibleTemplates = resumeTemplates.slice(
  currentPage * templatesPerPage, 
  (currentPage + 1) * templatesPerPage
);
```

### Template Favorites
Add user favorites functionality:
```typescript
// Add to template interface
interface ResumeTemplate {
  // ... existing properties
  isFavorited?: boolean;
}

// Add favorite toggle to TemplateCard
const handleFavoriteToggle = (templateId: string) => {
  // Update user preferences
};
```

### Preview Improvements
- Add real content preview using sample data
- Implement template color theming
- Add template difficulty indicators
- Show template popularity metrics

## Best Practices

1. **Performance**: Template previews are optimized for quick rendering
2. **Responsive Design**: All components work across device sizes
3. **Accessibility**: Include proper ARIA labels and keyboard navigation
4. **SEO**: Templates page includes proper meta tags and headings
5. **User Experience**: Hover effects and loading states provide clear feedback

## Template Preview Design Patterns

Each template preview follows these patterns:
- **Header**: Name/title area with consistent sizing
- **Content Areas**: Simulated text blocks using gray bars
- **Color Accents**: Template-specific color implementations
- **Layout Structure**: Sidebar, grid, or traditional layouts
- **Visual Hierarchy**: Clear section separation and content grouping

The preview system uses CSS styling to create recognizable template patterns while maintaining fast rendering performance.
