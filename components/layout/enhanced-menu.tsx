"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  MessageCircle,
  Home,
  Box,
  Users,
  Info,
  Phone as PhoneIcon
} from "lucide-react";
import { useReducedMotion } from "@/lib/animation-hooks";
import { MovingBorderButton } from "@/components/ui/aceternity";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

interface EnhancedMenuProps {
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  navigationItems: NavItem[];
  callButtonText?: string;
  whatsappButtonText?: string;
  onCallButtonClick?: () => void;
  onWhatsappButtonClick?: () => void;
  className?: string;
}

export function EnhancedMenu({
  logo,
  navigationItems,
  callButtonText = "Call Now",
  whatsappButtonText = "WhatsApp",
  onCallButtonClick,
  onWhatsappButtonClick,
  className,
}: EnhancedMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };
  
  const handleCallClick = () => {
    if (onCallButtonClick) {
      onCallButtonClick();
    }
  };
  
  const handleWhatsappClick = () => {
    if (onWhatsappButtonClick) {
      onWhatsappButtonClick();
    }
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? 
          "py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm" : 
          "py-5 bg-transparent",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="relative z-10">
              <div className="relative h-10 w-auto">
                <Image 
                  src={logo.src} 
                  alt={logo.alt} 
                  width={logo.width} 
                  height={logo.height}
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative group px-1">
                {item.children ? (
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      activeDropdown === item.label ? 
                        "text-primary" : 
                        "text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary"
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn(
                      "ml-1 h-4 w-4 transition-transform",
                      activeDropdown === item.label ? "rotate-180" : ""
                    )} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-primary rounded-md transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
                
                {/* Dropdown Menu */}
                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-20"
                      >
                        <div className="py-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              {child.icon && (
                                <span className="mr-2 text-primary">{child.icon}</span>
                              )}
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
                
                {/* Animated underline for desktop menu items */}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            ))}
          </nav>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleCallClick}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 dark:text-white dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Phone className="mr-2 h-4 w-4" />
              {callButtonText}
            </button>
            
            <MovingBorderButton
              borderClassName="bg-gradient-to-r from-green-500 via-green-400 to-green-600"
              className="bg-green-600 text-white hover:bg-green-700"
              rx="8px"
              ry="8px"
              duration={3}
              disableAnimation={reducedMotion}
              onClick={handleWhatsappClick}
            >
              <div className="flex items-center text-sm font-medium">
                <MessageCircle className="mr-2 h-4 w-4" />
                {whatsappButtonText}
              </div>
            </MovingBorderButton>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-x-0 top-[60px] bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.label} className="py-1">
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className="flex items-center justify-between w-full p-3 text-base font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={cn(
                            "h-5 w-5 transition-transform",
                            activeDropdown === item.label ? "rotate-180" : ""
                          )} />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 mt-1 space-y-1"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="flex items-center p-3 text-sm text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {child.icon && (
                                    <span className="mr-3 text-primary">{child.icon}</span>
                                  )}
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center p-3 text-base font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.icon && (
                          <span className="mr-3 text-primary">{item.icon}</span>
                        )}
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  onClick={() => {
                    handleCallClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center p-3 text-base font-medium text-gray-700 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {callButtonText}
                </button>
                
                <button
                  onClick={() => {
                    handleWhatsappClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center p-3 text-base font-medium bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {whatsappButtonText}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Example usage in demo page:
export function DemoEnhancedMenu() {
  const navigationItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="h-4 w-4" />,
    },
    {
      label: "Products",
      href: "/products",
      icon: <Box className="h-4 w-4" />,
      children: [
        {
          label: "Brush Cutters",
          href: "/products/brush-cutters",
          icon: <Box className="h-4 w-4" />,
        },
        {
          label: "Chainsaws",
          href: "/products/chainsaws",
          icon: <Box className="h-4 w-4" />,
        },
        {
          label: "Power Tillers",
          href: "/products/power-tillers",
          icon: <Box className="h-4 w-4" />,
        },
      ],
    },
    {
      label: "About",
      href: "/about",
      icon: <Info className="h-4 w-4" />,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: <PhoneIcon className="h-4 w-4" />,
    },
  ];
  
  return (
    <EnhancedMenu
      logo={{
        src: "/logo.svg",
        alt: "AWE Logo",
        width: 120,
        height: 40,
      }}
      navigationItems={navigationItems}
      onCallButtonClick={() => alert("Call button clicked")}
      onWhatsappButtonClick={() => alert("WhatsApp button clicked")}
    />
  );
} 