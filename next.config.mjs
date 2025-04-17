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
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
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
