import { NextRequest, NextResponse } from 'next/server';
import { WebVitalMetric } from '@/lib/web-vitals';

// For static export, we need to mark this route as static
export const dynamic = 'force-static';

/**
 * API route for receiving Web Vitals metrics
 * 
 * This endpoint receives Core Web Vitals data from the client and can:
 * 1. Store metrics in a database for custom analysis
 * 2. Forward metrics to additional analytics services
 * 3. Generate custom performance reports
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const metric: WebVitalMetric = await request.json();
    
    // Validate the received metric
    if (!metric || !metric.name || typeof metric.value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid metric data' },
        { status: 400 }
      );
    }

    // Add timestamp to the metric
    const metricWithTimestamp = {
      ...metric,
      timestamp: new Date().toISOString(),
      path: request.nextUrl.pathname,
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // Log metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[API] Web Vitals:', metricWithTimestamp);
    }

    // In production, store metrics in a database
    // This is where you would implement database storage
    // Example: await db.insert('web_vitals', metricWithTimestamp);

    // Determine if the metric indicates poor performance
    let isPoorPerformance = false;
    switch (metric.name) {
      case 'LCP':
        isPoorPerformance = metric.value > 4000; // Poor LCP > 4s
        break;
      case 'FID':
        isPoorPerformance = metric.value > 300; // Poor FID > 300ms
        break;
      case 'CLS':
        isPoorPerformance = metric.value > 0.25; // Poor CLS > 0.25
        break;
      case 'INP':
        isPoorPerformance = metric.value > 500; // Poor INP > 500ms
        break;
    }

    // Example: Trigger alerts for poor performance
    if (isPoorPerformance && process.env.ENABLE_PERFORMANCE_ALERTS === 'true') {
      // Send alert to team (email, Slack, etc.)
      // await sendPerformanceAlert(metricWithTimestamp);
      console.log('[ALERT] Poor Web Vital detected:', metricWithTimestamp);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing Web Vitals:', error);
    return NextResponse.json(
      { error: 'Failed to process metrics' },
      { status: 500 }
    );
  }
}

/**
 * Allow the API to handle OPTIONS requests (for CORS)
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 