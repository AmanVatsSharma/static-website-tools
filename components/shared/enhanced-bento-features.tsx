"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/animation-hooks";

interface BentoFeatureProps {
  title: string;
  description: string;
  icon: ReactNode;
  size?: "sm" | "md" | "lg";
  hoverEffect?: "zoom" | "lift" | "glow" | "rotate";
  className?: string;
}

export function EnhancedBentoFeatures({
  features,
  className,
  title,
  subtitle,
}: {
  features: BentoFeatureProps[];
  className?: string;
  title?: string;
  subtitle?: string;
}) {
  const reducedMotion = useReducedMotion();
  
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="mx-auto max-w-3xl text-center mb-12">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="mt-4 text-lg text-gray-600 dark:text-gray-300"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-4">
          {features.map((feature, index) => (
            <EnhancedBentoFeature
              key={feature.title}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EnhancedBentoFeature({
  title,
  description,
  icon,
  size = "md",
  hoverEffect = "zoom",
  className,
  index,
}: BentoFeatureProps & { index: number }) {
  const reducedMotion = useReducedMotion();
  
  // Define grid sizes based on feature size
  const sizeClasses = {
    sm: "md:col-span-1 row-span-1",
    md: "md:col-span-1 row-span-2",
    lg: "md:col-span-2 row-span-2",
  };

  // Determine position in grid for nice layout
  // First large item spans 2 columns and 2 rows
  let positionClass = "";
  if (index === 0 && size === "lg") {
    positionClass = "md:col-span-2 row-span-2";
  } else if (index === 3 && size === "lg") {
    positionClass = "md:col-span-2 row-span-2";
  }

  // Define hover effects
  const getHoverStyles = () => {
    if (reducedMotion) return {};
    
    switch (hoverEffect) {
      case "zoom":
        return {
          scale: 1.05,
          transition: { duration: 0.3 },
        };
      case "lift":
        return {
          y: -8,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: { duration: 0.3 },
        };
      case "glow":
        return {
          boxShadow: `0 0 30px 5px ${title.includes("Eco") ? "rgba(46, 125, 50, 0.3)" : 
                       title.includes("Premium") ? "rgba(241, 103, 23, 0.3)" : 
                       "rgba(255, 193, 7, 0.3)"}`,
          transition: { duration: 0.3 },
        };
      case "rotate":
        return {
          rotate: 1,
          scale: 1.02,
          transition: { duration: 0.3 },
        };
      default:
        return {
          scale: 1.05,
          transition: { duration: 0.3 },
        };
    }
  };

  // Calculate delay for staggered animations
  const staggerDelay = 0.1 * Math.min(index, 5);

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:border-transparent",
        sizeClasses[size],
        positionClass,
        className || "bg-white dark:bg-gray-800/90"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: staggerDelay }}
      viewport={{ once: true }}
      whileHover={getHoverStyles()}
    >
      {/* Background gradient overlay that appears on hover */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300",
          title.includes("Premium") && "from-primary/20 to-primary/5",
          title.includes("Eco") && "from-green-500/20 to-green-500/5",
          title.includes("Performance") && "from-blue-500/20 to-blue-500/5",
          title.includes("Time") && "from-purple-500/20 to-purple-500/5",
          title.includes("Expert") && "from-secondary/20 to-secondary/5",
          title.includes("Indian") && "from-accent/20 to-accent/5",
          !title.match(/(Premium|Eco|Performance|Time|Expert|Indian)/) && "from-gray-500/20 to-gray-500/5"
        )}
      />
      
      {/* Subtle animated dot pattern background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <pattern
            id={`dots-${index}`}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#dots-${index})`} />
        </svg>
      </div>
      
      {/* Feature icon with animated background on hover */}
      <div className="relative z-10">
        <div className={cn(
          "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300",
          "bg-primary/10 text-primary dark:bg-primary/20 group-hover:bg-primary group-hover:text-white"
        )}>
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      
      {/* Animated corner accent */}
      <div className="absolute bottom-0 right-0 h-12 w-12 translate-x-6 translate-y-6 rounded-full bg-primary/10 transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4" />
    </motion.div>
  );
} 