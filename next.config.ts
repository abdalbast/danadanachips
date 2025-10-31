import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// For static export, we need to configure next-intl without middleware
const withNextIntl = createNextIntlPlugin('./i18n.ts');

// Detect if running in GitHub Actions and set basePath for project pages
const isCI = process.env.GITHUB_ACTIONS === 'true';
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';

const nextConfig: NextConfig = {
  // IMPORTANT: Conditional static export is required for next-intl compatibility
  // Static export conflicts with next-intl's server-side functions (getMessages, getTranslations)
  // which use headers() internally. See TROUBLESHOOTING.md for details.
  // Only use static export in production/CI when deploying to static hosting
  ...(process.env.NODE_ENV === 'production' || isCI
    ? { output: 'export' }
    : {}),
  trailingSlash: true,
  // Only set basePath for GitHub Pages (project pages); keep root paths for local/dev
  ...(isCI && repo
    ? {
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
      }
    : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default withNextIntl(nextConfig);
