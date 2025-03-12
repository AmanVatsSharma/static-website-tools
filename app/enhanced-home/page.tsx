"use client";

import React from "react";
import { Box, Info, Phone } from "lucide-react";
import { EnhancedMenu } from "@/components/layout/enhanced-menu";
import { EnhancedHero } from "@/components/sections/enhanced-hero";
import { EnhancedFeatures } from "@/components/sections/enhanced-features";
import { EnhancedTestimonials } from "@/components/sections/enhanced-testimonials";
import { EnhancedCTA } from "@/components/sections/enhanced-cta";
import { EnhancedFooter } from "@/components/layout/enhanced-footer";
import { Feature } from "@/components/sections/enhanced-features";
import { Testimonial } from "@/components/sections/enhanced-testimonials";
import { FooterColumn, SocialLink } from "@/components/layout/enhanced-footer";

export default function EnhancedHomePage() {
  // Navigation items for the menu
  const navigationItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Products",
      href: "/products",
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
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];
  
  // Features for the features section
  const features: Feature[] = [
    {
      title: "Brush Cutters",
      description: "Professional-grade brush cutters for efficient vegetation management.",
      image: {
        src: "/logo.svg",
        alt: "Brush Cutter",
        width: 600,
        height: 400,
      },
      highlights: [
        "Powerful 2-stroke engine",
        "Ergonomic design for comfortable operation",
        "Durable metal blade for tough vegetation",
      ],
      link: {
        text: "View Brush Cutters",
        href: "/products/brush-cutters",
      },
    },
    {
      title: "Chainsaws",
      description: "High-performance chainsaws for professional and home use.",
      image: {
        src: "/logo.svg",
        alt: "Chainsaw",
        width: 600,
        height: 400,
      },
      highlights: [
        "Quick-start technology",
        "Anti-vibration system",
        "Automatic chain lubrication",
      ],
      link: {
        text: "View Chainsaws",
        href: "/products/chainsaws",
      },
    },
    {
      title: "Power Tillers",
      description: "Efficient power tillers for soil preparation and cultivation.",
      image: {
        src: "/logo.svg",
        alt: "Power Tiller",
        width: 600,
        height: 400,
      },
      highlights: [
        "Multiple tilling widths available",
        "Adjustable depth control",
        "Fuel-efficient engine",
      ],
      link: {
        text: "View Power Tillers",
        href: "/products/power-tillers",
      },
    },
  ];
  
  // Testimonials for the testimonials section
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "John Smith",
      role: "Farm Owner",
      company: "Smith Family Farms",
      content: "The brush cutters from AWE have significantly improved our efficiency in managing vegetation around our property. The durability and power of these machines are unmatched. I highly recommend their products to any farm owner looking for reliable equipment.",
      rating: 5,
      avatar: {
        src: "/logo.svg",
        alt: "John Smith",
      },
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      role: "Agricultural Contractor",
      company: "Rodriguez Agri Services",
      content: "We've been using AWE chainsaws for our forestry work for over 3 years now. They're reliable, powerful, and the after-sales service is excellent. The team is always responsive and helpful whenever we need assistance.",
      rating: 4,
      avatar: {
        src: "/logo.svg",
        alt: "Maria Rodriguez",
      },
    },
    {
      id: 3,
      name: "David Chen",
      role: "Orchard Manager",
      company: "Green Valley Orchards",
      content: "The power tillers from AWE have made soil preparation so much easier for our orchard. They're easy to operate and maintain, which is crucial during our busy planting seasons. Great value for money!",
      rating: 5,
      avatar: {
        src: "/logo.svg",
        alt: "David Chen",
      },
    },
  ];
  
  // Footer columns
  const footerColumns: FooterColumn[] = [
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
  
  // Social links
  const socialLinks: SocialLink[] = [
    { platform: "facebook", href: "https://facebook.com" },
    { platform: "twitter", href: "https://twitter.com" },
    { platform: "instagram", href: "https://instagram.com" },
    { platform: "youtube", href: "https://youtube.com" },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <EnhancedMenu
        logo={{
          src: "/logo.svg",
          alt: "AWE Logo",
          width: 120,
          height: 40,
        }}
        navigationItems={navigationItems}
        callButtonText="Call Now"
        whatsappButtonText="WhatsApp"
        onCallButtonClick={() => window.location.href = "tel:+1234567890"}
        onWhatsappButtonClick={() => window.open("https://wa.me/1234567890", "_blank")}
      />
      
      {/* Hero Section */}
      <EnhancedHero
        title="Powerful Agricultural Equipment for Modern Farming"
        subtitle="AWE - Agricultural World Equipment"
        description="Discover our range of high-quality agricultural machinery designed to enhance productivity and efficiency in your farming operations."
        primaryButtonText="Explore Products"
        primaryButtonHref="/products"
        secondaryButtonText="Contact Us"
        secondaryButtonHref="/contact"
        image={{
          src: "/logo.svg",
          alt: "Agricultural machinery in field",
          width: 1200,
          height: 800,
        }}
        backgroundEffect="beams"
      />
      
      {/* Features Section */}
      <EnhancedFeatures
        title="Our Premium Agricultural Equipment"
        subtitle="Featured Products"
        description="Explore our range of high-quality agricultural machinery designed to enhance productivity and efficiency in your farming operations."
        features={features}
        layout="grid"
        columns={3}
      />
      
      {/* Alternating Features Section */}
      <EnhancedFeatures
        title="Why Choose AWE Equipment?"
        subtitle="Our Advantages"
        description="We provide top-quality agricultural equipment with exceptional performance and durability."
        features={[
          {
            title: "Superior Quality",
            description: "All our products are manufactured using high-quality materials and components to ensure durability and reliability in demanding agricultural environments.",
            icon: <Box className="h-10 w-10" />,
            highlights: [
              "Rigorous quality control",
              "Premium materials",
              "Designed for durability",
            ],
          },
          {
            title: "Expert Support",
            description: "Our team of agricultural experts provides comprehensive support to help you choose the right equipment and maximize its performance.",
            icon: <Info className="h-10 w-10" />,
            highlights: [
              "Technical assistance",
              "Maintenance guidance",
              "Operational training",
            ],
          },
          {
            title: "Nationwide Service",
            description: "With service centers across the country, we ensure prompt maintenance and repair services to minimize downtime.",
            icon: <Phone className="h-10 w-10" />,
            highlights: [
              "Quick response time",
              "Genuine spare parts",
              "Skilled technicians",
            ],
          },
        ]}
        layout="alternating"
        showBackground={false}
      />
      
      {/* Testimonials Section */}
      <EnhancedTestimonials
        title="What Our Customers Say"
        subtitle="Testimonials"
        description="Hear from farmers and agricultural professionals who have experienced the quality and reliability of our equipment."
        testimonials={testimonials}
        layout="carousel"
      />
      
      {/* CTA Section */}
      <EnhancedCTA
        title="Ready to Enhance Your Agricultural Operations?"
        subtitle="Get in Touch"
        description="Contact our team today to learn more about our high-quality agricultural equipment and how they can improve your farming efficiency."
        primaryButtonText="Call Us Now"
        primaryButtonHref="tel:+1234567890"
        secondaryButtonText="Send a Message"
        secondaryButtonHref="/contact"
        backgroundType="aurora"
        variant="centered"
      />
      
      {/* Footer */}
      <EnhancedFooter
        logo={{
          src: "/logo.svg",
          alt: "AWE Logo",
          width: 120,
          height: 40,
        }}
        columns={footerColumns}
        socialLinks={socialLinks}
        contactInfo={{
          email: "info@awe.com",
          phone: "+1 (234) 567-8901",
          address: "123 Agriculture Way, Farmington, CA 12345",
        }}
        copyrightText={`© ${new Date().getFullYear()} Agricultural World Equipment. All rights reserved.`}
      />
    </div>
  );
}