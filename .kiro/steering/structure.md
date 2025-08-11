# Project Structure & Architecture

## Directory Organization

```
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog functionality with MDX
│   ├── resume-builder/    # Main resume builder application
│   ├── templates/         # Template showcase pages
│   └── layout.tsx         # Root layout with providers
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── resume/           # Resume-specific components
│   ├── blog/             # Blog-specific components
│   ├── layout/           # Layout components (nav, footer)
│   └── common/           # Shared components (CTA, providers)
├── lib/                  # Utility functions and shared logic
│   ├── resume/           # Resume data types and utilities
│   ├── pdf/              # PDF parsing and generation
│   └── hooks/            # Custom React hooks
├── content/              # MDX blog posts
├── public/               # Static assets (fonts, images, logos)
├── styles/               # Global CSS and font definitions
└── hooks/                # Additional custom hooks
```

## Architecture Patterns

### Component Organization
- **UI Components**: Generic, reusable components in `components/ui/`
- **Feature Components**: Domain-specific components grouped by feature
- **Layout Components**: Navigation, footer, and page structure
- **Page Components**: App Router pages in `app/` directory

### Data Flow
- **Resume Data**: Centralized types in `lib/resume/template-types.ts`
- **Template System**: 20+ templates with personality-driven naming
- **PDF Generation**: React-PDF components for resume rendering
- **Local Storage**: Client-side persistence for resume data

### Styling Conventions
- **Tailwind Classes**: Utility-first CSS with custom design tokens
- **Custom Fonts**: Mattone (headings), Outfit (body text)
- **Color System**: Brand colors (teal, purple, pink, orange, blue)
- **Responsive Design**: Mobile-first approach with breakpoints

### File Naming
- **Components**: PascalCase (e.g., `TemplateCard.tsx`)
- **Pages**: kebab-case for routes (e.g., `resume-builder/`)
- **Utilities**: camelCase (e.g., `useLocalStorage.ts`)
- **Types**: Descriptive interfaces (e.g., `TemplateInfo`, `ResumeData`)

### Import Patterns
- **Path Aliases**: Use `@/` for all internal imports
- **Component Exports**: Barrel exports in index files where appropriate
- **Type Imports**: Use `import type` for TypeScript types