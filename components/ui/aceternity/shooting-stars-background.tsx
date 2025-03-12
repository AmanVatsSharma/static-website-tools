"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Star {
  id: number;
  size: number;
  color: string;
  top: number;
  left: number;
  duration: number;
  delay: number;
}

/**
 * ShootingStarsBackground Component
 * Creates subtle shooting star animations for night-themed sections or testimonial backgrounds
 */
export function ShootingStarsBackground({
  className = "",
  starCount = 20,
  starColor = "#ffffff",
  starSize = { min: 1, max: 2 },
  tailLength = { min: 10, max: 20 },
  duration = { min: 0.5, max: 1.5 },
  background = "linear-gradient(to bottom, #0f172a, #1e293b)",
  disableAnimation = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  starCount?: number;
  starColor?: string;
  starSize?: { min: number; max: number };
  tailLength?: { min: number; max: number };
  duration?: { min: number; max: number };
  background?: string;
  disableAnimation?: boolean;
}) {
  const [stars, setStars] = useState<Star[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Respect reduced motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches || disableAnimation);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches || disableAnimation);
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [disableAnimation]);
  
  // Generate stars
  useEffect(() => {
    if (reducedMotion) {
      setStars([]);
      return;
    }
    
    const generatedStars: Star[] = [];
    
    for (let i = 0; i < starCount; i++) {
      generatedStars.push({
        id: i,
        size: Math.random() * (starSize.max - starSize.min) + starSize.min,
        color: starColor,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * (duration.max - duration.min) + duration.min,
        delay: Math.random() * 5, // Random delay up to 5 seconds
      });
    }
    
    setStars(generatedStars);
  }, [starCount, starColor, starSize, duration, reducedMotion]);
  
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background }}
      {...props}
    >
      {!reducedMotion && stars.map((star) => {
        const tailLengthValue = Math.random() * (tailLength.max - tailLength.min) + tailLength.min;
        
        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: star.size,
              height: star.size,
              top: `${star.top}%`,
              left: `${star.left}%`,
              boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px ${star.color}, 
                         0 0 ${tailLengthValue}px ${star.color}`,
              opacity: 0,
              zIndex: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              x: [0, tailLengthValue * 5],
              y: [0, tailLengthValue * 5],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 10 + 5, // Random delay between 5-15 seconds
            }}
          />
        );
      })}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

/**
 * Preset themes for shooting stars
 */
export const StarBackgrounds = {
  nightSky: {
    background: "linear-gradient(to bottom, #0f172a, #1e293b)",
    starColor: "#ffffff"
  },
  blueNight: {
    background: "linear-gradient(to bottom, #172554, #1e40af)",
    starColor: "#93c5fd"
  },
  purpleGalaxy: {
    background: "linear-gradient(to bottom, #581c87, #7e22ce)",
    starColor: "#d8b4fe"
  },
  aweOrangeNight: {
    background: "linear-gradient(to bottom, #1c1917, #292524)",
    starColor: "#f16717"
  },
}; 