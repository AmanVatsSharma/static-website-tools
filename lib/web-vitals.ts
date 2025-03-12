import { CLSMetric, FIDMetric, LCPMetric, MetricRatingThresholds, onCLS, onFID, onINP, onLCP, onTTFB, ReportCallback, TTFBMetric } from 'web-vitals';

// Rating thresholds based on Google's Core Web Vitals thresholds
const ratingThresholds: MetricRatingThresholds = {
  LCP: [2500, 4000],   // Good: 0-2.5s, Needs Improvement: 2.5-4s, Poor: > 4s
  FID: [100, 300],     // Good: 0-100ms, Needs Improvement: 100-300ms, Poor: > 300ms
  CLS: [0.1, 0.25],    // Good: 0-0.1, Needs Improvement: 0.1-0.25, Poor: > 0.25
  TTFB: [800, 1800],   // Good: 0-800ms, Needs Improvement: 800-1800ms, Poor: > 1800ms
  INP: [200, 500]      // Good: 0-200ms, Needs Improvement: 200-500ms, Poor: > 500ms
};

// Interface for the metric data to be sent to analytics
export interface WebVitalMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType: string;
}

// Function to get metric rating based on thresholds
const getMetricRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = ratingThresholds[name as keyof typeof ratingThresholds];
  if (!threshold) return 'good'; // Default to good if unknown
  
  if (value <= threshold[0]) return 'good';
  if (value <= threshold[1]) return 'needs-improvement';
  return 'poor';
};

// Send metric data to Google Analytics 4
export const sendToGA4 = (metric: WebVitalMetric) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  try {
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
      metric_delta: metric.delta,
      non_interaction: true,
    });
  } catch (error) {
    console.error('Error sending web vitals to GA4:', error);
  }
};

// Send metric data to any custom analytics service
export const sendToCustomAnalytics = (metric: WebVitalMetric) => {
  // Replace with your custom analytics implementation
  try {
    const body = JSON.stringify(metric);
    
    // Example: Send to a custom endpoint
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/web-vitals', body);
    } else {
      fetch('/api/analytics/web-vitals', {
        body,
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Error sending web vitals to custom analytics:', error);
  }
};

// Main reporter function that formats and sends the metrics
const reportWebVitals: ReportCallback = (metric) => {
  const { name, id, value, delta, navigationType, entries } = metric;
  
  // Format the metric data for reporting
  const formattedMetric: WebVitalMetric = {
    id,
    name,
    value,
    delta,
    rating: getMetricRating(name, value),
    navigationType: navigationType || 'unknown',
  };
  
  // Log vitals to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Web Vital: ${name}`, formattedMetric);
  }
  
  // Send to analytics
  sendToGA4(formattedMetric);
  sendToCustomAnalytics(formattedMetric);
};

// Export function to initialize web vitals monitoring
export function reportWebVitalsOnLoad() {
  // Only run in browser
  if (typeof window === 'undefined') return;
  
  // Register metrics observers
  onLCP(reportWebVitals);
  onFID(reportWebVitals);
  onCLS(reportWebVitals);
  onTTFB(reportWebVitals);
  onINP(reportWebVitals);
}

// Extended window interface to include gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
} 