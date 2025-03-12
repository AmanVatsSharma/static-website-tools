import { MetadataRoute } from 'next';

// Product categories and their slugs
const productCategories = [
  { slug: 'brush-cutters', name: 'Brush Cutters' },
  { slug: 'chainsaws', name: 'Chainsaws' },
  { slug: 'hand-seeders', name: 'Hand Seeders' },
  { slug: 'power-tillers', name: 'Power Tillers' },
  { slug: 'water-pumps', name: 'Water Pumps' },
];

// Mock product data - in a real app, this would come from a database or API
const products = [
  { id: 'brush-cutter-1', slug: 'brush-cutter-bc-520', category: 'brush-cutters' },
  { id: 'brush-cutter-2', slug: 'brush-cutter-bc-430', category: 'brush-cutters' },
  { id: 'chainsaw-1', slug: 'chainsaw-cs-580', category: 'chainsaws' },
  { id: 'chainsaw-2', slug: 'chainsaw-cs-450', category: 'chainsaws' },
  { id: 'seeder-1', slug: 'hand-seeder-hs-100', category: 'hand-seeders' },
  { id: 'seeder-2', slug: 'hand-seeder-hs-200', category: 'hand-seeders' },
  { id: 'tiller-1', slug: 'power-tiller-pt-750', category: 'power-tillers' },
  { id: 'tiller-2', slug: 'power-tiller-pt-500', category: 'power-tillers' },
  { id: 'pump-1', slug: 'water-pump-wp-30', category: 'water-pumps' },
];

/**
 * Generate a dynamic sitemap for the website
 * 
 * @returns {MetadataRoute.Sitemap} The sitemap entries
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://awe-machinery.com';
  
  // Core pages
  const corePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];
  
  // Category pages
  const categoryPages = productCategories.map((category) => ({
    url: `${baseUrl}/products/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  // Product pages
  const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.category}/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  // Legal pages
  const legalPages = [
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];
  
  // Combine all pages
  return [...corePages, ...categoryPages, ...productPages, ...legalPages];
} 