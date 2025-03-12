"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { 
  ShootingStarsBackground, 
  MovingBorderCard 
} from "@/components/ui/aceternity";
import { useReducedMotion } from "@/lib/animation-hooks";

interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  className?: string;
  title?: string;
  subtitle?: string;
  darkMode?: boolean;
}

export function EnhancedTestimonialsSection({
  testimonials,
  className,
  title = "What Our Customers Say",
  subtitle = "Hear from farmers who have transformed their operations with our equipment",
  darkMode = false,
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    nextSlide();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevSlide();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
        )}
      />
    ));
  };

  return (
    <ShootingStarsBackground
      className={cn(
        "py-20 md:py-32",
        darkMode ? 
          "bg-gray-900 text-white" : 
          "bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800",
        className
      )}
      background={darkMode ? "linear-gradient(to bottom, #0f172a, #1e293b)" : undefined}
      starColor={darkMode ? "#ffffff" : "#f16717"}
      starCount={darkMode ? 20 : 10}
      disableAnimation={reducedMotion}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            {subtitle}
          </motion.p>
        </div>
        
        <div 
          className="relative max-w-4xl mx-auto" 
          ref={containerRef}
        >
          <div 
            className="relative h-[350px] md:h-[300px] lg:h-[250px] overflow-hidden"
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={testimonials[activeIndex].id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="absolute w-full h-full"
              >
                <MovingBorderCard
                  className="w-full h-full flex flex-col justify-center p-6 md:p-8"
                  colors={darkMode ? 
                    ["#6366f1", "#8b5cf6", "#6366f1"] : 
                    ["#f16717", "#ffc107", "#f16717"]
                  }
                  duration={10}
                  rx="16px"
                  ry="16px"
                  borderWidth="2px"
                  disableAnimation={reducedMotion}
                >
                  <div className="relative z-10 text-center">
                    <blockquote className="text-lg md:text-xl italic mb-6 text-gray-700 dark:text-gray-300">
                      "{testimonials[activeIndex].content}"
                    </blockquote>
                    
                    <div className="flex flex-col items-center">
                      <div className="flex mb-2">{renderStars(testimonials[activeIndex].rating)}</div>
                      
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <Image
                            src={testimonials[activeIndex].author.avatarUrl}
                            alt={testimonials[activeIndex].author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {testimonials[activeIndex].author.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonials[activeIndex].author.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </MovingBorderCard>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    activeIndex === index
                      ? "bg-primary w-6"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  )}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </ShootingStarsBackground>
  );
} 