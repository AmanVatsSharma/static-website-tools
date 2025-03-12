'use client';

import { useState, useEffect } from 'react';
import { MotionValue } from 'framer-motion';

/**
 * Check if code is running on the client side
 * This is defined outside of any function to ensure consistency between renders
 */
export const isClient = typeof window !== 'undefined';

/**
 * Hook to force client-side only execution
 * @returns {boolean} True when the component is mounted on the client
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  return isMounted;
}

/**
 * Safely access window object only on the client side
 * @returns {Window | undefined} The window object or undefined on server
 */
export function safeWindow() {
  if (isClient) {
    return window;
  }
  return undefined;
}

/**
 * Safely use Framer Motion scroll features by ensuring we're on the client side
 * @param callback Function that uses Framer Motion scroll functionality
 * @returns {any} Result of the callback or undefined during SSR
 */
export function withClientScroll(callback: Function) {
  if (isClient) {
    return callback();
  }
  return undefined;
}

/**
 * Debug utility for tracking which component is using useScroll
 * This is a non-hook version that can be safely called from within useEffect
 * @param componentName The name of the component using useScroll
 * @param ref The React ref that useScroll is targeting
 */
export function debugScrollPosition(componentName: string, ref: React.RefObject<HTMLElement | null>) {
  if (!isClient || !ref.current) {
    console.warn(`[ScrollDebug] ${componentName} ref is null or not on client`);
    return;
  }
  
  console.log(`[ScrollDebug] ${componentName} position:`, window.getComputedStyle(ref.current).position);
  
  // Check if all parent elements have non-static positioning
  let element = ref.current.parentElement;
  let level = 1;
  while (element) {
    const position = window.getComputedStyle(element).position;
    console.log(`[ScrollDebug] ${componentName} - Parent level ${level}:`, position);
    
    // Add class identification
    const classes = Array.from(element.classList).join(', ');
    console.log(`[ScrollDebug] ${componentName} - Parent level ${level} classes:`, classes || 'no classes');
    
    // If this is static, it might be our culprit
    if (position === 'static') {
      console.warn(`[ScrollDebug] Found static positioning in parent of ${componentName} at level ${level}:`, element);
      
      // Add a temporary fix if we find a static element
      element.style.position = 'relative';
      console.log(`[ScrollDebug] Applied temporary fix to parent of ${componentName} at level ${level}`);
    }
    
    element = element.parentElement;
    level++;
  }
}

/**
 * Hook version of debugScrollPosition - use this at the component top level
 * @param componentName The name of the component
 * @param ref The ref to debug
 */
export function useDebugScrollPosition(componentName: string, ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (ref.current) {
      debugScrollPosition(componentName, ref);
    }
  }, [componentName, ref]);
}

/**
 * Safe client-side only execution
 * @param callback Function to execute only on the client side
 * @returns The result of the callback or undefined
 */
export function clientOnly<T>(callback: () => T): T | undefined {
  if (isClient) {
    return callback();
  }
  return undefined;
}

/**
 * Safe client-side value with server fallback
 * @param clientValue Value to use on client side
 * @param serverFallback Fallback value for server side
 * @returns The appropriate value based on environment
 */
export function useClientValue<T>(clientValue: T, serverFallback: T): T {
  return isClient ? clientValue : serverFallback;
}

/**
 * Safe client-side motion value with server fallback
 * Specifically for Framer Motion MotionValue objects
 * @param motionValue The motion value to use on client
 * @param fallbackValue Fallback static value for server rendering
 * @returns Either the actual value on client or the fallback on server
 */
export function useMotionValueForSSR<T>(motionValue: MotionValue<T>, fallbackValue: T): T {
  // On the server, just return the fallback
  if (!isClient) return fallbackValue;
  
  // On the client, get the current value
  return motionValue.get();
} 