import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mockstars.app'
  
  const routes = [
    '',
    '/about',
    '/features',
    '/contact',
    '/pricing',
    '/privacy',
    '/terms'
  ]

  const commonRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Add documentation routes with specific priorities
  const docRoutes = [
    '/docs/api',
    '/docs/integration',
    '/docs/privacy',
    '/docs/security'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...commonRoutes, ...docRoutes]
} 