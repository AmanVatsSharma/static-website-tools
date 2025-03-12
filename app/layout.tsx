import type { Metadata, Viewport } from "next";
import { fontSans, fontHeading } from "@/config/fonts";
import "./globals.css";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { ThemeProvider } from "@/components/ui/theme-toggle";
import { CSSOptimizer } from "@/components/shared/css-optimizer";
import { JSOptimizer } from "@/components/shared/js-optimizer";
import { WebVitalsOptimizer } from "@/components/shared/web-vitals-optimizer";
import { OptimizedScript } from "@/components/shared/js-optimizer";
import WebVitalsInit from "./web-vitals-init";
import { DebugHelper } from "@/components/shared/debug-helper";
import { ScrollPositionFix } from "@/components/scroll-position-fix";

export const viewport: Viewport = {
  themeColor: "#f16717",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "AWE - Premium Agricultural Machinery for Indian Farmers",
  description: "High-quality agricultural equipment designed specifically for Indian farming conditions. Explore our range of brush cutters, chainsaws, manual hand seeders, power tillers, water pumps, and more.",
  keywords: ["agricultural machinery", "farming equipment", "brush cutters", "chainsaws", "power tillers", "water pumps", "Indian farmers", "agricultural tools", "farming tools India"],
  authors: [{ name: "AWE" }],
  creator: "AWE",
  publisher: "AWE",
  metadataBase: new URL("https://awe-machinery.com"),
  alternates: {
    canonical: "/",
    languages: {
      'en-US': '/en',
      'hi-IN': '/hi',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "hi_IN",
    url: "https://awe-machinery.com",
    siteName: "AWE Agricultural Machinery",
    title: "AWE - Premium Agricultural Machinery for Indian Farmers",
    description: "High-quality agricultural equipment designed specifically for Indian farming conditions. Trusted by farmers across India.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AWE Agricultural Machinery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AWE - Premium Agricultural Machinery for Indian Farmers",
    description: "High-quality agricultural equipment designed specifically for Indian farming conditions. Trusted by farmers across India.",
    images: ["/twitter-image.jpg"],
    creator: "@AWEMachinery",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  manifest: "/manifest.json",
  applicationName: "AWE Agricultural Machinery",
  appleWebApp: {
    capable: true,
    title: "AWE",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
    url: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OptimizedScript id="language-preference">
          {`
            try {
              // Check if there's already a language preference in localStorage
              const savedLanguage = localStorage.getItem('language');
              if (!savedLanguage) {
                // If no preference is set, default to 'en' and save it
                localStorage.setItem('language', 'en');
              }
            } catch (e) {
              // In case localStorage is not available
              console.warn('Unable to access localStorage for language preference');
            }
          `}
        </OptimizedScript>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#f16717" />
        
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="/fonts/inter-var.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* Critical CSS */}
        <CSSOptimizer />
      </head>
      <body
        className={`${fontSans.variable} ${fontHeading.variable} min-h-screen bg-background font-sans antialiased`}
      >
        {/* Add the debug helper */}
        <DebugHelper />
        
        {/* Add global scroll position fix */}
        <ScrollPositionFix />
        
        {/* Performance optimizations */}
        <WebVitalsInit />
        <WebVitalsOptimizer />
        <JSOptimizer 
          deferThirdParty={true}
          scripts={[
            {
              id: 'google-analytics',
              src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX',
              async: true,
              priority: 'medium'
            }
          ]}
        />
        
        <GoogleAnalytics />
        <Toaster position="top-center" />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
