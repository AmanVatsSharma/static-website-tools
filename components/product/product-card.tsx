import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
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
}

export function ProductCard({
  id,
  title,
  description,
  imageUrl,
  category,
  featured = false,
  className,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl dark:bg-gray-900",
        featured && "border-2 border-primary",
        className
      )}
    >
      {featured && (
        <div className="absolute right-0 top-0 z-10 rounded-bl-lg bg-primary px-3 py-1 text-xs font-medium text-white">
          Featured
        </div>
      )}
      
      <div className="relative h-48 w-full overflow-hidden">
        <ResponsiveImage
          src={imageUrl}
          alt={title}
          width={800}
          height={480}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          wrapperClassName="h-full w-full"
          breakpoints={{
            sm: 400,
            md: 600,
            lg: 800
          }}
          fadeIn={true}
          fallbackSrc="/placeholder-product.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
      
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {category}
          </span>
          {featured && (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Best Seller
            </span>
          )}
        </div>
        
        <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        
        <p className="mb-4 text-sm text-gray-600 line-clamp-2 dark:text-gray-300">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            className="flex items-center gap-1"
            asChild
          >
            <Link href={`/products/${id}`}>
              <span>Details</span>
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
          
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-1"
          >
            <MessageCircle className="h-3 w-3" />
            <span>Enquire</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
} 