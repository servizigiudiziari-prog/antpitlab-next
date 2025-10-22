# Image Optimization Implementation Guide
## AntPit Lab Portfolio - Next.js 15 + Sanity CMS

**Implementato:** 21 Ottobre 2025
**Obiettivo:** LCP < 2.5s, watermark automatico, responsive images ottimizzate

---

## Indice

1. [Panoramica Sistema](#panoramica-sistema)
2. [Configurazione Next.js](#configurazione-nextjs)
3. [Sanity Image Loader](#sanity-image-loader)
4. [Responsive Images Utilities](#responsive-images-utilities)
5. [ImageCard Component Ottimizzato](#imagecard-component-ottimizzato)
6. [Watermark Automatico](#watermark-automatico)
7. [Performance Monitoring](#performance-monitoring)
8. [Best Practices](#best-practices)
9. [Testing e Metriche](#testing-e-metriche)
10. [Troubleshooting](#troubleshooting)

---

## Panoramica Sistema

### Architettura Image Pipeline

```
Sanity CMS Upload
    ↓
Sanity CDN Processing (auto-format, resize, quality)
    ↓
Custom Image Loader (Next.js)
    ↓
Next/Image Component (srcset, blur placeholder, lazy loading)
    ↓
Browser (AVIF/WebP/JPEG fallback)
```

### Features Implementate

- ✅ **Auto-format**: AVIF > WebP > JPEG fallback
- ✅ **Responsive images**: srcset automatico con 8 breakpoints
- ✅ **Blur placeholders**: LQIP da Sanity metadata
- ✅ **Lazy loading**: strategico con priority per LCP
- ✅ **Watermark**: CSS overlay automatico
- ✅ **Performance monitoring**: Web Vitals tracking
- ✅ **Cache optimization**: CDN + browser caching

---

## Configurazione Next.js

### File: `next.config.ts`

```typescript
images: {
  // AVIF first (best compression), WebP fallback
  formats: ["image/avif", "image/webp"],

  // Sanity CDN remote patterns
  remotePatterns: [
    {
      protocol: "https",
      hostname: "cdn.sanity.io",
      pathname: "/images/**",
    },
  ],

  // Responsive breakpoints
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

  // Cache 60s minimum (CDN manages longer cache)
  minimumCacheTTL: 60,
}
```

**Perché questi breakpoints?**
- 640: Mobile portrait
- 750: Mobile landscape / small tablet
- 828: Tablet portrait
- 1080: Tablet landscape / small desktop
- 1200: Desktop standard
- 1920: Desktop Full HD
- 2048: Retina displays
- 3840: 4K displays

---

## Sanity Image Loader

### File: `src/lib/sanity/loader.ts`

Loader personalizzato per ottimizzare immagini da Sanity CDN.

**Funzionalità:**
```typescript
sanityLoader({ src, width, quality })
// → https://cdn.sanity.io/images/.../image.jpg?w=1200&q=85&auto=format&fit=max
```

**Parametri chiave:**
- `auto=format`: AVIF/WebP automatico
- `fit=max`: Mantieni aspect ratio
- `q=85`: Quality ottimale (bilanciamento qualità/dimensione)

**Utilizzo:**
```typescript
import { sanityLoader } from '@/lib/sanity/loader'

<Image
  src={sanityImage}
  loader={sanityLoader}
  ...
/>
```

---

## Responsive Images Utilities

### File: `src/lib/utils/image.ts`

Helper functions per gestire immagini responsive.

### getResponsiveImageProps

Genera automaticamente props ottimizzate per Next/Image:

```typescript
const imageProps = getResponsiveImageProps({
  src: sanityImage,
  alt: "Descrizione immagine",
  sizes: IMAGE_SIZES.gallery4Col,
  priority: false, // true solo per LCP
  aspectRatio: '4:3',
  quality: 85,
  maxWidth: 1920
})

<Image {...imageProps} />
```

**Ritorna:**
- `src`: URL ottimizzato
- `width` / `height`: Dimensioni corrette (no CLS)
- `blurDataURL`: Placeholder LQIP
- `sizes`: Attribute per responsive loading
- `loader`: Custom Sanity loader

### IMAGE_SIZES presets

```typescript
IMAGE_SIZES.gallery4Col
// → "(max-width: 640px) 100vw, (max-width: 768px) 50vw,
//     (max-width: 1024px) 33vw, 25vw"

IMAGE_SIZES.hero
// → "100vw"

IMAGE_SIZES.thumbnail
// → "(max-width: 768px) 100px, 150px"
```

### shouldHavePriority helper

Determina automaticamente se un'immagine dovrebbe avere priority:

```typescript
{images.map((img, index) => (
  <ImageCard
    key={img.id}
    src={img}
    priority={shouldHavePriority(index, 'grid')}
  />
))}
```

**Regole:**
- Grid layout: prime 4 immagini
- Masonry layout: prime 3 immagini
- Carousel: solo la prima

---

## ImageCard Component Ottimizzato

### File: `src/components/gallery/ImageCard.tsx`

Componente gallery card con tutte le ottimizzazioni applicate.

**Esempio d'uso:**

```typescript
<ImageCard
  src={sanityImageAsset}
  alt="Descrizione accessibile"
  title="Titolo immagine"
  category="Matrimoni"
  aspectRatio="4:3"
  priority={false}
  quality={85}
  showWatermark={true}
  onClick={() => console.log('clicked')}
/>
```

**Props disponibili:**

| Prop | Type | Default | Descrizione |
|------|------|---------|-------------|
| `src` | `SanityImageSource \| string` | required | Immagine Sanity o URL |
| `alt` | `string` | required | Testo alternativo |
| `title` | `string` | required | Titolo mostrato on hover |
| `category` | `string` | optional | Badge categoria |
| `aspectRatio` | `'1:1' \| '4:3' \| '16:9' \| '21:9' \| '3:2'` | `'4:3'` | Aspect ratio |
| `priority` | `boolean` | `false` | Priority loading (LCP) |
| `sizes` | `string` | `gallery4Col` | Sizes attribute |
| `quality` | `number` | `85` | Qualità immagine |
| `showWatermark` | `boolean` | `true` | Mostra watermark |

**Features:**
- ✅ Lazy loading con priority strategico
- ✅ Blur placeholder automatico
- ✅ Fade-in animation smooth
- ✅ Hover effects (black overlay, border offset, zoom)
- ✅ Watermark CSS overlay
- ✅ Zero CLS (aspect ratio fisso)

---

## Watermark Automatico

### Implementazione CSS Overlay

Il watermark è applicato via CSS per massima flessibilità:

```tsx
{showWatermark && (
  <div
    className="absolute bottom-4 right-4 z-20 opacity-60
                pointer-events-none select-none"
    aria-hidden="true"
  >
    <span className="text-text-primary text-xs font-body
                     tracking-wider drop-shadow-md">
      © AntPit Lab
    </span>
  </div>
)}
```

**Vantaggi CSS vs Server-side:**
- ✅ Zero processing server
- ✅ Zero extra KB download
- ✅ Personalizzabile via CSS/Tailwind
- ✅ Responsive (nascondibile su mobile)
- ✅ Visibile su light/dark theme (drop-shadow)

**Customizzazioni possibili:**

```css
/* Watermark più grande */
.watermark { font-size: 1rem; }

/* Watermark semitrasparente */
.watermark { opacity: 0.3; }

/* Watermark solo su hover */
.watermark { opacity: 0; }
.group:hover .watermark { opacity: 0.6; }

/* Nascondi su mobile */
@media (max-width: 640px) {
  .watermark { display: none; }
}
```

### Alternative Server-side (opzionali)

Se necessario watermark permanente:

**Opzione A: Sanity Image Pipeline**
```typescript
urlFor(image)
  .width(1200)
  .mark('watermark-asset-id') // Upload watermark su Sanity
  .markAlign('bottom,right')
  .markAlpha(40)
  .url()
```

**Opzione B: Next.js API Route + Sharp**
```typescript
// app/api/watermark/route.ts
import sharp from 'sharp'

export async function GET(request: Request) {
  const imageBuffer = await fetchImage(url)
  const watermarked = await sharp(imageBuffer)
    .composite([{
      input: watermarkBuffer,
      gravity: 'southeast'
    }])
    .toBuffer()

  return new Response(watermarked)
}
```

---

## Performance Monitoring

### File: `src/lib/utils/performance.ts`

Utilities per monitorare Web Vitals e performance immagini.

### Web Vitals Tracking

**Auto-export in layout.tsx:**
```typescript
export { reportWebVitals } from "@/lib/utils/performance"
```

Next.js chiamerà automaticamente `reportWebVitals()` con metriche:
- **LCP** (Largest Contentful Paint): target < 2.5s
- **FCP** (First Contentful Paint): target < 1.8s
- **CLS** (Cumulative Layout Shift): target < 0.1
- **INP** (Interaction to Next Paint): target < 200ms
- **TTFB** (Time to First Byte): target < 800ms

**Development mode:**
```
[Web Vitals] LCP: { value: 1234ms, rating: 'good', id: '...' }
[Web Vitals] CLS: { value: 0.05, rating: 'good', id: '...' }
```

**Production mode:**
Invia automaticamente a Google Analytics (se configurato):
```javascript
gtag('event', 'LCP', {
  event_category: 'Web Vitals',
  value: 1234,
  non_interaction: true
})
```

### Debug LCP Element

Identifica quale elemento è il LCP:

```typescript
import { observeLCP } from '@/lib/utils/performance'

useEffect(() => {
  const cleanup = observeLCP((entry) => {
    console.log('LCP Element:', entry.element)
    console.log('LCP URL:', entry.url)
  })

  return cleanup
}, [])
```

### Debug Layout Shifts

Identifica elementi che causano CLS:

```typescript
import { observeCLS } from '@/lib/utils/performance'

useEffect(() => {
  const cleanup = observeCLS((entries) => {
    entries.forEach(entry => {
      console.log('CLS Shift:', entry.value, entry.sources)
    })
  })

  return cleanup
}, [])
```

### Check Image Optimization

Verifica se immagine è ottimizzata:

```typescript
import { checkImageOptimization } from '@/lib/utils/performance'

const result = await checkImageOptimization(imageUrl)

console.log({
  size: result.size, // KB
  format: result.format, // 'webp', 'avif', etc
  isOptimized: result.isOptimized, // true/false
  recommendations: result.recommendations // ['Use WebP', ...]
})
```

---

## Best Practices

### 1. Priority Loading Strategy

**DO:**
```typescript
// Hero image (LCP)
<ImageCard src={heroImage} priority={true} />

// Primi 4 in gallery grid
{images.slice(0, 4).map(img => (
  <ImageCard src={img} priority={true} />
))}

// Resto gallery
{images.slice(4).map(img => (
  <ImageCard src={img} priority={false} /> // lazy load
))}
```

**DON'T:**
```typescript
// Non mettere priority su tutte le immagini!
{images.map(img => (
  <ImageCard src={img} priority={true} /> // ❌ WRONG
))}
```

### 2. Sizes Attribute Corretto

**DO:**
```typescript
// Gallery 4 colonne
<ImageCard sizes={IMAGE_SIZES.gallery4Col} />

// Full width hero
<ImageCard sizes={IMAGE_SIZES.hero} />

// Custom per layout specifico
<ImageCard sizes="(max-width: 768px) 100vw, 50vw" />
```

**DON'T:**
```typescript
// Non usare sempre 100vw!
<ImageCard sizes="100vw" /> // ❌ Browser scarica immagine troppo grande
```

### 3. Aspect Ratio Fisso (no CLS)

**DO:**
```typescript
// Specifica sempre aspect ratio
<ImageCard aspectRatio="4:3" />
<ImageCard aspectRatio="16:9" />
```

**DON'T:**
```typescript
// Non omettere aspect ratio per immagini di dimensioni variabili
<Image src={img} fill /> // ❌ Può causare CLS
```

### 4. Quality Setting

**DO:**
```typescript
// Thumbnail: quality più bassa
<ImageCard quality={75} /> // 75-80 per thumbnail

// Full size: quality media
<ImageCard quality={85} /> // 85 default (bilanciato)

// Hero/Gallery principale: quality alta
<ImageCard quality={90} /> // 90-95 per immagini hero
```

### 5. Preconnect a Sanity CDN

Già configurato in `layout.tsx`:
```html
<link rel="preconnect" href="https://cdn.sanity.io" />
<link rel="dns-prefetch" href="https://cdn.sanity.io" />
```

---

## Testing e Metriche

### Target Performance Metrics

| Metrica | Target | Critical | Tool |
|---------|--------|----------|------|
| **LCP** | < 2.5s | < 4s | Lighthouse, DevTools |
| **FCP** | < 1.8s | < 3s | Lighthouse |
| **CLS** | < 0.1 | < 0.25 | Lighthouse |
| **INP** | < 200ms | < 500ms | Chrome DevTools |
| **Thumbnail Size** | < 100KB | < 150KB | Network tab |
| **Full Image Size** | < 500KB | < 800KB | Network tab |

### Testing Checklist

#### 1. Lighthouse Audit

```bash
# Run Lighthouse in Chrome DevTools
# Or via CLI:
npm install -g lighthouse
lighthouse https://localhost:3000 --view
```

**Target scores:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

#### 2. Network Analysis

**Chrome DevTools → Network tab:**

✅ Verifica formato immagini:
- Desktop moderni: AVIF o WebP
- Safari: WebP
- Legacy: JPEG fallback

✅ Verifica dimensioni:
- Thumbnails: < 100KB
- Full images: < 500KB
- Hero images: < 800KB

✅ Verifica lazy loading:
- Solo prime 4 immagini caricate all'inizio
- Resto caricato on-scroll

#### 3. Performance Tab

**Chrome DevTools → Performance:**

1. Record page load
2. Identifica LCP element
3. Verifica no layout shifts
4. Check image decode time

**Target:**
- LCP < 2.5s
- No red blocks (layout shifts)
- Image decode < 50ms each

#### 4. Mobile Testing

**Chrome DevTools → Device mode:**

Test su:
- Mobile (375x667) - iPhone SE
- Tablet (768x1024) - iPad
- Desktop (1920x1080) - Full HD

**Throttling:**
- Fast 3G: LCP < 4s acceptable
- 4G: LCP < 2.5s target
- WiFi: LCP < 1.5s ideal

### Real User Monitoring (Production)

**Google Analytics integration:**

```javascript
// In reportWebVitals (già configurato)
gtag('event', metric.name, {
  event_category: 'Web Vitals',
  event_label: metric.id,
  value: Math.round(metric.value),
  non_interaction: true
})
```

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## Troubleshooting

### Problema: LCP > 2.5s

**Cause possibili:**

1. **Immagine hero non ha priority**
   ```typescript
   // FIX: aggiungi priority
   <ImageCard src={hero} priority={true} />
   ```

2. **Troppe immagini con priority**
   ```typescript
   // FIX: solo prime 4
   priority={index < 4}
   ```

3. **Immagine troppo grande**
   ```typescript
   // FIX: riduci maxWidth
   getResponsiveImageProps({ maxWidth: 1200 })
   ```

4. **Sizes attribute errato**
   ```typescript
   // FIX: specifica sizes corretto
   sizes="(max-width: 768px) 100vw, 50vw"
   ```

### Problema: CLS > 0.1

**Cause possibili:**

1. **Aspect ratio non specificato**
   ```typescript
   // FIX: specifica aspect ratio
   <ImageCard aspectRatio="4:3" />
   ```

2. **Width/height dinamici**
   ```typescript
   // FIX: usa getResponsiveImageProps che calcola dimensioni fisse
   const imageProps = getResponsiveImageProps({ ... })
   ```

3. **Font loading causa shift**
   ```typescript
   // FIX: font-display swap già configurato
   display: "swap"
   ```

### Problema: Immagini non si caricano

**Debug:**

1. **Verifica Sanity config**
   ```bash
   echo $NEXT_PUBLIC_SANITY_PROJECT_ID
   echo $NEXT_PUBLIC_SANITY_DATASET
   ```

2. **Verifica remote patterns**
   ```typescript
   // next.config.ts
   hostname: "cdn.sanity.io", // ✅
   ```

3. **Verifica image URL**
   ```typescript
   console.log(urlFor(image).url())
   // Deve ritornare: https://cdn.sanity.io/images/...
   ```

4. **Check browser console**
   ```
   Error: Invalid src prop
   → Fix: verifica formato src

   Error: Failed to fetch
   → Fix: verifica CORS / remote patterns
   ```

### Problema: Blur placeholder non funziona

**Debug:**

1. **Verifica metadata Sanity**
   ```typescript
   console.log(image.asset.metadata.lqip)
   // Deve esistere
   ```

2. **Fallback manuale**
   ```typescript
   blurDataURL: blurDataUrl(src) // usa helper function
   ```

3. **Disabilita temporaneamente**
   ```typescript
   placeholder={undefined} // per debug
   ```

### Problema: Watermark non visibile

**Debug:**

1. **Verifica z-index**
   ```css
   z-20 /* deve essere > overlay z-10 */
   ```

2. **Verifica colore**
   ```css
   /* Aggiungi sempre drop-shadow */
   drop-shadow-md
   ```

3. **Test su background scuri**
   ```typescript
   className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
   ```

### Problema: Formato AVIF non servito

**Verifica:**

1. **Browser support**
   - Chrome 85+: ✅
   - Safari 16+: ✅
   - Firefox 93+: ✅
   - Edge 121+: ✅

2. **Next.js config**
   ```typescript
   formats: ["image/avif", "image/webp"] // ✅
   ```

3. **Auto-format Sanity**
   ```typescript
   .auto('format') // ✅ nel loader
   ```

---

## File Structure Completa

```
src/
├── app/
│   ├── layout.tsx                    # ✅ Web Vitals export
│   └── page.tsx                      # Homepage con hero LCP
│
├── components/
│   └── gallery/
│       ├── ImageCard.tsx             # ✅ Componente ottimizzato
│       ├── MasonryGrid.tsx           # Gallery grid
│       └── Lightbox.tsx              # Lightbox modal
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts                 # Sanity client config
│   │   ├── imageBuilder.ts           # ✅ URL builders
│   │   └── loader.ts                 # ✅ Custom Next.js loader
│   │
│   └── utils/
│       ├── cn.ts                     # Tailwind class merge
│       ├── image.ts                  # ✅ Responsive helpers
│       └── performance.ts            # ✅ Web Vitals monitoring
│
└── next.config.ts                    # ✅ Images config

docs/
└── IMAGE_OPTIMIZATION_GUIDE.md       # ✅ This file
```

---

## Quick Reference Commands

```bash
# Development con Web Vitals logging
npm run dev

# Build production
npm run build

# Analyze bundle size
npm run build -- --analyze

# Lighthouse audit
lighthouse http://localhost:3000 --view

# Type check
npm run type-check

# Format code
npm run format
```

---

## Changelog

### v1.0.0 - 2025-10-21

**Implementato:**
- ✅ Next.js Image configuration ottimizzata
- ✅ Custom Sanity image loader
- ✅ Responsive images utilities
- ✅ ImageCard component con tutte le ottimizzazioni
- ✅ Watermark CSS overlay automatico
- ✅ Web Vitals monitoring setup
- ✅ Performance utilities complete
- ✅ Documentazione completa

**Performance targets:**
- LCP: < 2.5s ✅
- CLS: < 0.1 ✅
- Thumbnail size: < 100KB ✅
- Auto-format: AVIF/WebP ✅

---

## Risorse Utili

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Sanity Image URL API](https://www.sanity.io/docs/image-url)
- [Web Vitals](https://web.dev/vitals/)
- [Core Web Vitals](https://web.dev/articles/vitals)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse)
- [WebP/AVIF Browser Support](https://caniuse.com/?search=avif)

---

**Domande?** Consulta il troubleshooting o apri una issue.

**Prossimi step:**
- [ ] Setup analytics in production
- [ ] A/B test watermark opacity
- [ ] Implementare image preloading per carousel
- [ ] PWA caching strategy per offline
