"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/animation-hooks";
import { 
  BackgroundBeams, 
  MovingBorderButton, 
  TiltingCard,
  BackgroundLines
} from "@/components/ui/aceternity";
import { ArrowRight, ChevronRight } from "lucide-react";

interface EnhancedHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  backgroundEffect?: "beams" | "lines" | "none";
  className?: string;
  imagePosition?: "right" | "left";
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
}

export function EnhancedHero({
  title,
  subtitle,
  description,
  primaryButtonText = "Get Started",
  primaryButtonHref = "#",
  secondaryButtonText,
  secondaryButtonHref,
  image,
  backgroundEffect = "beams",
  className,
  imagePosition = "right",
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}: EnhancedHeroProps) {
  const reducedMotion = useReducedMotion();
  
  const handlePrimaryButtonClick = () => {
    if (onPrimaryButtonClick) {
      onPrimaryButtonClick();
    }
  };
  
  const handleSecondaryButtonClick = () => {
    if (onSecondaryButtonClick) {
      onSecondaryButtonClick();
    }
  };
  
  const renderBackgroundEffect = () => {
    switch (backgroundEffect) {
      case "beams":
        return <BackgroundBeams className="opacity-20" />;
      case "lines":
        return (
          <BackgroundLines 
            className="opacity-20" 
            lineColor="var(--primary)" 
            lineWidth={1}
            waveHeight={40}
            waveCount={6}
            animate={!reducedMotion}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <section 
      className={cn(
        "relative w-full overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24",
        className
      )}
    >
      {renderBackgroundEffect()}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={cn(
          "grid gap-8 items-center",
          image ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1",
          imagePosition === "left" ? "lg:flex-row-reverse" : ""
        )}>
          <div className={cn(
            "flex flex-col space-y-6 max-w-3xl",
            imagePosition === "left" && image ? "lg:order-2" : ""
          )}>
            {subtitle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full"
              >
                {subtitle}
              </motion.div>
            )}
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {title}
            </motion.h1>
            
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300"
              >
                {description}
              </motion.p>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              {primaryButtonText && (
                primaryButtonHref ? (
                  <Link href={primaryButtonHref}>
                    <MovingBorderButton
                      borderClassName="bg-gradient-to-r from-primary via-primary/80 to-primary"
                      className="bg-primary text-white hover:bg-primary/90 px-6 py-3 text-base font-medium"
                      rx="8px"
                      ry="8px"
                      duration={3}
                      disableAnimation={reducedMotion}
                      onClick={handlePrimaryButtonClick}
                    >
                      <div className="flex items-center">
                        {primaryButtonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </MovingBorderButton>
                  </Link>
                ) : (
                  <MovingBorderButton
                    borderClassName="bg-gradient-to-r from-primary via-primary/80 to-primary"
                    className="bg-primary text-white hover:bg-primary/90 px-6 py-3 text-base font-medium"
                    rx="8px"
                    ry="8px"
                    duration={3}
                    disableAnimation={reducedMotion}
                    onClick={handlePrimaryButtonClick}
                  >
                    <div className="flex items-center">
                      {primaryButtonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </MovingBorderButton>
                )
              )}
              
              {secondaryButtonText && (
                <Link
                  href={secondaryButtonHref || "#"}
                  onClick={handleSecondaryButtonClick}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {secondaryButtonText}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              )}
            </motion.div>
          </div>
          
          {image && (
            <div className={cn(
              "relative w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]",
              imagePosition === "left" ? "lg:order-1" : ""
            )}>
              <TiltingCard
                className="w-full h-full"
                disableAnimation={reducedMotion}
                scale={1.05}
                tiltAmount={10}
                glareOpacity={0.2}
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </TiltingCard>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto fill-white dark:fill-gray-900"
          preserveAspectRatio="none"
        >
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}

// Example usage in demo page:
export function DemoEnhancedHero() {
  return (
    <EnhancedHero
      title="Powerful Agricultural Equipment for Modern Farming"
      subtitle="AWE - Agricultural World Equipment"
      description="Discover our range of high-quality agricultural machinery designed to enhance productivity and efficiency in your farming operations."
      primaryButtonText="Explore Products"
      primaryButtonHref="/products"
      secondaryButtonText="Contact Us"
      secondaryButtonHref="/contact"
      image={{
        src: "/images/hero-image.jpg",
        alt: "Agricultural machinery in field",
        width: 1200,
        height: 800,
      }}
      backgroundEffect="beams"
    />
  );
} 