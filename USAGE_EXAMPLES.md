# Image Optimization - Usage Examples
## Quick Start Guide per Team

---

## Esempio 1: Gallery Grid (Portfolio)

```typescript
// app/portfolio/page.tsx
import { ImageCard } from '@/components/gallery/ImageCard'
import { IMAGE_SIZES, shouldHavePriority } from '@/lib/utils/image'
import { client } from '@/lib/sanity/client'

export default async function PortfolioPage() {
  // Fetch immagini da Sanity
  const images = await client.fetch(`
    *[_type == "galleryImage"] | order(publishedAt desc) {
      _id,
      title,
      alt,
      category,
      image {
        asset->{
          _id,
          url,
          metadata {
            lqip,
            dimensions
          }
        }
      }
    }
  `)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Portfolio</h1>

      {/* Gallery Grid 4 colonne */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <ImageCard
            key={img._id}
            src={img.image}
            alt={img.alt}
            title={img.title}
            category={img.category}
            aspectRatio="4:3"
            // Priority loading: prime 4 immagini per LCP
            priority={shouldHavePriority(index, 'grid')}
            // Sizes attribute per 4 colonne responsive
            sizes={IMAGE_SIZES.gallery4Col}
            quality={85}
            showWatermark={true}
            onClick={() => {/* apri lightbox */}}
          />
        ))}
      </div>
    </div>
  )
}
```

---

## Esempio 2: Hero Image (Homepage)

```typescript
// app/page.tsx
import Image from 'next/image'
import { getResponsiveImageProps, IMAGE_SIZES } from '@/lib/utils/image'
import { client } from '@/lib/sanity/client'

export default async function HomePage() {
  const heroData = await client.fetch(`
    *[_type == "homePage"][0] {
      heroImage {
        asset->{
          _id,
          url,
          metadata {
            lqip,
            dimensions
          }
        }
      },
      heroTitle,
      heroSubtitle
    }
  `)

  // Genera props ottimizzate per hero
  const heroImageProps = getResponsiveImageProps({
    src: heroData.heroImage,
    alt: heroData.heroTitle,
    sizes: IMAGE_SIZES.hero, // full width
    priority: true, // CRITICAL per LCP!
    aspectRatio: '16:9',
    quality: 90, // quality alta per hero
    maxWidth: 3840, // 4K support
  })

  return (
    <section className="relative h-screen">
      {/* Hero Image ottimizzata */}
      <Image
        {...heroImageProps}
        fill
        className="object-cover"
        priority // IMPORTANTE per LCP
      />

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <div className="text-center text-white">
          <h1 className="text-6xl font-heading">{heroData.heroTitle}</h1>
          <p className="text-xl mt-4">{heroData.heroSubtitle}</p>
        </div>
      </div>
    </section>
  )
}
```

---

## Esempio 3: Masonry Gallery

```typescript
// components/gallery/MasonryGrid.tsx
import { ImageCard } from './ImageCard'
import { IMAGE_SIZES, shouldHavePriority } from '@/lib/utils/image'

export function MasonryGrid({ images }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {images.map((img, index) => (
        <div key={img._id} className="break-inside-avoid">
          <ImageCard
            src={img.image}
            alt={img.alt}
            title={img.title}
            category={img.category}
            // Aspect ratio variabile per masonry
            aspectRatio={img.orientation === 'portrait' ? '3:2' : '4:3'}
            // Priority per prime 3 in masonry
            priority={shouldHavePriority(index, 'masonry')}
            // Sizes per 3 colonne
            sizes={IMAGE_SIZES.gallery3Col}
            quality={85}
          />
        </div>
      ))}
    </div>
  )
}
```

---

## Esempio 4: Carousel con Preload

```typescript
// components/gallery/Carousel.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getResponsiveImageProps, IMAGE_SIZES } from '@/lib/utils/image'

export function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Props per immagine corrente
  const currentImageProps = getResponsiveImageProps({
    src: images[currentIndex],
    alt: images[currentIndex].alt,
    sizes: IMAGE_SIZES.fullWidth,
    priority: true, // Immagine visibile
    quality: 90,
  })

  // Preload immagine successiva
  useEffect(() => {
    if (images[currentIndex + 1]) {
      const nextImageUrl = getResponsiveImageProps({
        src: images[currentIndex + 1],
        alt: '',
        quality: 90,
      }).src

      // Preload nel browser
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = nextImageUrl
      document.head.appendChild(link)
    }
  }, [currentIndex, images])

  return (
    <div className="relative">
      <Image
        {...currentImageProps}
        className="w-full h-auto"
      />

      {/* Navigation buttons */}
      <button onClick={() => setCurrentIndex(i => i - 1)}>Prev</button>
      <button onClick={() => setCurrentIndex(i => i + 1)}>Next</button>
    </div>
  )
}
```

---

## Esempio 5: Thumbnail Grid con Lightbox

```typescript
// components/gallery/ThumbnailGallery.tsx
'use client'

import { useState } from 'react'
import { ImageCard } from './ImageCard'
import { IMAGE_SIZES } from '@/lib/utils/image'
import { Lightbox } from './Lightbox'

export function ThumbnailGallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <ImageCard
            key={img._id}
            src={img.image}
            alt={img.alt}
            title={img.title}
            aspectRatio="1:1" // Quadrato per thumbnails
            priority={index < 8} // Prime 8 thumbnails
            sizes={IMAGE_SIZES.thumbnail}
            quality={75} // Quality più bassa per thumbnails
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {/* Lightbox per full size */}
      {selectedIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </>
  )
}
```

