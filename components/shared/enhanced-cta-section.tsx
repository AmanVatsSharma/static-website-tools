"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  AnimatedGradientBackground, 
  MovingBorderButton 
} from "@/components/ui/aceternity";
import { useSpotlightEffect, useReducedMotion } from "@/lib/animation-hooks";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  whatsappButtonText?: string;
  className?: string;
  variant?: "default" | "alternate";
  gradientColors?: string[];
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  onWhatsappButtonClick?: () => void;
}

export function EnhancedCTASection({
  title = "Ready to Upgrade Your Farming Equipment?",
  subtitle = "Contact us today to discover how our premium agricultural machinery can transform your farming operations.",
  primaryButtonText = "Explore Products",
  secondaryButtonText = "Call Now",
  whatsappButtonText = "WhatsApp",
  className,
  variant = "default",
  gradientColors = ["#f16717", "#ffc107", "#2e7d32", "#f16717"],
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  onWhatsappButtonClick,
}: CTASectionProps) {
  const spotlight = useSpotlightEffect();
  const reducedMotion = useReducedMotion();

  const handlePrimaryClick = () => {
    if (onPrimaryButtonClick) {
      onPrimaryButtonClick();
    }
  };

  const handleSecondaryClick = () => {
    if (onSecondaryButtonClick) {
      onSecondaryButtonClick();
    }
  };

  const handleWhatsappClick = () => {
    if (onWhatsappButtonClick) {
      onWhatsappButtonClick();
    }
  };

  const isAlternate = variant === "alternate";

  return (
    <AnimatedGradientBackground
      containerClassName={cn("py-16 md:py-24", className)}
      className="opacity-20"
      colors={gradientColors}
      duration={15}
    >
      <div className="container mx-auto px-4">
        <div className={cn(
          "relative rounded-2xl p-8 md:p-12 overflow-hidden shadow-xl",
          isAlternate 
            ? "bg-white dark:bg-gray-800" 
            : "bg-primary bg-opacity-90 dark:bg-opacity-90 text-white"
        )}>
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className={cn(
                "text-3xl font-bold tracking-tight sm:text-4xl", 
                isAlternate ? "text-gray-900 dark:text-white" : "text-white"
              )}>
                {title}
              </h2>
              <p className={cn(
                "text-lg md:text-xl", 
                isAlternate ? "text-gray-600 dark:text-gray-300" : "text-white/90"
              )}>
                {subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {/* Primary Button with Spotlight */}
              <div
                ref={spotlight.ref}
                onMouseMove={spotlight.handleMouseMove}
                className="relative overflow-hidden rounded-lg"
              >
                <Button 
                  size="xl" 
                  className={cn(
                    "group relative",
                    isAlternate 
                      ? "bg-primary hover:bg-primary/90 text-white" 
                      : "bg-white text-primary hover:bg-white/90"
                  )}
                  onClick={handlePrimaryClick}
                >
                  <span>{primaryButtonText}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  
                  {/* Spotlight overlay */}
                  <motion.div
                    className={cn(
                      "absolute inset-0 z-0 opacity-0 group-hover:opacity-100",
                      isAlternate 
                        ? "bg-gradient-to-r from-primary/80 via-primary to-primary/80" 
                        : "bg-gradient-to-r from-white/80 via-white to-white/80"
                    )}
                    style={{ 
                      backgroundSize: `250% 250% at ${spotlight.spotlightX.get()}px ${spotlight.spotlightY.get()}px`,
                    }}
                  />
                </Button>
              </div>
              
              {/* Secondary Call Button */}
              <Button 
                size="xl" 
                variant={isAlternate ? "outline-primary" : "outline"} 
                className={cn(
                  "flex items-center gap-2",
                  isAlternate 
                    ? "border-primary text-primary hover:bg-primary/10" 
                    : "border-white text-white hover:bg-white/10"
                )}
                onClick={handleSecondaryClick}
              >
                <Phone className="h-4 w-4" />
                <span>{secondaryButtonText}</span>
              </Button>
              
              {/* WhatsApp Button with Moving Border */}
              <MovingBorderButton
                borderClassName="bg-gradient-to-r from-green-500 via-green-400 to-green-600"
                className={cn(
                  isAlternate 
                    ? "bg-green-600 text-white hover:bg-green-700" 
                    : "bg-green-600 text-white hover:bg-green-700"
                )}
                duration={4}
                disableAnimation={reducedMotion}
                onClick={handleWhatsappClick}
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{whatsappButtonText}</span>
                </div>
              </MovingBorderButton>
            </motion.div>
          </div>
          
          {/* Decorative Circles */}
          <div className="absolute left-0 top-0 -ml-16 -mt-16 h-64 w-64 rounded-full bg-primary/20 dark:bg-primary/10 blur-3xl"></div>
          <div className="absolute right-0 bottom-0 -mr-16 -mb-16 h-64 w-64 rounded-full bg-secondary/20 dark:bg-secondary/10 blur-3xl"></div>
        </div>
      </div>
    </AnimatedGradientBackground>
  );
} 