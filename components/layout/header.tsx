"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, X, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { usePathname } from "next/navigation";
import { 
  AnimatePresence, 
  motion, 
  useScroll, 
  useTransform 
} from "framer-motion";
import { 
  useMagneticEffect, 
  useSpotlightEffect 
} from "@/lib/animation-hooks";
import { AnimatedGradientBackground } from "@/lib/aceternity-animations";

interface HeaderProps {
  className?: string;
  language?: "en" | "hi";
  setLanguage?: (lang: "en" | "hi") => void;
}

// Translations for header
const translations = {
  en: {
    home: "Home",
    products: "Products",
    aboutUs: "About Us",
    contact: "Contact",
    hindi: "हिंदी",
    english: "English",
    callUs: "Call Us",
    whatsApp: "WhatsApp"
  },
  hi: {
    home: "होम",
    products: "उत्पाद",
    aboutUs: "हमारे बारे में",
    contact: "संपर्क",
    hindi: "हिंदी",
    english: "English",
    callUs: "कॉल करें",
    whatsApp: "व्हाट्सएप"
  }
};

export function Header({ className, language = "en", setLanguage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState<"en" | "hi">(language);
  const pathname = usePathname();
  
  // Animation hooks
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);
  
  // Magnetic effect for buttons
  const callBtnMagnetic = useMagneticEffect(20);
  const whatsappBtnMagnetic = useMagneticEffect(20);
  
  // Content based on language
  const content = translations[currentLanguage];

  useEffect(() => {
    // Update internal state when prop changes
    setCurrentLanguage(language);
  }, [language]);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const changeLanguage = (lang: "en" | "hi") => {
    // Update localStorage
    localStorage.setItem("language", lang);
    
    // Update local state
    setCurrentLanguage(lang);
    
    // Update parent component if setLanguage prop exists
    if (setLanguage) {
      setLanguage(lang);
    }
    
    // Force page reload to update all components
    window.location.reload();
  };
  
  // Navigation items with active state
  const navItems = [
    { href: "/", label: content.home },
    { href: "/products", label: content.products },
    { href: "/about", label: content.aboutUs },
    { href: "/contact", label: content.contact },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/85 backdrop-blur-md shadow-lg py-2 dark:bg-gray-900/90"
          : "bg-transparent py-4",
        className
      )}
    >
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-r from-white/80 via-white/95 to-white/80 dark:from-gray-900/80 dark:via-gray-900/95 dark:to-gray-900/80"
        style={{ opacity: headerOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative"
            >
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                AWE
              </span>
              <motion.span 
                className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500 font-bold"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                Machinery
              </motion.span>
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary/80 to-orange-400/80 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-2 text-base font-medium transition-colors",
                  pathname === item.href 
                    ? "text-primary" 
                    : "text-foreground hover:text-primary dark:text-white dark:hover:text-primary"
                )}
              >
                <span>{item.label}</span>
                {pathname === item.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-orange-400 rounded-full"
                    layoutId="navIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <AnimatedGradientBackground
              containerClassName="rounded-md overflow-hidden"
              className="opacity-10"
              colors={["#f16717", "#ff9d4d", "#ffb380"]}
              duration={15}
            >
              <div className="flex border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                <button 
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium transition-colors", 
                    currentLanguage === "hi" 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                  )}
                  onClick={() => changeLanguage("hi")}
                >
                  {content.hindi}
                </button>
                <button 
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium transition-colors",
                    currentLanguage === "en" 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                  )}
                  onClick={() => changeLanguage("en")}
                >
                  {content.english}
                </button>
              </div>
            </AnimatedGradientBackground>
            
            {/* Theme Toggle */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThemeToggle />
            </motion.div>
            
            {/* Call Button */}
            <motion.div
              ref={callBtnMagnetic.ref}
              style={{
                x: callBtnMagnetic.xSpring,
                y: callBtnMagnetic.ySpring
              }}
              onMouseMove={callBtnMagnetic.handleMouse}
              onMouseLeave={callBtnMagnetic.handleMouseLeave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline-primary" 
                size="sm" 
                className="flex items-center gap-2 border-orange-300 dark:border-orange-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <Phone size={16} className="text-primary" />
                <span>{content.callUs}</span>
              </Button>
            </motion.div>
            
            {/* WhatsApp Button */}
            <motion.div
              ref={whatsappBtnMagnetic.ref}
              style={{
                x: whatsappBtnMagnetic.xSpring,
                y: whatsappBtnMagnetic.ySpring
              }}
              onMouseMove={whatsappBtnMagnetic.handleMouse}
              onMouseLeave={whatsappBtnMagnetic.handleMouseLeave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-600 shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle size={16} />
                <span>{content.whatsApp}</span>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 90 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-foreground dark:text-white" />
              ) : (
                <Menu size={24} className="text-foreground dark:text-white" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center py-3 border-b dark:border-gray-800",
                        pathname === item.href 
                          ? "text-primary border-primary/50" 
                          : "text-foreground border-gray-100 dark:text-white dark:border-gray-700"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      {pathname === item.href && (
                        <motion.div
                          className="ml-2 w-1.5 h-1.5 rounded-full bg-primary"
                          layoutId="mobileNavIndicator"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Mobile Actions */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                {/* Language Selector */}
                <div className="flex justify-center mb-2">
                  <AnimatedGradientBackground
                    containerClassName="rounded-md overflow-hidden w-full max-w-[200px]"
                    className="opacity-10"
                    colors={["#f16717", "#ff9d4d", "#ffb380"]}
                    duration={15}
                  >
                    <div className="flex border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden w-full">
                      <button 
                        className={cn(
                          "px-3 py-2 text-sm font-medium transition-colors flex-1", 
                          currentLanguage === "hi" 
                            ? "bg-primary text-white" 
                            : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                        )}
                        onClick={() => changeLanguage("hi")}
                      >
                        {content.hindi}
                      </button>
                      <button 
                        className={cn(
                          "px-3 py-2 text-sm font-medium transition-colors flex-1",
                          currentLanguage === "en" 
                            ? "bg-primary text-white" 
                            : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                        )}
                        onClick={() => changeLanguage("en")}
                      >
                        {content.english}
                      </button>
                    </div>
                  </AnimatedGradientBackground>
                </div>
                
                {/* Theme and Contact Buttons */}
                <div className="flex justify-between items-center">
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center"
                  >
                    <ThemeToggle />
                  </motion.div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="flex items-center gap-1 text-xs border-orange-300 dark:border-orange-800"
                    >
                      <Phone size={14} className="text-primary" />
                      <span>{content.callUs}</span>
                    </Button>
                    
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex items-center gap-1 text-xs bg-gradient-to-r from-primary to-orange-500"
                    >
                      <MessageCircle size={14} />
                      <span>{content.whatsApp}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}