import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonUrl?: string;
  secondaryButtonText: string;
  secondaryButtonUrl?: string;
  className?: string;
}

export function CTASection({
  title,
  description,
  primaryButtonText,
  primaryButtonUrl = "#",
  secondaryButtonText,
  secondaryButtonUrl = "#",
  className,
}: CTASectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        "py-16 md:py-24 bg-primary/5 dark:bg-primary/10 motion-safe-container",
        className
      )}
    >
      <motion.div
        className="container mx-auto px-4 motion-safe-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="space-y-4 motion-safe-container">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row motion-safe-container"
        >
          <Button
            size="xl"
            className="w-full sm:w-auto"
            asChild
          >
            <a href={primaryButtonUrl}>
              <Phone className="mr-2 h-4 w-4" />
              {primaryButtonText}
            </a>
          </Button>

          <Button
            size="xl"
            variant="outline"
            className="w-full sm:w-auto"
            asChild
          >
            <a href={secondaryButtonUrl}>
              <MessageCircle className="mr-2 h-4 w-4" />
              {secondaryButtonText}
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
} 