"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/lib/animation-hooks";
import { TiltingCard, BackgroundLines } from "@/components/ui/aceternity";
import { ArrowRight, Check } from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  link?: {
    text: string;
    href: string;
  };
  highlights?: string[];
}

interface EnhancedFeaturesProps {
  title: string;
  subtitle?: string;
  description?: string;
  features: Feature[];
  layout?: "grid" | "list" | "alternating";
  columns?: 1 | 2 | 3 | 4;
  showBackground?: boolean;
  className?: string;
}

export function EnhancedFeatures({
  title,
  subtitle,
  description,
  features,
  layout = "grid",
  columns = 3,
  showBackground = true,
  className,
}: EnhancedFeaturesProps) {
  const reducedMotion = useReducedMotion();
  
  const getGridCols = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };
  
  const renderFeatureCard = (feature: Feature, index: number) => {
    const cardContent = (
      <>
        {feature.icon && (
          <div className="mb-4 inline-flex items-center justify-center p-2 bg-primary/10 rounded-lg text-primary">
            {feature.icon}
          </div>
        )}
        
        {feature.image && (
          <div className="mb-6 overflow-hidden rounded-lg">
            <Image
              src={feature.image.src}
              alt={feature.image.alt}
              width={feature.image.width}
              height={feature.image.height}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {feature.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {feature.description}
        </p>
        
        {feature.highlights && feature.highlights.length > 0 && (
          <ul className="space-y-2 mb-4">
            {feature.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
              </li>
            ))}
          </ul>
        )}
        
        {feature.link && (
          <div className="mt-auto pt-4">
            <Link
              href={feature.link.href}
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              {feature.link.text}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        )}
      </>
    );
    
    return layout === "grid" ? (
      <TiltingCard
        key={index}
        className="h-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
        disableAnimation={reducedMotion}
        scale={1.02}
        tiltAmount={10}
        glareOpacity={0.1}
      >
        <div className="h-full flex flex-col">
          {cardContent}
        </div>
      </TiltingCard>
    ) : (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md h-full flex flex-col"
      >
        {cardContent}
      </motion.div>
    );
  };
  
  const renderAlternatingFeature = (feature: Feature, index: number) => {
    const isEven = index % 2 === 0;
    
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 gap-8 items-center py-12 border-b border-gray-200 dark:border-gray-700 last:border-0"
      >
        <div className={cn(isEven ? "md:order-1" : "md:order-2")}>
          {feature.image ? (
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src={feature.image.src}
                alt={feature.image.alt}
                width={feature.image.width}
                height={feature.image.height}
                className="w-full h-auto object-cover"
              />
            </div>
          ) : feature.icon ? (
            <div className="flex items-center justify-center h-full">
              <div className="p-8 bg-primary/10 rounded-full text-primary">
                {feature.icon}
              </div>
            </div>
          ) : null}
        </div>
        
        <div className={cn("flex flex-col space-y-4", isEven ? "md:order-2" : "md:order-1")}>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {feature.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300">
            {feature.description}
          </p>
          
          {feature.highlights && feature.highlights.length > 0 && (
            <ul className="space-y-3 mt-2">
              {feature.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                </li>
              ))}
            </ul>
          )}
          
          {feature.link && (
            <div className="pt-4">
              <Link
                href={feature.link.href}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                {feature.link.text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    );
  };
  
  return (
    <section className={cn("py-16 md:py-24 relative", className)}>
      {showBackground && (
        <BackgroundLines
          className="opacity-10"
          lineColor="var(--primary)"
          lineWidth={1}
          waveHeight={20}
          waveCount={8}
          animate={!reducedMotion}
        />
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4"
            >
              {subtitle}
            </motion.div>
          )}
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            {title}
          </motion.h2>
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 dark:text-gray-300"
            >
              {description}
            </motion.p>
          )}
        </div>
        
        {layout === "alternating" ? (
          <div>
            {features.map((feature, index) => renderAlternatingFeature(feature, index))}
          </div>
        ) : layout === "list" ? (
          <div className="space-y-6">
            {features.map((feature, index) => renderFeatureCard(feature, index))}
          </div>
        ) : (
          <div className={cn("grid gap-6", getGridCols())}>
            {features.map((feature, index) => renderFeatureCard(feature, index))}
          </div>
        )}
      </div>
    </section>
  );
}

// Example usage in demo page:
export function DemoEnhancedFeatures() {
  const features: Feature[] = [
    {
      title: "Brush Cutters",
      description: "Professional-grade brush cutters for efficient vegetation management.",
      image: {
        src: "/images/brush-cutter.jpg",
        alt: "Brush Cutter",
        width: 600,
        height: 400,
      },
      highlights: [
        "Powerful 2-stroke engine",
        "Ergonomic design for comfortable operation",
        "Durable metal blade for tough vegetation",
      ],
      link: {
        text: "View Brush Cutters",
        href: "/products/brush-cutters",
      },
    },
    {
      title: "Chainsaws",
      description: "High-performance chainsaws for professional and home use.",
      image: {
        src: "/images/chainsaw.jpg",
        alt: "Chainsaw",
        width: 600,
        height: 400,
      },
      highlights: [
        "Quick-start technology",
        "Anti-vibration system",
        "Automatic chain lubrication",
      ],
      link: {
        text: "View Chainsaws",
        href: "/products/chainsaws",
      },
    },
    {
      title: "Power Tillers",
      description: "Efficient power tillers for soil preparation and cultivation.",
      image: {
        src: "/images/power-tiller.jpg",
        alt: "Power Tiller",
        width: 600,
        height: 400,
      },
      highlights: [
        "Multiple tilling widths available",
        "Adjustable depth control",
        "Fuel-efficient engine",
      ],
      link: {
        text: "View Power Tillers",
        href: "/products/power-tillers",
      },
    },
  ];
  
  return (
    <EnhancedFeatures
      title="Our Premium Agricultural Equipment"
      subtitle="Featured Products"
      description="Explore our range of high-quality agricultural machinery designed to enhance productivity and efficiency in your farming operations."
      features={features}
      layout="grid"
      columns={3}
    />
  );
} 