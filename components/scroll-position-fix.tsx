'use client';

import React, { useEffect } from 'react';
import { isClient } from '@/lib/client-utils';

/**
 * Function to fix static positioning - safe to call from anywhere
 */
function fixElementPositioning(element: HTMLElement) {
  if (window.getComputedStyle(element).position === 'static') {
    element.style.position = 'relative';
    console.log('[ScrollFix] Fixed static positioning on element:', element);
  }
}

/**
 * ScrollPositionFix applies fixes to static positioning in the DOM
 * to ensure Framer Motion scroll animations work correctly.
 * 
 * This component should be placed at the root level of your application.
 */
export function ScrollPositionFix() {
  useEffect(() => {
    if (!isClient) return;
    
    // Function to fix static positioning
    const fixStaticPositioning = () => {
      console.log('[ScrollFix] Applying global positioning fixes');
      
      // Find all elements using scroll features
      const scrollElements = document.querySelectorAll(
        '.scroll-trigger, .motion-safe-container, [data-framer-scroll="true"]'
      );
      
      scrollElements.forEach(element => {
        // Fix the element itself
        fixElementPositioning(element as HTMLElement);
        
        // Fix all parent elements to ensure they have proper positioning
        let parent = element.parentElement;
        while (parent) {
          fixElementPositioning(parent as HTMLElement);
          parent = parent.parentElement;
        }
      });
    };
    
    // Apply fixes after a short delay to ensure DOM is fully loaded
    const timeoutId = setTimeout(fixStaticPositioning, 500);
    
    // Also apply fixes on window resize
    window.addEventListener('resize', fixStaticPositioning);
    
    // Apply fixes when scroll container mounts
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          fixStaticPositioning();
        }
      });
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', fixStaticPositioning);
      observer.disconnect();
    };
  }, []);
  
  // This component doesn't render anything
  return null;
} 