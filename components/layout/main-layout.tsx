"use client";

import React, { useState, useEffect } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

interface MainLayoutProps {
  children: React.ReactNode;
  language?: "en" | "hi";
}

export function MainLayout({ children, language = "en" }: MainLayoutProps) {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "hi">(language);
  
  useEffect(() => {
    // Update language when prop changes
    setCurrentLanguage(language);
    
    // Make sure scrolling is enabled
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    // Clean up function to prevent memory leaks
    return () => {
      // Nothing to clean up in this case
    };
  }, [language]);
  
  const handleLanguageChange = (lang: "en" | "hi") => {
    setCurrentLanguage(lang);
  };
  
  return (
    <div className="flex flex-col min-h-screen relative" style={{ overflow: 'visible' }}>
      <Header 
        language={currentLanguage} 
        setLanguage={handleLanguageChange} 
      />
      <main className="flex-grow pt-16 relative" style={{ overflow: 'visible' }}>
        {children}
      </main>
      <Footer language={currentLanguage} />
      <WhatsAppButton 
        phoneNumber="+919876543210" 
        position="bottom-right"
        language={currentLanguage}
      />
    </div>
  );
} 