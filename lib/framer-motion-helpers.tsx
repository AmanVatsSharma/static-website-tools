'use client';

import React, { useEffect, useRef } from 'react';
import { isClient } from './client-utils';

/**
 * Function to fix static positioning of an element and its parents
 * Non-hook version that can be called from within useEffect
 */
function fixStaticPositioning(element: HTMLElement | null) {
  if (!isClient || !element) return;
  
  // Fix all ancestor positioning recursively
  let currentElement: HTMLElement | null = element;
  while (currentElement) {
    if (window.getComputedStyle(currentElement).position === 'static') {
      currentElement.style.position = 'relative';
      console.log(`[ScrollFix] Fixed position for element:`, currentElement.tagName, currentElement.className);
    }
    currentElement = currentElement.parentElement;
  }
}

/**
 * Higher-order component that ensures proper positioning for Framer Motion's useScroll
 * 
 * This HOC wraps a component and ensures all its ancestors have proper non-static positioning
 * which is required for Framer Motion's useScroll to work correctly.
 * 
 * @param Component The component to wrap
 * @param componentName Optional name for debugging purposes
 */
export function withProperScrollPositioning<P extends object>(
  Component: React.ComponentType<P>,
  componentName = 'UnnamedComponent'
): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Apply positioning fixes after component mounts
    useEffect(() => {
      if (!isClient || !containerRef.current) return;
      
      console.log(`[ScrollFix] Applying positioning fix for ${componentName}`);
      fixStaticPositioning(containerRef.current);
    }, []);
    
    return (
      <div 
        ref={containerRef} 
        style={{ position: 'relative' }}
        className="scroll-fix-container motion-safe-container"
        data-component={componentName}
      >
        <Component {...props} />
      </div>
    );
  };
  
  WrappedComponent.displayName = `withProperScrollPositioning(${componentName})`;
  
  return WrappedComponent;
}

/**
 * A component that provides proper positioning for Framer Motion's useScroll
 */
export const ScrollFixContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', id, style = {} }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      fixStaticPositioning(containerRef.current);
    }
  }, []);
  
  return (
    <div 
      ref={containerRef}
      id={id}
      className={`scroll-fix-container motion-safe-container ${className}`}
      style={{ 
        position: 'relative',
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
        ...style
      }}
    >
      {children}
    </div>
  );
}; 