"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Youtube, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { YouTubeCard } from "./youtube-card";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
}

// Initial empty state
const INITIAL_VIDEOS: YouTubeVideo[] = [];

interface YouTubeSectionProps {
  className?: string;
  channelUrl?: string;
}

export const YouTubeSection = ({
  className,
  channelUrl = "https://www.youtube.com/@AWEMachinery",
}: YouTubeSectionProps) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>(INITIAL_VIDEOS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchYouTubeVideos() {
      try {
        setLoading(true);
        const response = await fetch('/api/youtube-videos');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch videos: ${response.status}`);
        }
        
        const data = await response.json();
        setVideos(data.videos);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch YouTube videos:', error);
        setError('Failed to load videos. Please try again later.');
        // Fallback to empty state
      } finally {
        setLoading(false);
      }
    }
    
    fetchYouTubeVideos();
  }, []);

  const visitChannel = () => {
    window.open(channelUrl, "_blank");
  };

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <motion.div 
              className="mb-2 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 dark:bg-red-950/30 dark:text-red-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Youtube size={16} />
              <span>Our YouTube Channel</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Learn from our experts
            </motion.h2>
            
            <motion.p 
              className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Discover videos featuring product demonstrations, farming techniques, and expert advice from Mr. Jitender Walia.
            </motion.p>
          </div>
          
          <motion.button
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            onClick={visitChannel}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            View all videos on YouTube
            <ArrowRight size={16} />
          </motion.button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((index) => (
              <div 
                key={index} 
                className="aspect-video animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/30 dark:bg-red-900/10">
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <YouTubeCard
                  videoId={video.id}
                  title={video.title}
                  description={video.description}
                  thumbnailUrl={video.thumbnailUrl}
                  publishedAt={video.publishedAt}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}; 