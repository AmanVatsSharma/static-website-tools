"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  language?: "en" | "hi";
}

// Footer translations
const translations = {
  en: {
    companyInfo: "Premium agricultural machinery for Indian farmers. Quality you can trust.",
    quickLinks: "Quick Links",
    home: "Home",
    products: "Products",
    aboutUs: "About Us",
    contact: "Contact",
    ourProducts: "Our Products",
    brushCutters: "Brush Cutters",
    chainsaws: "Chainsaws",
    handSeeders: "Manual Hand Seeders",
    powerTillers: "Power Tillers",
    waterPumps: "Water Pumps",
    contactUs: "Contact Us",
    address: "123 Agriculture Road, Delhi, India",
    callNow: "Call Now",
    allRightsReserved: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service"
  },
  hi: {
    companyInfo: "भारतीय किसानों के लिए प्रीमियम कृषि मशीनरी। विश्वास करने योग्य गुणवत्ता।",
    quickLinks: "त्वरित लिंक",
    home: "होम",
    products: "उत्पाद",
    aboutUs: "हमारे बारे में",
    contact: "संपर्क",
    ourProducts: "हमारे उत्पाद",
    brushCutters: "ब्रश कटर",
    chainsaws: "चेनसॉ",
    handSeeders: "मैनुअल हैंड सीडर",
    powerTillers: "पावर टिलर",
    waterPumps: "वाटर पंप",
    contactUs: "संपर्क करें",
    address: "123 एग्रीकल्चर रोड, दिल्ली, भारत",
    callNow: "अभी कॉल करें",
    allRightsReserved: "सर्वाधिकार सुरक्षित।",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें"
  }
};

export function Footer({ language = "en" }: FooterProps) {
  const content = translations[language];
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">AWE</h3>
            <p className="text-gray-300">
              {content.companyInfo}
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{content.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  {content.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  {content.products}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  {content.aboutUs}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  {content.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{content.ourProducts}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products/brush-cutters"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  {content.brushCutters}
                </Link>
              </li>
              <li>
                <Link
                  href="/products/chainsaws"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  {content.chainsaws}
                </Link>
              </li>
              <li>
                <Link
                  href="/products/hand-seeders"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  {content.handSeeders}
                </Link>
              </li>
              <li>
                <Link
                  href="/products/power-tillers"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  {content.powerTillers}
                </Link>
              </li>
              <li>
                <Link
                  href="/products/water-pumps"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  {content.waterPumps}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{content.contactUs}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  {content.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <a
                  href="mailto:info@awe.com"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  info@awe.com
                </a>
              </div>
              <Button
                variant="default"
                className="mt-2 w-full flex items-center justify-center gap-2"
              >
                <Phone size={16} />
                <span>{content.callNow}</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} AWE. {content.allRightsReserved}
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link
              href="/privacy-policy"
              className="text-gray-400 hover:text-primary text-sm transition-colors"
            >
              {content.privacyPolicy}
            </Link>
            <Link
              href="/terms-of-service"
              className="text-gray-400 hover:text-primary text-sm transition-colors"
            >
              {content.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 