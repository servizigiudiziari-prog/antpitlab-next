# Sistema di Animazioni - AntPit Lab Portfolio

Documentazione completa del sistema di animazioni implementato per il portfolio fotografico, ispirato allo stile elegante e discreto di daniferrerfoto.com.

## Indice

1. [Panoramica](#panoramica)
2. [Componenti Animati](#componenti-animati)
3. [Utility e Helpers](#utility-e-helpers)
4. [Timing e Easing](#timing-e-easing)
5. [Performance](#performance)
6. [Accessibilità](#accessibilità)
7. [Esempi di Utilizzo](#esempi-di-utilizzo)

---

## Panoramica

Il sistema di animazioni è costruito su **Framer Motion** e segue questi principi:

- **Eleganza**: Animazioni discrete e raffinate, mai invasive
- **Performance**: 60fps garantiti, GPU-accelerated
- **Accessibilità**: Pieno supporto per `prefers-reduced-motion`
- **Consistenza**: Timing e easing uniformi in tutta l'applicazione

### Filosofia di Design

Ispirato a daniferrerfoto.com:
- Transizioni smooth ma rapide (200-400ms)
- Movimenti naturali e fluidi
- Focus sull'esperienza utente, non sugli effetti speciali
- "Less is more" - ogni animazione ha uno scopo

---

## Componenti Animati

### 1. PageTransition

Gestisce le transizioni tra pagine con fade + slide verticale.

**File**: `/src/components/animations/PageTransition.tsx`

**Utilizzo**:
```tsx
import { PageTransition } from '@/components/animations/PageTransition';

// In layout.tsx
<PageTransition>
  {children}
</PageTransition>
```

**Animazione**:
- Initial: `opacity: 0, y: 20`
- Animate: `opacity: 1, y: 0`
- Exit: `opacity: 0, y: -20`
- Duration: 600ms

---

### 2. ScrollReveal

Rivela elementi quando entrano nel viewport.

**File**: `/src/components/animations/ScrollReveal.tsx`

**Props**:
- `direction`: `'up' | 'down' | 'left' | 'right' | 'none'`
- `delay`: numero (secondi)
- `duration`: numero (secondi, default 0.35)
- `once`: boolean (default true)
- `margin`: string (default '-100px')

**Utilizzo**:
```tsx
import { ScrollReveal } from '@/components/animations/ScrollReveal';

<ScrollReveal direction="up" delay={0.2}>
  <h2>Titolo che appare scrollando</h2>
</ScrollReveal>

// Con stagger su lista
{items.map((item, i) => (
  <ScrollReveal key={item.id} delay={i * 0.1}>
    <Card {...item} />
  </ScrollReveal>
))}
```

---

### 3. AnimatedButton

Button con hover/tap animations.

**File**: `/src/components/animations/AnimatedButton.tsx`

**Props**:
- `variant`: `'primary' | 'secondary' | 'ghost'`
- `size`: `'sm' | 'md' | 'lg'`
- `animationStyle`: `'lift' | 'scale' | 'glow'`

**Utilizzo**:
```tsx
import { AnimatedButton } from '@/components/animations/AnimatedButton';

<AnimatedButton
  variant="primary"
  size="lg"
  animationStyle="scale"
  onClick={handleClick}
>
  Esplora Portfolio
</AnimatedButton>
```

**Animazioni**:
- Hover: scale 1.02 o lift -5px o glow shadow
- Tap: scale 0.98
- Transizioni colore smooth

---

### 4. LoadingSpinner

Spinner animato per stati di caricamento.

**File**: `/src/components/animations/LoadingSpinner.tsx`

**Props**:
- `size`: `'sm' | 'md' | 'lg'`
- `color`: `'primary' | 'accent' | 'white'`

**Utilizzo**:
```tsx
import { LoadingSpinner } from '@/components/animations/LoadingSpinner';

{isLoading && <LoadingSpinner size="md" color="primary" />}
```

---

### 5. ScrollIndicator

Indicatore di scroll animato (per hero sections).

**File**: `/src/components/animations/ScrollIndicator.tsx`

**Props**:
- `onClick`: () => void
- `label`: string (default 'Scroll')

**Utilizzo**:
```tsx
import { ScrollIndicator } from '@/components/animations/ScrollIndicator';

<ScrollIndicator
  label="Scorri"
  onClick={() => scrollTo({ top: window.innerHeight })}
/>
```

**Animazione**:
- Fade-in con delay 1s
- Bounce infinito (y: 0 → 10 → 0)

---

### 6. MasonryGrid (Enhanced)

Griglia con stagger animation.

**File**: `/src/components/gallery/MasonryGrid.tsx`

**Utilizzo**:
```tsx
import { MasonryGrid } from '@/components/gallery/MasonryGrid';

<MasonryGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={5}>
  {images.map(img => (
    <ImageCard key={img.id} {...img} />
  ))}
</MasonryGrid>
```

**Animazione**:
- Container: fade-in
- Items: stagger 100ms, fade-in + slide-up
- Exit: reverse stagger

---

### 7. ImageCard (Enhanced)

Card con hover effects sofisticati.

**File**: `/src/components/gallery/ImageCard.tsx`

**Animazioni**:
- Hover: scale 1.02 sulla card
- Hover: scale 1.1 sull'immagine
- Hover: overlay nero fade-in (opacity 0.7)
- Hover: border offset -7px (effetto daniferrerfoto)
- Titolo: slide-up dal basso
- Tap: scale 0.98

**Utilizzo**:
```tsx
import { ImageCard } from '@/components/gallery/ImageCard';

<ImageCard
  src={image.url}
  alt={image.alt}
  title={image.title}
  category="Ritratti"
  aspectRatio="4:3"
  priority={index < 4}
/>
```

---

### 8. Lightbox (Enhanced)

Lightbox fullscreen con transizioni fluide.

**File**: `/src/components/gallery/Lightbox.tsx`

**Animazioni**:
- Backdrop: fade-in 350ms
- Immagine: scale-in + fade 350ms
- Navigation arrows: hover scale 1.2 + translate
- Close button: hover rotate 90° + scale 1.1
- Info: fade-in con delay 200ms
- Cambio immagine: crossfade

**Utilizzo**:
```tsx
import { Lightbox } from '@/components/gallery/Lightbox';

<Lightbox
  images={images}
  currentIndex={activeIndex}
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onIndexChange={setActiveIndex}
/>
```

---

## Utility e Helpers

### Motion Utilities

**File**: `/src/lib/utils/motion.ts`

#### Timing Constants

```typescript
import { timings } from '@/lib/utils/motion';

timings.veryFast  // 0.15s - instant feedback
timings.fast      // 0.2s  - micro-interactions
timings.medium    // 0.35s - standard transitions
timings.slow      // 0.6s  - page transitions
timings.verySlow  // 0.8s  - dramatic reveals
```

#### Easing Functions

```typescript
import { easings } from '@/lib/utils/motion';

easings.easeOut   // [0.25, 0.1, 0.25, 1] - entrances
easings.easeIn    // [0.42, 0, 1, 1] - exits
easings.easeInOut // [0.42, 0, 0.58, 1] - bidirectional
easings.smooth    // [0.25, 0.46, 0.45, 0.94] - natural feel
easings.elastic   // [0.68, -0.55, 0.265, 1.55] - playful
```

#### Stagger Delays

```typescript
import { stagger } from '@/lib/utils/motion';

stagger.fast    // 0.05s
stagger.medium  // 0.1s
stagger.slow    // 0.15s
```

#### Predefined Variants

```typescript
import { variants } from '@/lib/utils/motion';

variants.fadeInUp     // Fade + slide from bottom
variants.fadeInDown   // Fade + slide from top
variants.fadeInLeft   // Fade + slide from left
variants.fadeInRight  // Fade + slide from right
variants.fade         // Simple fade
variants.scaleIn      // Scale + fade in
variants.scaleOut     // Scale + fade out
```

**Esempio**:
```tsx
<motion.div
  variants={variants.fadeInUp}
  initial="initial"
  animate="animate"
  transition={{ duration: timings.medium, ease: easings.easeOut }}
>
  Content
</motion.div>
```

#### Hover Animations

```typescript
import { hoverAnimations } from '@/lib/utils/motion';

hoverAnimations.lift         // scale 1.02 + translateY -5px
hoverAnimations.scale        // scale 1.05
hoverAnimations.scaleSubtle  // scale 1.02
hoverAnimations.glow         // box-shadow glow
```

**Esempio**:
```tsx
<motion.div whileHover={hoverAnimations.lift}>
  Hover me
</motion.div>
```

#### Tap Animations

```typescript
import { tapAnimations } from '@/lib/utils/motion';

tapAnimations.default  // scale 0.95
tapAnimations.subtle   // scale 0.98
```

---

## Timing e Easing

### Timing Guidelines

| Interazione | Duration | Quando usarlo |
|------------|----------|---------------|
| **150-200ms** | Fast | Hover, tap, micro-interactions |
| **300-400ms** | Medium | Menu open/close, modals, overlays |
| **500-700ms** | Slow | Page transitions, scroll reveals |

### Easing Guidelines

| Tipo | Quando usarlo | Esempio |
|------|---------------|---------|
| **ease-out** | Entrances, apparizioni | Elementi che appaiono nel viewport |
| **ease-in** | Exits, scomparse | Chiusura modali, rimozione elementi |
| **ease-in-out** | Movimenti bidirezionali | Slider, carousel, toggle |

---

## Performance

### Ottimizzazioni Implementate

#### 1. GPU Acceleration

Tutte le animazioni usano proprietà GPU-accelerated:
- `transform` (translate, scale, rotate)
- `opacity`
- **MAI** `width`, `height`, `top`, `left`, `margin`

#### 2. will-change Strategico

Applicato solo durante animazioni attive:
```tsx
<motion.div
  style={{ willChange: 'transform' }}
  onAnimationComplete={() => {
    // Remove will-change after animation
  }}
/>
```

#### 3. Layout Stability

- Aspect ratio fissi su `ImageCard` → CLS = 0
- Reserved space per skeleton loaders
- No reflow durante animazioni

#### 4. Lazy Loading

- `ScrollReveal` usa `IntersectionObserver` nativo
- Animazioni triggered solo quando visibili
- Reduced CPU usage per elementi off-screen

### Performance Targets

- **FPS**: 60fps costanti (verificato in Chrome DevTools)
- **CLS**: < 0.1 (Core Web Vital)
- **LCP**: < 2.5s per hero images
- **FID**: < 100ms per interazioni

### Testing Performance

```bash
# Chrome DevTools
1. Apri DevTools > Performance
2. Record durante navigazione/scroll
3. Verifica green bars (60fps)
4. Controlla no dropped frames

# Lighthouse
npm run build
npm run start
# Apri Lighthouse in DevTools
# Verifica Performance score > 90
```

---

## Accessibilità

### Reduced Motion Support

Implementato a 3 livelli:

#### 1. CSS Global (globals.css)

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

#### 2. JavaScript Helper

```typescript
import { shouldReduceMotion } from '@/lib/utils/motion';

if (shouldReduceMotion()) {
  // Disable animations
}
```

#### 3. Framer Motion Hook

```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

<motion.div
  animate={shouldReduceMotion ? {} : { y: 0, opacity: 1 }}
/>
```

### Testing Accessibility

```bash
# macOS
System Preferences > Accessibility > Display > Reduce Motion

# Windows
Settings > Ease of Access > Display > Show animations

# Verifica che:
- Animazioni siano istantanee o disabilitate
- Funzionalità rimanga intatta
- Layout non cambi
```

---

## Esempi di Utilizzo

### Esempio 1: Hero Section Animata

```tsx
import { ScrollIndicator } from '@/components/animations/ScrollIndicator';
import { motion } from 'framer-motion';
import { variants, timings } from '@/lib/utils/motion';

export function Hero() {
  return (
    <section className="h-screen relative">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src="/hero.jpg" alt="Hero" fill />
      </div>

      {/* Animated content */}
      <motion.div
        variants={variants.fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ duration: timings.slow, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center justify-center h-full"
      >
        <h1 className="text-7xl font-heading">AntPit Lab</h1>
        <p className="text-xl mt-4">Portfolio Fotografico</p>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
```

### Esempio 2: Gallery con Stagger

```tsx
import { MasonryGrid } from '@/components/gallery/MasonryGrid';
import { ImageCard } from '@/components/gallery/ImageCard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export function Gallery({ images }) {
  return (
    <ScrollReveal direction="up">
      <MasonryGrid columns={{ sm: 2, md: 3, lg: 4 }}>
        {images.map((image, index) => (
          <ImageCard
            key={image.id}
            {...image}
            priority={index < 4}
            onClick={() => openLightbox(index)}
          />
        ))}
      </MasonryGrid>
    </ScrollReveal>
  );
}
```

### Esempio 3: CTA Section con Sequenza

```tsx
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { AnimatedButton } from '@/components/animations/AnimatedButton';

export function CTA() {
  return (
    <section className="py-24">
      <ScrollReveal direction="up" delay={0}>
        <h2 className="text-5xl font-heading text-center">
          Pronto a Iniziare?
        </h2>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <p className="text-xl text-center mt-6">
          Contattami per discutere il tuo progetto
        </p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.4}>
        <div className="flex justify-center mt-12">
          <AnimatedButton
            variant="primary"
            size="lg"
            animationStyle="scale"
          >
            Contattami
          </AnimatedButton>
        </div>
      </ScrollReveal>
    </section>
  );
}
```

### Esempio 4: Custom Animation

```tsx
import { motion } from 'framer-motion';
import { timings, easings } from '@/lib/utils/motion';

export function CustomCard() {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: timings.slow,
        ease: easings.easeOut,
      }}
      whileHover={{
        scale: 1.05,
        rotateZ: 2,
        transition: { duration: timings.fast },
      }}
      className="card"
    >
      Content
    </motion.div>
  );
}
```

---

## CSS Animation Classes

Oltre a Framer Motion, sono disponibili utility CSS:

```tsx
// Fade in
<div className="animate-fade-in">Content</div>

// Fade in up
<div className="animate-fade-in-up delay-200">Content</div>

// Skeleton loader
<div className="skeleton h-64 w-full"></div>

// Hover effects
<button className="hover-lift">Hover me</button>
<div className="hover-scale">Scale on hover</div>

// GPU acceleration
<div className="gpu-accelerated">High-performance element</div>
```

---

## Troubleshooting

### Animazioni non fluide (< 60fps)

1. Verifica di usare solo `transform` e `opacity`
2. Controlla in Chrome DevTools Performance tab
3. Riduci complessità (meno elementi animati simultaneamente)
4. Usa `will-change` strategicamente

### Layout Shift durante animazioni

1. Imposta aspect ratio fisso su immagini
2. Riserva spazio per elementi animati
3. Evita animazioni di `width`/`height`

### Animazioni si triggherano multiple volte

1. Usa `viewport: { once: true }` in ScrollReveal
2. Controlla che non ci siano re-render inutili

### Reduced Motion non funziona

1. Testa in browser reale (non DevTools device mode)
2. Verifica OS settings
3. Controlla che tutti i componenti abbiano il check

---

## Risorse

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Web Animation Performance](https://web.dev/animations/)
- [Reduced Motion Guide](https://web.dev/prefers-reduced-motion/)
- [Core Web Vitals](https://web.dev/vitals/)

---

## Changelog

### v1.0.0 - 2025-10-21

- Implementazione completa sistema animazioni
- 8 componenti animati + utilities
- Performance 60fps garantiti
- Full accessibility support (reduced motion)
- CSS animations + Framer Motion integration
- Documentazione completa

---

**Autore**: Antonio Pitocco - AntPit Lab
**Ispirazione**: daniferrerfoto.com
**Stack**: Next.js 15, Framer Motion, Tailwind CSS
