import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence, useSpring, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote, Star, StarHalf } from "lucide-react";
import { ScrollContainer } from "@/components/ui/scroll-container";
import { useDebugScrollPosition } from "@/lib/client-utils";

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
}

export function TestimonialsSection({
  testimonials,
  className,
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Custom scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);
  
  // Debug the testimonials section - use hook properly at top level
  useDebugScrollPosition("TestimonialsSection", sectionRef);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handlePrev = () => {
    setAutoplay(false);
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setAutoplay(false);
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setAutoplay(false);
    setActiveIndex(index);
  };

  // Render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
    }
    
    // Add remaining empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <ScrollContainer>
      <section
        ref={sectionRef}
        className={cn(
          "py-20 md:py-32 relative overflow-hidden",
          className
        )}
        data-component="testimonials-section"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-orange-50/30 to-white dark:from-gray-900 dark:via-orange-950/10 dark:to-gray-900 pointer-events-none" />
        
        {/* Floating gradient orbs */}
        <div className="absolute -left-20 -top-20 w-72 h-72 bg-orange-500/10 dark:bg-orange-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute right-0 top-1/3 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-green-500/10 dark:bg-green-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-grid-gray-200/30 dark:bg-grid-gray-800/20 bg-[size:20px_20px] pointer-events-none" />
        
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          style={{ opacity, scale, y }}
        >
          <motion.div 
            className="mx-auto max-w-3xl text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-300 mb-4">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from farmers across India who have transformed their agricultural practices with AWE machinery.
            </p>
          </motion.div>

          <div 
            ref={containerRef} 
            className="relative mx-auto max-w-5xl"
          >
            {/* Card background with 3D effect */}
            <div className="absolute inset-0 -z-10 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl transform rotate-2 scale-105 dark:shadow-orange-900/20" />
            <div className="absolute inset-0 -z-10 bg-white dark:bg-gray-800 rounded-3xl shadow-xl transform -rotate-1 scale-105 dark:shadow-orange-900/10" />
            
            {/* Main testimonial card */}
            <div className="overflow-hidden rounded-3xl bg-white dark:bg-gray-800/80 shadow-xl backdrop-blur-sm dark:shadow-orange-900/10 perspective-1000 relative">
              {/* Glossy effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent opacity-80 dark:from-white/5 dark:to-transparent pointer-events-none z-10" />
              
              <div className="h-full w-full relative p-2">
                <AnimatePresence mode="wait">
                  {testimonials.map((testimonial, index) => (
                    activeIndex === index && (
                      <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, rotateY: 45, scale: 0.9 }}
                        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                        exit={{ opacity: 0, rotateY: -45, scale: 0.9 }}
                        transition={{ 
                          duration: 0.7, 
                          ease: [0.22, 1, 0.36, 1],
                          rotateY: { type: "spring", stiffness: 100 }
                        }}
                        className="w-full"
                      >
                        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-12">
                          {/* Author image with animated border */}
                          <div className="flex-shrink-0 relative">
                            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-orange-100 dark:ring-orange-500/20 relative z-20">
                              <Image
                                src={testimonial.author.avatarUrl}
                                alt={testimonial.author.name}
                                width={144}
                                height={144}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-400 to-amber-300 dark:from-orange-500 dark:to-amber-400 rounded-full blur opacity-70 animate-tilt" />
                            
                            {/* Orbit decoration */}
                            <div className="absolute inset-0 -z-10 rounded-full border-2 border-dashed border-orange-200 dark:border-orange-800/30 animate-spin-slow" style={{ animationDuration: '40s' }} />
                            <div className="absolute inset-1 -z-10 rounded-full border border-dashed border-orange-100 dark:border-orange-800/20 animate-spin-slow" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1">
                            {/* Quote decoration */}
                            <div className="mb-6 relative">
                              <Quote className="h-12 w-12 absolute -top-4 -left-6 text-orange-100 dark:text-orange-900/20" />
                              <div className="flex mb-3">
                                {renderStars(testimonial.rating)}
                              </div>
                              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-gray-700 dark:text-gray-200 relative z-10">
                                "{testimonial.content}"
                              </blockquote>
                            </div>

                            <div className="mt-6">
                              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {testimonial.author.name}
                              </p>
                              <p className="text-orange-600 dark:text-orange-400">
                                {testimonial.author.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Controls - Modernized */}
            <div className="mt-10 flex items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-xl hover:shadow-orange-500/30 dark:from-orange-600 dark:to-amber-600 dark:shadow-orange-800/30"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>

              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDotClick(index)}
                    className={cn(
                      "relative h-3 w-3 overflow-hidden rounded-full transition-all",
                      activeIndex === index
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-300 w-8"
                        : "bg-orange-200 dark:bg-orange-800/40 hover:bg-orange-300 dark:hover:bg-orange-700"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  >
                    {activeIndex === index && (
                      <motion.span 
                        className="absolute inset-0 bg-white/20 dark:bg-white/10"
                        animate={{ 
                          x: ["0%", "100%"],
                        }}
                        transition={{ 
                          repeat: Infinity,
                          repeatType: "mirror", 
                          duration: 1.5,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-xl hover:shadow-orange-500/30 dark:from-orange-600 dark:to-amber-600 dark:shadow-orange-800/30"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
          
          {/* Trust badges */}
          <motion.div 
            className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-300">500+</div>
              <div className="text-gray-600 dark:text-gray-300">Happy Farmers</div>
            </div>
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-orange-200 dark:via-orange-800/30 to-transparent hidden md:block" />
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-300">98%</div>
              <div className="text-gray-600 dark:text-gray-300">Satisfaction Rate</div>
            </div>
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-orange-200 dark:via-orange-800/30 to-transparent hidden md:block" />
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-300">10+</div>
              <div className="text-gray-600 dark:text-gray-300">Years of Excellence</div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </ScrollContainer>
  );
} 