import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
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
  
  // Debug the testimonials section - use hook properly at top level
  useDebugScrollPosition("TestimonialsSection", sectionRef);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

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

  return (
    <ScrollContainer>
      <section
        ref={sectionRef}
        className={cn(
          "py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50 motion-safe-container",
          className
        )}
        style={{ position: 'relative' }}
        data-component="testimonials-section"
      >
        <div className="container mx-auto px-4 motion-safe-container" style={{ position: 'relative' }}>
          <div className="mx-auto max-w-3xl text-center mb-12 motion-safe-container">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Hear from farmers across India who have transformed their agricultural practices with AWE machinery.
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl motion-safe-container" style={{ position: 'relative' }}>
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800 motion-safe-container" style={{ position: 'relative' }}>
              <div className="h-full w-full motion-safe-container" style={{ position: 'relative' }}>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      x: activeIndex === index ? 0 : 100,
                      position: activeIndex === index ? "relative" : "absolute",
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full motion-safe-container"
                    style={{ position: 'relative' }}
                  >
                    <div className="p-6 md:p-8 motion-safe-container" style={{ position: 'relative' }}>
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 motion-safe-container" style={{ position: 'relative' }}>
                        <Quote className="h-6 w-6 text-primary" />
                      </div>
                      <blockquote className="mb-8 text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-300 motion-safe-container" style={{ position: 'relative' }}>
                        {testimonial.content}
                      </blockquote>

                      <div className="flex items-center motion-safe-container" style={{ position: 'relative' }}>
                        <div className="mr-4 h-12 w-12 overflow-hidden rounded-full motion-safe-container" style={{ position: 'relative' }}>
                          <Image
                            src={testimonial.author.avatarUrl}
                            alt={testimonial.author.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="motion-safe-container" style={{ position: 'relative' }}>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {testimonial.author.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.author.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="mt-8 flex items-center justify-center gap-4 motion-safe-container">
              <button
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-2 motion-safe-container">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-colors",
                      activeIndex === index
                        ? "bg-primary"
                        : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  ></button>
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </ScrollContainer>
  );
} 