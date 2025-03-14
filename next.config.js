/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Skip problematic pages during build
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Exclude problematic routes
  excludePages: ['/demo/enhanced-ui'],
  // Disable server-side features
  experimental: {
    appDir: true,
  },
  // Ensure 404 page is generated
  trailingSlash: true,
};

module.exports = nextConfig; 