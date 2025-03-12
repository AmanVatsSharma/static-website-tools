"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Animated Gradient Background Component
 * Creates smooth animated gradients that shift colors subtly over time
 */
export function AnimatedGradientBackground({
  children,
  className = "",
  containerClassName = "",
  colors = ["#f16717", "#f78346", "#e04e0f"],
  duration = 10,
  reverse = false,
  pattern = "diagonal",
  ...props
}: React.ComponentProps<"div"> & {
  containerClassName?: string;
  colors?: string[];
  duration?: number;
  reverse?: boolean;
  pattern?: "diagonal" | "radial" | "conic";
}) {
  const backgroundSize = "400% 400%";
  const gradientColors = colors.join(", ");
  
  let background = `linear-gradient(45deg, ${gradientColors})`;
  
  if (pattern === "radial") {
    background = `radial-gradient(circle, ${gradientColors})`;
  } else if (pattern === "conic") {
    background = `conic-gradient(from 45deg, ${gradientColors})`;
  }
  
  const startPosition = reverse ? "100% 0%" : "0% 0%";
  const endPosition = reverse ? "0% 100%" : "100% 100%";
  
  return (
    <div className={cn("relative overflow-hidden", containerClassName)} {...props}>
      <motion.div
        className={cn("absolute inset-0 z-0", className)}
        style={{
          background,
          backgroundSize,
        }}
        animate={{
          backgroundPosition: [
            startPosition,
            "50% 50%",
            endPosition,
            "50% 50%",
            startPosition,
          ],
        }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * PresetGradients provides some ready-to-use gradient configurations
 */
export const PresetGradients = {
  // AWE brand colors
  aweOrange: ["#f16717", "#f78346", "#e04e0f", "#f78346"],
  aweGreen: ["#2e7d32", "#4d9c50", "#27652a", "#4d9c50"],
  aweAccent: ["#ffc107", "#ffe14a", "#e29400", "#ffe14a"],
  
  // Preset color combinations
  orangeYellow: ["#f16717", "#ffc107", "#f78346", "#ffe14a"],
  greenBlue: ["#2e7d32", "#4d9c50", "#2196f3", "#4d9c50"],
  purpleRed: ["#7b1fa2", "#9c27b0", "#e91e63", "#9c27b0"],
  blueGreen: ["#0288d1", "#26c6da", "#2e7d32", "#26c6da"],
}; 