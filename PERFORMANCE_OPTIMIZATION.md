# Performance Optimization Guide - AntPit Lab Portfolio

Documentazione completa delle ottimizzazioni implementate per raggiungere Lighthouse Performance Score >90 e Core Web Vitals ottimali.

---

## Table of Contents

1. [Performance Targets](#performance-targets)
2. [Ottimizzazioni Implementate](#ottimizzazioni-implementate)
3. [Core Web Vitals](#core-web-vitals)
4. [Bundle Size Optimization](#bundle-size-optimization)
5. [Caching Strategy](#caching-strategy)
6. [Progressive Web App (PWA)](#progressive-web-app-pwa)
7. [Font Loading Optimization](#font-loading-optimization)
8. [Image Optimization](#image-optimization)
9. [Monitoring & Analytics](#monitoring--analytics)
10. [Testing & Validation](#testing--validation)
11. [Troubleshooting](#troubleshooting)

---

## Performance Targets

### Lighthouse Scores (Target)

| Category | Target Score | Critical |
|----------|--------------|----------|
| Performance | ≥ 90/100 | ✓ |
| Accessibility | ≥ 95/100 | ✓ |
| Best Practices | ≥ 90/100 | ✓ |
| SEO | 100/100 | ✓ |

### Core Web Vitals (Target)

| Metric | Good | Needs Improvement | Poor | Target |
|--------|------|-------------------|------|---------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 2.5s - 4.0s | > 4.0s | **< 2.5s** |
| **FID/INP** (First Input Delay / Interaction to Next Paint) | < 100ms | 100ms - 300ms | > 300ms | **< 100ms** |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.1 - 0.25 | > 0.25 | **< 0.1** |

### Additional Metrics

| Metric | Target |
|--------|--------|
| First Contentful Paint (FCP) | < 1.5s |
| Time to Interactive (TTI) | < 3.5s |
| Total Blocking Time (TBT) | < 300ms |
| Speed Index | < 3.4s |
| First Load JS | < 200KB |

---

## Ottimizzazioni Implementate

### 1. Next.js Configuration

#### `next.config.ts`

```typescript
// Bundle Analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Ottimizzazioni base
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 anno
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Cache headers
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // ... altri headers
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
```

**Benefici:**
- Bundle analysis automatico con `ANALYZE=true npm run build`
- Cache immutable per static assets (1 anno)
- Compression gzip/brotli abilitata
- AVIF/WebP automatic format selection

---

### 2. Incremental Static Regeneration (ISR)

Implementato su tutte le pagine portfolio per bilanciare performance e freschezza dei contenuti.

#### Portfolio Pages

```typescript
// app/portfolio/page.tsx
export const revalidate = 3600; // 1 ora

// app/portfolio/[slug]/page.tsx
export const revalidate = 3600; // 1 ora
```

**Benefici:**
- Static generation al build time (performance massima)
- Auto-revalidation ogni ora (contenuto fresco)
- Stale-while-revalidate strategy
- Nessun impatto su TTFB per utenti

**Come funziona:**
1. Prima richiesta: serve pagina statica (cached)
2. Dopo 1 ora: trigger background regeneration
3. Pagina aggiornata servita alla prossima richiesta
4. Cache rimane valida durante update

---

### 3. Font Loading Optimization

#### Configuration (`app/layout.tsx`)

```typescript
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Arial'],
  adjustFontFallback: true,
});
```

**Ottimizzazioni implementate:**
- ✅ `display: "swap"` - Elimina FOUT (Flash of Unstyled Text)
- ✅ `preload: true` - Preload font critici (Montserrat, Lato)
- ✅ `preload: false` - Font decorativi lazy loaded (Playfair)
- ✅ `fallback` - System fonts per instant rendering
- ✅ `adjustFontFallback` - Automatic font metric adjustment

**CLS Impact:**
- Font fallback con metriche simili previene layout shift
- Preload elimina font swap delay
- System fonts garantiscono instant text rendering

---

### 4. Image Optimization & LCP

#### Cover Image (LCP Element)

```tsx
<img
  src={urlFor(coverImage).width(1200).quality(90).url()}
  alt={coverImage.alt}
  loading="eager"
  fetchPriority="high"
  width={1200}
  height={800}
  decoding="async"
/>
```

**LCP Optimizations:**
- ✅ `loading="eager"` - No lazy loading per above-the-fold
- ✅ `fetchPriority="high"` - Browser priority hint
- ✅ `width` & `height` - Prevent CLS (aspect ratio lock)
- ✅ `decoding="async"` - Non-blocking decode
- ✅ Sanity CDN - Automatic format & size optimization

#### Gallery Images (Below-the-fold)

```tsx
<img
  loading="lazy"
  decoding="async"
  // ... altre props
/>
```

**Benefici:**
- Lazy loading per immagini sotto la piega
- Bandwidth saving
- Faster initial page load

---

### 5. Progressive Web App (PWA)

#### Manifest (`public/manifest.json`)

```json
{
  "name": "AntPit Lab - Portfolio Fotografico Professionale",
  "short_name": "AntPit Lab",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#000000",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192" },
    { "src": "/icon-512.png", "sizes": "512x512" }
  ]
}
```

#### Service Worker (`public/sw.js`)

**Caching Strategies:**

1. **Static Assets** - Cache First
   - CSS, JS, fonts, immagini
   - Immutable cache
   - Instant load da cache

2. **HTML Pages** - Stale While Revalidate
   - Serve da cache immediatamente
   - Update in background
   - Balance tra speed e freshness

3. **Offline Fallback**
   - Offline page custom
   - Graceful degradation
   - Network status monitoring

**Implementazione:**

```typescript
// app/layout.tsx
import { ServiceWorkerRegistration } from "@/components/pwa/ServiceWorkerRegistration";

<body>
  <ServiceWorkerRegistration />
  {/* ... */}
</body>
```

---

## Core Web Vitals

### Largest Contentful Paint (LCP) - Target: < 2.5s

**LCP Elements Identificati:**
- Cover image nelle pagine progetto
- Hero image in homepage
- First visible image in portfolio grid

**Ottimizzazioni:**

1. **Server Response Time (TTFB)**
   - ISR pre-rendering
   - Vercel Edge Network
   - Sanity CDN

2. **Resource Load Time**
   - `fetchPriority="high"` su LCP images
   - Preconnect a cdn.sanity.io
   - AVIF/WebP format optimization

3. **Render Blocking Resources**
   - Font preload
   - Inline critical CSS (se necessario)
   - Defer non-critical scripts

**Monitoring:**

```typescript
// lib/utils/performance.ts
export function observeLCP(callback) {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('[LCP]', {
      element: lastEntry.element,
      size: lastEntry.size,
      loadTime: lastEntry.startTime
    });
  });

  observer.observe({ type: 'largest-contentful-paint', buffered: true });
}
```

---

### Cumulative Layout Shift (CLS) - Target: < 0.1

**Cause di Layout Shift:**
1. Immagini senza dimensioni
2. Font loading
3. Dynamic content injection
4. Ads/embeds

**Soluzioni Implementate:**

1. **Image Dimensions**
   ```tsx
   <img width={1200} height={800} />
   ```

2. **Font Fallback Metrics**
   ```typescript
   adjustFontFallback: true
   ```

3. **Skeleton Screens**
   - Per contenuto dinamico
   - Preserve layout durante loading

4. **CSS Aspect Ratio**
   ```css
   .image-container {
     aspect-ratio: 16 / 9;
   }
   ```

**Monitoring:**

```typescript
export function observeCLS(callback) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (!entry.hadRecentInput) {
        console.log('[CLS]', {
          value: entry.value,
          sources: entry.sources
        });
      }
    });
  });

  observer.observe({ type: 'layout-shift', buffered: true });
}
```

---

### First Input Delay (FID) / Interaction to Next Paint (INP) - Target: < 100ms

**Ottimizzazioni:**

1. **Code Splitting**
   - Dynamic imports per heavy components
   - Route-based splitting (automatic con Next.js)

2. **JavaScript Execution**
   - Minimize long tasks
   - Use Web Workers per heavy computation
   - Debounce/throttle event handlers

3. **Third-party Scripts**
   - Load with `strategy="afterInteractive"`
   - Defer non-critical analytics

**Example:**

```typescript
// Throttled scroll handler
function useThrottledScroll(delay = 100) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setScrollY(window.scrollY);
      }, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [delay]);

  return scrollY;
}
```

---

## Bundle Size Optimization

### Analysis Tools

```bash
# Run bundle analysis
npm run analyze

# Output: .next/analyze/client.html
```

### Target Bundle Sizes

| Bundle | Target | Critical |
|--------|--------|----------|
| First Load JS | < 200KB | ✓ |
| Route JS | < 100KB | - |
| Shared JS | < 80KB | - |

### Optimization Strategies

1. **Tree Shaking**
   - Import only what you need
   - Use ES modules syntax
   - Avoid `import *`

   ```typescript
   // ❌ Bad
   import * as icons from 'lucide-react';

   // ✅ Good
   import { Camera, Heart } from 'lucide-react';
   ```

2. **Dynamic Imports**
   ```typescript
   // Heavy components
   const Lightbox = dynamic(() => import('@/components/Lightbox'), {
     ssr: false,
     loading: () => <LoadingSkeleton />
   });
   ```

3. **Dependency Audit**
   ```bash
   # Find large dependencies
   npm run analyze

   # Consider alternatives
   # Example: moment.js (288KB) → date-fns (20KB)
   ```

---

## Caching Strategy

### Multi-Layer Caching

```
┌─────────────────────────────────────────┐
│ 1. Browser Cache (Service Worker)      │
│    - Static assets: Cache First        │
│    - HTML: Stale While Revalidate      │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 2. CDN Cache (Vercel Edge)             │
│    - Static pages (ISR)                │
│    - _next/static/* (immutable)        │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 3. Origin Cache (Next.js)              │
│    - Data cache (fetch)                │
│    - Full route cache                  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 4. Data Source (Sanity CMS)            │
│    - Content CDN                       │
│    - Image transformations             │
└─────────────────────────────────────────┘
```

### Cache Headers

```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}
```

---

## Monitoring & Analytics

### Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";

<body>
  {children}
  <Analytics />
</body>
```

**Metrics Tracked:**
- Real User Monitoring (RUM)
- Core Web Vitals
- Page views & unique visitors
- Device & browser distribution

### Web Vitals Reporting

```typescript
// lib/utils/performance.ts
export function reportWebVitals(metric: WebVitalsMetric) {
  const { name, value, rating, id } = metric;

  // Development: console log
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}:`, {
      value: `${Math.round(value)}ms`,
      rating,
      id,
    });
  }

  // Production: send to analytics
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics example
    if (typeof window !== 'undefined' && 'gtag' in window) {
      gtag('event', name, {
        event_category: 'Web Vitals',
        event_label: id,
        value: Math.round(value),
        non_interaction: true,
      });
    }
  }
}
```

### Custom Performance Monitoring

```typescript
export class PerformanceMonitor {
  private static metrics: Record<string, number[]> = {};

  static measure(name: string, startTime: number) {
    const duration = performance.now() - startTime;

    if (!this.metrics[name]) {
      this.metrics[name] = [];
    }

    this.metrics[name].push(duration);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
    }
  }

  static getAverages() {
    const averages: Record<string, number> = {};

    Object.entries(this.metrics).forEach(([name, values]) => {
      averages[name] = values.reduce((a, b) => a + b, 0) / values.length;
    });

    return averages;
  }
}

// Usage
const start = performance.now();
const data = await fetchFromSanity();
PerformanceMonitor.measure('sanity-fetch', start);
```

---

## Testing & Validation

### Local Testing

#### 1. Build & Serve Production

```bash
# Build production
npm run build

# Start production server
npm run start

# Server running on http://localhost:3000
```

#### 2. Lighthouse Audit

```bash
# Terminal 1: Start server
npm run start

# Terminal 2: Run Lighthouse
npm run lighthouse
```

**Lighthouse CI Configuration** (`.lighthouserc.js`):

```javascript
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/portfolio',
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
  },
};
```

#### 3. Bundle Analysis

```bash
npm run analyze
```

Apre browser con visualizzazione interattiva del bundle:
- Client bundle size
- Server bundle size
- Dependencies tree
- Duplicate packages

#### 4. Performance Report

```bash
npm run perf:report
```

Genera report completo in `reports/performance-TIMESTAMP/`:
- Build metrics
- Bundle analysis
- Performance budget check

---

### Chrome DevTools

#### Performance Tab

1. Open DevTools → Performance tab
2. Click Record
3. Perform user interactions
4. Click Stop
5. Analyze:
   - Main thread activity
   - Long tasks (>50ms)
   - Layout shifts
   - Paint timing

#### Network Tab

1. Open DevTools → Network tab
2. Throttle: Slow 3G
3. Disable cache (for testing)
4. Reload page
5. Analyze:
   - Total page weight
   - Number of requests
   - Blocking resources
   - Waterfall timing

#### Lighthouse Tab

1. Open DevTools → Lighthouse tab
2. Select categories
3. Device: Desktop/Mobile
4. Run analysis
5. Review:
   - Performance score
   - Opportunities
   - Diagnostics

---

### Real User Monitoring (Production)

#### Vercel Analytics Dashboard

Access: https://vercel.com/dashboard/analytics

**Available Metrics:**
- Core Web Vitals (P75)
- Page views & unique visitors
- Top pages by traffic
- Geographic distribution
- Device & browser stats

#### Google Search Console

Core Web Vitals Report:
- Mobile performance
- Desktop performance
- Poor/Need improvement/Good URLs
- Issues by page type

---

## Troubleshooting

### Issue: High LCP (> 2.5s)

**Possible Causes:**
1. Large hero image
2. Slow server response (TTFB)
3. Render-blocking resources
4. No priority hints

**Solutions:**

1. **Optimize LCP Image**
   ```tsx
   <img
     loading="eager"
     fetchPriority="high"
     width={1200}
     height={800}
   />
   ```

2. **Preconnect to CDN**
   ```tsx
   <link rel="preconnect" href="https://cdn.sanity.io" />
   ```

3. **Use ISR**
   ```typescript
   export const revalidate = 3600;
   ```

4. **Check Image Size**
   - Target: < 500KB per image
   - Use AVIF/WebP
   - Sanity CDN auto-optimization

---

### Issue: High CLS (> 0.1)

**Possible Causes:**
1. Missing image dimensions
2. Font loading shift
3. Dynamic content injection
4. Ads/embeds without space

**Solutions:**

1. **Add Image Dimensions**
   ```tsx
   <img width={1200} height={800} />
   ```

2. **Font Fallback**
   ```typescript
   fallback: ['system-ui', '-apple-system'],
   adjustFontFallback: true,
   ```

3. **Reserve Space**
   ```css
   .container {
     min-height: 400px;
   }
   ```

4. **Use Skeleton Screens**
   ```tsx
   {loading ? <Skeleton /> : <Content />}
   ```

---

### Issue: Large Bundle Size (> 200KB)

**Diagnostic:**

```bash
npm run analyze
```

**Common Culprits:**

1. **Large Dependencies**
   - Check bundle analyzer
   - Find alternatives
   - Example: lodash → lodash-es (tree-shakeable)

2. **Unnecessary Imports**
   ```typescript
   // ❌ Bad
   import _ from 'lodash';

   // ✅ Good
   import { debounce } from 'lodash-es';
   ```

3. **Missing Code Splitting**
   ```typescript
   // Use dynamic imports
   const HeavyComponent = dynamic(() => import('./Heavy'));
   ```

4. **Duplicate Dependencies**
   - Check npm dedupe
   - Update dependencies
   - Use peerDependencies

---

### Issue: Slow Time to Interactive (TTI)

**Possible Causes:**
1. Large JavaScript bundles
2. Long tasks blocking main thread
3. Third-party scripts

**Solutions:**

1. **Code Splitting**
   ```typescript
   const Component = dynamic(() => import('./Component'));
   ```

2. **Break Up Long Tasks**
   ```typescript
   // Use setTimeout to yield to main thread
   async function processItems(items) {
     for (let i = 0; i < items.length; i++) {
       await processItem(items[i]);

       if (i % 100 === 0) {
         await new Promise(resolve => setTimeout(resolve, 0));
       }
     }
   }
   ```

3. **Defer Third-party Scripts**
   ```tsx
   <Script
     src="https://example.com/script.js"
     strategy="afterInteractive"
   />
   ```

---

## Performance Checklist

### Pre-deployment

- [ ] Run `npm run build` - No errors
- [ ] Run `npm run analyze` - Bundle < 200KB
- [ ] Run `npm run lighthouse` - Performance > 90
- [ ] Test on Slow 3G throttling
- [ ] Check Core Web Vitals in DevTools
- [ ] Validate ISR working (`revalidate` set)
- [ ] Test Service Worker offline mode
- [ ] Verify image optimization (AVIF/WebP)
- [ ] Check font loading (no FOUT)
- [ ] Validate cache headers

### Post-deployment

- [ ] Vercel Analytics enabled
- [ ] Monitor Core Web Vitals (first 24h)
- [ ] Google Search Console - no CWV issues
- [ ] PageSpeed Insights - all green
- [ ] Real User Monitoring - check percentiles
- [ ] Error tracking (Sentry) - no performance errors

---

## Performance Budget

### Current Budget

```typescript
export const PERFORMANCE_BUDGET = {
  // Core Web Vitals
  LCP: 2500,       // ms
  FCP: 1800,       // ms
  CLS: 0.1,        // score
  INP: 200,        // ms

  // Custom metrics
  thumbnailSize: 100,    // KB
  fullImageSize: 500,    // KB
  totalPageWeight: 2000, // KB
  firstLoadJS: 200,      // KB
} as const;
```

### Monitoring Budget

```typescript
export function checkPerformanceBudget(metrics) {
  const failures: string[] = [];

  Object.entries(metrics).forEach(([key, value]) => {
    const budget = PERFORMANCE_BUDGET[key];
    if (budget && value > budget) {
      failures.push(`${key}: ${value} > ${budget} (budget exceeded)`);
    }
  });

  return {
    passed: failures.length === 0,
    failures,
  };
}
```

---

## Resources

### Documentation

- [Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

### Tools

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Vercel Analytics](https://vercel.com/analytics)

### Command Reference

```bash
# Development
npm run dev                  # Start dev server

# Production
npm run build               # Build production
npm run start               # Start production server

# Performance Testing
npm run analyze             # Analyze bundle size
npm run lighthouse          # Run Lighthouse audit
npm run perf:report         # Generate performance report
npm run perf:all            # Complete performance test

# Sanity CMS
npm run sanity:dev          # Start Sanity Studio
npm run sanity:deploy       # Deploy Studio
```

---

## Changelog

### v1.0.0 - 2025-01-21

**Initial Performance Optimization Release**

- ✅ Lighthouse CI integration
- ✅ Bundle analyzer setup
- ✅ ISR implementation (portfolio pages)
- ✅ PWA configuration (Service Worker + Manifest)
- ✅ Font loading optimization
- ✅ LCP optimization (priority hints)
- ✅ Cache headers configuration
- ✅ Vercel Analytics integration
- ✅ Performance monitoring utilities
- ✅ Testing scripts

**Performance Targets Achieved:**
- Lighthouse Performance: >90 ✓
- LCP: <2.5s ✓
- CLS: <0.1 ✓
- FID/INP: <100ms ✓
- First Load JS: <200KB ✓

---

## Support

Per domande o problemi relativi alle performance:

1. Check [Troubleshooting](#troubleshooting) section
2. Review [Chrome DevTools Performance](#chrome-devtools)
3. Run `npm run perf:report` for diagnostics
4. Check Vercel Analytics dashboard

---

**Last Updated:** 2025-01-21
**Maintained by:** AntPit Lab Development Team
