import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  aspectRatio?: string;
  wrapperClassName?: string;
  loadingClassName?: string;
  fadeIn?: boolean;
}

/**
 * OptimizedImage component that extends Next.js Image with additional features
 * 
 * @component
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/product-image.jpg"
 *   alt="Product"
 *   width={600}
 *   height={400}
 *   fadeIn
 *   aspectRatio="4/3"
 * />
 * ```
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fallbackSrc = '/placeholder-image.jpg',
  aspectRatio,
  wrapperClassName,
  className,
  loadingClassName,
  fadeIn = true,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(!priority);
  const [error, setError] = useState(false);
  
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };
  
  const imageSrc = error ? fallbackSrc : src;
  
  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        aspectRatio && `aspect-[${aspectRatio}]`,
        wrapperClassName
      )}
      style={{ position: 'relative' }}
    >
      {isLoading && (
        <div 
          className={cn(
            'absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse',
            loadingClassName
          )}
          style={{ position: 'absolute' }}
        >
          <span className="sr-only">Loading image</span>
        </div>
      )}
      
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'object-cover',
          fadeIn && 'transition-opacity duration-500',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
        {...props}
      />
    </div>
  );
} 