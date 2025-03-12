'use client';

import { useEffect, useState } from 'react';

interface ComponentDiagnosticsProps {
  componentName: string;
  children: React.ReactNode;
}

export function ComponentDiagnostics({ componentName, children }: ComponentDiagnosticsProps) {
  const [renderCount, setRenderCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [mountTime, setMountTime] = useState<number | null>(null);
  const [unmountTime, setUnmountTime] = useState<number | null>(null);

  // Track component mount
  useEffect(() => {
    const time = performance.now();
    setMountTime(time);
    console.log(`🟢 [${componentName}] MOUNTED at ${time.toFixed(2)}ms`);
    
    // Check for visibility changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
           (mutation.attributeName === 'style' || 
            mutation.attributeName === 'class')) {
          const element = mutation.target as HTMLElement;
          const computedStyle = window.getComputedStyle(element);
          const isCurrentlyVisible = computedStyle.display !== 'none' && 
                                     computedStyle.visibility !== 'hidden' && 
                                     computedStyle.opacity !== '0';
          
          if (isVisible !== isCurrentlyVisible) {
            setIsVisible(isCurrentlyVisible);
            console.log(`${isCurrentlyVisible ? '👁️' : '👁️‍🗨️'} [${componentName}] Visibility changed to ${isCurrentlyVisible ? 'VISIBLE' : 'HIDDEN'} at ${performance.now().toFixed(2)}ms`);
          }
        }
      });
    });

    // Target both the component container and document body for script/style changes
    const containerElement = document.getElementById(`diagnostic-${componentName}`);
    if (containerElement) {
      observer.observe(containerElement, { 
        attributes: true,
        childList: true,
        subtree: true
      });
    }
    
    // Monitor script loading
    document.addEventListener('load', (e) => {
      if (e.target instanceof HTMLScriptElement) {
        console.log(`📜 Script loaded: ${e.target.src || 'inline'} at ${performance.now().toFixed(2)}ms`);
      } else if (e.target instanceof HTMLLinkElement && e.target.rel === 'stylesheet') {
        console.log(`🎨 Stylesheet loaded: ${e.target.href} at ${performance.now().toFixed(2)}ms`);
      }
    }, true);
    
    // Check for React errors
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('React')) {
        console.log(`❌ [${componentName}] React Error at ${performance.now().toFixed(2)}ms:`, ...args);
      }
      originalError.apply(console, args);
    };

    // Monitor for hydration errors
    if (typeof window !== 'undefined') {
      const hydrationErrors = [];
      const originalConsoleError = console.error;
      console.error = (...args) => {
        if (args[0] && typeof args[0] === 'string' && 
           (args[0].includes('hydration') || args[0].includes('Hydration'))) {
          hydrationErrors.push(args);
          console.log(`💧 [${componentName}] Hydration Error at ${performance.now().toFixed(2)}ms:`, ...args);
        }
        originalConsoleError.apply(console, args);
      };
    }

    // Increment render count
    setRenderCount(prev => prev + 1);
    
    return () => {
      const time = performance.now();
      setUnmountTime(time);
      console.log(`🔴 [${componentName}] UNMOUNTED at ${time.toFixed(2)}ms`);
      
      if (containerElement) {
        observer.disconnect();
      }
      
      // Restore original console functions
      console.error = originalError;
    };
  }, [componentName, isVisible]);

  return (
    <div id={`diagnostic-${componentName}`} data-diagnostics={`mount-time:${mountTime};render-count:${renderCount}`}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ display: 'none' }}>
          {`Component: ${componentName}, Render count: ${renderCount}, Mounted: ${Boolean(mountTime)}, Unmounted: ${Boolean(unmountTime)}`}
        </div>
      )}
    </div>
  );
} 