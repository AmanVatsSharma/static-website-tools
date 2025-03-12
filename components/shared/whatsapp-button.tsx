"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const messageSchema = z.object({
  name: z.string().min(2, "Name is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type MessageFormValues = z.infer<typeof messageSchema>;

interface WhatsAppButtonProps {
  phoneNumber: string;
  welcomeMessage?: string;
  position?: "bottom-right" | "bottom-left";
  language?: "en" | "hi";
}

export function WhatsAppButton({
  phoneNumber,
  welcomeMessage = "Hello, how can we help you today?",
  position = "bottom-right",
  language = "en",
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const translations = {
    en: {
      title: "Chat with Us",
      welcomeMessage: welcomeMessage,
      yourName: "Your Name",
      yourMessage: "Your Message",
      messagePlaceholder: "I'm interested in learning more about your products...",
      send: "Send",
      close: "Close",
    },
    hi: {
      title: "हमसे चैट करें",
      welcomeMessage: "नमस्ते, हम आज आपकी कैसे मदद कर सकते हैं?",
      yourName: "आपका नाम",
      yourMessage: "आपका संदेश",
      messagePlaceholder: "मुझे आपके उत्पादों के बारे में अधिक जानकारी में रुचि है...",
      send: "भेजें",
      close: "बंद करें",
    },
  };
  
  const t = translations[language];
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });
  
  const onSubmit = (data: MessageFormValues) => {
    const message = `Name: ${data.name}\nMessage: ${data.message}`;
    window.open(
      `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    reset();
    setIsOpen(false);
  };
  
  const positionClasses = {
    "bottom-right": "right-4 bottom-4",
    "bottom-left": "left-4 bottom-4",
  };
  
  return (
    <>
      {/* WhatsApp Float Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed ${positionClasses[position]} z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MessageCircle size={24} />
      </motion.button>
      
      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed ${positionClasses[position]} z-50 w-80 rounded-xl bg-white shadow-2xl overflow-hidden`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="relative bg-green-500 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-bold">{t.title}</h3>
                  <p className="text-xs text-green-100">AWE Agricultural Machinery</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-3 rounded-full bg-white/10 p-1 hover:bg-white/20"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Chat Body */}
            <div className="bg-gray-50 p-4">
              {/* Welcome Message */}
              <div className="mb-4 rounded-lg bg-white p-3 shadow-sm">
                <p className="text-sm text-gray-700">{t.welcomeMessage}</p>
              </div>
              
              {/* Chat Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    {t.yourName}
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`w-full rounded-md border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    {t.yourMessage}
                  </label>
                  <textarea
                    {...register("message")}
                    rows={3}
                    placeholder={t.messagePlaceholder}
                    className={`w-full rounded-md border px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 focus:ring-green-400"
                >
                  <Send size={16} className="mr-2" />
                  {t.send}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 