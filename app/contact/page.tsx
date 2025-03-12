"use client";

import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Translations for the contact page
const translations = {
  en: {
    hero: {
      title: "Contact Us",
      description: "We're here to help with any questions about our agricultural machinery. Reach out to us through any of the channels below."
    },
    form: {
      title: "Send Us a Message",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone Number",
      product: "Product Interest",
      productOptions: {
        select: "Select a product",
        brushCutters: "Brush Cutters",
        chainsaws: "Chainsaws",
        handSeeders: "Manual Hand Seeders",
        powerTillers: "Power Tillers",
        waterPumps: "Water Pumps",
        other: "Other"
      },
      message: "Message",
      sending: "Sending...",
      send: "Send Message"
    },
    contactInfo: {
      title: "Contact Information",
      address: {
        title: "Address",
        line1: "123 Agriculture Road,",
        line2: "Industrial Area,",
        line3: "Delhi, 110001,",
        line4: "India"
      },
      phone: {
        title: "Phone"
      },
      email: {
        title: "Email"
      }
    },
    quickContact: {
      title: "Quick Contact",
      description: "Need immediate assistance? Reach out to us directly:",
      callButton: "Call Us Now",
      whatsappButton: "WhatsApp Chat",
      whatsappMessage: "Hello, I'm interested in AWE agricultural machinery."
    },
    businessHours: {
      title: "Business Hours",
      mondayToFriday: "Monday - Friday",
      mondayToFridayHours: "9:00 AM - 6:00 PM",
      saturday: "Saturday",
      saturdayHours: "10:00 AM - 4:00 PM",
      sunday: "Sunday",
      sundayClosed: "Closed"
    },
    map: {
      placeholder: "Google Maps will be embedded here"
    }
  },
  hi: {
    hero: {
      title: "संपर्क करें",
      description: "हम हमारे कृषि मशीनरी के बारे में किसी भी प्रश्न में मदद के लिए यहां हैं। नीचे दिए गए किसी भी माध्यम से हमसे संपर्क करें।"
    },
    form: {
      title: "हमें संदेश भेजें",
      firstName: "पहला नाम",
      lastName: "अंतिम नाम",
      email: "ईमेल",
      phone: "फोन नंबर",
      product: "उत्पाद रुचि",
      productOptions: {
        select: "एक उत्पाद चुनें",
        brushCutters: "ब्रश कटर",
        chainsaws: "चेनसॉ",
        handSeeders: "मैनुअल हैंड सीडर",
        powerTillers: "पावर टिलर",
        waterPumps: "वाटर पंप",
        other: "अन्य"
      },
      message: "संदेश",
      sending: "भेज रहा है...",
      send: "संदेश भेजें"
    },
    contactInfo: {
      title: "संपर्क जानकारी",
      address: {
        title: "पता",
        line1: "123 एग्रीकल्चर रोड,",
        line2: "इंडस्ट्रियल एरिया,",
        line3: "दिल्ली, 110001,",
        line4: "भारत"
      },
      phone: {
        title: "फोन"
      },
      email: {
        title: "ईमेल"
      }
    },
    quickContact: {
      title: "त्वरित संपर्क",
      description: "तत्काल सहायता की आवश्यकता है? सीधे हमसे संपर्क करें:",
      callButton: "अभी कॉल करें",
      whatsappButton: "व्हाट्सएप चैट",
      whatsappMessage: "नमस्ते, मुझे AWE कृषि मशीनरी में रुचि है।"
    },
    businessHours: {
      title: "व्यापार घंटे",
      mondayToFriday: "सोमवार - शुक्रवार",
      mondayToFridayHours: "सुबह 9:00 - शाम 6:00",
      saturday: "शनिवार",
      saturdayHours: "सुबह 10:00 - शाम 4:00",
      sunday: "रविवार",
      sundayClosed: "बंद"
    },
    map: {
      placeholder: "यहां Google मैप एम्बेडेड किया जाएगा"
    }
  }
};

