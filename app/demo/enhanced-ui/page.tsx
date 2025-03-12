"use client";

import React from "react";
import { Tractor, Leaf, Shield, Zap, Clock, Award, BarChart, Users } from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { EnhancedHeroSection } from "@/components/hero/enhanced-hero-section";
import { EnhancedBentoFeatures } from "@/components/shared/enhanced-bento-features";
import { EnhancedProductGrid } from "@/components/product/enhanced-product-card";
import { EnhancedTestimonialsSection } from "@/components/testimonial/enhanced-testimonials-section";
import { EnhancedCTASection } from "@/components/shared/enhanced-cta-section";

// Mock data for featured products
const featuredProducts = [
  {
    id: "brush-cutter-1",
    title: "Premium Brush Cutter BC-520",
    description: "High-performance brush cutter with 52cc engine, perfect for clearing thick vegetation and weeds.",
    imageUrl: "/placeholder-product-1.jpg",
    category: "Brush Cutters",
    featured: true,
  },
  {
    id: "chainsaw-1",
    title: "Professional Chainsaw CS-580",
    description: "Powerful 58cc chainsaw designed for professional use with advanced anti-vibration system.",
    imageUrl: "/placeholder-product-2.jpg",
    category: "Chainsaws",
    featured: true,
  },
  {
    id: "seeder-1",
    title: "Manual Hand Seeder HS-100",
    description: "Efficient manual seeder for precise seed placement, saving time and reducing waste.",
    imageUrl: "/placeholder-product-3.jpg",
    category: "Hand Seeders",
    featured: false,
  },
  {
    id: "tiller-1",
    title: "Power Tiller PT-750",
    description: "Robust power tiller with 7.5HP diesel engine for efficient soil preparation in various terrains.",
    imageUrl: "/placeholder-product-1.jpg",
    category: "Power Tillers",
    featured: false,
  },
  {
    id: "water-pump-1",
    title: "High-Flow Water Pump WP-200",
    description: "Reliable water pump with 2-inch outlet for irrigation and water transfer applications.",
    imageUrl: "/placeholder-product-2.jpg",
    category: "Water Pumps",
    featured: false,
  },
  {
    id: "reaper-1",
    title: "Self-Propelled Reaper SP-120",
    description: "Efficient reaper for wheat and paddy with adjustable cutting height and width.",
    imageUrl: "/placeholder-product-3.jpg",
    category: "Reapers",
    featured: true,
  },
];

// Enhanced bento grid features
const enhancedBentoFeatures = [
  {
    title: "Premium Quality",
    description: "Built with the highest quality materials for durability and reliability in tough farming conditions.",
    icon: <Shield className="h-6 w-6" />,
    size: "md" as const,
    hoverEffect: "zoom" as const,
    className: "bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-gray-800/80",
  },
  {
    title: "Eco-Friendly Design",
    description: "Reduce your carbon footprint while maximizing efficiency with our environmentally sustainable machinery.",
    icon: <Leaf className="h-6 w-6" />,
    size: "sm" as const,
    hoverEffect: "lift" as const,
  },
  {
    title: "Exceptional Performance",
    description: "Engineered for maximum performance to help increase productivity and yield with less effort.",
    icon: <Zap className="h-6 w-6" />,
    size: "lg" as const,
    hoverEffect: "glow" as const,
    className: "bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800/80",
  },
  {
    title: "Time-Saving Technology",
    description: "Save valuable time and focus on other important aspects of your farming business.",
    icon: <Clock className="h-6 w-6" />,
    size: "sm" as const,
    hoverEffect: "rotate" as const,
  },
  {
    title: "Expert Support Team",
    description: "Our agricultural experts provide ongoing support and guidance to ensure optimal use of our products.",
    icon: <Users className="h-6 w-6" />,
    size: "lg" as const,
    hoverEffect: "lift" as const,
    className: "bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800/80",
  },
  {
    title: "Made for Indian Farms",
    description: "Specifically designed for Indian agricultural conditions and farming practices.",
    icon: <Tractor className="h-6 w-6" />,
    size: "md" as const,
    hoverEffect: "zoom" as const,
    className: "bg-gradient-to-br from-white to-yellow-50 dark:from-gray-900 dark:to-gray-800/80",
  },
  {
    title: "Increased Profitability",
    description: "Boost your farm's productivity and efficiency, leading to better financial outcomes.",
    icon: <BarChart className="h-6 w-6" />,
    size: "sm" as const,
    hoverEffect: "glow" as const,
  },
];

// Mock data for testimonials
const testimonials = [
  {
    id: "1",
    content: "The AWE brush cutter has transformed how I maintain my farm. It's powerful, reliable, and has significantly reduced the time I spend on clearing vegetation.",
    author: {
      name: "Rajesh Kumar",
      role: "Wheat Farmer, Punjab",
      avatarUrl: "/placeholder-testimonial-1.jpg",
    },
    rating: 5,
  },
  {
    id: "2",
    content: "I've been using AWE's power tiller for two seasons now, and the difference in productivity is remarkable. The quality and durability are exceptional.",
    author: {
      name: "Sunita Patel",
      role: "Vegetable Grower, Gujarat",
      avatarUrl: "/placeholder-testimonial-2.jpg",
    },
    rating: 4,
  },
  {
    id: "3",
    content: "The customer service at AWE is outstanding. When I had an issue with my chainsaw, they resolved it immediately. Their products are built to last.",
    author: {
      name: "Mohan Singh",
      role: "Orchard Owner, Himachal Pradesh",
      avatarUrl: "/placeholder-testimonial-3.jpg",
    },
    rating: 5,
  },
];

export default function EnhancedUIDemo() {
  return (
    <MainLayout language="en">
      {/* Enhanced Hero Section */}
      <EnhancedHeroSection />
      
      {/* Enhanced Bento Features */}
      <EnhancedBentoFeatures 
        features={enhancedBentoFeatures} 
        title="Premium Agricultural Solutions"
        subtitle="Our machinery is designed to optimize your farming operations with industry-leading features and reliability."
      />
      
      {/* Enhanced Product Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Our Featured Products
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Discover our range of premium agricultural machinery designed to enhance your farming efficiency.
            </p>
          </div>

          <EnhancedProductGrid 
            products={featuredProducts} 
            onProductClick={(id) => console.log(`Product clicked: ${id}`)}
            onAddToCart={(id) => console.log(`Add to cart: ${id}`)}
          />
        </div>
      </section>
      
      {/* Enhanced Testimonials Section */}
      <EnhancedTestimonialsSection 
        testimonials={testimonials} 
        darkMode={true}
      />
      
      {/* Enhanced CTA Section */}
      <EnhancedCTASection 
        variant="alternate"
        onPrimaryButtonClick={() => console.log("Primary CTA clicked")}
        onSecondaryButtonClick={() => console.log("Secondary CTA clicked")}
        onWhatsappButtonClick={() => console.log("WhatsApp CTA clicked")}
      />
    </MainLayout>
  );
}