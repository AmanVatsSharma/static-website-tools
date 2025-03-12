"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * AuroraBackground Component
 * Creates subtle aurora-like effects for secondary sections
 */
export function AuroraBackground({
  className = "",
  containerClassName = "",
  colors = ["#f16717", "#ffc107", "#2e7d32"],
  blur = 140,
  speed = 10,
  disableAnimation = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  containerClassName?: string;
  colors?: string[];
  blur?: number;
  speed?: number;
  disableAnimation?: boolean;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Respect reduced motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches || disableAnimation);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches || disableAnimation);
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [disableAnimation]);
  
  return (
    <div className={cn("relative overflow-hidden", containerClassName)} {...props}>
      <div className={cn("absolute inset-0 z-0", className)}>
        {colors.map((color, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 opacity-50"
            style={{
              background: `radial-gradient(circle at ${50 + (index * 20)}% ${50 + (index * 10)}%, ${color} 0%, transparent 50%)`,
              filter: `blur(${blur}px)`,
            }}
            animate={reducedMotion ? {} : {
              x: [0, 10, 20, 10, 0],
              y: [0, 15, 5, 20, 0],
            }}
            transition={{
              duration: speed + index,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

/**
 * Preset aurora configurations
 */
export const AuroraPresets = {
  aweBrand: {
    colors: ["#f16717", "#ffc107", "#2e7d32"],
    blur: 140,
    speed: 10,
  },
  calmBlue: {
    colors: ["#3b82f6", "#60a5fa", "#93c5fd"],
    blur: 160,
    speed: 15,
  },
  vibrantPurple: {
    colors: ["#7c3aed", "#8b5cf6", "#c4b5fd"],
    blur: 120,
    speed: 8,
  },
  warmGreen: {
    colors: ["#2e7d32", "#4d9c50", "#a3d7a5"],
    blur: 130,
    speed: 12,
  },
  sunsetOrange: {
    colors: ["#f16717", "#f97316", "#fb923c"],
    blur: 150,
    speed: 9,
  },
}; 