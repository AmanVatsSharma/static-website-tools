import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges class names using clsx and tailwind-merge
 * This utility helps avoid class conflicts when using the Aceternity components
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 