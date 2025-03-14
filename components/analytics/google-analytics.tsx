'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// Replace with your actual Google Analytics measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Analytics Content component that uses useSearchParams
function AnalyticsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;
    
    // Track page views
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}

/**
 * GoogleAnalytics component for tracking page views and events
 * 
 * @component
 * @example
 * ```tsx
 * <GoogleAnalytics />
 * ```
 */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return null;
  }
  
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure',
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <AnalyticsContent />
      </Suspense>
    </>
  );
}

/**
 * Track a custom event in Google Analytics
 * 
 * @param {string} action - The event action
 * @param {object} params - Additional event parameters
 */
export function trackEvent(action: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
} 