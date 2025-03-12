import React from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  structuredData?: Record<string, any>;
  children?: React.ReactNode;
}

/**
 * SEO component for managing page-specific meta tags
 * 
 * @component
 * @example
 * ```tsx
 * <SEO 
 *   title="Product Name - AWE"
 *   description="High-quality product description"
 *   ogType="product"
 *   ogImage="/products/product-image.jpg"
 * />
 * ```
 */
export function SEO({
  title = 'AWE - Premium Agricultural Machinery for Indian Farmers',
  description = 'High-quality agricultural equipment designed specifically for Indian farming conditions.',
  canonicalUrl,
  ogType = 'website',
  ogImage = '/og-image.jpg',
  ogImageAlt = 'AWE Agricultural Machinery',
  ogImageWidth = 1200,
  ogImageHeight = 630,
  twitterCard = 'summary_large_image',
  noIndex = false,
  structuredData,
  children,
}: SEOProps) {
  const pathname = usePathname();
  const siteUrl = 'https://awe-machinery.com';
  const fullUrl = canonicalUrl || `${siteUrl}${pathname}`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="AWE Agricultural Machinery" />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:image:width" content={ogImageWidth.toString()} />
      <meta property="og:image:height" content={ogImageHeight.toString()} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="hi_IN" />
      
      {/* Twitter Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      <meta name="twitter:creator" content="@AWEMachinery" />
      
      {/* Robots Tags */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
      
      {children}
    </Head>
  );
} 