"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * TiltingCard Component
 * Creates 3D tilt effect on cards for interactive elements
 */
export function TiltingCard({
  children,
  className,
  containerClassName,
  glareColor = "rgba(241, 103, 23, 0.2)",  // AWE orange with low opacity
  tiltAmount = 10,
  scale = 1.05,
  glareOpacity = 0.4,
  perspective = 1000,
  speed = 500,
  disableAnimation = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  containerClassName?: string;
  glareColor?: string;
  tiltAmount?: number;
  scale?: number;
  glareOpacity?: number;
  perspective?: number;
  speed?: number;
  disableAnimation?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Motion values for the tilt effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  // Spring animations for smooth movement
  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
  // Glare effect position
  const glareX = useMotionValue(0);
  const glareY = useMotionValue(0);
  const springGlareX = useSpring(glareX, springConfig);
  const springGlareY = useSpring(glareY, springConfig);
  const glareOpacityValue = useMotionValue(0);
  const springGlareOpacity = useSpring(glareOpacityValue, springConfig);
  
  // Respect reduced motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches || disableAnimation);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches || disableAnimation);
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [disableAnimation]);
  
  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current || reducedMotion) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card center (from -0.5 to 0.5)
    const xPosition = (e.clientX - rect.left) / width - 0.5;
    const yPosition = (e.clientY - rect.top) / height - 0.5;
    
    // Set rotation values
    rotateX.set(yPosition * tiltAmount * -1); // Inverted for natural tilt
    rotateY.set(xPosition * tiltAmount);
    
    // Set glare position - move in the direction of the mouse
    glareX.set(xPosition * 200 + 50);
    glareY.set(yPosition * 200 + 50);
    glareOpacityValue.set(isHovering ? glareOpacity : 0);
  }
  
  function onMouseEnter() {
    if (reducedMotion) return;
    setIsHovering(true);
    glareOpacityValue.set(glareOpacity);
  }
  
  function onMouseLeave() {
    if (reducedMotion) return;
    setIsHovering(false);
    // Reset values
    rotateX.set(0);
    rotateY.set(0);
    glareOpacityValue.set(0);
  }
  
  return (
    <div 
      className={cn("relative", containerClassName)}
      style={{ perspective: `${perspective}px` }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={cardRef}
      {...props}
    >
      <motion.div
        className={cn("relative w-full h-full", className)}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovering && !reducedMotion ? scale : 1,
        }}
        transition={{
          duration: speed / 1000,
          ease: [0.3, 0.1, 0.3, 1],
        }}
      >
        {children}
        
        {/* Glare effect */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none rounded-[inherit]"
          style={{
            backgroundImage: `radial-gradient(circle at ${springGlareX}% ${springGlareY}%, ${glareColor} 0%, transparent 50%)`,
            opacity: springGlareOpacity,
          }}
        />
      </motion.div>
    </div>
  );
}

/**
 * TiltingProductCard Component
 * A specialized tilting card for product displays
 */
export function TiltingProductCard({
  title,
  description,
  imageUrl,
  badge,
  className,
  containerClassName,
  imageClassName,
  contentClassName,
  badgeClassName,
  ...props
}: React.ComponentProps<typeof TiltingCard> & {
  title: string;
  description?: string;
  imageUrl: string;
  badge?: string;
  imageClassName?: string;
  contentClassName?: string;
  badgeClassName?: string;
}) {
  return (
    <TiltingCard
      className={cn("overflow-hidden rounded-xl", className)}
      containerClassName={containerClassName}
      {...props}
    >
      <div className="flex flex-col h-full">
        <div className={cn("relative", imageClassName)}>
          {/* Image */}
          <img
            src={imageUrl}
            alt={title}
            className="w-full object-cover h-48 md:h-60"
          />
          
          {/* Badge if provided */}
          {badge && (
            <span className={cn(
              "absolute top-4 right-4 bg-primary text-white text-xs px-2 py-1 rounded",
              badgeClassName
            )}>
              {badge}
            </span>
          )}
        </div>
        
        {/* Content */}
        <div className={cn("p-5 bg-background flex-grow", contentClassName)}>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
      </div>
    </TiltingCard>
  );
} 