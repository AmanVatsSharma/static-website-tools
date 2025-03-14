"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, X, Menu, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { usePathname } from "next/navigation";
import { 
  AnimatePresence, 
  motion, 
  useScroll, 
  useTransform,
  useMotionTemplate
} from "framer-motion";
import { 
  useMagneticEffect, 
  useSpotlightEffect,
  useTypewriter 
} from "@/lib/animation-hooks";
import { 
  AnimatedGradientBackground,
  BackgroundBeams,
  StaggeredChildren
} from "@/lib/aceternity-animations";

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
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const pathname = usePathname();
  
  // Animation hooks
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);
  const headerBlur = useTransform(scrollYProgress, [0, 0.1], [0, 8]);
  const headerBgOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [0.5, 0.7, 0.8]);
  const headerBorderOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 0.7]);
  const headerBackdropBlur = useMotionTemplate`blur(${headerBlur}px)`;
  
  // Magnetic effect for buttons
  const callBtnMagnetic = useMagneticEffect(20);
  const whatsappBtnMagnetic = useMagneticEffect(20);
  const logoMagnetic = useMagneticEffect(15);
  
  // Spotlight effect for the header
  const spotlightEffect = useSpotlightEffect();
  
  // Typewriter effect for the logo
  const { displayText: machineryText, isTyping } = useTypewriter("Machinery", 100, 1000, false);
  
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
          ? "py-2"
          : "py-4",
        className
      )}
      ref={spotlightEffect.ref}
      onMouseMove={spotlightEffect.handleMouseMove}
    >
      {/* Glass Background Effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          backdropFilter: headerBackdropBlur,
          WebkitBackdropFilter: headerBackdropBlur,
          backgroundColor: useMotionTemplate`rgba(255, 255, 255, ${headerBgOpacity})`,
          borderBottom: useMotionTemplate`1px solid rgba(234, 234, 234, ${headerBorderOpacity})`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Dark Mode Glass Background */}
      <motion.div 
        className="absolute inset-0 z-0 dark:block hidden"
        style={{ 
          backdropFilter: headerBackdropBlur,
          WebkitBackdropFilter: headerBackdropBlur,
          backgroundColor: useMotionTemplate`rgba(17, 17, 17, ${headerBgOpacity})`,
          borderBottom: useMotionTemplate`1px solid rgba(45, 45, 45, ${headerBorderOpacity})`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Spotlight Glow Effect */}
      <motion.div 
        className="absolute inset-0 z-0 hidden md:block"
        style={{
          background: `radial-gradient(circle at ${spotlightEffect.spotlightX.get()}px ${spotlightEffect.spotlightY.get()}px, rgba(241,103,23,0.15), transparent 25%)`,
        }}
      />
      
      {/* Subtle Beams Effect */}
      <BackgroundBeams
        className="absolute inset-0 z-0 opacity-20"
        pathColor="rgba(241, 103, 23, 0.2)"
      />
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div
              ref={logoMagnetic.ref}
              style={{
                x: logoMagnetic.xSpring,
                y: logoMagnetic.ySpring
              }}
              onMouseMove={logoMagnetic.handleMouse}
              onMouseLeave={logoMagnetic.handleMouseLeave}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative flex items-center"
            >
              <motion.div
                className="relative inline-flex"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <span className="relative text-2xl font-extrabold text-gray-900 dark:text-white">
                  AWE
                  <motion.span
                    className="absolute -top-1 -right-1 text-xs text-primary"
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <Sparkles size={12} />
                  </motion.span>
                </span>
                <motion.span 
                  className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-amber-400 font-bold"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                >
                  {machineryText || "Machinery"}
                </motion.span>
              </motion.div>
              
              {/* Animated underline */}
              <motion.div 
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/80 via-orange-400/80 to-amber-300/80 rounded-full"
                initial={{ width: 0 }}
                animate={isScrolled ? { width: "100%" } : {}}
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
                  "relative py-2 text-base font-medium transition-colors overflow-hidden",
                  pathname === item.href 
                    ? "text-primary" 
                    : "text-foreground hover:text-primary dark:text-white dark:hover:text-primary"
                )}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Active indicator */}
                {pathname === item.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-orange-400 rounded-full"
                    layoutId="desktop-nav-indicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Hover glow effect */}
                <AnimatePresence>
                  {hoveredItem === item.href && hoveredItem !== pathname && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 top-0 bg-primary/5 dark:bg-primary/10 rounded-md -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={`hover-${item.href}`}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
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
              <div className="flex border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden backdrop-blur-md">
                <motion.button 
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium transition-colors relative overflow-hidden", 
                    currentLanguage === "hi" 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-100/70 dark:hover:bg-gray-700/70 dark:text-white"
                  )}
                  onClick={() => changeLanguage("hi")}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 } 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {content.hindi}
                  {currentLanguage === "hi" && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                      animate={{ 
                        x: ["0%", "200%"],
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        repeatType: "loop", 
                        ease: "linear",
                      }}
                    />
                  )}
                </motion.button>
                <motion.button 
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium transition-colors relative overflow-hidden",
                    currentLanguage === "en" 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-100/70 dark:hover:bg-gray-700/70 dark:text-white"
                  )}
                  onClick={() => changeLanguage("en")}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 } 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {content.english}
                  {currentLanguage === "en" && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                      animate={{ 
                        x: ["0%", "200%"],
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        repeatType: "loop", 
                        ease: "linear",
                      }}
                    />
                  )}
                </motion.button>
              </div>
            </AnimatedGradientBackground>
            
            {/* Theme Toggle */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <ThemeToggle className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md" />
              <motion.div 
                className="absolute inset-0 rounded-full border border-primary/20"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 0.3, 0.7] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "loop" 
                }}
              />
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
                className="flex items-center gap-2 border-orange-300 dark:border-orange-800 shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm hover:backdrop-blur-md"
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: Infinity,
                    repeatType: "loop", 
                    repeatDelay: 5
                  }}
                >
                  <Phone size={16} className="text-primary" />
                </motion.div>
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
              className="relative"
            >
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-600 shadow-md hover:shadow-lg transition-all"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    repeatType: "loop", 
                    repeatDelay: 4
                  }}
                >
                  <MessageCircle size={16} />
                </motion.div>
                <span>{content.whatsApp}</span>
              </Button>
              
              {/* Pulse effect around the WhatsApp button */}
              <motion.div 
                className="absolute inset-0 rounded-md border-2 border-primary"
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 0, 0.5] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "loop" 
                }}
              />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors backdrop-blur-sm z-20"
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
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-[60px] z-40 backdrop-blur-lg bg-white/70 dark:bg-gray-900/80 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            key="mobile-menu"
          >
            <BackgroundBeams
              className="absolute inset-0 z-0 opacity-30"
              pathColor="rgba(241, 103, 23, 0.15)"
            />
            
            <div className="container mx-auto px-4 py-8 flex flex-col space-y-6 relative z-10">
              {/* Mobile Navigation */}
              <StaggeredChildren className="flex flex-col space-y-3" delayIncrement={0.1}>
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  
                  return (
                    <motion.div
                      key={`mobile-${item.href}`}
                      className="relative overflow-hidden rounded-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <AnimatedGradientBackground
                        containerClassName="rounded-md overflow-hidden"
                        className="opacity-5"
                        colors={isActive ? ["#f16717", "#ff9d4d", "#ffb380"] : ["#f8f8f8", "#fafafa", "#f0f0f0"]}
                        duration={15}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between py-4 px-4 rounded-md backdrop-blur-sm",
                            isActive 
                              ? "text-primary border-primary/50 font-medium" 
                              : "text-foreground border-gray-100 dark:text-white dark:border-gray-700"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="text-lg">{item.label}</span>
                          {isActive && (
                            <motion.div
                              className="flex items-center gap-1 text-primary"
                              animate={{ 
                                x: [0, 5, 0],
                              }}
                              transition={{ 
                                duration: 1, 
                                repeat: Infinity,
                                repeatType: "loop", 
                                repeatDelay: 1
                              }}
                              key={`mobile-active-${item.href}`}
                            >
                              <Sparkles size={16} />
                            </motion.div>
                          )}
                        </Link>
                      </AnimatedGradientBackground>
                    </motion.div>
                  );
                })}
              </StaggeredChildren>
              
              {/* Mobile Actions */}
              <motion.div 
                className="grid grid-cols-1 gap-5 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {/* Language Selector */}
                <div className="flex justify-center mb-4">
                  <AnimatedGradientBackground
                    containerClassName="rounded-md overflow-hidden w-full max-w-[250px]"
                    className="opacity-10"
                    colors={["#f16717", "#ff9d4d", "#ffb380"]}
                    duration={15}
                  >
                    <div className="flex border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden w-full backdrop-blur-md">
                      <motion.button 
                        className={cn(
                          "px-4 py-3 text-base font-medium transition-colors flex-1 relative overflow-hidden", 
                          currentLanguage === "hi" 
                            ? "bg-primary text-white" 
                            : "hover:bg-gray-100/70 dark:hover:bg-gray-700/70 dark:text-white"
                        )}
                        onClick={() => changeLanguage("hi")}
                        whileTap={{ scale: 0.98 }}
                      >
                        {content.hindi}
                        {currentLanguage === "hi" && (
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                            animate={{ 
                              x: ["0%", "200%"],
                            }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity,
                              repeatType: "loop", 
                              ease: "linear",
                            }}
                          />
                        )}
                      </motion.button>
                      <motion.button 
                        className={cn(
                          "px-4 py-3 text-base font-medium transition-colors flex-1 relative overflow-hidden",
                          currentLanguage === "en" 
                            ? "bg-primary text-white" 
                            : "hover:bg-gray-100/70 dark:hover:bg-gray-700/70 dark:text-white"
                        )}
                        onClick={() => changeLanguage("en")}
                        whileTap={{ scale: 0.98 }}
                      >
                        {content.english}
                        {currentLanguage === "en" && (
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                            animate={{ 
                              x: ["0%", "200%"],
                            }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity,
                              repeatType: "loop", 
                              ease: "linear",
                            }}
                          />
                        )}
                      </motion.button>
                    </div>
                  </AnimatedGradientBackground>
                </div>
                
                {/* Theme and Contact Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex justify-center items-center mb-2">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/80 dark:bg-gray-800/80 rounded-full p-2 backdrop-blur-md relative"
                    >
                      <ThemeToggle />
                      <motion.div 
                        className="absolute inset-0 rounded-full border border-primary/20"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.2, 0.5] 
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          repeatType: "loop" 
                        }}
                      />
                    </motion.div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button 
                        variant="outline-primary" 
                        className="flex items-center justify-center gap-2 border-orange-300 dark:border-orange-800 shadow-md w-full py-6 text-base backdrop-blur-md"
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, 0, -10, 0] }}
                          transition={{ 
                            duration: 0.5, 
                            repeat: Infinity,
                            repeatType: "loop", 
                            repeatDelay: 5
                          }}
                        >
                          <Phone size={18} className="text-primary" />
                        </motion.div>
                        <span>{content.callUs}</span>
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="relative"
                    >
                      <Button 
                        variant="default" 
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-orange-500 shadow-lg w-full py-6 text-base"
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ 
                            duration: 1, 
                            repeat: Infinity,
                            repeatType: "loop", 
                            repeatDelay: 4
                          }}
                        >
                          <MessageCircle size={18} />
                        </motion.div>
                        <span>{content.whatsApp}</span>
                      </Button>
                      
                      {/* Pulse effect */}
                      <motion.div 
                        className="absolute inset-0 rounded-md border-2 border-primary"
                        animate={{ 
                          scale: [1, 1.08, 1],
                          opacity: [0.5, 0, 0.5] 
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          repeatType: "loop" 
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}