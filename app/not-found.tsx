'use client';

import Link from 'next/link';
import { Suspense } from 'react';

// Suggested pages for navigation
const suggestedPages = [
  { href: '/products', title: 'Our Products' },
  { href: '/about', title: 'About Us' },
  { href: '/contact', title: 'Contact Us' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-lg w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-gray-900">404</h1>
            <div className="mt-2 text-sm text-gray-500 bg-gray-50 rounded-full px-3 py-1 inline-block">Page Not Found</div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Oops! Looks like you've ventured too far</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for has moved or doesn't exist. 
            But don't worry, you can find your way back home.
          </p>

          {/* Suggested Pages */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-500 mb-3">You might be interested in:</h3>
            <div className="space-y-2">
              {suggestedPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="block text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Primary Action */}
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            ← Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 