'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoGridItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  background?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' ;
  index?: number;
}

/**
 * Animated Bento Grid Item component with scroll-triggered animations
 * 
 * @component
 */
export function AnimatedBentoGridItem({
  title,
  description,
  icon,
  className,
  background,
  size = 'md',
  index = 0,
}: BentoGridItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  // Size classes
  const sizeClasses = {
    sm: 'col-span-1 row-span-1',
    md: 'col-span-1 row-span-2',
    lg: 'col-span-2 row-span-1',
    xl: 'col-span-2 row-span-2',
  };
  
  // Animation variants
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  return (
    <motion.div
      ref={ref}
      className={cn(
        'group overflow-hidden rounded-xl p-6 shadow-md transition-all hover:shadow-xl motion-safe-container',
        sizeClasses[size],
        background || 'bg-white dark:bg-gray-800',
        className
      )}
      variants={itemVariants}
      initial="hidden"
      animate={controls}
      custom={index}
      style={{ position: 'relative' }}
    >
      {icon && (
        <motion.div 
          className="mb-4 text-primary motion-safe-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
          style={{ position: 'relative' }}
        >
          {icon}
        </motion.div>
      )}
      
      <motion.h3 
        className="mb-2 text-xl font-bold text-gray-900 dark:text-white motion-safe-container"
        initial={{ y: 10, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
        style={{ position: 'relative' }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-gray-600 dark:text-gray-300 motion-safe-container"
        initial={{ y: 10, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
        transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
        style={{ position: 'relative' }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

interface AnimatedBentoGridProps {
  items: BentoGridItemProps[];
  className?: string;
  staggerDelay?: number;
}

/**
 * Animated Bento Grid component with scroll-triggered animations
 * 
 * @component
 * @example
 * ```tsx
 * <AnimatedBentoGrid
 *   items={[
 *     {
 *       title: "Feature 1",
 *       description: "Description of feature 1",
 *       icon: <Icon />,
 *       size: "md",
 *     },
 *     // More items...
 *   ]}
 * />
 * ```
 */
export function AnimatedBentoGrid({
  items,
  className,
  staggerDelay = 0.1,
}: AnimatedBentoGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <div
      ref={ref}
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 motion-safe-container',
        className
      )}
      style={{ position: 'relative' }}
    >
      {items.map((item, index) => (
        <AnimatedBentoGridItem
          key={`${item.title}-${index}`}
          {...item}
          index={index}
        />
      ))}
    </div>
  );
}

// Hover effect variants for bento grid items
export const hoverVariants = {
  // Zoom effect
  zoom: {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  },
  
  // Lift effect
  lift: {
    rest: { y: 0 },
    hover: { y: -10, transition: { duration: 0.3 } },
  },
  
  // Glow effect
  glow: {
    rest: { boxShadow: '0 0 0 rgba(79, 70, 229, 0)' },
    hover: { boxShadow: '0 0 20px rgba(79, 70, 229, 0.5)', transition: { duration: 0.3 } },
  },
  
  // Rotate effect
  rotate: {
    rest: { rotate: 0 },
    hover: { rotate: 3, transition: { duration: 0.3 } },
  },
};

interface InteractiveBentoGridItemProps extends BentoGridItemProps {
  hoverEffect?: keyof typeof hoverVariants;
  onClick?: () => void;
}

/**
 * Interactive Bento Grid Item with hover effects
 * 
 * @component
 */
export function InteractiveBentoGridItem({
  title,
  description,
  icon,
  className,
  background,
  size = 'md',
  index = 0,
  hoverEffect = 'zoom',
  onClick,
}: InteractiveBentoGridItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Size classes
  const sizeClasses = {
    sm: 'col-span-1 row-span-1',
    md: 'col-span-1 row-span-2',
    lg: 'col-span-2 row-span-1',
    xl: 'col-span-2 row-span-2',
  };
  
  return (
    <motion.div
      ref={ref}
      className={cn(
        'group overflow-hidden rounded-xl p-6 shadow-md transition-all hover:shadow-xl cursor-pointer motion-safe-container',
        sizeClasses[size],
        background || 'bg-white dark:bg-gray-800',
        className
      )}
      animate="rest"
      variants={hoverVariants[hoverEffect]}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.3 }}
      onClick={onClick}
      whileHover="hover"
      style={{ position: 'relative' }}
    >
      {icon && (
        <motion.div 
          className="mb-4 text-primary motion-safe-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
          style={{ position: 'relative' }}
        >
          {icon}
        </motion.div>
      )}
      
      <motion.h3 
        className="mb-2 text-xl font-bold text-gray-900 dark:text-white motion-safe-container"
        initial={{ y: 10, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
        style={{ position: 'relative' }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-gray-600 dark:text-gray-300 motion-safe-container"
        initial={{ y: 10, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
        transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
        style={{ position: 'relative' }}
      >
        {description}
      </motion.p>
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 motion-safe-container"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'relative' }}
      />
    </motion.div>
  );
} 