'use client';

import { useEffect } from 'react';
import { reportWebVitalsOnLoad } from '@/lib/web-vitals';

/**
 * WebVitalsInit Component
 * 
 * This component initializes Web Vitals monitoring on the client side.
 * It should be imported and used in the root layout or on specific pages
 * where you want to track Core Web Vitals metrics.
 */
export function WebVitalsInit() {
  useEffect(() => {
    // Initialize Web Vitals monitoring
    reportWebVitalsOnLoad();
  }, []);

  return null;
}

export default WebVitalsInit; 