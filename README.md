# Mockstars Landing Page

The landing page for Mockstars - an AI-powered interview practice platform that helps you prepare for interviews with confidence.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm
- Git

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/mockstars-landing.git
cd mockstars-landing
```

2. Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. Install dependencies:
```bash
pnpm install
# or if using npm
npm install
```

### Development

Start the development server:
```bash
pnpm dev
# or if using npm
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

### Build

To create a production build:
```bash
pnpm build
# or if using npm
npm run build
```

To start the production server:
```bash
pnpm start
# or if using npm
npm start
```

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Analytics**: PostHog
- **Fonts**: Mattone, Outfit (Google Fonts)
- **Deployment**: Standalone output

## 📁 Project Structure

```
mockstars-landing/
├── app/                    # Next.js app router pages
├── components/             # Reusable React components
├── lib/                    # Utility functions and shared logic
├── public/                 # Static assets
├── styles/                 # Global styles and Tailwind config
└── hooks/                  # Custom React hooks
```

## 🔍 SEO & Performance

The project includes:
- Dynamic sitemap generation
- JSON-LD structured data
- OpenGraph and Twitter Card meta tags
- Optimized image loading with next/image
- Semantic HTML structure

## 📝 Development Guidelines

1. **Code Style**
   - Use TypeScript for type safety
   - Follow the existing project structure
   - Use semantic HTML elements
   - Implement responsive design with Tailwind CSS

2. **Performance**
   - Optimize images before adding to the project
   - Use proper lazy loading for images and components
   - Keep bundle size minimal

3. **Accessibility**
   - Maintain ARIA roles and labels
   - Ensure proper heading hierarchy
   - Test with keyboard navigation

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved. 