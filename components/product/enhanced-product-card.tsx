"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TiltingCard } from "@/components/ui/aceternity/tilting-card";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useReducedMotion } from "@/lib/animation-hooks";

interface ProductCardProps {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
  featured?: boolean;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  buttonClassName?: string;
  badgeClassName?: string;
  hasDetailsButton?: boolean;
  hasAddToCartButton?: boolean;
  onDetailsClick?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

export function EnhancedProductCard({
  id,
  title,
  description,
  imageUrl,
  category,
  featured = false,
  className,
  imageClassName,
  contentClassName,
  buttonClassName,
  badgeClassName,
  hasDetailsButton = true,
  hasAddToCartButton = false,
  onDetailsClick,
  onAddToCart,
}: ProductCardProps) {
  const reducedMotion = useReducedMotion();
  
  const handleDetailsClick = () => {
    if (onDetailsClick) {
      onDetailsClick(id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(id);
    }
  };

  return (
    <TiltingCard
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800/90 shadow-md transition-all duration-300 group",
        featured && "ring-2 ring-primary/20",
        className
      )}
      glareColor="rgba(241, 103, 23, 0.2)"
      disableAnimation={reducedMotion}
    >
      {/* Image Container */}
      <div
        className={cn(
          "relative h-48 md:h-60 overflow-hidden",
          imageClassName
        )}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Category Badge */}
        {category && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={cn(
              "absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm",
              badgeClassName
            )}
          >
            {category}
          </motion.div>
        )}
        
        {/* Featured Badge */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={cn(
              "absolute top-4 right-4 bg-primary text-white text-xs px-2 py-1 rounded-full",
              badgeClassName
            )}
          >
            Featured
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          "p-5 space-y-4",
          contentClassName
        )}
      >
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-2">
            {title}
          </h3>
          {description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {hasDetailsButton && (
            <button
              onClick={handleDetailsClick}
              className={cn(
                "inline-flex items-center text-sm font-medium bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors duration-200",
                buttonClassName
              )}
            >
              <span>Details</span>
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </button>
          )}
          
          {hasAddToCartButton && (
            <button
              onClick={handleAddToCart}
              className={cn(
                "inline-flex items-center text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200",
                buttonClassName
              )}
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary/20 rounded-tl-xl" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary/20 rounded-br-xl" />
    </TiltingCard>
  );
}

export function EnhancedProductGrid({
  products,
  className,
  onProductClick,
  onAddToCart,
}: {
  products: Array<Omit<ProductCardProps, "onDetailsClick" | "onAddToCart">>;
  className?: string;
  onProductClick?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
    >
      {products.map((product) => (
        <EnhancedProductCard
          key={product.id}
          {...product}
          onDetailsClick={onProductClick}
          onAddToCart={onAddToCart}
          hasAddToCartButton={!!onAddToCart}
        />
      ))}
    </div>
  );
} 