'use client';

import React from 'react';
import { OptimizedImage } from './optimized-image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  fadeIn?: boolean;
  sizes?: string;
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

/**
 * ResponsiveImage component that provides different sizes based on breakpoints
 * 
 * @component
 * @example
 * ```tsx
 * <ResponsiveImage
 *   src="/product-image.jpg"
 *   alt="Product"
 *   width={1200}
 *   height={800}
 *   breakpoints={{ sm: 400, md: 600, lg: 800, xl: 1200 }}
 * />
 * ```
 */
export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className,
  wrapperClassName,
  priority = false,
  fadeIn = true,
  sizes: customSizes,
  breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  ...props
}: ResponsiveImageProps) {
  const { sm, md, lg, xl } = breakpoints;
  
  // Generate sizes attribute based on breakpoints
  const defaultSizes = [
    sm && `(max-width: 640px) ${sm}px`,
    md && `(max-width: 768px) ${md}px`,
    lg && `(max-width: 1024px) ${lg}px`,
    xl && `(max-width: 1280px) ${xl}px`,
    `${width}px`,
  ].filter(Boolean).join(', ');
  
  // Use custom sizes if provided, otherwise use default
  const sizes = customSizes || defaultSizes;
  
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      wrapperClassName={wrapperClassName}
      priority={priority}
      fadeIn={fadeIn}
      sizes={sizes}
      {...props}
    />
  );
} 