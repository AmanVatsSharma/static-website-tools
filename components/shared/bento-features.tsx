"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
}

interface BentoFeaturesProps {
  title: string;
  subtitle: string;
  features: BentoFeature[];
  className?: string;
  gridClassName?: string;
}

export function BentoFeatures({
  title,
  subtitle,
  features,
  className,
}: BentoFeaturesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Helper function to determine size class based on feature size
  const getSizeClass = (size?: "small" | "medium" | "large") => {
    const sizeClasses = {
      small: "md:col-span-1 md:row-span-1",
      medium: "md:col-span-1 md:row-span-2",
      large: "md:col-span-2 md:row-span-1",
    };
    
    return sizeClasses[size || "small"];
  };

  return (
    <section className={cn("py-16 md:py-24 motion-safe-container", className)}>
      <div className="container mx-auto px-4 motion-safe-container">
        <div className="mx-auto max-w-3xl text-center mb-16 motion-safe-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white motion-safe-container"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300 motion-safe-container"
          >
            {subtitle}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 motion-safe-container"
        >
          {features.map((feature, index) => {
            // Determine size class based on feature size
            const sizeClass = getSizeClass(feature.size);

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  "relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900 motion-safe-container",
                  sizeClass,
                  feature.className
                )}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative z-10 motion-safe-container">
                  {feature.icon && (
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary motion-safe-container">
                      {feature.icon}
                    </div>
                  )}
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Background gradient */}
                <div className="absolute bottom-0 left-0 right-0 top-0 z-0 bg-gradient-to-br from-transparent to-transparent transition-colors duration-300 group-hover:from-primary/5 group-hover:to-primary/10 motion-safe-container"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 