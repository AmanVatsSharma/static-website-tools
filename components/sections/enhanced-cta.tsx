"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/lib/animation-hooks";
import { 
  MovingBorderButton, 
  BackgroundBeams, 
  BackgroundLines,
  AuroraBackground
} from "@/components/ui/aceternity";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";

interface EnhancedCTAProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  backgroundType?: "beams" | "lines" | "aurora" | "none";
  backgroundImage?: {
    src: string;
    alt: string;
  };
  className?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  variant?: "centered" | "split" | "card";
}

export function EnhancedCTA({
  title,
  subtitle,
  description,
  primaryButtonText = "Get Started",
  primaryButtonHref = "#",
  secondaryButtonText,
  secondaryButtonHref,
  backgroundType = "beams",
  backgroundImage,
  className,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  variant = "centered",
}: EnhancedCTAProps) {
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
  
  const renderBackground = () => {
    switch (backgroundType) {
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
      case "aurora":
        return <AuroraBackground className="opacity-40" />;
      default:
        return null;
    }
  };
  
  const renderCenteredVariant = () => {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4"
            >
              {subtitle}
            </motion.div>
          )}
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            {title}
          </motion.h2>
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
            >
              {description}
            </motion.p>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {primaryButtonText && (
              <MovingBorderButton
                borderClassName="bg-gradient-to-r from-primary via-primary/80 to-primary"
                className="bg-primary text-white hover:bg-primary/90 px-6 py-3 text-base font-medium"
                rx="8px"
                ry="8px"
                duration={3}
                disableAnimation={reducedMotion}
                onClick={handlePrimaryButtonClick}
                as={primaryButtonHref ? Link : "button"}
                href={primaryButtonHref}
              >
                <div className="flex items-center">
                  {primaryButtonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </MovingBorderButton>
            )}
            
            {secondaryButtonText && (
              <Link
                href={secondaryButtonHref || "#"}
                onClick={handleSecondaryButtonClick}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {secondaryButtonText}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    );
  };
  
  const renderSplitVariant = () => {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            {subtitle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4"
              >
                {subtitle}
              </motion.div>
            )}
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
            >
              {title}
            </motion.h2>
            
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 dark:text-gray-300 mb-8"
              >
                {description}
              </motion.p>
            )}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 md:justify-end"
          >
            {primaryButtonText && (
              <MovingBorderButton
                borderClassName="bg-gradient-to-r from-primary via-primary/80 to-primary"
                className="bg-primary text-white hover:bg-primary/90 px-6 py-3 text-base font-medium"
                rx="8px"
                ry="8px"
                duration={3}
                disableAnimation={reducedMotion}
                onClick={handlePrimaryButtonClick}
                as={primaryButtonHref ? Link : "button"}
                href={primaryButtonHref}
              >
                <div className="flex items-center">
                  {primaryButtonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </MovingBorderButton>
            )}
            
            {secondaryButtonText && (
              <Link
                href={secondaryButtonHref || "#"}
                onClick={handleSecondaryButtonClick}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {secondaryButtonText}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    );
  };
  
  const renderCardVariant = () => {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              {subtitle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4"
                >
                  {subtitle}
                </motion.div>
              )}
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white"
              >
                {title}
              </motion.h2>
              
              {description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-gray-600 dark:text-gray-300 mb-8"
                >
                  {description}
                </motion.p>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {primaryButtonText && (
                  <MovingBorderButton
                    borderClassName="bg-gradient-to-r from-primary via-primary/80 to-primary"
                    className="bg-primary text-white hover:bg-primary/90 px-6 py-3 text-base font-medium"
                    rx="8px"
                    ry="8px"
                    duration={3}
                    disableAnimation={reducedMotion}
                    onClick={handlePrimaryButtonClick}
                    as={primaryButtonHref ? Link : "button"}
                    href={primaryButtonHref}
                  >
                    <div className="flex items-center">
                      {primaryButtonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </MovingBorderButton>
                )}
                
                {secondaryButtonText && (
                  <Link
                    href={secondaryButtonHref || "#"}
                    onClick={handleSecondaryButtonClick}
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {secondaryButtonText}
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <section 
      className={cn(
        "relative overflow-hidden",
        backgroundImage ? "bg-cover bg-center" : "",
        className
      )}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage.src})` } : {}}
    >
      {/* Overlay for background image */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/50 z-0"></div>
      )}
      
      {/* Background effects */}
      {renderBackground()}
      
      {/* Content based on variant */}
      {variant === "centered" && renderCenteredVariant()}
      {variant === "split" && renderSplitVariant()}
      {variant === "card" && renderCardVariant()}
    </section>
  );
}

// Example usage in demo page:
export function DemoEnhancedCTA() {
  return (
    <EnhancedCTA
      title="Ready to Enhance Your Agricultural Operations?"
      subtitle="Get in Touch"
      description="Contact our team today to learn more about our high-quality agricultural equipment and how they can improve your farming efficiency."
      primaryButtonText="Call Us Now"
      primaryButtonHref="tel:+1234567890"
      secondaryButtonText="Send a Message"
      secondaryButtonHref="/contact"
      backgroundType="aurora"
      variant="centered"
    />
  );
}

// Contact CTA variant
export function ContactCTA() {
  return (
    <EnhancedCTA
      title="Have Questions About Our Products?"
      description="Our team of agricultural experts is ready to assist you with product information, pricing, and finding the right equipment for your needs."
      primaryButtonText={
        <div className="flex items-center">
          <Phone className="mr-2 h-4 w-4" />
          Call Us
        </div>
      }
      primaryButtonHref="tel:+1234567890"
      secondaryButtonText={
        <div className="flex items-center">
          <MessageCircle className="mr-2 h-4 w-4" />
          WhatsApp
        </div>
      }
      secondaryButtonHref="https://wa.me/1234567890"
      backgroundType="beams"
      variant="card"
    />
  );
} 