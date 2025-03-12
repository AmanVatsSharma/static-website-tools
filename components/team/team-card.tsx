import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";

export interface TeamCardProps {
  name: string;
  position: string;
  imageUrl: string;
  bio: string;
  className?: string;
}

export function TeamCard({
  name,
  position,
  imageUrl,
  bio,
  className,
}: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/60 motion-safe-container",
        className
      )}
      style={{ position: 'relative' }}
    >
      <div className="relative h-64 w-full overflow-hidden motion-safe-container" style={{ position: 'relative' }}>
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      <div className="p-6 motion-safe-container" style={{ position: 'relative' }}>
        <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
        <p className="mb-4 text-sm font-medium text-primary">{position}</p>
        
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: "auto" }}
          className="overflow-hidden motion-safe-container"
          style={{ position: 'relative' }}
        >
          <p className="text-gray-600 dark:text-gray-300">{bio}</p>
          
          <div className="mt-4 flex space-x-3 motion-safe-container">
            <a
              href="#"
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-primary hover:text-white dark:bg-gray-800 dark:text-gray-300"
              aria-label={`${name}'s LinkedIn profile`}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="#"
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-primary hover:text-white dark:bg-gray-800 dark:text-gray-300"
              aria-label={`${name}'s Twitter profile`}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="#"
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-primary hover:text-white dark:bg-gray-800 dark:text-gray-300"
              aria-label={`Email ${name}`}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 