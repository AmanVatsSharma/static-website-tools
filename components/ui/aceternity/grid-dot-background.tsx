"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * GridDotBackground Component
 * Creates subtle grid patterns with interactive dot highlights on hover
 */
export function GridDotBackground({
  className = "",
  gridColor = "rgba(128, 128, 128, 0.07)",
  size = 24,
  interactive = true,
  dotColor = "#f16717",
  dotSize = 100,
  dotOpacity = 0.2,
  disableAnimation = false,
  ...props
}: React.ComponentProps<"div"> & {
  gridColor?: string;
  size?: number;
  interactive?: boolean;
  dotColor?: string;
  dotSize?: number;
  dotOpacity?: number;
  disableAnimation?: boolean;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Respect reduced motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches || disableAnimation);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches || disableAnimation);
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [disableAnimation]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!interactive || reducedMotion) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  
  return (
    <div 
      className={cn("absolute inset-0 overflow-hidden", className)} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px` 
        }}
      />
      
      {interactive && isHovering && !reducedMotion && (
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            x: mousePosition.x - dotSize / 2,
            y: mousePosition.y - dotSize / 2,
            background: `radial-gradient(circle, ${dotColor}${Math.round(dotOpacity * 100).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
}

/**
 * GridDotBackgroundWithContent Component
 * A wrapper that combines the grid background with content
 */
export function GridDotBackgroundWithContent({
  children,
  className = "",
  containerClassName = "",
  ...props
}: React.ComponentProps<typeof GridDotBackground> & {
  containerClassName?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <GridDotBackground className={className} {...props} />
      <div className="relative z-10">{children}</div>
    </div>
  );
} 