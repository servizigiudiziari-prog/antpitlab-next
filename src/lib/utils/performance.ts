/**
 * Performance monitoring utilities
 * Web Vitals tracking e LCP optimization helpers
 */

/**
 * Web Vitals metric types
 */
export interface WebVitalsMetric {
  id: string
  name: 'CLS' | 'FCP' | 'FID' | 'LCP' | 'TTFB' | 'INP'
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  navigationType: 'navigate' | 'reload' | 'back-forward' | 'prerender'
}

/**
 * Web Vitals thresholds
 * Source: https://web.dev/vitals/
 */
export const VITALS_THRESHOLDS = {
  // Largest Contentful Paint (LCP)
  LCP: {
    good: 2500, // < 2.5s
    poor: 4000, // > 4s
  },
  // First Contentful Paint (FCP)
  FCP: {
    good: 1800, // < 1.8s
    poor: 3000, // > 3s
  },
  // Cumulative Layout Shift (CLS)
  CLS: {
    good: 0.1, // < 0.1
    poor: 0.25, // > 0.25
  },
  // First Input Delay (FID) / Interaction to Next Paint (INP)
  FID: {
    good: 100, // < 100ms
    poor: 300, // > 300ms
  },
  INP: {
    good: 200, // < 200ms
    poor: 500, // > 500ms
  },
  // Time to First Byte (TTFB)
  TTFB: {
    good: 800, // < 800ms
    poor: 1800, // > 1.8s
  },
} as const

/**
 * Calcola rating di una metrica
 */
export function getMetricRating(
  name: WebVitalsMetric['name'],
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = VITALS_THRESHOLDS[name]

  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value >= threshold.poor) return 'poor'
  return 'needs-improvement'
}

/**
 * Report Web Vitals a console (development)
 * In produzione puoi inviare a analytics service
 */
export function reportWebVitals(metric: WebVitalsMetric) {
  const { name, value, rating, id } = metric

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}:`, {
      value: `${Math.round(value)}ms`,
      rating,
      id,
    })
  }

  // In produzione, invia a analytics
  // Es: Google Analytics, Vercel Analytics, etc.
  if (process.env.NODE_ENV === 'production') {
    // Example: send to Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as any).gtag
      gtag('event', name, {
        event_category: 'Web Vitals',
        event_label: id,
        value: Math.round(value),
        non_interaction: true,
      })
    }

    // Example: send to custom analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   body: JSON.stringify({ metric }),
    //   headers: { 'Content-Type': 'application/json' },
    // })
  }
}

/**
 * Performance observer per LCP elements
 * Utile per debug: capire quale elemento è il LCP
 */
export function observeLCP(callback?: (entry: PerformanceEntry) => void) {
  if (typeof window === 'undefined') return

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]

      if (!lastEntry) return

      if (process.env.NODE_ENV === 'development') {
        console.log('[LCP Element]:', {
          element: (lastEntry as any).element,
          url: (lastEntry as any).url,
          size: (lastEntry as any).size,
          loadTime: Math.round(lastEntry.startTime),
        })
      }

      callback?.(lastEntry)
    })

    observer.observe({ type: 'largest-contentful-paint', buffered: true })

    return () => observer.disconnect()
  } catch (error) {
    console.warn('PerformanceObserver not supported:', error)
  }
}

/**
 * Performance observer per CLS
 * Identifica elementi che causano layout shift
 */
export function observeCLS(callback?: (entries: PerformanceEntry[]) => void) {
  if (typeof window === 'undefined') return

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()

      if (process.env.NODE_ENV === 'development') {
        entries.forEach((entry: any) => {
          if (entry.hadRecentInput) return // Ignora shift da input utente

          console.log('[CLS Shift]:', {
            value: entry.value,
            sources: entry.sources?.map((s: any) => s.node),
          })
        })
      }

      callback?.(entries)
    })

    observer.observe({ type: 'layout-shift', buffered: true })

    return () => observer.disconnect()
  } catch (error) {
    console.warn('PerformanceObserver not supported:', error)
  }
}

/**
 * Misura performance di caricamento immagini
 */
export function measureImagePerformance(imageUrl: string) {
  if (typeof window === 'undefined') return

  const startTime = performance.now()

  return {
    onLoad: () => {
      const loadTime = performance.now() - startTime
      console.log(`[Image Load] ${imageUrl}: ${Math.round(loadTime)}ms`)
      return loadTime
    },
    onError: () => {
      const failTime = performance.now() - startTime
      console.error(`[Image Error] ${imageUrl}: failed after ${Math.round(failTime)}ms`)
      return failTime
    },
  }
}

/**
 * Calcola image size in KB
 */
export function getImageSize(url: string): Promise<number> {
  return fetch(url, { method: 'HEAD' })
    .then((res) => {
      const contentLength = res.headers.get('content-length')
      return contentLength ? parseInt(contentLength, 10) / 1024 : 0
    })
    .catch(() => 0)
}

/**
 * Verifica se immagine è ottimizzata
 */
export async function checkImageOptimization(url: string): Promise<{
  size: number
  isOptimized: boolean
  format: string | null
  recommendations: string[]
}> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    const contentLength = response.headers.get('content-length')
    const contentType = response.headers.get('content-type')

    const size = contentLength ? parseInt(contentLength, 10) / 1024 : 0
    const format = contentType?.split('/')[1] || null

    const recommendations: string[] = []

    // Check size (thumbnail < 100KB, full < 500KB)
    const widthParam = url.split('w=')[1]
    const isThreshold = widthParam ? parseInt(widthParam) < 600 : false
    const maxSize = isThreshold ? 100 : 500

    if (size > maxSize) {
      recommendations.push(`Image too large: ${size.toFixed(1)}KB (target: <${maxSize}KB)`)
    }

    // Check format
    if (format && !['webp', 'avif'].includes(format)) {
      recommendations.push(`Use modern format (WebP/AVIF) instead of ${format}`)
    }

    return {
      size,
      isOptimized: recommendations.length === 0,
      format,
      recommendations,
    }
  } catch (error) {
    return {
      size: 0,
      isOptimized: false,
      format: null,
      recommendations: ['Failed to check image'],
    }
  }
}

/**
 * Performance budget checker
 */
export const PERFORMANCE_BUDGET = {
  // Core Web Vitals
  LCP: 2500, // ms
  FCP: 1800, // ms
  CLS: 0.1, // score
  INP: 200, // ms

  // Custom metrics
  thumbnailSize: 100, // KB
  fullImageSize: 500, // KB
  totalPageWeight: 2000, // KB
} as const

/**
 * Verifica se performance è dentro budget
 */
export function checkPerformanceBudget(metrics: {
  LCP?: number
  FCP?: number
  CLS?: number
  INP?: number
}): {
  passed: boolean
  failures: string[]
} {
  const failures: string[] = []

  Object.entries(metrics).forEach(([key, value]) => {
    const budget = PERFORMANCE_BUDGET[key as keyof typeof metrics]
    if (budget && value !== undefined && value > budget) {
      failures.push(`${key}: ${value} > ${budget} (budget exceeded)`)
    }
  })

  return {
    passed: failures.length === 0,
    failures,
  }
}
