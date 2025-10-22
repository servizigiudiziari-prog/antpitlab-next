# Image Optimization - Quick Start

## TL;DR

Sistema completo di ottimizzazione immagini implementato per AntPit Lab Portfolio.

**Obiettivi raggiunti:**
- ✅ LCP < 2.5s
- ✅ Watermark automatico
- ✅ Responsive images (AVIF/WebP)
- ✅ Lazy loading intelligente
- ✅ Web Vitals monitoring

---

## Per Sviluppatori: 3 Step Quick Start

### 1. Usa ImageCard per Gallery

```typescript
import { ImageCard } from '@/components/gallery/ImageCard'
import { shouldHavePriority, IMAGE_SIZES } from '@/lib/utils/image'

// In gallery page
{images.map((img, index) => (
  <ImageCard
    key={img._id}
    src={img.image}                              // Sanity image asset
    alt={img.alt}
    title={img.title}
    priority={shouldHavePriority(index, 'grid')} // Auto priority prime 4
    sizes={IMAGE_SIZES.gallery4Col}              // Preset responsive
  />
))}
```

### 2. Usa getResponsiveImageProps per Hero

```typescript
import { getResponsiveImageProps, IMAGE_SIZES } from '@/lib/utils/image'

// In homepage
const heroProps = getResponsiveImageProps({
  src: heroImage,
  alt: "Hero image",
  sizes: IMAGE_SIZES.hero,
  priority: true,  // IMPORTANTE per LCP!
  quality: 90,
})

<Image {...heroProps} />
```

### 3. Verifica Performance

```bash
# Development
npm run dev
# Apri console browser → vedi Web Vitals logs

# Production build
npm run build
npm start

# Lighthouse audit
lighthouse http://localhost:3000 --view
```

---

## Documentazione Completa

1. **IMAGE_OPTIMIZATION_GUIDE.md** - Guida completa (12 sezioni)
   - Configurazione dettagliata
   - API reference completa
   - Performance monitoring
   - Troubleshooting

2. **USAGE_EXAMPLES.md** - 10 esempi pratici
   - Gallery grid
   - Hero images
   - Carousel
   - Lightbox
   - Testing

3. **IMAGE_OPTIMIZATION_SUMMARY.md** - Executive summary
   - File structure
   - Metriche performance
   - Changelog

---

## File Principali

```
src/lib/utils/image.ts          → Responsive helpers
src/lib/sanity/loader.ts        → Custom Next.js loader
src/lib/utils/performance.ts    → Web Vitals tracking
src/components/gallery/ImageCard.tsx → Component ottimizzato
```

---

## Presets Comuni

### Gallery 4 colonne
```typescript
sizes={IMAGE_SIZES.gallery4Col}
priority={shouldHavePriority(index, 'grid')}
quality={85}
```

### Hero full width
```typescript
sizes={IMAGE_SIZES.hero}
priority={true}
quality={90}
```

### Thumbnail piccolo
```typescript
sizes={IMAGE_SIZES.thumbnail}
quality={75}
aspectRatio="1:1"
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| Thumbnail | < 100KB |
| Full image | < 500KB |

---

## Support

**Domande?** Consulta `IMAGE_OPTIMIZATION_GUIDE.md`

**Problemi?** Vedi sezione Troubleshooting nella guida completa

**Esempi?** Vedi `USAGE_EXAMPLES.md`
