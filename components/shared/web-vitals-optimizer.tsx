'use client';

import { useEffect } from 'react';

/**
 * WebVitalsOptimizer Component
 * 
 * This component implements strategies to optimize Core Web Vitals:
 * - Largest Contentful Paint (LCP)
 * - Cumulative Layout Shift (CLS)
 * - First Input Delay (FID) / Interaction to Next Paint (INP)
 * 
 * @component
 */
export function WebVitalsOptimizer() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Optimize Largest Contentful Paint (LCP)
    const optimizeLCP = () => {
      // Prioritize main hero image loading
      const preloadHeroImage = () => {
        const heroImages = document.querySelectorAll('.hero-section img, .hero-section video');
        if (heroImages.length > 0) {
          heroImages.forEach(img => {
            if (img instanceof HTMLImageElement && img.src) {
              const preloadLink = document.createElement('link');
              preloadLink.rel = 'preload';
              preloadLink.as = 'image';
              preloadLink.href = img.src;
              document.head.appendChild(preloadLink);
            } else if (img instanceof HTMLVideoElement && img.poster) {
              const preloadLink = document.createElement('link');
              preloadLink.rel = 'preload';
              preloadLink.as = 'image';
              preloadLink.href = img.poster;
              document.head.appendChild(preloadLink);
            }
          });
        }
      };

      // Prefetch critical assets
      const prefetchCriticalAssets = () => {
        // Add fonts preloading (only for critical fonts)
        const fontFiles = ['/fonts/main-font.woff2']; // Add your actual font files
        fontFiles.forEach(fontFile => {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'font';
          preloadLink.href = fontFile;
          preloadLink.setAttribute('crossorigin', 'anonymous');
          document.head.appendChild(preloadLink);
        });
      };

      preloadHeroImage();
      prefetchCriticalAssets();
    };

    // 2. Minimize Cumulative Layout Shift (CLS)
    const minimizeCLS = () => {
      // Set explicit dimensions for images
      const setExplicitImageDimensions = () => {
        const allImages = document.querySelectorAll('img:not([width]):not([height])');
        allImages.forEach(img => {
          if (img instanceof HTMLImageElement) {
            // Set explicit width/height once image loads if not already set
            if (!img.width && !img.height) {
              img.style.aspectRatio = '16/9'; // Default aspect ratio
            }
          }
        });
      };

      // Reserve space for dynamic content (ads, embeds, etc.)
      const reserveSpaceForDynamicContent = () => {
        const dynamicContainers = document.querySelectorAll('[data-dynamic-content]');
        dynamicContainers.forEach(container => {
          const minHeight = container.getAttribute('data-min-height');
          if (minHeight) {
            container.setAttribute('style', `min-height: ${minHeight}px`);
          }
        });
      };

      setExplicitImageDimensions();
      reserveSpaceForDynamicContent();
    };

    // 3. Improve First Input Delay (FID) / Interaction to Next Paint (INP)
    const optimizeInteractions = () => {
      // Break up long tasks
      const breakUpLongTasks = () => {
        // This is a simple example of task chunking
        // In a real app, you'd identify specific long-running tasks
        const chunkedFunction = (callback: Function, data: any[], chunkSize = 100) => {
          let index = 0;
          
          function doChunk() {
            const chunk = data.slice(index, index + chunkSize);
            index += chunkSize;
            
            // Process current chunk
            chunk.forEach(item => callback(item));
            
            // Schedule next chunk if needed
            if (index < data.length) {
              setTimeout(doChunk, 0);
            }
          }
          
          doChunk();
        };

        // Expose helper for use in other scripts
        (window as any).chunkTasks = chunkedFunction;
      };

      // Add event listeners with passive option where appropriate
      const optimizeEventListeners = () => {
        // Find common scroll/touch elements
        const scrollElements = document.querySelectorAll('.scroll-container, main, .overflow-auto');
        
        scrollElements.forEach(el => {
          // Remove any existing listeners (optional, depends on your app)
          const clone = el.cloneNode(true);
          el.parentNode?.replaceChild(clone, el);
          
          // Re-add optimized event listeners
          clone.addEventListener('scroll', () => {}, { passive: true });
          clone.addEventListener('touchstart', () => {}, { passive: true });
        });
      };

      breakUpLongTasks();
      optimizeEventListeners();
    };

    // 4. Implement back/forward cache optimization (bfcache)
    const optimizeBFCache = () => {
      // Avoid using unload event
      window.addEventListener('pagehide', (event) => {
        // This runs when the page is being unloaded or put into the bfcache
        // Use this instead of beforeunload/unload where possible
      });
    };

    // 5. Monitor Core Web Vitals for reporting
    const monitorWebVitals = () => {
      // Only apply if the web vitals library is available
      if ('webVitals' in window) {
        try {
          (window as any).webVitals.onLCP((metric: any) => {
            console.log('LCP:', metric.value);
          });
          
          (window as any).webVitals.onFID((metric: any) => {
            console.log('FID:', metric.value);
          });
          
          (window as any).webVitals.onCLS((metric: any) => {
            console.log('CLS:', metric.value);
          });

          (window as any).webVitals.onINP((metric: any) => {
            console.log('INP:', metric.value);
          });
        } catch (e) {
          console.warn('Failed to initialize web-vitals monitoring', e);
        }
      }
    };

    // Execute optimizations immediately
    optimizeLCP();
    minimizeCLS();
    
    // Execute less critical optimizations on idle or after load
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        optimizeInteractions();
        optimizeBFCache();
        monitorWebVitals();
      });
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          optimizeInteractions();
          optimizeBFCache();
          monitorWebVitals();
        }, 1000);
      });
    }

    // Cleanup (not much needed here as most effects are one-time operations)
    return () => {
      // Any cleanup if needed
    };
  }, []);

  // This component doesn't render anything visible
  return null;
} 