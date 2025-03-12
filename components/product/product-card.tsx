import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, Star, Share2, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ResponsiveImage } from "../ui/responsive-image";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  featured?: boolean;
  className?: string;
  rating?: number;
  price?: string;
  discount?: string;
}

export function ProductCard({
  id,
  title,
  description,
  imageUrl,
  category,
  featured = false,
  className,
  rating = 4.5,
  price,
  discount,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse move for spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };
  
  // Card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };
  
  // Button animations
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 0.1,
        duration: 0.2
      }
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all dark:bg-gray-900/80",
        featured && "ring-2 ring-primary ring-offset-2 ring-offset-background dark:ring-offset-gray-950",
        "backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90",
        className
      )}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(241, 103, 23, 0.15), transparent 50%)`
            : "none",
        }}
      />
      
      {/* Subtle gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-primary/5 dark:from-gray-900 dark:to-primary/10 opacity-70 pointer-events-none" />
      
      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-2xl border border-primary/20 dark:border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
        background: "conic-gradient(from var(--border-angle), transparent 65%, rgba(241, 103, 23, 0.2) 75%, transparent 85%)"
      }} />
      
      {/* Featured badge */}
      {featured && (
        <div className="absolute right-0 top-0 z-10 overflow-hidden">
          <div className="relative h-20 w-20">
            <div className="absolute right-[-40px] top-[12px] rotate-45 bg-gradient-to-r from-primary to-primary-dark py-1 text-center text-xs font-bold text-white shadow-md w-[170px]">
              Premium
            </div>
          </div>
        </div>
      )}
      
      {/* Favorite button */}
      <motion.button
        className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1.5 backdrop-blur-sm shadow-sm hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsFavorite(!isFavorite)}
      >
        <Heart 
          className={cn(
            "h-4 w-4 transition-colors", 
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 dark:text-gray-500"
          )} 
        />
      </motion.button>
      
      {/* Image container with hover effects */}
      <div className="relative h-56 w-full overflow-hidden">
        <ResponsiveImage
          src={imageUrl}
          alt={title}
          width={800}
          height={480}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          wrapperClassName="h-full w-full"
          breakpoints={{
            sm: 400,
            md: 600,
            lg: 800
          }}
          fadeIn={true}
          fallbackSrc="/placeholder-product.jpg"
        />
        
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Category pill positioned over image */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur-sm dark:bg-gray-900/90 dark:text-primary-light">
            {category}
          </span>
        </div>
        
        {/* Rating display */}
        {rating && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center rounded-full bg-white/90 px-2 py-0.5 backdrop-blur-sm dark:bg-gray-900/90">
            <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">{rating}</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        {/* Title and pricing */}
        <div className="mb-3 flex flex-col">
          <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {/* Price display */}
          {price && (
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">{price}</span>
              {discount && (
                <span className="text-sm font-medium text-gray-500 line-through dark:text-gray-400">{discount}</span>
              )}
            </div>
          )}
        </div>
        
        {/* Description with line clamp */}
        <p className="mb-5 text-sm text-gray-600 line-clamp-2 dark:text-gray-300">
          {description}
        </p>
        
        {/* Action buttons with hover reveal effect */}
        <div className="flex flex-wrap items-center gap-3">
          <motion.div 
            variants={buttonVariants}
            className="flex-1"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 hover:text-primary hover:border-primary dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:border-primary-light dark:hover:text-primary-light"
              asChild
            >
              <Link href={`/products/${id}`}>
                <span>View Details</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            variants={buttonVariants}
            className="flex-1"
          >
            <Button
              variant="default"
              size="sm"
              className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white"
            >
              <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
              <span>Enquire Now</span>
            </Button>
          </motion.div>
        </div>
        
        {/* Quick action icons that appear on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute -bottom-0 left-0 right-0 flex justify-center gap-3 p-3 bg-gradient-to-t from-background to-transparent dark:from-gray-900"
            >
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/90 text-gray-700 hover:text-primary dark:bg-gray-800/90 dark:text-gray-300 dark:hover:text-primary-light">
                <Share2 className="h-3.5 w-3.5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/90 text-gray-700 hover:text-primary dark:bg-gray-800/90 dark:text-gray-300 dark:hover:text-primary-light">
                <ShoppingCart className="h-3.5 w-3.5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 