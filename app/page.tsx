"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Tractor, Leaf, Shield, Zap, Clock, Award, BarChart, Users } from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/hero/hero-section";
import { FeaturesSection } from "@/components/shared/features-section";
import { BentoFeatures } from "@/components/shared/bento-features";
import { EnhancedBentoFeatures } from "@/components/shared/enhanced-bento-features";
import { TestimonialsSection } from "@/components/shared/testimonials-section";
import { CTASection } from "@/components/shared/cta-section";
import { ProductGrid } from "@/components/product/product-grid";
import { LanguagePopup } from "@/components/shared/language-popup";
import { SocialMediaSection } from "@/components/social-media/social-media-section";
import { ComponentDiagnostics } from "@/components/shared/component-diagnostics";

// Mock data for featured products
const featuredProducts = [
  {
    id: "brush-cutter-1",
    title: "Premium Brush Cutter BC-520",
    description: "High-performance brush cutter with 52cc engine, perfect for clearing thick vegetation and weeds.",
    imageUrl: "/images/products/01.webp",
    category: "Brush Cutters",
    featured: true,
  },
  {
    id: "chainsaw-1",
    title: "Professional Chainsaw CS-580",
    description: "Powerful 58cc chainsaw designed for professional use with advanced anti-vibration system.",
    imageUrl: "/images/products/02.jpg",
    category: "Chainsaws",
    featured: true,
  },
  {
    id: "seeder-1",
    title: "Manual Hand Seeder HS-100",
    description: "Efficient manual seeder for precise seed placement, saving time and reducing waste.",
    imageUrl: "/images/products/03.webp",
    category: "Hand Seeders",
    featured: false,
  },
];

// Mock data for features
const features = [
  {
    title: "Premium Quality",
    description: "Our agricultural machinery is built with the highest quality materials for durability and reliability in tough farming conditions.",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    title: "Eco-Friendly",
    description: "Designed with environmental sustainability in mind, our products help reduce carbon footprint while maximizing efficiency.",
    icon: <Leaf className="h-6 w-6" />,
  },
  {
    title: "High Performance",
    description: "Engineered for maximum performance to help farmers increase productivity and yield with less effort.",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "Time-Saving",
    description: "Our machinery is designed to save valuable time, allowing farmers to focus on other important aspects of their business.",
    icon: <Clock className="h-6 w-6" />,
  },
  {
    title: "Expert Support",
    description: "Our team of agricultural experts provides ongoing support and guidance to ensure optimal use of our products.",
    icon: <Award className="h-6 w-6" />,
  },
  {
    title: "Made for Indian Farms",
    description: "Specifically designed for Indian agricultural conditions and farming practices to deliver the best results.",
    icon: <Tractor className="h-6 w-6" />,
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

export default function Home() {
  const [language, setLanguage] = useState<"hi" | "en">("hi");

  const handleLanguageSelect = (selectedLanguage: "hi" | "en") => {
    console.log(`Selected language: ${selectedLanguage}`);
    setLanguage(selectedLanguage);
    // In a real app, this would update the app's language context
  };

  return (
    <>
      <LanguagePopup onSelectLanguage={handleLanguageSelect} />
      <MainLayout language={language}>
        {/* <ComponentDiagnostics componentName="HeroSection"> */}

          <HeroSection />
        {/* </ComponentDiagnostics> */}

        {/* Featured Products Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                {language === "en" ? "Our Featured Products" : "हमारे प्रमुख उत्पाद"}
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                {language === "en"
                  ? "Discover our range of premium agricultural machinery designed to enhance your farming efficiency."
                  : "अपनी खेती की दक्षता बढ़ाने के लिए डिज़ाइन किए गए हमारे प्रीमियम कृषि मशीनरी की रेंज खोजें।"}
              </p>
            </div>

            <ProductGrid products={featuredProducts} />

            <div className="mt-12 text-center">
              <a
                href="/products"
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                {language === "en" ? "View All Products" : "सभी उत्पाद देखें"}
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* About Mr. Jitender Walia Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/founder/01.jpg"
                  alt="Mr. Jitender Walia"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                  {language === "en" ? "Meet Our Founder" : "हमारे संस्थापक से मिलें"}
                </h2>
                <h3 className="text-xl font-semibold text-primary">
                  {language === "en" ? "Mr. Jitender Walia" : "श्री जितेंदर वालिया"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === "en"
                    ? "With over 20 years of experience in agricultural machinery, Mr. Jitender Walia founded AWE with a vision to empower Indian farmers with premium quality equipment at affordable prices."
                    : "कृषि मशीनरी में 20 से अधिक वर्षों के अनुभव के साथ, श्री जितेंदर वालिया ने भारतीय किसानों को किफायती कीमतों पर प्रीमियम गुणवत्ता वाले उपकरण प्रदान करने के दृष्टिकोण के साथ AWE की स्थापना की।"}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === "en"
                    ? "His deep understanding of the challenges faced by farmers across India has guided the development of our product range, ensuring that each piece of machinery addresses real needs and delivers tangible benefits."
                    : "भारत भर के किसानों द्वारा सामना की जाने वाली चुनौतियों की उनकी गहरी समझ ने हमारे उत्पाद रेंज के विकास का मार्गदर्शन किया है, यह सुनिश्चित करते हुए कि मशीनरी का प्रत्येक टुकड़ा वास्तविक आवश्यकताओं को पूरा करता है और मूर्त लाभ प्रदान करता है।"}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === "en"
                    ? "Under his leadership, AWE has grown to become a trusted name in agricultural equipment, known for quality, reliability, and exceptional customer service."
                    : "उनके नेतृत्व में, AWE कृषि उपकरणों में एक विश्वसनीय नाम बन गया है, जो गुणवत्ता, विश्वसनीयता और असाधारण ग्राहक सेवा के लिए जाना जाता है।"}
                </p>
                <a
                  href="/about"
                  className="inline-flex items-center text-primary hover:underline font-medium"
                >
                  {language === "en" ? "Learn More About Our Story" : "हमारी कहानी के बारे में और जानें"}
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Bento Features Section */}
        <EnhancedBentoFeatures
          title={language === "en" ? "Why Choose AWE Machinery" : "AWE मशीनरी को क्यों चुनें"}
          subtitle={language === "en"
            ? "Our products are designed with the Indian farmer in mind, combining quality, performance, and value."
            : "हमारे उत्पाद भारतीय किसान को ध्यान में रखकर डिज़ाइन किए गए हैं, जो गुणवत्ता, प्रदर्शन और मूल्य को जोड़ते हैं।"}
          features={enhancedBentoFeatures}
          useInteractive={true}
        />

        {/* Testimonials Section */}
        <TestimonialsSection testimonials={testimonials} />

        {/* Social Media Section */}
        <SocialMediaSection />

        {/* Call to Action Section */}
        <CTASection
          title={language === "en" ? "Ready to Transform Your Farming?" : "अपनी खेती को बदलने के लिए तैयार हैं?"}
          description={language === "en"
            ? "Contact us today to learn more about our products and how they can help improve your agricultural productivity."
            : "हमारे उत्पादों और वे आपकी कृषि उत्पादकता में कैसे सुधार कर सकते हैं, इसके बारे में अधिक जानने के लिए आज ही हमसे संपर्क करें।"}
          primaryButtonText={language === "en" ? "Call Now" : "अभी कॉल करें"}
          secondaryButtonText={language === "en" ? "WhatsApp Us" : "हमें व्हाट्सएप करें"}
        />
      </MainLayout>
    </>
  );
}
