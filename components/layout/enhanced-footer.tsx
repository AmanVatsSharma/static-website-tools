"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/lib/animation-hooks";
import { BackgroundLines, WavyDivider } from "@/components/ui/aceternity";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronRight
} from "lucide-react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: "facebook" | "twitter" | "instagram" | "youtube" | "linkedin";
  href: string;
}

interface EnhancedFooterProps {
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  newsletterForm?: boolean;
  copyrightText?: string;
  showWaveDivider?: boolean;
  showBackground?: boolean;
  className?: string;
}

export function EnhancedFooter({
  logo,
  columns,
  socialLinks,
  contactInfo,
  newsletterForm = true,
  copyrightText = `© ${new Date().getFullYear()} All rights reserved.`,
  showWaveDivider = true,
  showBackground = true,
  className,
}: EnhancedFooterProps) {
  const reducedMotion = useReducedMotion();
  
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook className="h-5 w-5" />;
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      case "instagram":
        return <Instagram className="h-5 w-5" />;
      case "youtube":
        return <Youtube className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert("Newsletter subscription functionality would be implemented here.");
  };
  
  return (
    <footer className={cn("relative bg-white dark:bg-gray-900", className)}>
      {/* Wave divider at the top */}
      {showWaveDivider && (
        <div className="absolute top-0 left-0 right-0 transform -translate-y-full">
          <WavyDivider 
            className="fill-white dark:fill-gray-900" 
            waveHeight={40}
            waveCount={6}
            animate={!reducedMotion}
          />
        </div>
      )}
      
      {/* Background effect */}
      {showBackground && (
        <BackgroundLines
          className="opacity-5"
          lineColor="currentColor"
          lineWidth={1}
          waveHeight={20}
          waveCount={8}
          animate={!reducedMotion}
        />
      )}
      
      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and company info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src={logo.src} 
                alt={logo.alt} 
                width={logo.width} 
                height={logo.height}
                className="h-10 w-auto"
              />
            </Link>
            
            {contactInfo && (
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                {contactInfo.address && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                    <span>{contactInfo.address}</span>
                  </div>
                )}
                
                {contactInfo.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <Link href={`tel:${contactInfo.phone}`} className="hover:text-primary transition-colors">
                      {contactInfo.phone}
                    </Link>
                  </div>
                )}
                
                {contactInfo.email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <Link href={`mailto:${contactInfo.email}`} className="hover:text-primary transition-colors">
                      {contactInfo.email}
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Social links */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="mt-6">
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.platform}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      {renderSocialIcon(link.platform)}
                    </motion.a>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Footer columns */}
          {columns.map((column, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {column.title}
              </h3>
              
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center"
                    >
                      <ChevronRight className="h-4 w-4 mr-1" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter form */}
          {newsletterForm && (
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Subscribe to Our Newsletter
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Stay updated with our latest products and offers.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
                >
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </form>
            </div>
          )}
        </div>
        
        {/* Bottom bar with copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
              {copyrightText}
            </p>
            
            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="hover:text-primary transition-colors">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Example usage in demo page:
export function DemoEnhancedFooter() {
  const columns: FooterColumn[] = [
    {
      title: "Products",
      links: [
        { label: "Brush Cutters", href: "/products/brush-cutters" },
        { label: "Chainsaws", href: "/products/chainsaws" },
        { label: "Power Tillers", href: "/products/power-tillers" },
        { label: "Spare Parts", href: "/products/spare-parts" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/team" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];
  
  const socialLinks: SocialLink[] = [
    { platform: "facebook", href: "https://facebook.com" },
    { platform: "twitter", href: "https://twitter.com" },
    { platform: "instagram", href: "https://instagram.com" },
    { platform: "youtube", href: "https://youtube.com" },
  ];
  
  return (
    <EnhancedFooter
      logo={{
        src: "/logo.svg",
        alt: "AWE Logo",
        width: 120,
        height: 40,
      }}
      columns={columns}
      socialLinks={socialLinks}
      contactInfo={{
        email: "info@awe.com",
        phone: "+1 (234) 567-8901",
        address: "123 Agriculture Way, Farmington, CA 12345",
      }}
    />
  );
} 