"use client";

import React, { useRef, useState, useEffect } from "react";
import { 
  motion, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useMotionTemplate, 
  useScroll, 
  useInView 
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Hook to create magnetic effect on elements
 */
export function useMagneticEffect(
  strength: number = 30, 
  duration: number = 0.3
) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  
  const handleMouse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX / 5 * strength);
    y.set(distanceY / 5 * strength);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return { ref, xSpring, ySpring, handleMouse, handleMouseLeave };
}

/**
 * Hook for spotlight effect on hover
 */
export function useSpotlightEffect() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const spotlightX = useTransform(mouseX, (val) => `${val}px`);
  const spotlightY = useTransform(mouseY, (val) => `${val}px`);
  
  const backgroundSize = useMotionTemplate`250% 250% at ${spotlightX} ${spotlightY}`;
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };
  
  return { ref, backgroundSize, handleMouseMove };
}

/**
 * Hook for 3D card tilt effect
 */
export function useCardTilt(
  scale: number = 1.05, 
  tiltMaxAngle: number = 8, 
  glareOpacity: number = 0.25
) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, opacity: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;
    
    const tiltX = (mouseY - 0.5) * tiltMaxAngle;
    const tiltY = (0.5 - mouseX) * tiltMaxAngle;
    
    setTilt({ 
      x: tiltX, 
      y: tiltY, 
      opacity: glareOpacity
    });
  };
  
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, opacity: 0 });
  };
  
  return { 
    ref, 
    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${scale})`,
    glareOpacity: tilt.opacity,
    handleMouseMove, 
    handleMouseLeave 
  };
}

/**
 * Animated Gradient Background Component
 */
export function AnimatedGradientBackground({
  children,
  className = "",
  containerClassName = "",
  colors = ["#ff4d4d", "#f9cb28", "#0076ff"],
  duration = 10,
  ...props
}: React.ComponentProps<"div"> & {
  containerClassName?: string;
  colors?: string[];
  duration?: number;
}) {
  const backgroundSize = "200% 200%";
  
  const gradientColors = colors.join(", ");
  const background = `linear-gradient(45deg, ${gradientColors})`;
  
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
            "0% 0%",
            "50% 100%",
            "100% 0%",
            "0% 100%",
            "0% 0%",
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
 * Staggered reveal animation for lists and grids
 */
export function StaggeredChildren({
  children,
  className = "",
  delayIncrement = 0.1,
  ...props
}: React.ComponentProps<"div"> & {
  delayIncrement?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      {React.Children.map(children, (child, i) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: i * delayIncrement,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}

/**
 * Background beam component
 */
export function BackgroundBeams({
  className = "",
  pathColor = "#f16717",
  ...props
}: React.ComponentProps<"div"> & {
  pathColor?: string;
}) {
  const paths = [
    "M0 2000 L1000 0 L2000 1000 L4000 2000 L3500 3000 L1000 2500 Z",
    "M0 1000 L1000 500 L3000 1000 L4000 2000 L2000 1500 L500 2500 Z",
    "M0 1500 L2000 0 L3000 1000 L4000 1500 L2000 2000 L1000 3000 Z"
  ];
  
  return (
    <div className={cn("absolute inset-0 overflow-hidden opacity-30", className)} {...props}>
      <div className="absolute inset-0">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 4000 3000"
        >
          {paths.map((path, index) => (
            <motion.path
              key={index}
              d={path}
              fill="none"
              stroke={pathColor}
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 0.2 
              }}
              transition={{
                pathLength: { 
                  duration: 4 + index, 
                  ease: "easeInOut", 
                  delay: index * 0.5,
                  repeat: Infinity,
                  repeatType: "reverse" 
                },
                opacity: { 
                  duration: 2, 
                  ease: "easeInOut", 
                  delay: index * 0.5,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

/**
 * Grid and Dot Background
 */
export function GridDotBackground({
  className = "",
  gridColor = "rgba(128, 128, 128, 0.1)",
  size = 24,
  interactive = true,
  dotColor = "#f16717",
  ...props
}: React.ComponentProps<"div"> & {
  gridColor?: string;
  size?: number;
  interactive?: boolean;
  dotColor?: string;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!interactive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };
  
  return (
    <div 
      className={cn("absolute inset-0 overflow-hidden", className)} 
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px` 
        }}
      />
      
      {interactive && (
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 100,
            height: 100,
            x: mousePosition.x - 50,
            y: mousePosition.y - 50,
            background: `radial-gradient(circle, ${dotColor}20 0%, transparent 70%)`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
}

/**
 * Parallax effect for elements
 */
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 100 * speed]
  );
  
  return { ref, y };
}

/**
 * Component that enables reduced motion accessibility
 */
export function MotionSafe({ 
  children, 
  className = "",
  ...props 
}: React.ComponentProps<"div">) {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  
  return (
    <div className={cn("motion-safe", className)} {...props} data-reduced-motion={reducedMotion}>
      {children}
    </div>
  );
} 