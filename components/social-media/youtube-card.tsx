"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Play, ExternalLink, Clock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface YouTubeCardProps {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  viewCount?: string;
  className?: string;
}

export const YouTubeCard = ({
  videoId,
  title,
  description,
  thumbnailUrl,
  publishedAt,
  viewCount,
  className,
}: YouTubeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for 3D card effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for card rotation
  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });

  // For spotlight effect
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const spotlightBackground = useMotionTemplate`radial-gradient(
    300px circle at ${spotlightX}px ${spotlightY}px,
    rgba(255, 255, 255, 0.15),
    transparent 80%
  )`;
  
  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (!cardRef.current) return;
    
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate mouse position inside the card (0-1)
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    
    // Update spotlight position
    spotlightX.set(clientX - left);
    spotlightY.set(clientY - top);
    
    // Set rotation values (with reduced intensity for subtle effect)
    rotateX.set((y - 0.5) * -5); // Inverted for natural feel
    rotateY.set((x - 0.5) * 5);
  }
  
  function onMouseLeave() {
    // Reset all values
    rotateX.set(0);
    rotateY.set(0);
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const openYouTubeVideo = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "group relative h-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-md transition-all dark:border-zinc-800 dark:bg-zinc-900",
        "hover:border-zinc-300 hover:shadow-xl dark:hover:border-zinc-700",
        className
      )}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Spotlight effect */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-[image:var(--spotlight)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlightBackground, backgroundBlendMode: "soft-light" }} 
      />
      
      {/* Thumbnail container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
        <Image
          src={thumbnailUrl || `/placeholder-video.jpg`}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Play button overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-orange-600 text-white shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={openYouTubeVideo}
          >
            <Play size={24} className="ml-1" fill="white" />
          </motion.div>
        </motion.div>

        {/* Views badge */}
        {viewCount && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
            <Eye size={12} />
            <span>{viewCount}</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <Clock size={12} />
              <span>{formatDate(publishedAt)}</span>
            </div>
            
            <motion.button
              className="flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openYouTubeVideo}
            >
              Watch <ExternalLink size={10} />
            </motion.button>
          </div>
          
          <h3 className="mb-2 text-lg font-bold leading-tight text-zinc-900 dark:text-zinc-100">
            {truncateText(title, 60)}
          </h3>
          
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {truncateText(description, 120)}
          </p>
        </div>
        
        {/* Hover action */}
        <motion.div 
          className="mt-4 flex justify-end opacity-0 transition-opacity group-hover:opacity-100"
          initial={{ y: 10, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-orange-600 px-4 py-1.5 text-sm font-medium text-white shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openYouTubeVideo}
          >
            Watch now <Play size={14} fill="white" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}; 