---

## Esempio 6: Custom Sizes per Layout Specifico

```typescript
// Custom layout 2 colonne desktop, 1 mobile
const customSizes = "(max-width: 768px) 100vw, 50vw"

<ImageCard
  src={image}
  alt="Image"
  title="Title"
  sizes={customSizes} // Custom sizes
  quality={85}
/>

// Sidebar thumbnail (sempre piccolo)
const sidebarSizes = "200px"

<ImageCard
  src={thumbnail}
  alt="Thumbnail"
  title="Preview"
  sizes={sidebarSizes}
  quality={70}
  aspectRatio="1:1"
/>
```

---

## Esempio 7: Performance Monitoring (Development)

```typescript
// app/portfolio/page.tsx
'use client'

import { useEffect } from 'react'
import { observeLCP, observeCLS } from '@/lib/utils/performance'

export default function PortfolioPage() {
  useEffect(() => {
    // Debug LCP in development
    if (process.env.NODE_ENV === 'development') {
      const cleanupLCP = observeLCP((entry) => {
        console.log('🎯 LCP Element:', {
          element: entry.element,
          loadTime: Math.round(entry.startTime),
          size: entry.size,
        })
      })

      const cleanupCLS = observeCLS((entries) => {
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            console.warn('⚠️ Layout Shift:', {
              value: entry.value,
              sources: entry.sources,
            })
          }
        })
      })

      return () => {
        cleanupLCP?.()
        cleanupCLS?.()
      }
    }
  }, [])

  return (
    // ... gallery
  )
}
```

---

## Esempio 8: Conditional Watermark

```typescript
// Watermark solo su immagini pubbliche, non su preview
<ImageCard
  src={image}
  alt="Portfolio image"
  title="Project Title"
  showWatermark={!isPreviewMode} // No watermark in preview
/>

// Watermark solo desktop
const isMobile = useMediaQuery('(max-width: 768px)')

<ImageCard
  src={image}
  alt="Portfolio image"
  title="Project Title"
  showWatermark={!isMobile} // No watermark su mobile
/>
```

---

## Esempio 9: Progressive Enhancement con AVIF

```typescript
// Next.js serve automaticamente AVIF se supportato
// Puoi verificare quale formato è servito in Network tab

// AVIF: Chrome 85+, Edge 121+, Firefox 93+, Safari 16.1+
// WebP: 95%+ browser support
// JPEG: fallback universale

// Configurazione automatica in next.config.ts:
formats: ["image/avif", "image/webp"]

// Browser request headers:
Accept: image/avif,image/webp,image/apng,image/*,*/*;q=0.8
```

---

## Esempio 10: Testing Image Optimization

```typescript
// Test utility per verificare ottimizzazione
import { checkImageOptimization } from '@/lib/utils/performance'

// In browser console o test
async function testImageOptimization() {
  const imageUrl = 'https://cdn.sanity.io/images/.../image.jpg?w=800&auto=format'

  const result = await checkImageOptimization(imageUrl)

  console.log({
    size: `${result.size.toFixed(1)} KB`,
    format: result.format,
    isOptimized: result.isOptimized,
    recommendations: result.recommendations,
  })

  // Output esempio:
  // {
  //   size: "85.3 KB",
  //   format: "webp",
  //   isOptimized: true,
  //   recommendations: []
  // }
}
```

---

## Common Patterns Cheat Sheet

### Pattern 1: Hero Image (LCP Critical)
```typescript
priority={true}
sizes={IMAGE_SIZES.hero}
quality={90}
aspectRatio="16:9"
```

### Pattern 2: Gallery Grid
```typescript
priority={shouldHavePriority(index, 'grid')}
sizes={IMAGE_SIZES.gallery4Col}
quality={85}
aspectRatio="4:3"
```

### Pattern 3: Thumbnail
```typescript
priority={false}
sizes={IMAGE_SIZES.thumbnail}
quality={75}
aspectRatio="1:1"
```

### Pattern 4: Full Width Section
```typescript
priority={false}
sizes={IMAGE_SIZES.fullWidth}
quality={85}
aspectRatio="21:9"
```

---

## Performance Checklist

Prima di deployare in production:

- [ ] Hero image ha `priority={true}`
- [ ] Solo 3-4 immagini hanno priority
- [ ] Tutte le immagini hanno `aspectRatio` specificato
- [ ] `sizes` attribute è corretto per il layout
- [ ] Thumbnails usano `quality={70-80}`
- [ ] Full images usano `quality={85-90}`
- [ ] Lighthouse Performance score > 90
- [ ] LCP < 2.5s su mobile 4G
- [ ] CLS < 0.1 (zero layout shift)
- [ ] Web Vitals monitoring attivo

---

## Troubleshooting Rapido

**Immagine non carica?**
→ Verifica `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`

**LCP troppo alto?**
→ Aggiungi `priority={true}` alla hero image

**CLS alto?**
→ Specifica sempre `aspectRatio`

**Immagini troppo grandi?**
→ Riduci `quality` o `maxWidth`

**Blur placeholder non funziona?**
→ Verifica `image.asset.metadata.lqip` in Sanity

---

## Risorse Team

- **Documentazione completa**: `IMAGE_OPTIMIZATION_GUIDE.md`
- **Utilities**: `src/lib/utils/image.ts`
- **Performance tools**: `src/lib/utils/performance.ts`
- **Componenti**: `src/components/gallery/ImageCard.tsx`

**Domande?** Consulta la guida completa o chiedi al team lead.
