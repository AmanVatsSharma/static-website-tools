"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { YouTubeSection } from "./youtube-section";
import { FacebookFeed } from "./facebook-feed";

interface SocialMediaSectionProps {
  className?: string;
  youtubeChannelUrl?: string;
  facebookPageUrl?: string;
}

export const SocialMediaSection = ({
  className,
  youtubeChannelUrl = "https://www.youtube.com/@AWEMachinery",
  facebookPageUrl = "https://www.facebook.com/AWEMachinery",
}: SocialMediaSectionProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Background decoration - inspired by Aceternity UI */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
      </div>

      {/* Section heading */}
      <div className="container px-4 py-16 md:px-6 md:py-24">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Join our <span className="text-primary">community</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Follow us on social media to stay updated with the latest product information, farming techniques, and success stories from our customers across India.
          </p>
        </motion.div>
      </div>

      {/* YouTube section */}
      <YouTubeSection channelUrl={youtubeChannelUrl} />

      {/* Divider with AWE branding */}
      <div className="container px-4 md:px-6">
        <div className="my-16 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"></div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
            <span className="text-xl font-bold text-primary">AWE</span>
          </div>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"></div>
        </div>
      </div>

      {/* Facebook section */}
      <FacebookFeed facebookUrl={facebookPageUrl} />
    </div>
  );
}; 