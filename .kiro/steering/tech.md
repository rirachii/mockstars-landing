# Tech Stack & Development

## Framework & Core Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui with Radix UI primitives
- **PDF Generation**: @react-pdf/renderer
- **Content**: MDX for blog posts with remark/rehype plugins
- **Analytics**: PostHog for user tracking
- **Theme**: next-themes for dark/light mode support

## Build System & Package Management

- **Package Manager**: pnpm (preferred) or npm
- **Node Version**: 18.x or later
- **Build Tool**: Next.js built-in bundler
- **Output**: Standalone deployment

## Common Commands

```bash
# Development
pnpm dev          # Start development server on localhost:3000
pnpm build        # Create production build
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Alternative with npm
npm run dev
npm run build
npm run start
npm run lint
```

## Key Dependencies

- **UI**: @radix-ui/* components, lucide-react icons
- **Forms**: react-hook-form with @hookform/resolvers
- **PDF**: @react-pdf/renderer, pdfjs-dist, react-pdf
- **Content**: @mdx-js/react, gray-matter, remark-gfm
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## Development Environment

- **TypeScript**: Strict mode enabled
- **Path Aliases**: `@/*` maps to project root
- **CSS**: Global styles in `styles/globals.css`
- **Fonts**: Custom fonts (Mattone, Outfit) loaded via CSS
- **Images**: Next.js Image optimization with AVIF/WebP support