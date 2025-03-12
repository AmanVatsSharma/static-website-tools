"use client";

import React, { ReactNode, useState, useEffect, useRef } from "react";
import { 
  motion, 
  useSpring, 
  useMotionTemplate, 
  useTransform, 
  MotionValue, 
  AnimatePresence, 
  useMotionValue,
  useAnimate,
  useInView
} from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  useReducedMotion, 
  useMagneticEffect, 
  useSpotlightEffect, 
  useTypewriter,
  useStaggeredAnimation
} from "@/lib/animation-hooks";
import { useCardTilt } from "@/lib/aceternity-animations";
import { Balancer } from "react-wrap-balancer";

interface BentoFeatureProps {
  title: string;
  description: string;
  icon: ReactNode;
  size?: "sm" | "md" | "lg";
  hoverEffect?: "zoom" | "lift" | "glow" | "rotate" | "spotlight" | "magnetic" | "tilt" | "floating";
  className?: string;
  textColor?: string;
  accentColor?: string;
  glassEffect?: "none" | "light" | "medium" | "heavy";
  gradientIntensity?: "none" | "light" | "medium" | "heavy";
}

export function EnhancedBentoFeatures({
  features,
  className,
  title,
  subtitle,
  useInteractive = false,
  useAdvancedBackground = true,
  useGradientText = false,
  layout = "bento" // "bento" | "grid" | "masonry"
}: {
  features: BentoFeatureProps[];
  className?: string;
  title?: string;
  subtitle?: string;
  useInteractive?: boolean;
  useAdvancedBackground?: boolean;
  useGradientText?: boolean;
  layout?: "bento" | "grid" | "masonry";
}) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Typewriter effect for title if enabled and not reduced motion
  const { displayText: typewriterTitle } = useTypewriter(
    title || "",
    useInteractive && !reducedMotion ? 40 : 0,
    500,
    false
  );
  
  return (
    <section 
      ref={sectionRef}
      className={cn(
        "py-6 md:py-10 relative overflow-hidden",
        "bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900",
        className
      )}
    >
      {/* Background elements */}
      {useAdvancedBackground && <BackgroundEffects reducedMotion={reducedMotion} inView={inView} />}
      
      <div className="container mx-auto px-4 relative z-10">
        {(title || subtitle) && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center mb-6"
          >
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className={cn(
                  "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3",
                  useGradientText 
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary" 
                    : "text-gray-900 dark:text-white"
                )}
              >
                {useInteractive && !reducedMotion ? typewriterTitle : <Balancer>{title}</Balancer>}
                
                {/* Animated underline */}
                <motion.span 
                  className="absolute -z-10 bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  style={{ originX: 0 }}
                />
                
                {/* Subtle glow effect */}
                <motion.span 
                  className="absolute -z-10 bottom-0 left-0 right-0 h-1 bg-primary/40 blur-sm"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.7 }}
                />
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-3 text-lg sm:text-xl text-gray-600 dark:text-gray-300"
              >
                <Balancer>{subtitle}</Balancer>
              </motion.p>
            )}
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className={cn(
            {
              "grid grid-cols-1 md:grid-cols-6 auto-rows-auto gap-2 md:gap-3": layout === "bento",
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3": layout === "grid",
              "columns-1 sm:columns-2 lg:columns-3 gap-2 md:gap-3 [column-fill:_balance]": layout === "masonry"
            }
          )}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {features.map((feature, index) => (
            <EnhancedBentoFeature
              key={index}
              {...feature}
              index={index}
              useInteractive={useInteractive}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              layout={layout}
              inView={inView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BackgroundEffects({ reducedMotion, inView }: { reducedMotion: boolean, inView: boolean }) {
  if (reducedMotion) return null;
  
  return (
    <>
      {/* Enhanced floating gradient orbs with more dynamic animation */}
      <motion.div 
        className="absolute top-40 -left-24 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-0 animate-blob"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl opacity-0 animate-blob animation-delay-2000"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.2 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />
      <motion.div 
        className="absolute top-1/4 right-1/3 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-0 animate-blob animation-delay-4000"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.2 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.4 }}
      />
      <motion.div 
        className="absolute top-3/4 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl opacity-0 animate-blob animation-delay-2000"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.15 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.6 }}
      />
      
      {/* Enhanced grid pattern overlay with animation */}
      <motion.div 
        className="absolute inset-0 bg-grid-gray-900/[0.04] dark:bg-grid-white/[0.04] bg-[size:30px_30px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />
      
      {/* Advanced light beam effect with multiple paths */}
      <div className="absolute inset-0 overflow-hidden opacity-0 dark:opacity-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <svg
            className="absolute top-0 left-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 4000 3000"
          >
            <motion.path
              d="M0 2000 L2000 0 L4000 1500 L3500 3000 L1000 2500 Z"
              fill="none"
              stroke="url(#gradientLine)"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: inView ? 1 : 0, 
                opacity: inView ? 0.3 : 0
              }}
              transition={{
                pathLength: { 
                  duration: 8, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatType: "reverse"
                },
                opacity: {
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
            
            {/* Second path for more dynamic effect */}
            <motion.path
              d="M500 500 L2500 300 L3800 1200 L3000 2500 L800 2200 Z"
              fill="none"
              stroke="url(#gradientLine2)"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: inView ? 1 : 0, 
                opacity: inView ? 0.15 : 0
              }}
              transition={{
                pathLength: { 
                  duration: 12, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatType: "reverse"
                },
                opacity: {
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
            
            <defs>
              <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f16717" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#f16717" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f16717" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="gradientLine2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2e7d32" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#2e7d32" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2e7d32" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
      
      {/* Enhanced particle background with more particles and varied sizes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute rounded-full",
                i % 3 === 0 ? "bg-primary" : 
                i % 3 === 1 ? "bg-secondary" : "bg-accent"
              )}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.3,
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
              }}
              animate={{ 
                y: [
                  Math.random() * 100 + "%", 
                  Math.random() * 100 + "%", 
                  Math.random() * 100 + "%"
                ],
                x: i % 2 === 0 ? [
                  Math.random() * 100 + "%", 
                  Math.random() * 100 + "%", 
                  Math.random() * 100 + "%"
                ] : undefined
              }}
              transition={{ 
                duration: Math.random() * 20 + 10, 
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ scale: Math.random() * 0.5 + 0.5 }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* New: Subtle diagonal lines pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <pattern id="diagonalLines" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>
      </div>
    </>
  );
}

function EnhancedBentoFeature({
  title,
  description,
  icon,
  size = "md",
  hoverEffect = "zoom",
  className,
  index,
  textColor,
  accentColor,
  useInteractive = false,
  isHovered = false,
  onHover,
  onLeave,
  layout = "bento",
  inView = false,
  glassEffect = "medium",
  gradientIntensity = "medium"
}: BentoFeatureProps & { 
  index: number;
  useInteractive?: boolean;
  isHovered?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
  layout?: "bento" | "grid" | "masonry";
  inView?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const featureRef = useRef<HTMLDivElement>(null);
  const featureInView = useInView(featureRef, { once: true, amount: 0.3 });
  
  // Magnetic effect
  const magnetic = useMagneticEffect(25);
  
  // Spotlight effect
  const spotlight = useSpotlightEffect();
  
  // Card tilt effect
  const tilt = useCardTilt(1.05, 8, 0.2);
  
  // Floating animation
  const y = useMotionValue(0);
  const floatingAnimation = useSpring(y, { 
    stiffness: 100, 
    damping: 10, 
    mass: 0.5 
  });
  
  useEffect(() => {
    if (hoverEffect === "floating" && !reducedMotion) {
      const interval = setInterval(() => {
        y.set(Math.random() * 10 - 5);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [hoverEffect, reducedMotion, y]);
  
  // Define grid sizes based on feature size and layout
  const sizeClasses = layout === "bento" ? {
    sm: "md:col-span-2 md:row-span-1",
    md: "md:col-span-3 md:row-span-2",
    lg: "md:col-span-4 md:row-span-2",
  } : {};

  // Calculate position in grid for a dynamic layout if using bento
  let positionClass = "";
  if (layout === "bento" && size === "lg") {
    positionClass = index % 2 === 0 ? "md:col-start-1" : "md:col-start-3";
  }

  // Calculate delay for staggered animations
  const staggerDelay = 0.1 * Math.min(index, 5);
  
  // Get the glass effect classes
  const getGlassEffectClasses = () => {
    switch (glassEffect) {
      case "light":
        return "backdrop-blur-[3px] bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/60 dark:to-gray-800/60 border-gray-200 dark:border-gray-800/30 shadow-lg";
      case "medium":
        return "backdrop-blur-[6px] bg-gradient-to-br from-white/85 to-gray-100/85 dark:from-gray-900/50 dark:to-gray-800/50 border-gray-200 dark:border-gray-800/20 shadow-xl";
      case "heavy":
        return "backdrop-blur-[10px] bg-gradient-to-br from-white/80 to-gray-200/80 dark:from-gray-900/40 dark:to-gray-800/40 border-gray-300 dark:border-gray-800/10 shadow-2xl";
      case "none":
      default:
        return "bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-md";
    }
  };
  
  // Get the gradient intensity classes
  const getGradientIntensityClasses = () => {
    const baseColor = getBaseColor();
    
    switch (gradientIntensity) {
      case "light":
        return `from-${baseColor}/20 to-${baseColor}/5`;
      case "medium":
        return `from-${baseColor}/40 to-${baseColor}/10`;
      case "heavy":
        return `from-${baseColor}/60 to-${baseColor}/20`;
      case "none":
      default:
        return "";
    }
  };
  
  // Feature-specific color based on title for consistent theming
  const getBaseColor = () => {
    if (accentColor) return accentColor;
    if (title.includes("Premium")) return "primary";
    if (title.includes("Eco")) return "green-500";
    if (title.includes("Performance")) return "blue-500";
    if (title.includes("Time")) return "purple-500";
    if (title.includes("Expert")) return "secondary";
    if (title.includes("Indian")) return "amber-500";
    if (title.includes("Profit")) return "emerald-500";
    return "gray-500";
  };
  
  // Get feature color with intensity
  const getFeatureColor = () => {
    const baseColor = getBaseColor();
    
    return `from-${baseColor}/70 to-${baseColor}/10`;
  };
  
  // Text color based on theme
  const getTextColor = () => {
    if (textColor) return textColor;
    return "text-gray-900 dark:text-white";
  };
  
  // Get the correct props based on hover effect
  const getInteractiveProps = () => {
    if (reducedMotion || !useInteractive) return {};
    
    switch (hoverEffect) {
      case "magnetic":
        return {
          ref: magnetic.ref,
          onMouseMove: magnetic.handleMouse,
          onMouseLeave: magnetic.handleMouseLeave,
          style: {
            x: magnetic.xSpring,
            y: magnetic.ySpring,
          }
        };
      case "spotlight":
        return {
          ref: spotlight.ref,
          onMouseMove: spotlight.handleMouseMove,
          style: {
            backgroundImage: isHovered ? 
              `radial-gradient(circle at ${spotlight.spotlightX.get()}px ${spotlight.spotlightY.get()}px, 
                rgba(255, 255, 255, 0.15) 0%, 
                rgba(255, 255, 255, 0) 70%)` : 
              "none"
          }
        };
      case "tilt":
        return {
          ref: tilt.ref,
          onMouseMove: tilt.handleMouseMove,
          onMouseLeave: tilt.handleMouseLeave,
          style: {
            transform: isHovered ? tilt.transform : undefined,
          }
        };
      case "floating":
        return {
          style: {
            y: floatingAnimation
          }
        };
      default:
        return {};
    }
  };

  // Define hover effects
  const getHoverStyles = () => {
    if (reducedMotion) return {};
    
    switch (hoverEffect) {
      case "zoom":
        return {
          scale: 1.05,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        };
      case "lift":
        return {
          y: -8,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        };
      case "glow":
        const baseColor = getBaseColor();
        let glowColor;
        
        switch(baseColor) {
          case "primary": glowColor = "rgba(241, 103, 23, 0.3)"; break;
          case "green-500": glowColor = "rgba(46, 125, 50, 0.3)"; break;
          case "blue-500": glowColor = "rgba(59, 130, 246, 0.3)"; break;
          case "purple-500": glowColor = "rgba(124, 58, 237, 0.3)"; break;
          case "secondary": glowColor = "rgba(236, 72, 153, 0.3)"; break;
          case "amber-500": glowColor = "rgba(245, 158, 11, 0.3)"; break;
          case "emerald-500": glowColor = "rgba(16, 185, 129, 0.3)"; break;
          default: glowColor = "rgba(255, 193, 7, 0.3)";
        }

        return {
          boxShadow: `0 0 30px 5px ${glowColor}`,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        };
      case "rotate":
        return {
          rotate: 1,
          scale: 1.02,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        };
      case "magnetic":
      case "spotlight":
      case "tilt":
      case "floating":
        return {}; // Handled by interactive props
      default:
        return {
          scale: 1.05,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        };
    }
  };

  return (
    <motion.div
      ref={featureRef}
      className={cn(
        "group relative overflow-hidden rounded-2xl border-2 border-gray-200/80 dark:border-gray-700/80",
        "shadow-[0_15px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)]",
        "before:absolute before:inset-0 before:rounded-2xl before:p-[2px] before:bg-gradient-to-b before:from-white before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500 before:z-0",
        layout !== "masonry" ? sizeClasses[size] : "",
        layout === "masonry" ? "break-inside-avoid mb-3 max-h-[260px]" : "",
        positionClass,
        title.includes("Premium") ? "after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-primary/30 after:rounded-b-2xl" :
        title.includes("Eco") ? "after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-green-500/30 after:rounded-b-2xl" :
        title.includes("Performance") ? "after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-blue-500/30 after:rounded-b-2xl" :
        title.includes("Time") ? "after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-purple-500/30 after:rounded-b-2xl" :
        title.includes("Expert") ? "after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-secondary/30 after:rounded-b-2xl" :
        title.includes("Indian") ? "after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-amber-500/30 after:rounded-b-2xl" :
        title.includes("Profit") ? "after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-emerald-500/30 after:rounded-b-2xl" :
        "after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-gray-500/30 after:rounded-b-2xl",
        className || getGlassEffectClasses()
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={featureInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: staggerDelay,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={getHoverStyles()}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      {...getInteractiveProps()}
    >
      {/* Enhanced glassmorphism effect with depth */}
      <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[2px] z-0" />
      
      {/* Background gradient overlay that appears on hover */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-opacity duration-500",
          getFeatureColor()
        )}
      />

      {/* Layered border glow effect */}
      <div className="absolute inset-[1px] rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
        <div className={cn(
          "absolute inset-0 rounded-[14px] blur-sm",
          title.includes("Premium") ? "bg-primary/20" :
          title.includes("Eco") ? "bg-green-500/20" :
          title.includes("Performance") ? "bg-blue-500/20" :
          title.includes("Time") ? "bg-purple-500/20" :
          title.includes("Expert") ? "bg-secondary/20" :
          title.includes("Indian") ? "bg-amber-500/20" :
          title.includes("Profit") ? "bg-emerald-500/20" :
          "bg-gray-500/20"
        )} />
      </div>
      
      {/* Advanced animated corner accent */}
      <div className={cn(
        "absolute -bottom-2 -right-2 h-12 w-12 rounded-full transition-all duration-500",
        "translate-x-8 translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4",
        title.includes("Premium") ? "bg-primary/30" :
        title.includes("Eco") ? "bg-green-500/30" :
        title.includes("Performance") ? "bg-blue-500/30" :
        title.includes("Time") ? "bg-purple-500/30" :
        title.includes("Expert") ? "bg-secondary/30" :
        title.includes("Indian") ? "bg-amber-500/30" :
        title.includes("Profit") ? "bg-emerald-500/30" :
        "bg-gray-500/30"
      )}>
        {/* Inner glow */}
        <motion.div 
          className="absolute inset-0 rounded-full blur-sm bg-white dark:bg-gray-100"
          initial={{ opacity: 0, scale: 0.8 }} 
          whileHover={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Enhanced animated dot pattern background with motion */}
      <div className="absolute inset-0 opacity-10">
        <motion.svg 
          className="w-full h-full" 
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          <pattern
            id={`dots-${index}`}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#dots-${index})`} />
        </motion.svg>
      </div>
      
      {/* Card inner content with enhanced animations and reduced padding */}
      <div className="relative p-3 sm:p-4 z-10 h-full flex flex-col">
      {/* Feature icon with animated background on hover - with reduced size */}
        <div>
          <motion.div 
            className={cn(
              "mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl",
              "bg-gradient-to-br from-white/80 to-white/20 dark:from-gray-700/80 dark:to-gray-700/20", 
              "shadow-md transition-colors duration-300 group-hover:shadow-lg",
              "group-hover:bg-gradient-to-br",
              title.includes("Premium") ? "group-hover:from-primary group-hover:to-primary/70" :
              title.includes("Eco") ? "group-hover:from-green-500 group-hover:to-green-500/70" :
              title.includes("Performance") ? "group-hover:from-blue-500 group-hover:to-blue-500/70" :
              title.includes("Time") ? "group-hover:from-purple-500 group-hover:to-purple-500/70" :
              title.includes("Expert") ? "group-hover:from-secondary group-hover:to-secondary/70" :
              title.includes("Indian") ? "group-hover:from-amber-500 group-hover:to-amber-500/70" :
              title.includes("Profit") ? "group-hover:from-emerald-500 group-hover:to-emerald-500/70" :
              "group-hover:from-gray-500 group-hover:to-gray-500/70"
            )}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            {icon ? (
              <motion.div
                className="text-gray-700 dark:text-gray-200 group-hover:text-white text-xl"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {React.isValidElement(icon) 
                  ? React.cloneElement(icon, {
                      ...(icon.props as any),
                      className: 'h-6 w-6',
                      "aria-hidden": true 
                    })
                  : icon}
              </motion.div>
            ) : null}
            
            {/* Enhanced icon background glow effect */}
            <motion.div 
              className={cn(
                "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl",
                title.includes("Premium") ? "bg-primary" :
                title.includes("Eco") ? "bg-green-500" :
                title.includes("Performance") ? "bg-blue-500" :
                title.includes("Time") ? "bg-purple-500" :
                title.includes("Expert") ? "bg-secondary" :
                title.includes("Indian") ? "bg-amber-500" :
                title.includes("Profit") ? "bg-emerald-500" :
                "bg-gray-500"
              )}
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 2.0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </div>
        
        <div className="flex-1">
          <h3 className={cn(
            "mb-2 text-lg font-bold transition-colors duration-300",
            getTextColor(),
            title.includes("Premium") ? "group-hover:text-primary" :
            title.includes("Eco") ? "group-hover:text-green-600 dark:group-hover:text-green-400" :
            title.includes("Performance") ? "group-hover:text-blue-600 dark:group-hover:text-blue-400" :
            title.includes("Time") ? "group-hover:text-purple-600 dark:group-hover:text-purple-400" :
            title.includes("Expert") ? "group-hover:text-secondary" :
            title.includes("Indian") ? "group-hover:text-amber-600 dark:group-hover:text-amber-400" :
            title.includes("Profit") ? "group-hover:text-emerald-600 dark:group-hover:text-emerald-400" :
            "group-hover:text-gray-800 dark:group-hover:text-gray-100"
          )}>
          {title}
            
            {/* Enhanced animated underline effect */}
            <motion.div 
              className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-current to-transparent mt-0.5 transition-all duration-300 opacity-50"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
        </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {description}
          </p>
          
          {/* Enhanced learn more link with animation */}
          <motion.div 
            className={cn(
              "mt-2 text-sm font-medium group/link inline-flex items-center gap-1",
              title.includes("Premium") ? "text-primary" :
              title.includes("Eco") ? "text-green-600 dark:text-green-400" :
              title.includes("Performance") ? "text-blue-600 dark:text-blue-400" :
              title.includes("Time") ? "text-purple-600 dark:text-purple-400" :
              title.includes("Expert") ? "text-secondary" :
              title.includes("Indian") ? "text-amber-600 dark:text-amber-400" :
              title.includes("Profit") ? "text-emerald-600 dark:text-emerald-400" :
              "text-gray-700 dark:text-gray-300"
            )}
            initial={{ opacity: 0 }}
            whileHover={{ x: 5 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Learn more</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14"
              height="14"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </motion.div>
        </div>
        
        {/* Enhanced bottom subtle accent line with animation */}
        <motion.div 
          className={cn(
            "absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full",
            "bg-gradient-to-r",
            title.includes("Premium") ? "from-primary/0 via-primary to-primary/0" :
            title.includes("Eco") ? "from-green-500/0 via-green-500 to-green-500/0" :
            title.includes("Performance") ? "from-blue-500/0 via-blue-500 to-blue-500/0" :
            title.includes("Time") ? "from-purple-500/0 via-purple-500 to-purple-500/0" :
            title.includes("Expert") ? "from-secondary/0 via-secondary to-secondary/0" :
            title.includes("Indian") ? "from-amber-500/0 via-amber-500 to-amber-500/0" :
            title.includes("Profit") ? "from-emerald-500/0 via-emerald-500 to-emerald-500/0" :
            "from-gray-500/0 via-gray-500 to-gray-500/0"
          )}
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
} 

/* Add these animations to your global CSS */
// @keyframes blob {
//   0% { transform: translate(0px, 0px) scale(1); }
//   33% { transform: translate(30px, -50px) scale(1.1); }
//   66% { transform: translate(-20px, 20px) scale(0.9); }
//   100% { transform: translate(0px, 0px) scale(1); }
// }
// .animate-blob {
//   animation: blob 12s infinite;
// }
// .animation-delay-2000 {
//   animation-delay: 2s;
// }
// .animation-delay-4000 {
//   animation-delay: 4s;
// } 