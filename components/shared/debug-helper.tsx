'use client';

import { useEffect } from 'react';

export function DebugHelper() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    console.log('🔍 Debug Helper initializing...');
    
    // Track page lifecycle events
    document.addEventListener('DOMContentLoaded', () => {
      console.log('📄 DOMContentLoaded at', performance.now().toFixed(2));
    });
    
    window.addEventListener('load', () => {
      console.log('🌍 Window load event at', performance.now().toFixed(2));
    });
    
    // Track script/style loading
    const scriptLoadTimes = {};
    const originalCreateElement = document.createElement;
    
    document.createElement = function(tagName, options) {
      const element = originalCreateElement.call(document, tagName, options);
      
      if (tagName.toLowerCase() === 'script') {
        const originalSetAttribute = element.setAttribute;
        element.setAttribute = function(name, value) {
          if (name === 'src') {
            scriptLoadTimes[value] = {
              createTime: performance.now(),
              loadTime: null
            };
            element.addEventListener('load', () => {
              if (scriptLoadTimes[value]) {
                scriptLoadTimes[value].loadTime = performance.now();
                const loadDuration = scriptLoadTimes[value].loadTime - scriptLoadTimes[value].createTime;
                console.log(`📜 Script loaded: ${value} (took ${loadDuration.toFixed(2)}ms)`);
              }
            });
          }
          return originalSetAttribute.call(this, name, value);
        };
      }
      
      return element;
    };
    
    // Monitor React rendering
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      const originalOnCommitFiberRoot = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot;
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot = (...args) => {
        console.log('🔄 React commit at', performance.now().toFixed(2));
        return originalOnCommitFiberRoot.apply(window.__REACT_DEVTOOLS_GLOBAL_HOOK__, args);
      };
    }
    
    // Monitor state changes that might cause unmounting
    window.addEventListener('popstate', () => {
      console.log('⏪ History state changed at', performance.now().toFixed(2));
    });
    
    // Return cleanup function
    return () => {
      document.createElement = originalCreateElement;
    };
  }, []);
  
  return null;
} 