// Form validation schema using zod
const contactFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  product: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState<"hi" | "en">("en");
  
  useEffect(() => {
    // Load user's language preference from localStorage
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage === "hi" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);
  
  const content = translations[language];
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      product: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real app, you would send the data to your API here
      console.log("Form data submitted:", data);
      
      // Show success message
      toast.success(language === "en" ? "Message sent successfully! We'll contact you soon." : "संदेश सफलतापूर्वक भेजा गया! हम जल्द ही आपसे संपर्क करेंगे।");
      
      // Reset form
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(language === "en" ? "Failed to send message. Please try again later." : "संदेश भेजने में विफल। कृपया बाद में पुनः प्रयास करें।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout language={language}>
      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
              {content.hero.title}
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              {content.hero.description}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                {content.form.title}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {content.form.firstName}
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...register("firstName")}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                        errors.firstName
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {content.form.lastName}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...register("lastName")}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                        errors.lastName
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {content.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {content.form.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                      errors.phone
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="product"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {content.form.product}
                  </label>
                  <select
                    id="product"
                    {...register("product")}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                      errors.product
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    }`}
                  >
                    <option value="">{content.form.productOptions.select}</option>
                    <option value="brush-cutters">{content.form.productOptions.brushCutters}</option>
                    <option value="chainsaws">{content.form.productOptions.chainsaws}</option>
                    <option value="hand-seeders">{content.form.productOptions.handSeeders}</option>
                    <option value="power-tillers">{content.form.productOptions.powerTillers}</option>
                    <option value="water-pumps">{content.form.productOptions.waterPumps}</option>
                    <option value="other">{content.form.productOptions.other}</option>
                  </select>
                  {errors.product && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.product.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {content.form.message}
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={4}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                      errors.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? content.form.sending : content.form.send}
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  {content.contactInfo.title}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {content.contactInfo.address.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {content.contactInfo.address.line1} <br />
                        {content.contactInfo.address.line2} <br />
                        {content.contactInfo.address.line3} <br />
                        {content.contactInfo.address.line4}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {content.contactInfo.phone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        <a
                          href="tel:+919876543210"
                          className="hover:text-primary"
                        >
                          +91 98765 43210
                        </a>
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        <a
                          href="tel:+911123456789"
                          className="hover:text-primary"
                        >
                          +91 11 2345 6789
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {content.contactInfo.email.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        <a
                          href="mailto:info@awe.com"
                          className="hover:text-primary"
                        >
                          info@awe.com
                        </a>
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        <a
                          href="mailto:support@awe.com"
                          className="hover:text-primary"
                        >
                          support@awe.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="space-y-4 rounded-xl bg-gray-50 p-6 dark:bg-gray-800/50">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {content.quickContact.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {content.quickContact.description}
                </p>
                <div className="flex flex-col space-y-3">
                  <Button
                    variant="default"
                    className="flex items-center justify-center gap-2"
                    onClick={() => window.location.href = "tel:+919876543210"}
                  >
                    <Phone className="h-5 w-5" />
                    <span>{content.quickContact.callButton}</span>
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex items-center justify-center gap-2"
                    onClick={() => window.open(`https://wa.me/919876543210?text=${encodeURIComponent(content.quickContact.whatsappMessage)}`, "_blank")}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>{content.quickContact.whatsappButton}</span>
                  </Button>
                </div>
              </div>

              {/* Business Hours */}
              <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  {content.businessHours.title}
                </h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      {content.businessHours.mondayToFriday}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {content.businessHours.mondayToFridayHours}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      {content.businessHours.saturday}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {content.businessHours.saturdayHours}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      {content.businessHours.sunday}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {content.businessHours.sundayClosed}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="aspect-w-16 aspect-h-9 h-[400px] w-full bg-gray-200 dark:bg-gray-700">
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  {content.map.placeholder}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 