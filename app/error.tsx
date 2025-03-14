'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-16 dark:bg-gray-950">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-6xl font-bold text-red-600 dark:text-red-500 md:text-8xl">Error</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200 md:text-3xl">
          Something went wrong
        </h2>
        <p className="mb-8 text-base text-gray-600 dark:text-gray-400 md:text-lg">
          An unexpected error has occurred.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-block rounded-md bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-primary/80 dark:hover:bg-primary"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-block rounded-md bg-gray-200 px-6 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 