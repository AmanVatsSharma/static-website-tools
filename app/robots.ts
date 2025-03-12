import { MetadataRoute } from 'next';

/**
 * Generate robots.txt file for search engine crawling instructions
 * 
 * @returns {MetadataRoute.Robots} The robots.txt configuration
 */
export default function robots(): MetadataRoute.Robots {
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
    sitemap: 'https://awe-machinery.com/sitemap.xml',
    host: 'https://awe-machinery.com',
  };
} 