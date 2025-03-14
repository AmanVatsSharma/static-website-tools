import { MetadataRoute } from 'next';

// For static export, we need to mark this route as static
export const dynamic = 'force-static';

/**
 * Generate robots.txt file for search engine crawling instructions
 * 
 * @returns {MetadataRoute.Robots} The robots.txt configuration
 */
export default function robots(): MetadataRoute.Robots {
  // For static export, we need to ensure the host is properly set
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://awe-machinery.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/server-sitemap.xml',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
} 