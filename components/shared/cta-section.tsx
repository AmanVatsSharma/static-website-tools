import React, { useEffect, useState } from "react";
import { motion, useAnimation, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Check, ArrowRight, Star, BadgeCheck, ShieldCheck } from "lucide-react";
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
  bgVariant?: "standard" | "gradient" | "dark" | "light";
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
  bgVariant = "standard"
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
      800px circle at ${mouseX}px ${mouseY}px,
      rgba(241, 103, 23, 0.18),
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
    rotateY.set((x - centerX) / 100);
    rotateX.set(-(y - centerY) / 100);
    
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
      default:
        return "relative";
    }
  };

  return (
    <section
      className={cn(
        "relative py-16 md:py-24 overflow-hidden isolate",
        getBgClasses(),
        className
      )}
    >
      {/* Enhanced 3D Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-orange-50/40 via-orange-100/20 to-transparent dark:from-gray-950 dark:via-gray-900/70 dark:to-transparent"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)"
          }}
        ></div>
        
        {/* Animated blurred circles */}
        <motion.div 
          className="absolute left-1/3 top-0 -z-10 h-[800px] w-[800px] rounded-full bg-orange-500/10 dark:bg-orange-600/5 blur-3xl"
          animate={controls}
          style={{ translateX: "-50%" }}
        ></motion.div>
        <motion.div 
          className="absolute right-1/4 bottom-0 -z-10 h-[600px] w-[600px] rounded-full bg-orange-400/10 dark:bg-orange-500/5 blur-3xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        ></motion.div>
        
        {/* Geometric accents for depth */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-br from-gray-200/10 to-transparent dark:from-gray-800/10 rounded-full blur-2xl transform -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-300/5 to-transparent dark:from-orange-800/5 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
        
        {/* Mesh grid effect for 3D depth */}
        <div className="absolute inset-0 bg-[url('/images/grid.png')] bg-repeat opacity-[0.015] dark:opacity-[0.03]"></div>
        
        {/* Dark overlay for dark modes */}
        {bgVariant === "gradient" && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950/80 via-gray-900/90 to-gray-800/95"></div>
        )}
      </div>

      {/* Content Container with 3D effect */}
      <motion.div
        className="container relative mx-auto px-4 z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          backgroundImage,
          perspective: "1000px",
          perspectiveOrigin: "center"
        }}
      >
        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="relative flex flex-col md:flex-row gap-8 lg:gap-12 items-center"
          >
            {/* Text Content */}
            <motion.div 
              variants={itemVariants} 
              className="flex-1 space-y-6 md:space-y-8"
              style={{
                transformStyle: "preserve-3d"
              }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-100 to-orange-50 dark:from-gray-800 dark:to-gray-900 text-orange-600 dark:text-orange-300 text-sm font-medium shadow-sm dark:shadow-orange-900/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
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
              
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white"
                variants={itemVariants}
                style={{
                  textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                <span className="inline bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-orange-400 dark:via-orange-300 dark:to-yellow-200">
                  {title}
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl drop-shadow-sm"
                variants={itemVariants}
              >
                {description}
              </motion.p>
              
              {/* Enhanced Benefit Points */}
              <motion.ul className="space-y-3.5">
                {benefits.map((benefit, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-3 group"
                    custom={i}
                    variants={benefitVariants}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-orange-50 dark:from-gray-800 dark:to-gray-900 shadow-sm shadow-orange-200/50 dark:shadow-orange-900/20 group-hover:shadow-md group-hover:shadow-orange-200/30 dark:group-hover:shadow-orange-900/30 transition-shadow duration-300">
                      <ShieldCheck className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{benefit}</span>
                  </motion.li>
                ))}
              </motion.ul>
              
              {/* Enhanced CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 mt-8"
              >
                <motion.div
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="relative group"
                >
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 opacity-70 group-hover:opacity-100 blur transition-all duration-300 group-hover:blur-md"></div>
                  <div className="absolute inset-0.5 rounded-md bg-gradient-to-br from-orange-300/20 to-transparent dark:from-gray-700/20 backdrop-blur-sm"></div>
                  <Button
                    size="lg"
                    className="relative w-full sm:w-auto font-medium bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-none shadow-xl shadow-orange-500/20 dark:shadow-orange-700/30 text-base"
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
                  <div className="absolute inset-0 rounded-md bg-gradient-to-br from-orange-100/20 to-transparent dark:from-gray-700/10 backdrop-blur-sm"></div>
                  <Button
                    size="lg"
                    variant="outline"
                    className="relative w-full sm:w-auto border-2 border-orange-200 dark:border-gray-700 hover:bg-orange-50 dark:hover:bg-gray-800/50 text-orange-700 dark:text-orange-300 font-medium shadow-lg hover:shadow-orange-200/30 dark:hover:shadow-orange-900/10 text-base"
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

            {/* Right Side - Premium 3D Card */}
            <motion.div 
              variants={itemVariants} 
              className="flex-1 w-full md:max-w-md"
              style={{
                transformStyle: "preserve-3d",
                transform: "perspective(1000px)",
              }}
            >
              <motion.div 
                className="relative p-6 md:p-8 rounded-2xl overflow-hidden isolate"
                style={{
                  transformStyle: "preserve-3d",
                  rotateX: rotateX,
                  rotateY: rotateY,
                  transition: "transform 0.3s ease-out",
                }}
              >
                {/* 3D Card Background with Depth Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-2xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50"></div>
                
                {/* Glowing edge effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 opacity-20 blur-md rounded-2xl"></div>
                
                {/* Inner gloss effect */}
                <div className="absolute inset-1 bg-gradient-to-br from-white/80 to-white/20 dark:from-gray-800/80 dark:to-gray-800/20 backdrop-blur-sm rounded-xl opacity-60"></div>
                
                {/* Card Content with 3D Perspective */}
                <div className="relative">
                  {/* Trust Indicators with Enhanced 3D */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex">
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
                          transform: `translateZ(${10 + i * 2}px)`,
                        }}
                      >
                        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 drop-shadow-md" />
                      </motion.div>
                    ))}
                  </div>
                  
                  {testimonial ? (
                    <motion.div 
                      className="mt-4 space-y-4 relative"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(20px)",
                      }}
                    >
                      <div className="relative bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm shadow-lg">
                        <div className="absolute -left-2 -top-2 text-5xl text-orange-300 dark:text-orange-600 opacity-80" style={{ transform: "translateZ(15px)" }}>"</div>
                        <p className="relative z-10 text-gray-700 dark:text-gray-300 italic pt-4 pl-4 drop-shadow-sm">
                          {testimonial.quote}
                        </p>
                        <div className="absolute -right-2 bottom-0 text-5xl text-orange-300 dark:text-orange-600 opacity-80" style={{ transform: "translateZ(15px)" }}>"</div>
                      </div>
                      <div className="flex items-center gap-3 mt-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-lg" style={{ transform: "translateZ(25px)" }}>
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
                      className="py-6 space-y-4 relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(20px)",
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-center relative" style={{ transform: "translateZ(15px)" }}>
                          <motion.div 
                            className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent dark:from-orange-500 dark:to-amber-400 drop-shadow-sm"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
                          >
                            10+
                          </motion.div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Years Experience</p>
                        </div>
                        <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                        <div className="text-center relative" style={{ transform: "translateZ(20px)" }}>
                          <motion.div 
                            className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent dark:from-orange-500 dark:to-amber-400 drop-shadow-sm"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
                          >
                            5000+
                          </motion.div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Happy Farmers</p>
                        </div>
                        <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                        <div className="text-center relative" style={{ transform: "translateZ(25px)" }}>
                          <motion.div 
                            className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent dark:from-orange-500 dark:to-amber-400 drop-shadow-sm"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.7 }}
                          >
                            100%
                          </motion.div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Quality Product</p>
                        </div>
                      </div>
                      
                      <div className="relative h-px w-full my-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                        <div className="absolute inset-y-0 inset-x-[10%] bg-gradient-to-r from-orange-200 to-amber-200 dark:from-orange-800/30 dark:to-amber-800/30 opacity-60 blur-sm"></div>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center gap-3">
                        <p className="text-center text-gray-700 dark:text-gray-300 relative" style={{ transform: "translateZ(15px)" }}>
                          Trusted by farmers across India for reliable agricultural equipment
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mt-2">
                          {['Premium', 'Trust', 'Quality', 'Support'].map((badge, i) => (
                            <motion.div 
                              key={i}
                              className="px-4 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-orange-100 to-orange-50 dark:from-gray-800 dark:to-gray-900 text-orange-700 dark:text-orange-300 shadow-sm border border-orange-200/50 dark:border-gray-700/50"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.8 + (i * 0.1) }}
                              style={{ transform: `translateZ(${15 + i * 2}px)` }}
                              whileHover={{ 
                                y: -5, 
                                scale: 1.05, 
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -5px rgba(0, 0, 0, 0.05)" 
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
    </section>
  );
} 