"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Facebook, ThumbsUp, MessageCircle, Share2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FacebookPost {
  id: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  publishedAt: string;
}

// Initial empty state
const INITIAL_POSTS: FacebookPost[] = [];

interface FacebookFeedProps {
  className?: string;
  facebookUrl?: string;
}

export const FacebookFeed = ({
  className,
  facebookUrl = "https://www.facebook.com/AWEMachinery",
}: FacebookFeedProps) => {
  const [posts, setPosts] = useState<FacebookPost[]>(INITIAL_POSTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFacebookPosts() {
      try {
        setLoading(true);
        const response = await fetch('/api/facebook-posts');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data.posts);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch Facebook posts:', error);
        setError('Failed to load posts. Please try again later.');
        // Fallback to empty state
      } finally {
        setLoading(false);
      }
    }
    
    fetchFacebookPosts();
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

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <motion.div 
              className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Facebook size={16} />
              <span>Our Facebook Page</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Connect with our community
            </motion.h2>
            
            <motion.p 
              className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Stay updated with our latest events, product launches, and success stories from farmers across India.
            </motion.p>
          </div>
          
          <motion.button
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            onClick={visitFacebookPage}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            View all posts on Facebook
            <ArrowRight size={16} />
          </motion.button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <div 
                key={index} 
                className="h-64 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/30 dark:bg-red-900/10">
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-md transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="p-4">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
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
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate(post.publishedAt)}</p>
                    </div>
                  </div>
                  
                  <p className="mb-4 text-sm text-zinc-700 dark:text-zinc-300">{post.content}</p>
                  
                  {post.imageUrl && (
                    <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-lg">
                      <Image 
                        src={post.imageUrl} 
                        alt="Post image" 
                        fill 
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between border-t border-zinc-200 pt-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={14} />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 size={14} />
                      <span>{post.shares}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}; 