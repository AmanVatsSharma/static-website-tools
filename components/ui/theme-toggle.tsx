'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

type Theme = 'light' | 'dark' | 'system';

/**
 * Theme toggle component with user preference saving
 * 
 * @component
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true);
    
    // Get theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Check system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
      applyTheme(systemTheme);
    }
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Apply theme to document
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    const isDark = newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };
  
  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };
  
  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null;
  
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-800',
        className
      )}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative h-5 w-5">
        <motion.div
          initial={{ opacity: theme === 'dark' ? 0 : 1, rotate: theme === 'dark' ? 45 : 0 }}
          animate={{ opacity: theme === 'dark' ? 0 : 1, rotate: theme === 'dark' ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Sun className="h-5 w-5" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: theme === 'dark' ? 1 : 0, rotate: theme === 'dark' ? 0 : -45 }}
          animate={{ opacity: theme === 'dark' ? 1 : 0, rotate: theme === 'dark' ? 0 : -45 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
      </div>
    </button>
  );
}

/**
 * Theme provider component that initializes theme based on user preference
 * 
 * @component
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const root = document.documentElement;
    
    if (savedTheme === 'dark') {
      root.classList.add('dark');
    } else if (savedTheme === 'light') {
      root.classList.remove('dark');
    } else {
      // Use system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, []);
  
  // Return children directly regardless of mounted state to avoid hydration issues
  return <>{children}</>;
} 