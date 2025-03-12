"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Youtube, ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { YouTubeCard } from "./youtube-card";
import { Button } from "@/components/ui/button";
import { fetchYouTubeVideosViaRSS, getChannelIdFromUrl, type YouTubeVideo } from "@/lib/youtube-rss";

// Mock data for YouTube videos (fallback if RSS fails)
const MOCK_VIDEOS: YouTubeVideo[] = [
  {
    id: "video1",
    title: "AWE Premium Brush Cutter in Action: Field Demonstration",
    description: "Watch our premium brush cutter tackle tough vegetation with ease. See how our product outperforms the competition in real field tests.",
    thumbnailUrl: "/social/placeholder-video-1.jpg",
    publishedAt: "2023-12-15T10:30:00Z",
    viewCount: "1.2K"
  },
  {
    id: "video2",
    title: "How to Choose the Right Chainsaw for Your Farm: AWE Guide",
    description: "Mr. Jitender Walia explains how to select the perfect chainsaw for your specific farming needs, with detailed comparisons and demonstrations.",
    thumbnailUrl: "/social/placeholder-video-2.jpg",
    publishedAt: "2024-01-20T14:45:00Z",
    viewCount: "856"
  },
  {
    id: "video3",
    title: "AWE Power Tiller: Transforming Small Farm Productivity",
    description: "See how our power tillers are helping small farmers across India increase their productivity and reduce manual labor.",
    thumbnailUrl: "/social/placeholder-video-3.jpg",
    publishedAt: "2024-02-10T09:15:00Z",
    viewCount: "2.5K"
  },
];

interface YouTubeSectionProps {
  className?: string;
  channelUrl?: string;
}

export const YouTubeSection = ({
  className,
  channelUrl = "https://www.youtube.com/@AWEMachinery",
}: YouTubeSectionProps) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);

        // Try to fetch videos from RSS feed
        if (channelUrl) {
          // First, get the channel ID from the URL
          const channelId = await getChannelIdFromUrl(channelUrl);
          
          if (channelId) {
            // Then fetch videos using the channel ID
            const fetchedVideos = await fetchYouTubeVideosViaRSS(channelId);
            
            if (fetchedVideos && fetchedVideos.length > 0) {
              setVideos(fetchedVideos);
              setError(null);
              setLoading(false);
              return;
            }
          }
        }
        
        // If RSS fetching fails or no videos are returned, use mock data
        // This provides a seamless fallback without showing errors to users
        console.log('Using mock YouTube data as fallback');
        setTimeout(() => {
          setVideos(MOCK_VIDEOS);
          setError(null);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Failed to load videos:', error);
        setError('Failed to load videos. Please try again later.');
        
        // Fallback to mock data even in case of errors
        setTimeout(() => {
          setVideos(MOCK_VIDEOS);
          setError(null);
          setLoading(false);
        }, 800);
      }
    }
    
    fetchVideos();
  }, [channelUrl]);

  const visitChannel = () => {
    window.open(channelUrl, "_blank");
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const shimmerVariants = {
    hidden: { x: "-100%" },
    visible: { 
      x: "100%", 
      transition: { 
        repeat: Infinity, 
        duration: 1.5,
        ease: "linear" 
      } 
    }
  };

  return (
    <section ref={sectionRef} className={cn("relative", className)}>
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <motion.div 
              className="mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-100 to-red-200 px-3 py-1.5 text-sm font-medium text-red-700 dark:from-red-950/40 dark:to-red-900/40 dark:text-red-400"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Youtube size={16} className="text-red-600 dark:text-red-500" />
              <span>AWE Machinery on YouTube</span>
            </motion.div>
            
            <motion.h2 
              className="bg-gradient-to-br from-zinc-900 to-zinc-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-zinc-100 dark:to-zinc-400 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Learn from our experts
            </motion.h2>
            
            <motion.p 
              className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Discover videos featuring product demonstrations, farming techniques, and expert advice from Mr. Jitender Walia.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              onClick={visitChannel}
              variant="outline"
              className="group relative overflow-hidden rounded-full border-red-200 text-red-700 dark:border-red-800/30 dark:bg-red-950/10 dark:text-red-400 dark:hover:bg-red-950/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                View all videos <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-red-100/80 to-red-50/80 dark:from-red-900/20 dark:to-red-800/20"
                variants={shimmerVariants}
                initial="hidden"
                animate="visible"
              />
            </Button>
          </motion.div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <div 
                key={index} 
                className="aspect-video animate-pulse overflow-hidden rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900"
              >
                <div className="h-full w-full">
                  <div className="flex h-full items-center justify-center">
                    <Play size={30} className="text-zinc-300 dark:text-zinc-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/30 dark:bg-red-900/10">
            <p className="text-red-700 dark:text-red-400">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4 border-red-200 text-red-700 dark:border-red-800/50 dark:text-red-400"
              onClick={() => window.location.reload()}
            >
              Try again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <YouTubeCard
                  videoId={video.id}
                  title={video.title}
                  description={video.description}
                  thumbnailUrl={video.thumbnailUrl}
                  publishedAt={video.publishedAt}
                  viewCount={video.viewCount}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Decorative elements with brand colors */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-primary/5 to-orange-500/5 blur-3xl dark:from-primary/10 dark:to-orange-500/10"></div>
      <div className="pointer-events-none absolute -right-24 top-24 h-[250px] w-[350px] rounded-full bg-gradient-to-tr from-blue-500/5 to-primary/5 blur-3xl dark:from-blue-500/10 dark:to-primary/10"></div>
    </section>
  );
}; 