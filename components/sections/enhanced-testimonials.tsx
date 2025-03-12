"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/lib/animation-hooks";
import { TiltingCard, BackgroundBeams } from "@/components/ui/aceternity";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export interface Testimonial {
  id: string | number;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  avatar?: {
    src: string;
    alt: string;
  };
}

interface EnhancedTestimonialsProps {
  title: string;
  subtitle?: string;
  description?: string;
  testimonials: Testimonial[];
  layout?: "grid" | "carousel" | "featured";
  columns?: 1 | 2 | 3;
  showBackground?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  className?: string;
}

export function EnhancedTestimonials({
  title,
  subtitle,
  description,
  testimonials,
  layout = "carousel",
  columns = 3,
  showBackground = true,
  autoplay = true,
  autoplaySpeed = 5000,
  className,
}: EnhancedTestimonialsProps) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Handle autoplay for carousel
  useEffect(() => {
    if (!autoplay || layout !== "carousel" || isPaused || reducedMotion) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, autoplaySpeed);
    
    return () => clearInterval(interval);
  }, [autoplay, autoplaySpeed, testimonials.length, layout, isPaused, reducedMotion]);
  
  const getGridCols = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };
  
  const handlePrev = () => {
    setActiveIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };
  
  const handleNext = () => {
    setActiveIndex((current) => 
      (current + 1) % testimonials.length
    );
  };
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={cn(
          "h-4 w-4",
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        )}
      />
    ));
  };
  
  const renderTestimonialCard = (testimonial: Testimonial, index: number) => {
    const cardContent = (
      <div className="h-full flex flex-col">
        {testimonial.rating && (
          <div className="flex items-center mb-4">
            {renderStars(testimonial.rating)}
          </div>
        )}
        
        <div className="mb-6 flex-grow">
          <Quote className="h-8 w-8 text-primary/20 mb-2" />
          <p className="text-gray-700 dark:text-gray-300 italic">
            "{testimonial.content}"
          </p>
        </div>
        
        <div className="flex items-center">
          {testimonial.avatar && (
            <div className="mr-4 flex-shrink-0">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src={testimonial.avatar.src}
                  alt={testimonial.avatar.alt || testimonial.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              {testimonial.name}
            </h4>
            {(testimonial.role || testimonial.company) && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {testimonial.role}
                {testimonial.role && testimonial.company && ", "}
                {testimonial.company}
              </p>
            )}
          </div>
        </div>
      </div>
    );
    
    return layout === "grid" ? (
      <TiltingCard
        key={testimonial.id}
        className="h-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
        disableAnimation={reducedMotion}
        scale={1.02}
        tiltAmount={10}
        glareOpacity={0.1}
      >
        {cardContent}
      </TiltingCard>
    ) : (
      <motion.div
        key={testimonial.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md h-full"
      >
        {cardContent}
      </motion.div>
    );
  };
  
  const renderCarousel = () => {
    return (
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden">
          <div className="relative h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                  {testimonials[activeIndex].rating && (
                    <div className="flex items-center mb-4">
                      {renderStars(testimonials[activeIndex].rating!)}
                    </div>
                  )}
                  
                  <Quote className="h-10 w-10 text-primary/20 mb-4" />
                  
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-8">
                    "{testimonials[activeIndex].content}"
                  </p>
                  
                  <div className="flex items-center">
                    {testimonials[activeIndex].avatar && (
                      <div className="mr-4 flex-shrink-0">
                        <div className="h-16 w-16 rounded-full overflow-hidden">
                          <Image
                            src={testimonials[activeIndex].avatar.src}
                            alt={testimonials[activeIndex].avatar.alt || testimonials[activeIndex].name}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {testimonials[activeIndex].name}
                      </h4>
                      {(testimonials[activeIndex].role || testimonials[activeIndex].company) && (
                        <p className="text-gray-500 dark:text-gray-400">
                          {testimonials[activeIndex].role}
                          {testimonials[activeIndex].role && testimonials[activeIndex].company && ", "}
                          {testimonials[activeIndex].company}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === activeIndex 
                  ? "w-8 bg-primary" 
                  : "w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-0 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-0 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    );
  };
  
  const renderFeatured = () => {
    const featured = testimonials[0];
    const others = testimonials.slice(1);
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg h-full">
            {featured.rating && (
              <div className="flex items-center mb-4">
                {renderStars(featured.rating)}
              </div>
            )}
            
            <Quote className="h-12 w-12 text-primary/20 mb-4" />
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-8">
              "{featured.content}"
            </p>
            
            <div className="flex items-center">
              {featured.avatar && (
                <div className="mr-4 flex-shrink-0">
                  <div className="h-16 w-16 rounded-full overflow-hidden">
                    <Image
                      src={featured.avatar.src}
                      alt={featured.avatar.alt || featured.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {featured.name}
                </h4>
                {(featured.role || featured.company) && (
                  <p className="text-gray-500 dark:text-gray-400">
                    {featured.role}
                    {featured.role && featured.company && ", "}
                    {featured.company}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {others.slice(0, 2).map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
            >
              {testimonial.rating && (
                <div className="flex items-center mb-2">
                  {renderStars(testimonial.rating)}
                </div>
              )}
              
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                "{testimonial.content.length > 120 
                  ? `${testimonial.content.substring(0, 120)}...` 
                  : testimonial.content}"
              </p>
              
              <div className="flex items-center">
                {testimonial.avatar && (
                  <div className="mr-3 flex-shrink-0">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar.src}
                        alt={testimonial.avatar.alt || testimonial.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  {(testimonial.role || testimonial.company) && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                      {testimonial.role && testimonial.company && ", "}
                      {testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <section className={cn("py-16 md:py-24 relative", className)}>
      {showBackground && (
        <BackgroundBeams className="opacity-20" />
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
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
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            {title}
          </motion.h2>
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 dark:text-gray-300"
            >
              {description}
            </motion.p>
          )}
        </div>
        
        {layout === "carousel" ? (
          renderCarousel()
        ) : layout === "featured" ? (
          renderFeatured()
        ) : (
          <div className={cn("grid gap-6", getGridCols())}>
            {testimonials.map((testimonial, index) => 
              renderTestimonialCard(testimonial, index)
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// Example usage in demo page:
export function DemoEnhancedTestimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "John Smith",
      role: "Farm Owner",
      company: "Smith Family Farms",
      content: "The brush cutters from AWE have significantly improved our efficiency in managing vegetation around our property. The durability and power of these machines are unmatched. I highly recommend their products to any farm owner looking for reliable equipment.",
      rating: 5,
      avatar: {
        src: "/images/testimonials/john-smith.jpg",
        alt: "John Smith"
      }
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      role: "Agricultural Contractor",
      company: "Rodriguez Agri Services",
      content: "We've been using AWE chainsaws for our forestry work for over 3 years now. They're reliable, powerful, and the after-sales service is excellent. The team is always responsive and helpful whenever we need assistance.",
      rating: 4,
      avatar: {
        src: "/images/testimonials/maria-rodriguez.jpg",
        alt: "Maria Rodriguez"
      }
    },
    {
      id: 3,
      name: "David Chen",
      role: "Orchard Manager",
      company: "Green Valley Orchards",
      content: "The power tillers from AWE have made soil preparation so much easier for our orchard. They're easy to operate and maintain, which is crucial during our busy planting seasons. Great value for money!",
      rating: 5,
      avatar: {
        src: "/images/testimonials/david-chen.jpg",
        alt: "David Chen"
      }
    },
  ];
  
  return (
    <EnhancedTestimonials
      title="What Our Customers Say"
      subtitle="Testimonials"
      description="Hear from farmers and agricultural professionals who have experienced the quality and reliability of our equipment."
      testimonials={testimonials}
      layout="carousel"
    />
  );
} 