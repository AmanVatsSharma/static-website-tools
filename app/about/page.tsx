"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MainLayout } from "@/components/layout/main-layout";
import { TestimonialCard } from "@/components/testimonial/testimonial-card";
import { TeamCard } from "@/components/team/team-card";
import { CTASection } from "@/components/shared/cta-section";

// Content translations
const translations = {
  en: {
    hero: {
      title: "Our Story",
      subtitle: "Building Better Tools for Indian Farmers",
      description: "For over 25 years, AWE has been committed to empowering Indian farmers with high-quality agricultural equipment. Our journey began with a simple vision: to enhance farming efficiency through innovative technology that's accessible to all."
    },
    mission: {
      title: "Our Mission",
      content: "To revolutionize Indian agriculture by providing farmers with affordable, durable, and efficient tools that enhance productivity, reduce labor, and improve livelihoods."
    },
    vision: {
      title: "Our Vision",
      content: "To be the most trusted agricultural equipment partner for every Indian farmer, contributing to a more sustainable and prosperous farming community."
    },
    values: {
      title: "Our Values",
      items: [
        {
          title: "Quality",
          description: "We never compromise on the durability and performance of our products."
        },
        {
          title: "Innovation",
          description: "We constantly explore new technologies to make farming easier and more efficient."
        },
        {
          title: "Affordability",
          description: "We believe every farmer should have access to tools that enhance their productivity."
        },
        {
          title: "Service",
          description: "We provide exceptional after-sales support and training to ensure optimal use of our equipment."
        }
      ]
    },
    history: {
      title: "Our History",
      timeline: [
        {
          year: "1998",
          title: "Foundation",
          description: "AWE was established with a focus on providing basic hand tools to local farmers."
        },
        {
          year: "2005",
          title: "Expansion",
          description: "Introduced our first line of power-driven agricultural machinery."
        },
        {
          year: "2010",
          title: "Innovation",
          description: "Launched R&D center dedicated to developing India-specific farming solutions."
        },
        {
          year: "2015",
          title: "Nationwide Reach",
          description: "Expanded distribution network to all major agricultural regions in India."
        },
        {
          year: "2020",
          title: "Sustainability Focus",
          description: "Introduced eco-friendly equipment line with reduced environmental impact."
        },
        {
          year: "2023",
          title: "Digital Transformation",
          description: "Launched online platform for equipment sales, support, and farming guidance."
        }
      ]
    },
    team: {
      title: "Our Leadership Team",
      description: "Meet the experienced professionals guiding AWE towards a brighter agricultural future."
    },
    testimonials: {
      title: "What Farmers Say About Us",
      description: "Hear from the farmers whose lives have been transformed by our equipment."
    },
    cta: {
      title: "Join the AWE Family",
      description: "Become part of our mission to transform Indian agriculture through innovation and quality.",
      primaryButton: "Contact Us",
      secondaryButton: "View Products"
    }
  },
  hi: {
    hero: {
      title: "हमारी कहानी",
      subtitle: "भारतीय किसानों के लिए बेहतर उपकरण निर्माण",
      description: "25 वर्षों से अधिक समय से, AWE उच्च गुणवत्ता वाले कृषि उपकरणों के साथ भारतीय किसानों को सशक्त बनाने के लिए प्रतिबद्ध है। हमारी यात्रा एक सरल दृष्टि से शुरू हुई: सभी के लिए सुलभ नवीन तकनीक के माध्यम से खेती दक्षता को बढ़ाना।"
    },
    mission: {
      title: "हमारा मिशन",
      content: "किसानों को किफायती, टिकाऊ और कुशल उपकरण प्रदान करके भारतीय कृषि में क्रांति लाना जो उत्पादकता बढ़ाते हैं, श्रम कम करते हैं और आजीविका में सुधार करते हैं।"
    },
    vision: {
      title: "हमारी दृष्टि",
      content: "हर भारतीय किसान के लिए सबसे विश्वसनीय कृषि उपकरण भागीदार बनना, अधिक टिकाऊ और समृद्ध कृषि समुदाय में योगदान देना।"
    },
    values: {
      title: "हमारे मूल्य",
      items: [
        {
          title: "गुणवत्ता",
          description: "हम अपने उत्पादों के स्थायित्व और प्रदर्शन पर कभी समझौता नहीं करते।"
        },
        {
          title: "नवाचार",
          description: "हम खेती को आसान और अधिक कुशल बनाने के लिए नई तकनीकों की लगातार खोज करते हैं।"
        },
        {
          title: "किफायती",
          description: "हमारा मानना है कि हर किसान के पास ऐसे उपकरण होने चाहिए जो उनकी उत्पादकता को बढ़ावा दें।"
        },
        {
          title: "सेवा",
          description: "हम अपने उपकरण के इष्टतम उपयोग को सुनिश्चित करने के लिए असाधारण बिक्री-पश्चात समर्थन और प्रशिक्षण प्रदान करते हैं।"
        }
      ]
    },
    history: {
      title: "हमारा इतिहास",
      timeline: [
        {
          year: "1998",
          title: "स्थापना",
          description: "AWE की स्थापना स्थानीय किसानों को बुनियादी हाथ के उपकरण प्रदान करने पर ध्यान केंद्रित करके की गई थी।"
        },
        {
          year: "2005",
          title: "विस्तार",
          description: "पहली बार पावर-ड्रिवन कृषि मशीनरी की हमारी पहली लाइन पेश की।"
        },
        {
          year: "2010",
          title: "नवाचार",
          description: "भारत-विशिष्ट कृषि समाधान विकसित करने के लिए समर्पित R&D केंद्र लॉन्च किया।"
        },
        {
          year: "2015",
          title: "राष्ट्रव्यापी पहुंच",
          description: "भारत के सभी प्रमुख कृषि क्षेत्रों में वितरण नेटवर्क का विस्तार किया।"
        },
        {
          year: "2020",
          title: "स्थिरता फोकस",
          description: "कम पर्यावरणीय प्रभाव के साथ पर्यावरण अनुकूल उपकरण लाइन पेश की।"
        },
        {
          year: "2023",
          title: "डिजिटल परिवर्तन",
          description: "उपकरण बिक्री, समर्थन और कृषि मार्गदर्शन के लिए ऑनलाइन प्लेटफॉर्म लॉन्च किया।"
        }
      ]
    },
    team: {
      title: "हमारी नेतृत्व टीम",
      description: "उन अनुभवी पेशेवरों से मिलें जो AWE को एक उज्जवल कृषि भविष्य की ओर मार्गदर्शन कर रहे हैं।"
    },
    testimonials: {
      title: "किसान हमारे बारे में क्या कहते हैं",
      description: "उन किसानों से सुनें जिनका जीवन हमारे उपकरणों द्वारा बदल दिया गया है।"
    },
    cta: {
      title: "AWE परिवार से जुड़ें",
      description: "नवाचार और गुणवत्ता के माध्यम से भारतीय कृषि को बदलने के हमारे मिशन का हिस्सा बनें।",
      primaryButton: "संपर्क करें",
      secondaryButton: "उत्पाद देखें"
    }
  }
};

