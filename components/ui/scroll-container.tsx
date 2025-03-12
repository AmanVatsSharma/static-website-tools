'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ScrollFixContainer } from '@/lib/framer-motion-helpers';

interface ScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  id?: string;
}

/**
 * Fix static positioning of elements recursively
 */
function fixParentPositioning(element: HTMLElement | null) {
  if (!element) return;
  
  // Fix all parent elements with static positioning
  let parent = element.parentElement;
  while (parent) {
    if (window.getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative';
      console.log('[ScrollFix] Fixed static positioning in parent:', parent);
    }
    parent = parent.parentElement;
  }
}

/**
 * ScrollContainer component
 * 
 * Wrap any component that uses Framer Motion's scroll features (useScroll, scrollYProgress)
 * to ensure it has proper positioning for scroll calculations.
 * 
 * @example
 * <ScrollContainer>
 *   <YourComponentWithScrollFeatures />
 * </ScrollContainer>
 */
export function ScrollContainer({
  children,
  className,
  as: Component = 'div',
  id,
}: ScrollContainerProps) {
  // Create a ref to check for static positioning issues
  const containerRef = useRef<HTMLElement | null>(null);
  
  // Fix parent elements positioning on mount
  useEffect(() => {
    if (containerRef.current) {
      fixParentPositioning(containerRef.current);
    }
  }, []);
  
  return (
    <ScrollFixContainer 
      id={id} 
      className={className}
    >
      <Component
        ref={containerRef}
        className={cn('scroll-trigger motion-safe-container', className)}
        style={{ 
          position: 'relative',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform'
        }}
      >
        {children}
      </Component>
    </ScrollFixContainer>
  );
} 