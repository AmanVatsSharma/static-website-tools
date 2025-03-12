"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * MovingBorder Component
 * Creates premium-looking borders with animated gradients for key sections
 */
export function MovingBorder({
  children,
  duration = 6,
  rx = "16px", // border radius x
  ry = "16px", // border radius y
  borderWidth = "2px",
  containerClassName,
  borderClassName,
  colors = ["#f16717", "#ffc107", "#2e7d32", "#f16717"],
  as: Component = "div",
  disableAnimation = false,
  ...props
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  borderWidth?: string;
  containerClassName?: string;
  borderClassName?: string;
  colors?: string[];
  as?: any;
  disableAnimation?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Respect reduced motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches || disableAnimation);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches || disableAnimation);
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [disableAnimation]);
  
  const gradientColors = colors.join(", ");
  
  return (
    <Component
      className={cn(
        "relative p-[4px] overflow-hidden",
        containerClassName
      )}
      style={{
        borderRadius: `${rx} ${ry}`,
      }}
      {...props}
    >
      <motion.div
        className={cn(
          "absolute inset-0 z-[-1] opacity-80",
          borderClassName
        )}
        style={{
          background: `linear-gradient(to right, ${gradientColors})`,
          backgroundSize: "300% 300%",
          borderRadius: `calc(${rx} - 2px) calc(${ry} - 2px)`,
        }}
        animate={reducedMotion ? {} : {
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <div
        className={cn(
          "relative h-full w-full bg-background",
        )}
        style={{
          borderRadius: `calc(${rx} - calc(${borderWidth} * 1.5)) calc(${ry} - calc(${borderWidth} * 1.5))`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

/**
 * Card variant with moving border
 */
export function MovingBorderCard({
  children,
  className,
  containerClassName,
  borderClassName,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
} & React.ComponentProps<typeof MovingBorder>) {
  return (
    <MovingBorder
      containerClassName={cn("rounded-xl", containerClassName)}
      borderClassName={borderClassName}
      {...props}
    >
      <div className={cn("p-6 h-full w-full", className)}>
        {children}
      </div>
    </MovingBorder>
  );
}

/**
 * Button variant with moving border
 */
export function MovingBorderButton({
  children,
  className,
  containerClassName,
  borderClassName,
  duration = 3,
  rx = "8px",
  ry = "8px",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
} & React.ComponentProps<typeof MovingBorder>) {
  return (
    <MovingBorder
      containerClassName={cn("rounded-md", containerClassName)}
      borderClassName={borderClassName}
      duration={duration}
      rx={rx}
      ry={ry}
      {...props}
    >
      <button
        className={cn(
          "block font-medium h-full w-full px-6 py-2 rounded-md transition-colors",
          className
        )}
      >
        {children}
      </button>
    </MovingBorder>
  );
} 