// Team data
const teamMembers = [
  {
    name: "Rajesh Kumar",
    position: "Chief Executive Officer",
    imageUrl: "/placeholder-team-1.jpg",
    bio: "With over 30 years of experience in agricultural engineering, Rajesh leads AWE with a vision to transform Indian farming through innovation."
  },
  {
    name: "Priya Sharma",
    position: "Chief Technology Officer",
    imageUrl: "/placeholder-team-2.jpg",
    bio: "An agricultural technology specialist with a passion for developing solutions tailored to the unique challenges faced by Indian farmers."
  },
  {
    name: "Amit Patel",
    position: "Head of Operations",
    imageUrl: "/placeholder-team-3.jpg",
    bio: "Amit ensures our manufacturing processes meet the highest standards while maintaining cost-effectiveness for our customers."
  },
  {
    name: "Sunita Verma",
    position: "Customer Relations Director",
    imageUrl: "/placeholder-team-4.jpg",
    bio: "Dedicated to understanding farmer needs and ensuring our products and services deliver real value to agricultural communities."
  }
];

// Testimonial data
const testimonials = [
  {
    id: "1",
    content: "AWE's brush cutter transformed how I maintain my 5-acre farm. It's reduced my labor costs by half and improved overall productivity.",
    author: "Ramesh Singh",
    role: "Wheat Farmer, Punjab",
    imageUrl: "/placeholder-testimonial-1.jpg"
  },
  {
    id: "2",
    content: "The quality of AWE equipment is outstanding. I've been using their power tiller for 7 years with minimal maintenance, and it still performs like new.",
    author: "Lakshmi Devi",
    role: "Vegetable Grower, Karnataka",
    imageUrl: "/placeholder-testimonial-2.jpg"
  },
  {
    id: "3",
    content: "What sets AWE apart is their after-sales service. Their team is always available to help with maintenance tips and troubleshooting.",
    author: "Vikram Choudhary",
    role: "Sugarcane Farmer, Uttar Pradesh",
    imageUrl: "/placeholder-testimonial-3.jpg"
  }
];

export default function AboutPage() {
  const [language, setLanguage] = useState<"hi" | "en">("en");
  
  useEffect(() => {
    // Load user's language preference from localStorage
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage === "hi" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);
  
  const content = translations[language];
  
  return (
    <MainLayout language={language}>
      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
              {content.hero.title}
            </h1>
            <p className="mt-3 text-xl text-primary font-semibold">
              {content.hero.subtitle}
            </p>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              {content.hero.description}
            </p>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{content.mission.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{content.mission.content}</p>
            </div>
            
            {/* Vision */}
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{content.vision.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{content.vision.content}</p>
            </div>
            
            {/* Values */}
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 md:col-span-2 lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{content.values.title}</h2>
              <ul className="space-y-3">
                {content.values.items.map((value, index) => (
                  <li key={index}>
                    <h3 className="font-bold text-primary">{value.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">{content.history.title}</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {content.history.timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="w-5/12"></div>
                  <div className="w-2/12 flex justify-center">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{item.year}</span>
                    </div>
                  </div>
                  <div className="w-5/12 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="font-bold text-primary">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{content.team.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-3">{content.team.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard
                key={index}
                name={member.name}
                position={member.position}
                imageUrl={member.imageUrl}
                bio={member.bio}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 motion-safe-container">
        <div className="container mx-auto px-4 motion-safe-container">
          <div className="text-center mb-12 motion-safe-container">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{content.testimonials.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-3">{content.testimonials.description}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 motion-safe-container">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                content={testimonial.content}
                author={testimonial.author}
                role={testimonial.role}
                imageUrl={testimonial.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CTASection
        title={content.cta.title}
        description={content.cta.description}
        primaryButtonText={content.cta.primaryButton}
        secondaryButtonText={content.cta.secondaryButton}
      />
    </MainLayout>
  );
} 