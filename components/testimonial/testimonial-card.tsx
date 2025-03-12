import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

export interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  imageUrl: string;
  className?: string;
}

export function TestimonialCard({
  content,
  author,
  role,
  imageUrl,
  className,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900/60 motion-safe-container",
        className
      )}
      style={{ position: 'relative' }}
    >
      {/* Quote Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-4 text-primary motion-safe-container"
        style={{ position: 'relative' }}
      >
        <Quote size={24} />
      </motion.div>
      
      {/* Content */}
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-4 text-gray-600 dark:text-gray-300 motion-safe-container"
        style={{ position: 'relative' }}
      >
        {content}
      </motion.p>
      
      {/* Author Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex items-center gap-3 motion-safe-container"
        style={{ position: 'relative' }}
      >
        {imageUrl && (
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={imageUrl}
              alt={author}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{author}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </motion.div>
      
      {/* Background Hover Effect */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 0.1 }}
        className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent motion-safe-container"
        style={{ position: 'relative' }}
      />
    </motion.div>
  );
} 