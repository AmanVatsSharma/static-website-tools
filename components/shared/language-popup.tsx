import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface LanguagePopupProps {
  onSelectLanguage: (language: "hi" | "en") => void;
}

export function LanguagePopup({ onSelectLanguage }: LanguagePopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if language preference is already set in localStorage
    const savedLanguage = localStorage.getItem("language");
    if (!savedLanguage) {
      // If no language preference is set, show the popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelectLanguage = (language: "hi" | "en") => {
    localStorage.setItem("language", language);
    onSelectLanguage(language);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900"
          >
            <button
              onClick={() => handleSelectLanguage("en")}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Choose Your Language
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                कृपया अपनी पसंदीदा भाषा चुनें
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                size="lg"
                className="flex flex-col items-center justify-center gap-2 p-6 hover:bg-primary/5"
                onClick={() => handleSelectLanguage("hi")}
              >
                <span className="text-3xl">🇮🇳</span>
                <span className="text-lg font-medium">हिंदी</span>
                <span className="text-xs text-gray-500">Hindi</span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="flex flex-col items-center justify-center gap-2 p-6 hover:bg-primary/5"
                onClick={() => handleSelectLanguage("en")}
              >
                <span className="text-3xl">🇬🇧</span>
                <span className="text-lg font-medium">English</span>
                <span className="text-xs text-gray-500">अंग्रेज़ी</span>
              </Button>
            </div>
            
            <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
              You can change your language preference anytime from the menu.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 