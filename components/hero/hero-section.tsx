import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Phone, MessageCircle, ArrowRight, SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { ScrollContainer } from "@/components/ui/scroll-container";
import { ScrollFixContainer } from "@/lib/framer-motion-helpers";
import { isClient, useDebugScrollPosition, useMotionValueForSSR } from "@/lib/client-utils";
import { useReducedMotion, useParallax, useTypewriter } from "@/lib/animation-hooks";
import { 
  AuroraBackground, 
  AuroraPresets, 
  BackgroundBeams, 
  MovingBorderButton,
  TiltingCard,
  ShootingStarsBackground,
  StarBackgrounds,
  AnimatedGradientBackground,
  PresetGradients,
  GridDotBackground,
  WavyDivider
} from "@/components/ui/aceternity";

export function HeroSection() {
  // All hooks must be called unconditionally at top level
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const reducedMotion = useReducedMotion();
  
  // For text animation
  const { displayText, isTyping } = useTypewriter(
    "Empower Your Farming Success", 
    40, // Faster typing speed (was 60)
    400, // Longer pause between cycles (was 300)
    true // Enable loop (was false)
  );
  
  // Debug the scroll container - direct hook usage at top level
  useDebugScrollPosition("HeroSection", sectionRef);
  
  // Always call useScroll unconditionally - but make it safe
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Always call useTransform unconditionally - we'll handle client-side safety differently
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  // For SSR consistency, immediately read values once at render time
  // This prevents hydration mismatch errors
  const [cachedOpacity] = useState(() => useMotionValueForSSR(backgroundOpacity, 0.2));
  const [cachedImageY] = useState(() => useMotionValueForSSR(imageY, 0));
  const [cachedParallaxY] = useState(() => useMotionValueForSSR(parallaxY, 0));
  
  // Theme state for background
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  // Check theme on mount
  useEffect(() => {
    if (isClient) {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));
      
      // Listen for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            setIsDarkTheme(document.documentElement.classList.contains('dark'));
          }
        });
      });
      
      observer.observe(document.documentElement, { attributes: true });
      return () => observer.disconnect();
    }
  }, []);
  
  // Add debugging log
  useEffect(() => {
    if (isClient && sectionRef.current) {
      console.log("[ScrollDebug] HeroSection scrollYProgress initial:", scrollYProgress.get());
      
      // Listen for changes to scrollYProgress to see if it's updating
      // Using the new recommended method instead of onChange
      const unsubscribe = scrollYProgress.on("change", value => {
        console.log("[ScrollDebug] HeroSection scrollYProgress updated:", value);
      });
      
      return () => unsubscribe();
    }
  }, [scrollYProgress]);
  
  // Refined color palette
  const primaryColor = "#f16717"; // Brand orange
  const secondaryColor = "#2563eb"; // Blue accent
  const accentColor = "#059669"; // Green accent
  const lightBg = "#f8fafc"; // Super light gray
  
  // Custom AWE brand gradient (orange to light orange)
  const aweGradient = [
    "linear-gradient(to right bottom, #f16717, #ff984f)",
    "linear-gradient(to left top, #f16717, #fcc13d)"
  ];
  
  // Custom particles config
  const particlesConfig = {
    count: 20,
    size: { min: 2, max: 8 },
    color: "#f16717",
    speed: { min: 1, max: 3 }
  };
  
  return (
    <ScrollFixContainer>
      <ScrollContainer>
        <section 
          ref={sectionRef}
          className="relative overflow-hidden min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 scroll-container motion-safe-container scroll-trigger"
          style={{ position: 'relative' }}
          data-component="hero-section"
        >
          {/* Enhanced Dynamic Background */}
          {isDarkTheme ? (
            <>
              {/* Dark mode background with enhanced visibility - deep blue focus */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 z-0"></div>
              
              <ShootingStarsBackground
                className="absolute inset-0 z-0"
                starCount={70}
                starColor="#f8fafc"
                starSize={{ min: 1, max: 3 }}
                tailLength={{ min: 10, max: 40 }}
                duration={{ min: 0.5, max: 1.5 }}
                background="transparent"
                disableAnimation={reducedMotion}
              />
              
              {/* Add more nebula-like clouds */}
              <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[100px]"></div>
                <div className="absolute bottom-1/3 right-1/3 w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[80px]"></div>
                <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[90px]"></div>
              </div>
            </>
          ) : (
            <>
              {/* Light mode background with enhanced visibility - clean, airy feel */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50 z-0"></div>
              
              <AuroraBackground
                className="absolute inset-0 z-0"
                colors={["#3b82f6", "#a3e635", primaryColor]}
                blur={180}
                speed={20}
                disableAnimation={reducedMotion}
              />
              
              {/* Add sunburst effect */}
              <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-yellow-200/30 via-amber-100/20 to-orange-50/10 blur-3xl"></div>
            </>
          )}
          
          {/* Background Beams - enhanced to be more prominent like before */}
          <BackgroundBeams
            className="absolute inset-0 z-0"
            pathColor={isDarkTheme ? primaryColor : secondaryColor}
            secondaryColor={isDarkTheme ? secondaryColor : accentColor}
            opacity={0.35} // Slightly increased from 0.3
            beamCount={10} // Increased from 8
            disableAnimation={reducedMotion}
          />
          
          {/* Animated floating particles - more subtle and varied */}
          <div className="absolute inset-0 z-0">
            {!reducedMotion && Array.from({ length: 20 }).map((_, i) => {
              // Generate varied colors
              const colors = [
                'bg-primary/20 dark:bg-primary/10',
                'bg-blue-400/20 dark:bg-blue-500/10', 
                'bg-emerald-400/20 dark:bg-emerald-500/10',
                'bg-purple-400/20 dark:bg-purple-500/10',
                'bg-amber-400/20 dark:bg-amber-500/10'
              ];
              const colorClass = colors[i % colors.length];
              
              // More varied sizes
              const size = Math.random() * 8 + 2;
              
              return (
                <motion.div
                  key={i}
                  className={`absolute rounded-full ${colorClass}`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                  }}
                  animate={{
                    y: [Math.random() * 30, Math.random() * -30, Math.random() * 30],
                    x: [Math.random() * 30, Math.random() * -30, Math.random() * 30],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: Math.random() * 8 + 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </div>
          
          {/* Background Pattern - more subtle */}
          <motion.div 
            className="absolute inset-0 z-0 opacity-10"
            style={{ 
              opacity: isClient ? backgroundOpacity : cachedOpacity, 
              position: 'relative'
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f610_1px,transparent_1px),linear-gradient(to_bottom,#3b82f610_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,#3b82f610_1px,transparent_1px),linear-gradient(to_bottom,#3b82f610_1px,transparent_1px)]"></div>
          </motion.div>
          
          {/* Add subtle color noise texture */}
          <div className="absolute inset-0 z-0 opacity-5 mix-blend-overlay">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              width: '100%',
              height: '100%'
            }}></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-4 py-24 md:py-32 motion-safe-container" style={{ position: 'relative' }}>
            {/* Theme Toggle in Top Corner */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
              <ThemeToggle />
            </div>
            
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 items-center">
              {/* Left Column - Text Content - with enhanced glass effect */}
              <motion.div 
                className="space-y-8 p-6 rounded-2xl backdrop-blur-sm bg-white/60 dark:bg-slate-900/60 border border-white/20 dark:border-slate-800/30 shadow-xl"
                style={{ 
                  y: isClient ? parallaxY : cachedParallaxY,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  <div className="inline-block overflow-hidden">
                    <motion.span 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="inline-block rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-300 border border-blue-200/30 dark:border-blue-700/30 shadow-lg shadow-blue-500/5 backdrop-blur-md"
                    >
                      Premium Agricultural Machinery
                    </motion.span>
                  </div>
                  
                  <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl relative">
                    <span className="block">Empower Your</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-500 to-primary pb-2 relative drop-shadow-sm">
                      {displayText}
                      {isTyping && (
                        <span className="inline-block h-8 w-1.5 ml-1 bg-primary animate-pulse"></span>
                      )}
                    </span>
                  </h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-lg text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed"
                  >
                    High-quality agricultural equipment designed specifically for Indian farming conditions. Trusted by farmers across the country.
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <MovingBorderButton
                    borderClassName="bg-gradient-to-r from-primary via-yellow-500 to-primary"
                    className="bg-primary text-white hover:bg-primary/90 px-6 py-3 text-base font-medium shadow-xl shadow-primary/20"
                    rx="8px"
                    ry="8px"
                    duration={3}
                    disableAnimation={reducedMotion}
                  >
                    <div className="flex items-center">
                      Explore Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </MovingBorderButton>
                  
                  <Button size="xl" variant="outline-primary" className="flex items-center gap-2 border-primary/40 hover:border-primary/70 shadow-lg backdrop-blur-sm text-gray-800 dark:text-white">
                    <Phone className="h-4 w-4" />
                    <span>Call Now</span>
                  </Button>
                  
                  <Button size="xl" variant="secondary" className="flex items-center gap-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 backdrop-blur-sm shadow-lg text-gray-800 dark:text-white">
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </Button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap gap-6 pt-4"
                >
                  <div className="flex items-center gap-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm p-2 rounded-xl">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/30 border border-primary/40 shadow-lg shadow-primary/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">Premium Quality</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Durable & Reliable</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm p-2 rounded-xl">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/30 border border-primary/40 shadow-lg shadow-primary/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">Fast Delivery</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">All Over India</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm p-2 rounded-xl">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/30 border border-primary/40 shadow-lg shadow-primary/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">Expert Support</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">24/7 Assistance</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ 
                  y: isClient ? imageY : cachedImageY, 
                  position: 'relative' 
                }}
                className="relative"
              >
                {/* Glowing outline for the card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-yellow-500 to-primary rounded-2xl blur opacity-40 dark:opacity-60 animate-pulse" style={{ animationDuration: '3s' }}></div>
                
                <TiltingCard
                  className="h-[400px] md:h-[500px] lg:h-[600px] w-full relative"
                  disableAnimation={reducedMotion}
                  scale={1.02}
                  tiltAmount={10}
                  glareOpacity={0.2}
                >
                  <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-black/20">
                    <ResponsiveImage
                      src="/images/hero/01.jpg"
                      alt="Agricultural machinery in action"
                      width={1200}
                      height={800}
                      className="object-cover"
                      wrapperClassName="h-full w-full"
                      breakpoints={{
                        sm: 600,
                        md: 900,
                        lg: 1200
                      }}
                      priority={true}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-70" />
                    
                    {/* Floating Card - Mr. Jitender Walia */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                      transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg shadow-xl max-w-[220px] border border-white/40 dark:border-gray-800/70"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-14 rounded-full bg-gray-200 overflow-hidden border-2 border-primary/50 shadow-lg">
                          <OptimizedImage
                            src="/images/hero/02.jpg"
                            alt="Mr. Jitender Walia"
                            width={56}
                            height={56}
                            className="object-cover"
                            fadeIn={true}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">Mr. Jitender Walia</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Founder & CEO</p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        "Committed to empowering Indian farmers with the best agricultural technology."
                      </p>
                    </motion.div>
                  </div>
                </TiltingCard>
                
                {/* Larger, more visible decorative elements */}
                <div className="absolute -top-10 -left-10 h-48 w-48 bg-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
                <div className="absolute -bottom-16 -right-16 h-60 w-60 bg-yellow-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
                <div className="absolute top-1/2 -left-8 h-36 w-36 bg-green-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
              </motion.div>
            </div>
          </div>
          
          {/* Bottom decorative wave with higher contrast */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none" 
              className="absolute bottom-0 w-full h-full"
            >
              <path 
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                opacity=".5" 
                className="fill-orange-50 dark:fill-gray-900"
              />
              <path 
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                opacity=".7" 
                className="fill-orange-50 dark:fill-gray-900"
              />
              <path 
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
                className="fill-white dark:fill-gray-800"
              />
            </svg>
          </div>
        </section>
      </ScrollContainer>
    </ScrollFixContainer>
  );
} 