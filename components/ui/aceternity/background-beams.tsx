"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * BackgroundBeams Component
 * Adds dynamic beam elements that follow SVG paths for hero sections
 */
export function BackgroundBeams({
  className = "",
  pathColor = "#f16717",
  secondaryColor = "#ffc107",
  opacity = 0.3,
  beamCount = 3,
  disableAnimation = false,
  ...props
}: React.ComponentProps<"div"> & {
  pathColor?: string;
  secondaryColor?: string;
  opacity?: number;
  beamCount?: number;
  disableAnimation?: boolean;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Default paths (can be customized based on design needs)
  const paths = [
    "M0 2000 L1000 0 L2000 1000 L4000 2000 L3500 3000 L1000 2500 Z",
    "M0 1000 L1000 500 L3000 1000 L4000 2000 L2000 1500 L500 2500 Z",
    "M0 1500 L2000 0 L3000 1000 L4000 1500 L2000 2000 L1000 3000 Z"
  ];
  
  // Add more paths if needed
  const allPaths = [...paths];
  while (allPaths.length < beamCount) {
    // Create variations of existing paths
    const basePath = paths[allPaths.length % paths.length];
    // Modify the path slightly to create variation
    const modifiedPath = basePath.replace(/\d+/g, (match) => {
      const num = parseInt(match, 10);
      const variance = Math.random() * 500 - 250; // Random offset
      return Math.max(0, Math.round(num + variance)).toString();
    });
    allPaths.push(modifiedPath);
  }
  
  // Respect reduced motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches || disableAnimation);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches || disableAnimation);
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [disableAnimation]);
  
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} {...props}>
      <div className="absolute inset-0">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 4000 3000"
        >
          {allPaths.slice(0, beamCount).map((path, index) => {
            // Alternate colors for more visual interest
            const color = index % 2 === 0 ? pathColor : secondaryColor;
            const delay = index * 0.5;
            const duration = 4 + index;
            
            return (
              <motion.path
                key={index}
                d={path}
                fill="none"
                stroke={color}
                strokeWidth="8"
                strokeLinecap="round"
                initial={reducedMotion ? { pathLength: 1, opacity } : { pathLength: 0, opacity: 0 }}
                animate={reducedMotion ? { opacity } : { 
                  pathLength: 1, 
                  opacity 
                }}
                transition={reducedMotion ? {} : {
                  pathLength: { 
                    duration, 
                    ease: "easeInOut", 
                    delay,
                    repeat: Infinity,
                    repeatType: "reverse" 
                  },
                  opacity: { 
                    duration: 2, 
                    ease: "easeInOut", 
                    delay,
                    repeat: Infinity,
                    repeatType: "mirror" 
                  }
                }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
} 