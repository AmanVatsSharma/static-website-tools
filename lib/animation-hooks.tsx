"use client";

import { useState, useEffect, useRef } from "react";
import { 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useInView,
  useMotionTemplate,
  type MotionValue 
} from "framer-motion";

/**
 * Hook to check if reduced motion is preferred
 */
export function useReducedMotion(defaultValue: boolean = false): boolean {
  const [reducedMotion, setReducedMotion] = useState(defaultValue);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches || defaultValue);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches || defaultValue);
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [defaultValue]);
  
  return reducedMotion;
}

/**
 * Hook for magnetic effect on elements
 */
export function useMagneticEffect(strength: number = 30, duration: number = 0.3) {
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
 * Hook to create spotlight effect
 */
export function useSpotlightEffect() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Convert to percentages directly
  const spotlightX = useTransform(mouseX, (val) => val);
  const spotlightY = useTransform(mouseY, (val) => val);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;
    
    mouseX.set(mouseXVal);
    mouseY.set(mouseYVal);
  };
  
  // Don't use useMotionTemplate, just create a derived value for the complete background size style
  const getBackgroundSize = () => {
    const x = spotlightX.get();
    const y = spotlightY.get();
    return `250% 250% at ${x}px ${y}px`;
  };
  
  return { 
    ref, 
    handleMouseMove,
    spotlightX,
    spotlightY,
    getBackgroundSize
  };
}

/**
 * Hook for parallax effect on scroll
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
 * Hook for reveal on scroll effect
 */
export function useRevealOnScroll(threshold: number = 0.1, once: boolean = true) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: threshold, once });
  
  return { ref, inView };
}

/**
 * Hook to animate a value on hover
 */
export function useHoverScale(
  defaultScale: number = 1, 
  hoverScale: number = 1.05, 
  duration: number = 0.2
) {
  const [isHovered, setIsHovered] = useState(false);
  const scale = useMotionValue(defaultScale);
  const scaleSpring = useSpring(scale, {
    damping: 15,
    stiffness: 150,
    duration: duration * 1000
  });
  
  useEffect(() => {
    scale.set(isHovered ? hoverScale : defaultScale);
  }, [isHovered, hoverScale, defaultScale, scale]);
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  return { scaleSpring, handleMouseEnter, handleMouseLeave, isHovered };
}

/**
 * Hook for typing/cursor effect
 */
export function useTypewriter(
  text: string, 
  speed: number = 100, 
  delay: number = 0, 
  loop: boolean = false
) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const index = useRef(0);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Reset when text changes
    setDisplayText('');
    index.current = 0;
    setIsTyping(false);
    
    // Initial delay
    timeout = setTimeout(() => {
      setIsTyping(true);
      
      const typingInterval = setInterval(() => {
        setDisplayText(text.substring(0, index.current + 1));
        index.current += 1;
        
        if (index.current >= text.length) {
          setIsTyping(false);
          clearInterval(typingInterval);
          
          if (loop) {
            setTimeout(() => {
              setDisplayText('');
              index.current = 0;
              setIsTyping(true);
            }, 1500); // Pause before restarting
          }
        }
      }, speed);
      
      return () => clearInterval(typingInterval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, speed, delay, loop]);
  
  return { displayText, isTyping };
}

/**
 * Hook for staggered animations of children
 */
export function useStaggeredAnimation(itemCount: number, staggerDelay: number = 0.1) {
  return Array.from({ length: itemCount }).map((_, i) => i * staggerDelay);
} 