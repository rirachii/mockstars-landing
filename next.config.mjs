let userConfig = undefined
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for better LLM crawling
  output: 'standalone',
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60,
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Cache headers for static assets
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          }
        ],
      }
    ]
  },

  // Redirects for clean URLs
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig;

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      };
    } else {
      nextConfig[key] = config[key];
    }
  }
}

// Define PostHog rewrites
const posthogRewrites = [
  {
    source: "/ingest/static/:path*",
    destination: "https://us-assets.i.posthog.com/static/:path*",
  },
  {
    source: "/ingest/:path*",
    destination: "https://us.i.posthog.com/:path*",
  },
  {
    source: "/ingest/decide",
    destination: "https://us.i.posthog.com/decide",
  },
];

// Combine existing rewrites (if any) with PostHog rewrites
const existingRewrites = nextConfig.rewrites;
nextConfig.rewrites = async () => {
  const baseRewrites = existingRewrites ? await existingRewrites() : [];
  return [
    ...baseRewrites,
    ...posthogRewrites,
  ];
};

// Add skipTrailingSlashRedirect required by PostHog
nextConfig.skipTrailingSlashRedirect = true;

export default nextConfig
