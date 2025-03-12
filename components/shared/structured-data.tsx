import React from 'react';

interface OrganizationSchemaProps {
  name?: string;
  logo?: string;
  url?: string;
  description?: string;
  foundingDate?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
}

/**
 * Generates Organization Schema.org structured data
 * 
 * @component
 * @example
 * ```tsx
 * <OrganizationSchema 
 *   name="AWE Agricultural Machinery"
 *   logo="https://awe-machinery.com/logo.png"
 *   url="https://awe-machinery.com"
 * />
 * ```
 */
export function OrganizationSchema({
  name = 'AWE Agricultural Machinery',
  logo = 'https://awe-machinery.com/logo.png',
  url = 'https://awe-machinery.com',
  description = 'Premium agricultural equipment designed specifically for Indian farming conditions.',
  foundingDate = '1998',
  telephone = '+919876543210',
  email = 'info@awe-machinery.com',
  address = {
    streetAddress: '123 Agriculture Road',
    addressLocality: 'Delhi',
    addressRegion: 'Delhi',
    postalCode: '110001',
    addressCountry: 'IN',
  },
  sameAs = [
    'https://facebook.com/AWEMachinery',
    'https://youtube.com/AWEMachinery',
    'https://instagram.com/AWEMachinery',
  ],
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    logo,
    url,
    description,
    foundingDate,
    telephone,
    email,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ProductSchemaProps {
  name: string;
  image: string | string[];
  description: string;
  sku?: string;
  brand?: string;
  category?: string;
  offers?: {
    price?: number;
    priceCurrency?: string;
    availability?: string;
    url?: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

/**
 * Generates Product Schema.org structured data
 * 
 * @component
 * @example
 * ```tsx
 * <ProductSchema 
 *   name="AWE Brush Cutter BC-520"
 *   image="/products/brush-cutter-bc-520.jpg"
 *   description="High-performance brush cutter with 52cc engine"
 * />
 * ```
 */
export function ProductSchema({
  name,
  image,
  description,
  sku,
  brand = 'AWE',
  category,
  offers,
  aggregateRating,
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    image: Array.isArray(image) ? image : [image],
    description,
    ...(sku && { sku }),
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    ...(category && { category }),
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.priceCurrency || 'INR',
        availability: offers.availability || 'https://schema.org/InStock',
        url: offers.url,
      },
    }),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

/**
 * Generates FAQ Schema.org structured data
 * 
 * @component
 * @example
 * ```tsx
 * <FAQSchema 
 *   questions={[
 *     { question: "What is AWE?", answer: "AWE is a premium agricultural machinery brand..." }
 *   ]}
 * />
 * ```
 */
export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    item?: string;
  }>;
}

/**
 * Generates BreadcrumbList Schema.org structured data
 * 
 * @component
 * @example
 * ```tsx
 * <BreadcrumbSchema 
 *   items={[
 *     { name: "Home", item: "https://awe-machinery.com" },
 *     { name: "Products", item: "https://awe-machinery.com/products" },
 *     { name: "Brush Cutters" }
 *   ]}
 * />
 * ```
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.item && { item: item.item }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
} 