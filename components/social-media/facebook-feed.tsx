"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Facebook, ThumbsUp, MessageCircle, Share2, ArrowRight, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FacebookPost {
  id: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  publishedAt: string;
}

// Mock data for Facebook posts
const MOCK_POSTS: FacebookPost[] = [
  {
    id: "post1",
    content: "Introducing our latest brush cutter model with enhanced cutting efficiency and reduced vibration. Perfect for tackling overgrown areas with ease! #AWEMachinery #BrushCutter",
    imageUrl: "/social/placeholder-facebook-1.jpg",
    likes: 145,
    comments: 23,
    shares: 12,
    publishedAt: "2024-03-10T14:30:00Z",
  },
  {
    id: "post2",
    content: "Mr. Jitender Walia demonstrating our power tiller at the Agri Expo 2024. Come visit us at Hall 3, Booth 42 to see it in action! #AgriExpo2024 #PowerTillers",
    imageUrl: "/social/placeholder-facebook-2.jpg",
    likes: 210,
    comments: 45,
    shares: 32,
    publishedAt: "2024-03-05T10:15:00Z",
  },
  {
    id: "post3",
    content: "Customer spotlight: Meet Rajesh from Punjab who has increased his productivity by 40% using AWE manual hand seeders. We're proud to support Indian farmers! #CustomerSuccess #AgriTech",
    imageUrl: "/social/placeholder-facebook-3.jpg",
    likes: 178,
    comments: 18,
    shares: 15,
    publishedAt: "2024-02-28T16:45:00Z",
  },
];

interface FacebookFeedProps {
  className?: string;
  facebookUrl?: string;
}

export const FacebookFeed = ({
  className,
  facebookUrl = "https://www.facebook.com/AWEMachinery",
}: FacebookFeedProps) => {
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    // Simulate network request with setTimeout
    const loadPosts = setTimeout(() => {
      try {
        setPosts(MOCK_POSTS);
        setError(null);
      } catch (error) {
        console.error('Failed to load posts:', error);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    }, 1200); // Simulate a 1.2 second loading time

    return () => clearTimeout(loadPosts);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  };

  const visitFacebookPage = () => {
    window.open(facebookUrl, "_blank");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
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
              className="mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 px-3 py-1.5 text-sm font-medium text-blue-700 dark:from-blue-950/40 dark:to-blue-900/40 dark:text-blue-400"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Facebook size={16} className="text-blue-600 dark:text-blue-500" />
              <span>AWE on Facebook</span>
            </motion.div>
            
            <motion.h2 
              className="bg-gradient-to-br from-zinc-900 to-zinc-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-zinc-100 dark:to-zinc-400 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Connect with our community
            </motion.h2>
            
            <motion.p 
              className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Stay updated with our latest events, product launches, and success stories from farmers across India.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              onClick={visitFacebookPage}
              variant="outline"
              className="group relative overflow-hidden rounded-full border-blue-200 text-blue-700 dark:border-blue-800/30 dark:bg-blue-950/10 dark:text-blue-400 dark:hover:bg-blue-950/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                View all posts <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-blue-100/80 to-blue-50/80 dark:from-blue-900/20 dark:to-blue-800/20"
                variants={shimmerVariants}
                initial="hidden"
                animate="visible"
              />
            </Button>
          </motion.div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <div 
                key={index} 
                className="h-64 animate-pulse overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:border-zinc-800 dark:from-zinc-800 dark:to-zinc-900"
              >
                <div className="flex h-full w-full flex-col p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                    <div className="flex-1">
                      <div className="mb-1 h-3 w-24 rounded bg-zinc-300 dark:bg-zinc-700"></div>
                      <div className="h-2 w-16 rounded bg-zinc-300 dark:bg-zinc-700"></div>
                    </div>
                  </div>
                  <div className="mb-3 h-3 w-3/4 rounded bg-zinc-300 dark:bg-zinc-700"></div>
                  <div className="mb-2 h-3 w-full rounded bg-zinc-300 dark:bg-zinc-700"></div>
                  <div className="h-3 w-2/3 rounded bg-zinc-300 dark:bg-zinc-700"></div>
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
          <motion.div 
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {posts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-md transition-all hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
              >
                <div className="p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="relative flex h-10 w-10 overflow-hidden rounded-full border border-zinc-200 bg-gradient-to-tr from-blue-500 to-blue-600 dark:border-zinc-700">
                      <Image 
                        src="/social/awe-logo-small.png" 
                        alt="AWE Machinery" 
                        fill 
                        className="object-cover"
                        onError={(e) => {
                          // Fallback to a colored div if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.style.backgroundColor = '#f16717';
                          target.parentElement!.innerHTML = '<div class="flex h-full w-full items-center justify-center text-white font-bold">AWE</div>';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">AWE Machinery</h3>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                        <Calendar size={10} />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mb-4 text-sm text-zinc-700 dark:text-zinc-300">{post.content}</p>
                  
                  {post.imageUrl && (
                    <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-lg">
                      <Image 
                        src={post.imageUrl} 
                        alt="Post image" 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  
                  <div className="mt-auto flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 p-2.5 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400">
                    <motion.div 
                      className="flex items-center gap-1.5"
                      whileHover={{ scale: 1.05 }}
                    >
                      <ThumbsUp size={14} className="text-blue-500" />
                      <span>{post.likes}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-1.5"
                      whileHover={{ scale: 1.05 }}
                    >
                      <MessageCircle size={14} className="text-green-500" />
                      <span>{post.comments}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-1.5"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Share2 size={14} className="text-orange-500" />
                      <span>{post.shares}</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-blue-500/5 to-purple-500/5 blur-3xl dark:from-blue-500/10 dark:to-purple-500/10"></div>
      <div className="pointer-events-none absolute -left-24 top-24 h-[250px] w-[350px] rounded-full bg-gradient-to-tr from-cyan-500/5 to-blue-500/5 blur-3xl dark:from-cyan-500/10 dark:to-blue-500/10"></div>
    </section>
  );
}; 