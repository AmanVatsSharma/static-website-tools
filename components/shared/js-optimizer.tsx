'use client';

import { useEffect } from 'react';

interface ScriptLoadItem {
  id: string;
  src: string;
  async?: boolean;
  defer?: boolean;
  priority?: 'high' | 'medium' | 'low';
  onLoad?: () => void;
}

interface JSOptimizerProps {
  scripts?: ScriptLoadItem[];
  deferThirdParty?: boolean;
}

/**
 * JavaScript Optimizer Component
 * 
 * This component optimizes JavaScript delivery and execution by:
 * 1. Prioritizing critical scripts
 * 2. Deferring non-critical scripts
 * 3. Using Intersection Observer for lazy-loading
 * 
 * Improves Time to Interactive (TTI) and Total Blocking Time (TBT)
 * 
 * @component
 */
export function JSOptimizer({ scripts = [], deferThirdParty = true }: JSOptimizerProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track loaded scripts to prevent duplicates
    const loadedScripts = new Set<string>();

    // Load scripts based on priority
    const loadScripts = () => {
      // Sort scripts by priority
      const sortedScripts = [...scripts].sort((a, b) => {
        const priorityMap = { high: 0, medium: 1, low: 2 };
        const aPriority = priorityMap[a.priority || 'medium'];
        const bPriority = priorityMap[b.priority || 'medium'];
        return aPriority - bPriority;
      });

      // Load high priority scripts immediately
      const highPriorityScripts = sortedScripts.filter(script => script.priority === 'high');
      highPriorityScripts.forEach(loadScript);

      // Load medium priority scripts after initial render
      const mediumPriorityScripts = sortedScripts.filter(script => script.priority === 'medium' || !script.priority);
      if (mediumPriorityScripts.length > 0) {
        setTimeout(() => {
          mediumPriorityScripts.forEach(loadScript);
        }, 1000); // 1 second delay
      }

      // Load low priority scripts when user is idle
      const lowPriorityScripts = sortedScripts.filter(script => script.priority === 'low');
      if (lowPriorityScripts.length > 0 && 'requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          lowPriorityScripts.forEach(loadScript);
        }, { timeout: 5000 }); // 5 second timeout
      } else if (lowPriorityScripts.length > 0) {
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(() => {
          lowPriorityScripts.forEach(loadScript);
        }, 3000); // 3 second delay
      }
    };

    // Function to load a script dynamically
    const loadScript = (scriptItem: ScriptLoadItem) => {
      if (loadedScripts.has(scriptItem.id)) return;

      const script = document.createElement('script');
      script.src = scriptItem.src;
      script.id = scriptItem.id;
      if (scriptItem.async) script.async = true;
      if (scriptItem.defer) script.defer = true;
      
      script.onload = () => {
        loadedScripts.add(scriptItem.id);
        if (scriptItem.onLoad) scriptItem.onLoad();
      };

      document.body.appendChild(script);
    };

    // Lazy load scripts when they come into view
    const setupLazyScriptLoading = () => {
      if ('IntersectionObserver' in window) {
        const scriptTriggers = document.querySelectorAll('[data-script-trigger]');
        
        if (scriptTriggers.length > 0) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const trigger = entry.target;
                const scriptId = trigger.getAttribute('data-script-id');
                
                if (scriptId) {
                  const scriptToLoad = scripts.find(s => s.id === scriptId);
                  if (scriptToLoad) loadScript(scriptToLoad);
                }
                
                observer.unobserve(trigger);
              }
            });
          }, { rootMargin: '200px' });
          
          scriptTriggers.forEach(trigger => observer.observe(trigger));
        }
      }
    };

    // Defer third-party scripts
    const deferThirdPartyScripts = () => {
      if (!deferThirdParty) return;
      
      const thirdPartyScripts = document.querySelectorAll('script[src^="http"]:not([src*="' + window.location.hostname + '"])');
      
      thirdPartyScripts.forEach(script => {
        const originalSrc = script.getAttribute('src');
        if (originalSrc) {
          script.setAttribute('defer', '');
          if (!script.hasAttribute('async')) {
            script.setAttribute('async', '');
          }
        }
      });
    };

    // Initialize
    loadScripts();
    setupLazyScriptLoading();
    deferThirdPartyScripts();
    
    // Cleanup function
    return () => {
      // No cleanup needed for already loaded scripts
    };
  }, [scripts, deferThirdParty]);

  return null;
}

/**
 * Creates a optimized script tag for critical JavaScript
 */
export function OptimizedScript({ children, id }: { children: string, id: string }) {
  return (
    <script
      id={id}
      dangerouslySetInnerHTML={{
        __html: `
          try {
            ${children}
          } catch (e) {
            console.error("Error in critical script ${id}:", e);
          }
        `
      }}
    />
  );
} 