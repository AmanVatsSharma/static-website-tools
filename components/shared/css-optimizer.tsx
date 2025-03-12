'use client';

import { useEffect } from 'react';

interface CSSOptimizerProps {
  criticalCSS?: string;
}

/**
 * CSS Optimizer Component
 * 
 * This component optimizes CSS delivery by:
 * 1. Inlining critical CSS to improve First Contentful Paint (FCP)
 * 2. Deferring non-critical CSS to improve Largest Contentful Paint (LCP)
 * 3. Implementing dynamic CSS loading based on viewport
 * 
 * @component
 */
export function CSSOptimizer({ criticalCSS }: CSSOptimizerProps) {
  useEffect(() => {
    // Function to load non-critical CSS asynchronously
    const loadDeferredCSS = () => {
      // Find all link elements with the 'defer' attribute
      const deferredLinks = document.querySelectorAll('link[rel="stylesheet"][defer]');
      
      deferredLinks.forEach((link) => {
        // Remove defer attribute and set rel to stylesheet
        link.removeAttribute('defer');
      });
    };

    // Function to handle media queries for responsive styles
    const handleResponsiveStyles = () => {
      const mediaLinks = document.querySelectorAll('link[media][rel="stylesheet"]');
      
      mediaLinks.forEach((link) => {
        const mediaAttr = link.getAttribute('media');
        if (mediaAttr && window.matchMedia(mediaAttr).matches) {
          // If media query matches, load the stylesheet
          link.setAttribute('media', 'all');
        }
      });
    };

    // Load non-critical CSS after page is interactive
    if (document.readyState === 'complete') {
      loadDeferredCSS();
      handleResponsiveStyles();
    } else {
      window.addEventListener('load', () => {
        loadDeferredCSS();
        handleResponsiveStyles();
      });
    }

    // Implement Intersection Observer for lazy-loading CSS
    const lazyLoadCSS = () => {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const lazyLink = entry.target as HTMLLinkElement;
              if (lazyLink.dataset.href) {
                lazyLink.href = lazyLink.dataset.href;
                lazyLink.removeAttribute('data-href');
                observer.unobserve(lazyLink);
              }
            }
          });
        }, { rootMargin: '200px' });

        document.querySelectorAll('link[data-href]').forEach((link) => {
          observer.observe(link);
        });
      } else {
        // Fallback for browsers that don't support Intersection Observer
        document.querySelectorAll('link[data-href]').forEach((link) => {
          const lazyLink = link as HTMLLinkElement;
          if (lazyLink.dataset.href) {
            lazyLink.href = lazyLink.dataset.href;
            lazyLink.removeAttribute('data-href');
          }
        });
      }
    };

    lazyLoadCSS();

    // Clean up event listeners
    return () => {
      window.removeEventListener('load', loadDeferredCSS);
    };
  }, []);

  return (
    <>
      {criticalCSS && (
        <style id="critical-css" dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      )}
    </>
  );
}

/**
 * Critical CSS Generator
 * 
 * This function extracts critical CSS based on above-the-fold content
 * Can be used in build process to generate critical CSS for specific pages
 */
export function extractCriticalCSS(htmlContent: string): string {
  // This is a placeholder for a real critical CSS extraction algorithm
  // In production, this would be replaced with a build-time process using tools like critical
  if (typeof window === 'undefined') {
    return ''; // Server-side rendering case
  }
  
  // Simple example of what critical CSS might contain
  return `
    /* Critical above-the-fold styles */
    body { display: block; font-family: system-ui, -apple-system, sans-serif; margin: 0; }
    .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    .header { position: fixed; top: 0; left: 0; right: 0; z-index: 50; }
    .hero-section { min-height: 100vh; display: flex; align-items: center; }
  `;
} 