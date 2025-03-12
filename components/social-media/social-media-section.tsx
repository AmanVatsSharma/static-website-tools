"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { YouTubeSection } from "./youtube-section";
import { FacebookFeed } from "./facebook-feed";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { ChevronDown } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<string>("youtube");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className={cn("relative overflow-hidden py-12 md:py-24", className)}>
      {/* Premium Background Design with Agriculture Tool Motifs and Brand Colors */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Main background with dark gray and orange gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/90 via-zinc-900 to-zinc-900/95 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950"></div>
        
        {/* Agricultural Tool Silhouettes - Brushcutter */}
        <motion.div
          className="absolute -right-[5%] top-[5%] h-[300px] w-[300px] opacity-15 dark:opacity-10"
          style={{ rotate: "-15deg" }}
          animate={{
            rotate: ["-15deg", "-10deg", "-15deg"],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <path d="M40,180 L160,20 L170,30 L60,180 Z" fill="url(#brushcutter-gradient)" />
            <path d="M165,25 C165,25 185,5 190,15 C195,25 175,45 175,45 Z" fill="url(#brushcutter-gradient)" />
            <path d="M40,180 C40,180 25,185 30,190 C35,195 50,190 50,190 L55,180 Z" fill="url(#brushcutter-gradient)" />
            <path d="M60,170 L40,160 L35,165 L55,175 Z" fill="url(#brushcutter-gradient)" />
            <defs>
              <linearGradient id="brushcutter-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
        
        {/* Agricultural Tool Silhouettes - Chainsaw */}
        <motion.div
          className="absolute -left-[10%] bottom-[20%] h-[350px] w-[350px] opacity-15 dark:opacity-10"
          style={{ rotate: "30deg" }}
          animate={{
            rotate: ["30deg", "35deg", "30deg"],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <path d="M30,100 L130,100 L150,80 L150,120 L130,100" stroke="url(#chainsaw-gradient)" strokeWidth="8" fill="none" />
            <path d="M30,100 L10,80 L10,120 L30,100" fill="url(#chainsaw-gradient)" />
            <path d="M150,80 L180,80 L180,120 L150,120" fill="url(#chainsaw-gradient)" />
            <path d="M130,85 L130,115" stroke="url(#chainsaw-gradient)" strokeWidth="3" strokeDasharray="5,5" />
            <defs>
              <linearGradient id="chainsaw-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
        
        {/* Agricultural Tool Silhouettes - Tiller */}
        <motion.div
          className="absolute left-[35%] top-[15%] h-[200px] w-[200px] opacity-10 dark:opacity-8"
          style={{ rotate: "0deg" }}
          animate={{
            rotate: ["0deg", "5deg", "0deg"],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <path d="M50,50 L150,50 L140,150 L60,150 Z" stroke="url(#tiller-gradient)" strokeWidth="8" fill="none" />
            <path d="M60,50 L60,30 L140,30 L140,50" stroke="url(#tiller-gradient)" strokeWidth="5" />
            <path d="M80,150 L70,180 M120,150 L130,180" stroke="url(#tiller-gradient)" strokeWidth="5" />
            <circle cx="100" cy="90" r="20" fill="url(#tiller-gradient)" />
            <defs>
              <linearGradient id="tiller-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Enhanced 3D Orange Accent Elements with Dark Gray contrast */}
        <motion.div
          className="absolute right-[8%] top-[12%] h-[180px] w-[180px] rounded-[40px] bg-gradient-to-br from-primary to-orange-500 opacity-90 shadow-[0_8px_32px_rgba(246,113,33,0.3),inset_0_0_0_1px_rgba(255,255,255,0.15)] dark:opacity-80 dark:shadow-[0_8px_32px_rgba(246,113,33,0.2),inset_0_0_0_1px_rgba(255,255,255,0.1)]"
          style={{ rotate: "10deg" }}
          animate={{
            rotate: ["10deg", "15deg", "10deg"],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Premium glass-effect circle with brand colors on dark background */}
        <motion.div
          className="absolute left-[10%] top-[25%] h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-orange-500/25 to-primary/15 backdrop-blur-xl dark:from-orange-500/20 dark:to-primary/10"
          animate={{
            x: [-10, 10, -10],
            y: [-10, 15, -10],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Dark gray floating element with orange border */}
        <motion.div
          className="absolute bottom-[15%] right-[15%] h-[200px] w-[350px] rounded-[30px] border border-orange-500/30 bg-zinc-800/80 shadow-[0_10px_30px_rgba(246,113,33,0.15)] backdrop-blur-lg dark:border-orange-500/20 dark:bg-zinc-900/60 dark:shadow-[0_10px_30px_rgba(246,113,33,0.1)]"
          style={{ rotate: "-15deg" }}
          animate={{
            rotate: ["-15deg", "-10deg", "-15deg"],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Large orange blurred element for contrast against dark background */}
        <motion.div
          className="absolute -bottom-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary/20 to-orange-400/10 blur-3xl dark:from-primary/25 dark:to-orange-600/15"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Smaller accent elements with dark and orange contrast */}
        <motion.div
          className="absolute right-[30%] top-[15%] h-[100px] w-[100px] rounded-full border-2 border-orange-500/50 bg-zinc-800 shadow-xl dark:border-orange-500/30 dark:bg-zinc-900"
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Premium dark glass panel with orange accents */}
        <motion.div
          className="absolute left-[20%] top-[60%] h-[250px] w-[400px] rounded-[40px] bg-zinc-800/30 p-1 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_0_0_1px_rgba(246,113,33,0.2)] backdrop-blur-lg dark:bg-zinc-900/20 dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(246,113,33,0.15)]"
          style={{ rotate: "15deg" }}
          animate={{
            rotate: ["15deg", "10deg", "15deg"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="h-full w-full rounded-[35px] bg-gradient-to-br from-orange-500/10 to-zinc-900/70 dark:from-orange-500/5 dark:to-zinc-950/50"></div>
        </motion.div>
        
        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5 dark:opacity-3"></div>
        
        {/* Noise texture overlay for depth */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-10"></div>
        
        {/* Dynamic radial glow with brand color on dark background */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-[100px] bg-gradient-radial from-primary/15 via-primary/5 to-transparent opacity-80 dark:from-primary/20 dark:via-primary/5"></div>
      </div>

      {/* Section header with parallax effect */}
      <div className="container relative px-4 md:px-6">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1] 
          }}
        >
          <motion.div 
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/30 to-orange-500/30 px-4 py-1.5 text-sm font-medium text-white shadow-[0_2px_10px_rgba(246,113,33,0.2)] backdrop-blur-sm dark:from-primary/40 dark:to-orange-600/30 dark:shadow-[0_2px_10px_rgba(246,113,33,0.15)]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Stay Connected
          </motion.div>

          <h2 className="font-heading mb-4 bg-gradient-to-br from-orange-400 via-primary to-orange-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent drop-shadow-sm sm:text-5xl">
            Join our <span className="text-orange-400">community</span>
          </h2>
          
          <motion.p 
            className="mx-auto mb-8 max-w-2xl text-lg text-zinc-200 drop-shadow-sm dark:text-zinc-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Follow us on social media to stay updated with the latest product information, farming techniques, and success stories from our customers across India.
          </motion.p>

          {/* Enhanced down arrow indicator with premium glass effect */}
          <motion.div 
            className="mx-auto flex cursor-pointer justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 shadow-[0_4px_20px_rgba(246,113,33,0.25),inset_0_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-xl dark:from-orange-500/30 dark:to-orange-600/20 dark:shadow-[0_4px_20px_rgba(246,113,33,0.2),inset_0_0_0_1px_rgba(255,255,255,0.1)]"
            >
              <ChevronDown className="h-5 w-5 text-orange-400 dark:text-orange-300" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Premium Glass Tabs UI for social media channels */}
      <div className="container mt-12 px-4 md:px-6">
        <Tabs 
          defaultValue="youtube" 
          className="mx-auto w-full max-w-4xl"
          onValueChange={(value: string) => setActiveTab(value)}
        >
          <TabsList className="mx-auto grid w-full max-w-lg grid-cols-2 rounded-full bg-zinc-800/50 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-xl dark:bg-zinc-900/40 dark:shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_0_0_1px_rgba(255,255,255,0.05)]">
            <TabsTrigger 
              value="youtube" 
              className="rounded-full text-zinc-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgba(246,113,33,0.3)] dark:text-zinc-400 dark:data-[state=active]:shadow-[0_4px_12px_rgba(246,113,33,0.25)]"
            >
              YouTube
            </TabsTrigger>
            <TabsTrigger 
              value="facebook" 
              className="rounded-full text-zinc-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgba(246,113,33,0.3)] dark:text-zinc-400 dark:data-[state=active]:shadow-[0_4px_12px_rgba(246,113,33,0.25)]"
            >
              Facebook
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 mt-10 rounded-[30px] bg-white/95 p-6 shadow-[0_20px_80px_rgba(246,113,33,0.2),0_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-md dark:bg-zinc-900/90 dark:shadow-[0_20px_80px_rgba(246,113,33,0.15),0_0_0_1px_rgba(255,255,255,0.05)]"
            >
              <TabsContent value="youtube" className="mt-2">
                <YouTubeSection channelUrl={youtubeChannelUrl} />
              </TabsContent>
              <TabsContent value="facebook" className="mt-2">
                <FacebookFeed facebookUrl={facebookPageUrl} />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>

      {/* Premium Brand Divider with 3D Effect */}
      <div className="container mt-24 px-4 md:px-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-orange-500/20 dark:border-orange-500/15"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-orange-600 shadow-[0_10px_30px_rgba(246,113,33,0.3)] dark:shadow-[0_10px_30px_rgba(246,113,33,0.25)]">
              <span className="text-xl font-bold text-white drop-shadow-sm">AWE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 