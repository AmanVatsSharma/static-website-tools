"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

/**
 * BackgroundLines Component
 * Creates animated wave pattern lines for section dividers and backgrounds
 */
export function BackgroundLines({
  className = "",
  containerClassName = "",
  lineColor = "rgba(241, 103, 23, 0.2)",
  lineWidth = 2,
  waveHeight = 20,
  waveCount = 6,
  animate = true,
  direction = "horizontal",
  disableAnimation = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  containerClassName?: string;
  lineColor?: string;
  lineWidth?: number;
  waveHeight?: number;
  waveCount?: number;
  animate?: boolean;
  direction?: "horizontal" | "vertical";
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
  
  // Generate wave path
  const generatePath = (index: number) => {
    const isHorizontal = direction === "horizontal";
    const amplitude = waveHeight * (1 - index / (waveCount * 1.5)); // Decrease amplitude for lines further away
    const frequency = 0.005 + (index * 0.001); // Slightly different frequency for each line
    const delay = index * 0.5; // Staggered delay
    const points: { x: number; y: number }[] = [];
    
    // Generate wave points
    for (let i = 0; i <= 100; i += 1) {
      const x = isHorizontal ? i : 50 + Math.sin(i * frequency * Math.PI * 2) * amplitude;
      const y = isHorizontal ? 50 + Math.sin(i * frequency * Math.PI * 2) * amplitude : i;
      points.push({ x, y });
    }
    
    // Convert points to SVG path
    const pathData = points.map((point, i) => {
      if (i === 0) {
        return `M${point.x},${point.y}`;
      }
      return `L${point.x},${point.y}`;
    }).join(' ');
    
    // Return both the path and animation properties
    return {
      pathData,
      delay,
      amplitude,
      frequency
    };
  };
  
  // Generate all wave lines
  const waves = Array.from({ length: waveCount }, (_, i) => generatePath(i));
  
  return (
    <div className={cn("relative", containerClassName)} {...props}>
      <div className={cn("absolute inset-0 z-0 overflow-hidden", className)}>
        <svg
          className="absolute top-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {waves.map((wave, index) => (
            <motion.path
              key={index}
              d={wave.pathData}
              fill="none"
              stroke={lineColor}
              strokeWidth={lineWidth}
              strokeLinecap="round"
              initial={reducedMotion || !animate ? {} : { opacity: 0.3 }}
              animate={reducedMotion || !animate ? { opacity: 0.5 } : {
                opacity: [0.2, 0.5, 0.2],
                pathOffset: [0, 1, 0],
              }}
              transition={{
                opacity: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: wave.delay,
                },
                pathOffset: {
                  duration: 10 + index,
                  ease: "linear",
                  repeat: Infinity,
                  delay: wave.delay,
                },
              }}
            />
          ))}
        </svg>
      </div>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

/**
 * WavyDivider Component
 * Creates organic separation between sections with animated waves
 */
export function WavyDivider({
  className = "",
  color = "#f16717",
  opacity = 0.2,
  height = 50,
  width = "100%",
  flipped = false,
  disableAnimation = false,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  color?: string;
  opacity?: number;
  height?: number;
  flipped?: boolean;
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
    <svg
      className={cn("w-full", className)}
      style={{ height, width }}
      viewBox={`0 0 1440 ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      {...props}
    >
      <motion.path
        d="M0,0 C320,${height/2} 660,0 1440,${height/2} L1440,${height} L0,${height} Z"
        fill={color}
        fillOpacity={opacity}
        transform={flipped ? "scale(1, -1) translate(0, -100%)" : undefined}
        initial={reducedMotion ? {} : { pathOffset: 0 }}
        animate={reducedMotion ? {} : { pathOffset: 1 }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <motion.path
        d="M0,${height/3} C280,0 660,${height} 1440,${height/4} L1440,${height} L0,${height} Z"
        fill={color}
        fillOpacity={opacity * 0.7}
        transform={flipped ? "scale(1, -1) translate(0, -100%)" : undefined}
        initial={reducedMotion ? {} : { pathOffset: 0 }}
        animate={reducedMotion ? {} : { pathOffset: 1 }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </svg>
  );
} 