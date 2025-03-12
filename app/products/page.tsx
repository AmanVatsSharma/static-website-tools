"use client";

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { ProductGrid } from "@/components/product/product-grid";
import { CTASection } from "@/components/shared/cta-section";

// Mock data for all products
const allProducts = [
  {
    id: "brush-cutter-1",
    title: "Premium Brush Cutter BC-520",
    description: "High-performance brush cutter with 52cc engine, perfect for clearing thick vegetation and weeds.",
    imageUrl: "/placeholder-product-1.jpg",
    category: "Brush Cutters",
    featured: true,
  },
  {
    id: "brush-cutter-2",
    title: "Standard Brush Cutter BC-430",
    description: "Reliable 43cc brush cutter for regular maintenance of small to medium-sized areas.",
    imageUrl: "/placeholder-product-4.jpg",
    category: "Brush Cutters",
    featured: false,
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
    id: "chainsaw-2",
    title: "Compact Chainsaw CS-450",
    description: "Lightweight 45cc chainsaw ideal for home use and smaller cutting tasks.",
    imageUrl: "/placeholder-product-5.jpg",
    category: "Chainsaws",
    featured: false,
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
    id: "seeder-2",
    title: "Advanced Hand Seeder HS-200",
    description: "Premium manual seeder with adjustable seed flow control for various seed sizes.",
    imageUrl: "/placeholder-product-6.jpg",
    category: "Hand Seeders",
    featured: false,
  },
  {
    id: "tiller-1",
    title: "Power Tiller PT-750",
    description: "Heavy-duty power tiller with 7.5HP diesel engine for efficient soil preparation.",
    imageUrl: "/placeholder-product-7.jpg",
    category: "Power Tillers",
    featured: false,
  },
  {
    id: "tiller-2",
    title: "Compact Power Tiller PT-500",
    description: "Medium-sized 5HP power tiller perfect for small farms and gardens.",
    imageUrl: "/placeholder-product-8.jpg",
    category: "Power Tillers",
    featured: false,
  },
  {
    id: "pump-1",
    title: "High-Flow Water Pump WP-30",
    description: "Powerful water pump capable of moving 30,000 liters per hour for irrigation needs.",
    imageUrl: "/placeholder-product-9.jpg",
    category: "Water Pumps",
    featured: false,
  },
];

// Categories for filtering in English and Hindi
const categoriesTranslations = {
  en: [
    "All Products",
    "Brush Cutters",
    "Chainsaws",
    "Hand Seeders",
    "Power Tillers",
    "Water Pumps",
  ],
  hi: [
    "सभी उत्पाद",
    "ब्रश कटर",
    "चेनसॉ",
    "हैंड सीडर",
    "पावर टिलर",
    "वाटर पंप",
  ],
};

export default function ProductsPage() {
  const [language, setLanguage] = useState<"hi" | "en">("en");
  
  useEffect(() => {
    // Load user's language preference from localStorage
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage === "hi" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);
  
  const categories = categoriesTranslations[language];
  
  return (
    <MainLayout language={language}>
      <div className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
              {language === "en" ? "Our Products" : "हमारे उत्पाद"}
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              {language === "en" 
                ? "Explore our range of premium agricultural machinery designed to enhance productivity and efficiency for Indian farmers."
                : "भारतीय किसानों के लिए उत्पादकता और दक्षता बढ़ाने के लिए डिज़ाइन किए गए हमारे प्रीमियम कृषि मशीनरी की रेंज का अन्वेषण करें।"}
            </p>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-primary hover:text-white hover:border-primary dark:border-gray-700 dark:text-gray-300 dark:hover:border-primary"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <ProductGrid products={allProducts} columns={3} />
        </div>
      </section>

      {/* Call to Action */}
      <CTASection
        title={language === "en" ? "Need Help Choosing the Right Product?" : "सही उत्पाद चुनने में मदद चाहिए?"}
        description={language === "en"
          ? "Our agricultural experts are ready to assist you in selecting the perfect machinery for your specific farming needs."
          : "हमारे कृषि विशेषज्ञ आपकी विशिष्ट खेती की जरूरतों के लिए सही मशीनरी चुनने में आपकी मदद करने के लिए तैयार हैं।"}
        primaryButtonText={language === "en" ? "Call Now" : "अभी कॉल करें"}
        secondaryButtonText={language === "en" ? "WhatsApp Us" : "हमें व्हाट्सएप करें"}
      />
    </MainLayout>
  );
} 