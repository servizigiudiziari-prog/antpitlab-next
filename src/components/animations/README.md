# Animation Components

Sistema di animazioni completo per AntPit Lab Portfolio, ispirato a daniferrerfoto.com.

## Quick Start

```tsx
import {
  PageTransition,
  ScrollReveal,
  AnimatedButton,
  LoadingSpinner,
  ScrollIndicator,
} from '@/components/animations';
```

## Componenti Disponibili

### PageTransition

Transizioni smooth tra pagine.

```tsx
// In layout.tsx
<PageTransition>{children}</PageTransition>
```

### ScrollReveal

Rivela elementi scrollando.

```tsx
<ScrollReveal direction="up" delay={0.2}>
  <h2>Titolo</h2>
</ScrollReveal>
```

### AnimatedButton

Button con animazioni hover/tap.

```tsx
<AnimatedButton variant="primary" size="lg" animationStyle="scale">
  Click Me
</AnimatedButton>
```

### LoadingSpinner

Spinner per loading states.

```tsx
{isLoading && <LoadingSpinner size="md" color="accent" />}
```

### ScrollIndicator

Indicatore scroll per hero sections.

```tsx
<ScrollIndicator label="Scroll" />
```

## Performance

- 60fps garantiti
- GPU-accelerated
- prefers-reduced-motion support
- CLS < 0.1

## Demo

Visita `/animation-demo` per vedere tutte le animazioni in azione.

## Documentazione Completa

Leggi `/ANIMATIONS.md` per la documentazione completa.
