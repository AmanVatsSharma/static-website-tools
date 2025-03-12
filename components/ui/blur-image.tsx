'use client';

import React from 'react';
import { OptimizedImage } from './optimized-image';

interface BlurImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  fadeIn?: boolean;
}

/**
 * BlurImage component that adds blur-up loading effect
 * 
 * @component
 * @example
 * ```tsx
 * <BlurImage
 *   src="/product-image.jpg"
 *   alt="Product"
 *   width={600}
 *   height={400}
 *   blurDataURL="data:image/jpeg;base64,..."
 * />
 * ```
 */
export function BlurImage({
  src,
  alt,
  width,
  height,
  blurDataURL,
  className,
  wrapperClassName,
  priority = false,
  fadeIn = true,
  ...props
}: BlurImageProps) {
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
      placeholder="blur"
      blurDataURL={blurDataURL}
      {...props}
    />
  );
} 