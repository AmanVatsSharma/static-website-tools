import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeaturesSectionProps {
  title: string;
  subtitle: string;
  features: Feature[];
  className?: string;
}

export function FeaturesSection({
  title,
  subtitle,
  features,
  className,
}: FeaturesSectionProps) {
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

  return (
    <section
      className={cn(
        "py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50 motion-safe-container",
        className
      )}
    >
      <div className="container mx-auto px-4 motion-safe-container">
        {(title || subtitle) && (
          <div className="mx-auto max-w-3xl text-center mb-12 motion-safe-container">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 motion-safe-container"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900 motion-safe-container"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary motion-safe-container">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 