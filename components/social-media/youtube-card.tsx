"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface YouTubeCardProps {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  className?: string;
}

export const YouTubeCard = ({
  videoId,
  title,
  description,
  thumbnailUrl,
  publishedAt,
  className,
}: YouTubeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
      className={cn(
        "group relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-md transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
        <Image
          src={thumbnailUrl || `/placeholder-video.jpg`}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg"
            whileHover={{ scale: 1.1 }}
            onClick={openYouTubeVideo}
          >
            <Play size={24} fill="white" />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {formatDate(publishedAt)}
          </span>
          <motion.button
            className="flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openYouTubeVideo}
          >
            Watch <ExternalLink size={12} />
          </motion.button>
        </div>
        
        <h3 className="mb-2 text-lg font-bold leading-tight text-zinc-900 dark:text-zinc-100">
          {truncateText(title, 60)}
        </h3>
        
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {truncateText(description, 120)}
        </p>
      </div>
    </motion.div>
  );
}; 