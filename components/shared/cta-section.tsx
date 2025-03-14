import React, { useEffect, useState } from "react";
import { motion, useAnimation, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Check, ArrowRight, Star, BadgeCheck, ShieldCheck, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonUrl?: string;
  secondaryButtonText: string;
  secondaryButtonUrl?: string;
  className?: string;
  benefits?: string[];
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
  };
  bgVariant?: "standard" | "gradient" | "dark" | "light" | "orange";
}

export function CTASection({
  title,
  description,
  primaryButtonText,
  primaryButtonUrl = "#",
  secondaryButtonText,
  secondaryButtonUrl = "#",
  className,
  benefits = [
    "Premium Quality Products",
    "Indian Farming Expertise",
    "Reliable Customer Support"
  ],
  testimonial,
  bgVariant = "orange"
}: CTASectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // 3D transform values
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  // Enhanced shine effect for the cards with 3D look
  const backgroundImage = useMotionTemplate`
    radial-gradient(
      1000px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 255, 255, 0.15),
      transparent 80%
    )
  `;
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate distance from center (for 3D effect)
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set rotation values (subtle 3D effect)
    rotateY.set((x - centerX) / 150);
    rotateX.set(-(y - centerY) / 150);
    
    // Set for gradient effect
    mouseX.set(x);
    mouseY.set(y);
    setMousePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };
  
  const handleMouseLeave = () => {
    // Reset 3D rotation on mouse leave
    rotateX.set(0);
    rotateY.set(0);
  };

  // Animation for the spotlight effect
  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        opacity: [0.5, 0.8, 0.5],
        transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
      });
    };
    sequence();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.5,
      },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  const benefitVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.5
      }
    })
  };

  const starVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: (i: number) => ({
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3 + i * 0.1
      }
    })
  };
  
  // Background styles based on variant
  const getBgClasses = () => {
    switch (bgVariant) {
      case "gradient":
        return "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white";
      case "dark":
        return "bg-gray-900 text-white";
      case "light":
        return "bg-gray-50";
      case "orange":
        return "bg-gradient-to-b from-orange-100 via-orange-50 to-orange-500 dark:from-gray-900 dark:via-gray-900 dark:to-orange-900";
      default:
        return "relative";
    }
  };

  return (
    <section
      className={cn(
        "relative py-20 md:py-32 overflow-hidden isolate",
        getBgClasses(),
        className
      )}
    >
      {/* Base solid orange background */}
      <div className="absolute inset-0 -z-20 bg-orange-500 dark:bg-orange-900"></div>
      
      {/* Enhanced 3D Gradient Background with decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Top wave shape */}
        <div className="absolute top-0 left-0 right-0 h-72 -z-10">
          <svg className="absolute top-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,208C672,213,768,171,864,154.7C960,139,1056,149,1152,154.7C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" 
              fill="url(#orangeGradient)" 
              fillOpacity="0.3"
            />
            <defs>
              <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FFF7ED" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Animated blurred circles */}
        <motion.div 
          className="absolute left-1/4 top-1/3 -z-10 h-[600px] w-[600px] rounded-full bg-white/10 dark:bg-white/5 blur-3xl"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        
        <motion.div 
          className="absolute right-1/4 top-2/3 -z-10 h-[500px] w-[500px] rounded-full bg-gray-50/10 dark:bg-gray-200/5 blur-3xl"
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-white/30 dark:bg-white/20"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Mesh grid effect for 3D depth */}
        <div className="absolute inset-0 bg-[url('/images/grid.png')] bg-repeat opacity-[0.03] dark:opacity-[0.07]"></div>
      </div>

      {/* Content Container with 3D effect - Main Floating Glass Card */}
      <motion.div
        className="container relative mx-auto px-4 z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Main Floating Card with Glass Effect */}
        <motion.div
          className="relative max-w-6xl mx-auto rounded-3xl p-1"
          style={{
            perspective: "1000px",
            perspectiveOrigin: "center",
          }}
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Card glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-300 via-white to-orange-300 dark:from-orange-700 dark:via-gray-700 dark:to-orange-700 opacity-20 blur-xl rounded-3xl"></div>
          
          {/* Glass Card */}
          <motion.div 
            className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 dark:border-gray-800/50 shadow-2xl"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              backgroundImage,
            }}
          >
            {/* Inner Content */}
            <motion.div
              className="relative p-8 md:p-12"
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              {/* Floating decorative elements */}
              <motion.div 
                className="absolute top-6 right-12 text-orange-500 dark:text-orange-400 opacity-60"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ zIndex: 1 }}
              >
                <Sparkles className="h-20 w-20" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-8 left-0 text-gray-300 dark:text-gray-700 opacity-40 -rotate-12"
                animate={{ rotate: -25, y: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ zIndex: 1 }}
              >
                <Award className="h-16 w-16" />
              </motion.div>
              
              {/* Main Content */}
              <div className="max-w-7xl mx-auto">
                <motion.div 
                  className="relative flex flex-col md:flex-row gap-12 lg:gap-16 items-center"
                >
                  {/* Text Content */}
                  <motion.div 
                    variants={itemVariants} 
                    className="flex-1 space-y-7 md:space-y-8 z-10"
                  >
                    <div className="relative">
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-100 to-white dark:from-gray-800 dark:to-gray-900 text-orange-600 dark:text-orange-300 text-sm font-medium shadow-lg shadow-orange-500/10 dark:shadow-orange-800/10 border border-orange-100/50 dark:border-gray-700/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        style={{
                          transformStyle: "preserve-3d",
                          transform: "translateZ(30px)",
                        }}
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <span className="flex gap-1 items-center">
                          Trusted Agricultural Partner
                          <BadgeCheck className="h-3.5 w-3.5 text-orange-500 dark:text-orange-400" />
                        </span>
                      </motion.div>
                    </div>
                    
                    <motion.h2 
                      className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
                      variants={itemVariants}
                      style={{
                        textShadow: "0 2px 15px rgba(0,0,0,0.1)",
                        transformStyle: "preserve-3d",
                        transform: "translateZ(40px)",
                      }}
                    >
                      <span className="inline bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-orange-100 dark:to-orange-200">
                        {title}
                      </span>
                    </motion.h2>
                    
                    <motion.p 
                      className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl drop-shadow-sm"
                      variants={itemVariants}
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(35px)",
                      }}
                    >
                      {description}
                    </motion.p>
                    
                    {/* Enhanced Benefit Points */}
                    <motion.ul 
                      className="space-y-3.5"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(25px)",
                      }}
                    >
                      {benefits.map((benefit, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-center gap-3 group"
                          custom={i}
                          variants={benefitVariants}
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900 shadow-md shadow-orange-500/20 dark:shadow-orange-900/20 group-hover:shadow-lg group-hover:shadow-orange-500/30 dark:group-hover:shadow-orange-800/30 transition-shadow duration-300 border border-orange-100/50 dark:border-gray-700/50">
                            <ShieldCheck className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                          </div>
                          <span className="text-gray-800 dark:text-gray-200 font-medium">{benefit}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                    
                    {/* Enhanced CTA Buttons */}
                    <motion.div
                      variants={itemVariants}
                      className="flex flex-col sm:flex-row gap-5 mt-8"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(45px)",
                      }}
                    >
                      <motion.div
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        className="relative group"
                      >
                        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 opacity-80 group-hover:opacity-100 blur-md transition-all duration-300 group-hover:blur-lg"></div>
                        <Button
                          size="lg"
                          className="relative w-full sm:w-auto font-medium bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-none shadow-xl shadow-orange-500/30 dark:shadow-orange-700/30 text-base"
                          asChild
                        >
                          <a href={primaryButtonUrl} className="flex items-center gap-2 px-8 py-6">
                            <Phone className="h-5 w-5" />
                            {primaryButtonText}
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                            >
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </motion.div>
                          </a>
                        </Button>
                      </motion.div>

                      <motion.div
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        className="relative"
                      >
                        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900 opacity-50 backdrop-blur-sm"></div>
                        <Button
                          size="lg"
                          variant="outline"
                          className="relative w-full sm:w-auto border-2 border-white/80 dark:border-gray-700 hover:bg-white/20 dark:hover:bg-gray-800/50 text-gray-800 dark:text-white font-medium shadow-lg hover:shadow-orange-200/30 dark:hover:shadow-orange-900/10 text-base"
                          asChild
                        >
                          <a href={secondaryButtonUrl} className="flex items-center gap-2 px-8 py-6">
                            <MessageCircle className="h-5 w-5" />
                            {secondaryButtonText}
                          </a>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Right Side - Premium 3D Floating Card */}
                  <motion.div 
                    variants={itemVariants} 
                    className="flex-1 w-full md:max-w-md"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "perspective(1000px) translateZ(30px)",
                    }}
                  >
                    <motion.div 
                      className="relative p-6 md:p-8"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    >
                      {/* 3D Card Background with Depth Layers */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800 dark:to-gray-900 shadow-2xl rounded-2xl border border-white/50 dark:border-gray-700/30 backdrop-blur-sm"></div>
                      
                      {/* Glowing edge effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 opacity-20 blur-md rounded-2xl"></div>
                      
                      {/* Card Content with 3D Perspective */}
                      <div className="relative">
                        {/* Trust Indicators with Enhanced 3D */}
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 flex">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              custom={i}
                              variants={starVariants}
                              initial="initial"
                              animate="animate"
                              className="mx-1 relative"
                              style={{
                                transformStyle: "preserve-3d",
                                transform: `translateZ(${20 + i * 3}px)`,
                              }}
                            >
                              <Star className="h-7 w-7 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                            </motion.div>
                          ))}
                        </div>
                        
                        {testimonial ? (
                          <motion.div 
                            className="mt-6 space-y-4 relative"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            style={{
                              transformStyle: "preserve-3d",
                              transform: "translateZ(20px)",
                            }}
                          >
                            <div className="relative bg-white/70 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm shadow-lg border border-white/50 dark:border-gray-700/30">
                              <div className="absolute -left-3 -top-3 text-6xl text-orange-300 dark:text-orange-500 opacity-80" style={{ transform: "translateZ(15px)" }}>"</div>
                              <p className="relative z-10 text-gray-700 dark:text-gray-300 italic pt-5 pl-5 drop-shadow-sm">
                                {testimonial.quote}
                              </p>
                              <div className="absolute -right-3 bottom-0 text-6xl text-orange-300 dark:text-orange-500 opacity-80" style={{ transform: "translateZ(15px)" }}>"</div>
                            </div>
                            <div className="flex items-center gap-4 mt-5">
                              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-xl border-2 border-white dark:border-gray-700" style={{ transform: "translateZ(25px)" }}>
                                {testimonial.author.charAt(0)}
                              </div>
                              <div style={{ transform: "translateZ(15px)" }}>
                                <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                                {testimonial.role && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div 
                            className="py-6 space-y-6 relative"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            style={{
                              transformStyle: "preserve-3d",
                              transform: "translateZ(30px)",
                            }}
                          >
                            <div className="flex justify-between items-center">
                              <div className="text-center relative" style={{ transform: "translateZ(15px)" }}>
                                <motion.div 
                                  className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent dark:from-orange-400 dark:to-amber-300 drop-shadow-lg"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
                                >
                                  10+
                                </motion.div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Years Experience</p>
                              </div>
                              <div className="h-14 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                              <div className="text-center relative" style={{ transform: "translateZ(20px)" }}>
                                <motion.div 
                                  className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent dark:from-orange-400 dark:to-amber-300 drop-shadow-lg"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
                                >
                                  5000+
                                </motion.div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Happy Farmers</p>
                              </div>
                              <div className="h-14 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                              <div className="text-center relative" style={{ transform: "translateZ(25px)" }}>
                                <motion.div 
                                  className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent dark:from-orange-400 dark:to-amber-300 drop-shadow-lg"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.7 }}
                                >
                                  100%
                                </motion.div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Quality Product</p>
                              </div>
                            </div>
                            
                            <div className="relative h-px w-full my-6">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                              <div className="absolute inset-y-0 inset-x-[10%] bg-gradient-to-r from-orange-200 to-amber-200 dark:from-orange-800/30 dark:to-amber-800/30 opacity-60 blur-sm"></div>
                            </div>
                            
                            <div className="flex flex-col items-center justify-center gap-4">
                              <p className="text-center text-gray-700 dark:text-gray-300 relative font-medium" style={{ transform: "translateZ(15px)" }}>
                                Trusted by farmers across India for reliable agricultural equipment
                              </p>
                              <div className="flex flex-wrap justify-center gap-3 mt-2">
                                {['Premium', 'Trust', 'Quality', 'Support'].map((badge, i) => (
                                  <motion.div 
                                    key={i}
                                    className="px-4 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-white to-orange-50 dark:from-gray-800 dark:to-gray-900 text-orange-700 dark:text-orange-300 shadow-lg border border-white/80 dark:border-gray-700/50"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 + (i * 0.1) }}
                                    style={{ transform: `translateZ(${25 + i * 3}px)` }}
                                    whileHover={{ 
                                      y: -5, 
                                      scale: 1.05, 
                                      boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)" 
                                    }}
                                  >
                                    {badge}
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
} 