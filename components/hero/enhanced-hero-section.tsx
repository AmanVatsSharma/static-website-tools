"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { 
  BackgroundBeams,
  GridDotBackground,
  MovingBorderButton,
  MovingBorderCard
} from "@/components/ui/aceternity";
import { useSpotlightEffect, useReducedMotion } from "@/lib/animation-hooks";

export function EnhancedHeroSection() {
  // Refs and animation hooks
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const reducedMotion = useReducedMotion();
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  
  // Spotlight effect for CTA button
  const spotlight = useSpotlightEffect();
  
  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
      style={{ position: 'relative' }}
      data-component="enhanced-hero-section"
    >
      {/* Background Animations */}
      <BackgroundBeams 
        className="z-0 opacity-30" 
        pathColor="#f16717" 
        secondaryColor="#ffc107"
        beamCount={4}
        disableAnimation={reducedMotion}
      />
      
      <GridDotBackground
        className="z-0"
        gridColor="rgba(128, 128, 128, 0.05)"
        dotColor="#f16717"
        size={30}
        disableAnimation={reducedMotion}
      />
      
      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32" style={{ position: 'relative' }}>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Premium Agricultural Machinery
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Empower Your</span>
                <span className="block text-primary">Farming Success</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                High-quality agricultural equipment designed specifically for Indian farming conditions. Trusted by farmers across the country.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* Primary CTA with Spotlight effect */}
              <div
                ref={spotlight.ref}
                onMouseMove={spotlight.handleMouseMove}
                className="relative overflow-hidden rounded-lg"
              >
                <Button size="xl" className="group bg-primary hover:bg-primary/90 relative z-10">
                  <span>Explore Products</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  
                  {/* Spotlight overlay */}
                  <motion.div
                    className="absolute inset-0 z-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 opacity-0 group-hover:opacity-100"
                    style={{ 
                      backgroundSize: spotlight.backgroundSize,
                    }}
                  />
                </Button>
              </div>
              
              <Button size="xl" variant="outline-primary" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </Button>
              
              {/* WhatsApp button with animated border */}
              <MovingBorderButton
                borderClassName="bg-gradient-to-r from-green-500 via-green-400 to-green-600"
                className="bg-green-600 text-white hover:bg-green-700"
                duration={4}
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </div>
              </MovingBorderButton>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Premium Quality</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Durable & Reliable</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Fast Delivery</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">All Over India</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Expert Support</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">24/7 Assistance</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Image with Parallax and Tilt effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              y: reducedMotion ? 0 : imageY, 
              position: 'relative' 
            }}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            whileHover={reducedMotion ? {} : { scale: 1.02, transition: { duration: 0.3 } }}
          >
            <ResponsiveImage
              src="/placeholder-hero.jpg"
              alt="Agricultural machinery in action"
              width={1200}
              height={800}
              className="object-cover"
              wrapperClassName="h-full w-full"
              breakpoints={{
                sm: 600,
                md: 900,
                lg: 1200
              }}
              priority={true}
            />
            
            {/* Floating Card - Mr. Jitender Walia */}
            <MovingBorderCard
              className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg max-w-[200px]"
              colors={["#f16717", "#ffc107", "#2e7d32", "#f16717"]}
              duration={8}
              rx="12px"
              ry="12px"
              disableAnimation={reducedMotion}
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                  <OptimizedImage
                    src="/placeholder-avatar.jpg"
                    alt="Mr. Jitender Walia"
                    width={48}
                    height={48}
                    className="object-cover"
                    fadeIn={true}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Mr. Jitender Walia</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Founder & CEO</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                "Committed to empowering Indian farmers with the best agricultural technology."
              </p>
            </MovingBorderCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 