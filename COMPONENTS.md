# AntPit Lab - Component Library

Documentazione completa dei componenti UI creati per il portfolio fotografico.

## Indice

- [Layout Components](#layout-components)
- [UI Components](#ui-components)
- [Gallery Components](#gallery-components)
- [Section Components](#section-components)

---

## Layout Components

### Header

Header fisso con blur backdrop, logo, navigazione e menu mobile.

**Path**: `/src/components/layout/Header.tsx`

**Props**:
```tsx
interface HeaderProps {
  transparent?: boolean; // Header trasparente per hero section
}
```

**Utilizzo**:
```tsx
import { Header } from "@/components/layout";

// Header normale
<Header />

// Header trasparente per hero
<Header transparent />
```

**Caratteristiche**:
- Fixed positioning con z-index 40
- Blur backdrop quando non trasparente
- Logo "antpit lab studio" lowercase minimal
- Navigation desktop con underline animation
- Hamburger menu mobile con fullscreen overlay
- Search icon placeholder

---

### Footer

Footer con copyright, citazione, social links e accesso admin.

**Path**: `/src/components/layout/Footer.tsx`

**Utilizzo**:
```tsx
import { Footer } from "@/components/layout";

<Footer />
```

**Caratteristiche**:
- Background bg-secondary
- Grid responsivo 1/3 colonne
- Citazione in font Playfair Display
- Social icons (Instagram, Email)
- Admin link nascosto con icona lucchetto

---

### Navigation

Menu di navigazione desktop con underline animation.

**Path**: `/src/components/layout/Navigation.tsx`

**Utilizzo**:
```tsx
import { Navigation } from "@/components/layout";

<Navigation />
```

**Caratteristiche**:
- Hidden su mobile (md:flex)
- Active state detection con usePathname
- Underline animation on hover
- Links: Home, Portfolio, Chi Sono, Contatti

---

### MobileMenu

Menu mobile fullscreen con animazioni Framer Motion.

**Path**: `/src/components/layout/MobileMenu.tsx`

**Props**:
```tsx
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Utilizzo**:
```tsx
import { MobileMenu } from "@/components/layout";

const [isOpen, setIsOpen] = useState(false);

<MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
```

**Caratteristiche**:
- Fullscreen overlay con bg-primary
- Close button con X animata (rotate 90deg)
- Stagger animation sui link (delay 0.1s each)
- Social icons in basso
- Body scroll lock quando aperto
- Auto-close su route change

---

## UI Components

### Button

Componente button con 3 varianti e 3 dimensioni.

**Path**: `/src/components/ui/Button.tsx`

**Props**:
```tsx
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}
```

**Utilizzo**:
```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

**Variants**:
- `primary`: Border 2px bianco, bg transparent → bg bianco + text nero hover
- `secondary`: Testo sottolineato con animazione
- `ghost`: Testo grigio → bianco hover + bg-secondary

**Sizes**:
- `sm`: px-4 py-2 text-sm
- `md`: px-6 py-3 text-base (default)
- `lg`: px-8 py-4 text-lg

---

### Card

Container generico con optional hover effect border offset (stile daniferrerfoto).

**Path**: `/src/components/ui/Card.tsx`

**Props**:
```tsx
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean; // Enable border offset hover
}
```

**Utilizzo**:
```tsx
import { Card } from "@/components/ui";

<Card hover>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

**Caratteristiche**:
- Background bg-secondary
- Padding 6 (1.5rem)
- Hover: Border 3px nero offset -7px translate

---

### Input

Input con floating label e error states.

**Path**: `/src/components/ui/Input.tsx`

**Props**:
```tsx
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
```

**Utilizzo**:
```tsx
import { Input } from "@/components/ui";

<Input
  label="Email"
  type="email"
  error="Email non valida"
  required
/>
```

**Caratteristiche**:
- Label floating animation
- Focus state: border accent blue
- Error state: border rosso + messaggio
- Required indicator con asterisco accent
- Background bg-secondary

---

### Modal

Modal fullscreen con backdrop e animazioni.

**Path**: `/src/components/ui/Modal.tsx`

**Props**:
```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}
```

**Utilizzo**:
```tsx
import { Modal } from "@/components/ui";

const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <div className="p-8">
    <h3>Modal Content</h3>
  </div>
</Modal>
```

**Caratteristiche**:
- Backdrop black/90
- Scale animation entrance/exit
- Close button top-right
- ESC key support
- Body scroll lock
- Click backdrop to close

---

### Loader

Spinner circolare elegante.

**Path**: `/src/components/ui/Loader.tsx`

**Props**:
```tsx
interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}
```

**Utilizzo**:
```tsx
import { Loader } from "@/components/ui";

<Loader size="md" />
```

**Sizes**:
- `sm`: 6x6 (1.5rem) border-2
- `md`: 10x10 (2.5rem) border-3 (default)
- `lg`: 16x16 (4rem) border-4

---

## Gallery Components

### ImageCard

Card immagine con hover effects stile daniferrerfoto.

**Path**: `/src/components/gallery/ImageCard.tsx`

**Props**:
```tsx
interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
  category?: string;
  aspectRatio?: "1:1" | "4:3" | "16:9";
  onClick?: () => void;
  priority?: boolean; // Next/Image priority
}
```

**Utilizzo**:
```tsx
import { ImageCard } from "@/components/gallery";

<ImageCard
  src="/images/photo.jpg"
  alt="Description"
  title="Mountain Vista"
  category="Landscapes"
  aspectRatio="4:3"
  onClick={() => openLightbox(0)}
  priority
/>
```

**Caratteristiche**:
- Next/Image con blur placeholder
- Overlay nero opacity 0 → 0.7 hover
- Titolo fade-in dal basso (translateY-full → 0)
- Category badge top-right
- Watermark "© AntPit Lab" bottom-right (opacity 0.6)
- Border 3px nero offset -7px su hover
- Image scale 100 → 110 su hover
- Loading skeleton bg-secondary animate-pulse

**Aspect Ratios**:
- `1:1`: Quadrato
- `4:3`: Standard landscape (default)
- `16:9`: Panoramico

---

### MasonryGrid

Griglia responsiva per gallery.

**Path**: `/src/components/gallery/MasonryGrid.tsx`

**Props**:
```tsx
interface MasonryGridProps {
  children: ReactNode;
  columns?: { sm: number; md: number; lg: number };
  gap?: number; // Gap in pixels
  className?: string;
}
```

**Utilizzo**:
```tsx
import { MasonryGrid, ImageCard } from "@/components/gallery";

<MasonryGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={5}>
  {images.map((img, i) => (
    <ImageCard key={i} {...img} />
  ))}
</MasonryGrid>
```

**Caratteristiche**:
- CSS Grid responsive
- Default: 2 col mobile, 3 tablet, 4 desktop
- Gap minimo default 5px (stile daniferrerfoto)
- Supporta 1-4 colonne per breakpoint

---

### Lightbox

Lightbox fullscreen con navigation e keyboard support.

**Path**: `/src/components/gallery/Lightbox.tsx`

**Props**:
```tsx
interface LightboxProps {
  images: Array<{ src: string; alt: string; title?: string }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}
```

**Utilizzo**:
```tsx
import { Lightbox } from "@/components/gallery";

const [isOpen, setIsOpen] = useState(false);
const [index, setIndex] = useState(0);

<Lightbox
  images={images}
  currentIndex={index}
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onIndexChange={setIndex}
/>
```

**Caratteristiche**:
- Fullscreen black background
- Close button top-right
- Navigation arrows left/right
- Keyboard support: ESC (close), ← (prev), → (next)
- Image info bottom-left (title + counter)
- Loop navigation (ultimo → primo)
- Body scroll lock

---

## Section Components

### Hero

Hero fullscreen con background image e CTA.

**Path**: `/src/components/sections/Hero.tsx`

**Props**:
```tsx
interface HeroProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}
```

**Utilizzo**:
```tsx
import { Hero } from "@/components/sections";

<Hero
  imageSrc="/images/hero.jpg"
  title="AntPit Lab Studio"
  subtitle="Le immagini parlano quando le parole tacciono"
  ctaText="Esplora il Portfolio"
  onCtaClick={() => router.push("/portfolio")}
/>
```

**Caratteristiche**:
- Height 100vh
- Background image con overlay dark 50%
- Centered content con Framer Motion fade-in
- Title: font-heading 5xl-8xl responsive
- Subtitle: font-accent italic
- CTA Button primary large
- Scroll indicator animato (chevron down loop)
- Auto-scroll to content on indicator click

---

### ContactForm

Form contatti con validazione React Hook Form.

**Path**: `/src/components/sections/ContactForm.tsx`

**Props**:
```tsx
interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; message: string }) => Promise<void>;
}
```

**Utilizzo**:
```tsx
import { ContactForm } from "@/components/sections";

const handleSubmit = async (data) => {
  await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

<ContactForm onSubmit={handleSubmit} />
```

**Caratteristiche**:
- 3 campi: Nome, Email, Messaggio (textarea)
- Validazione client-side:
  - Nome: required, min 2 caratteri
  - Email: required, pattern email valido
  - Messaggio: required, min 10 caratteri
- States: idle, submitting, success, error
- Loading indicator durante submit
- Success/error messages auto-hide dopo 5s
- Privacy policy link
- Max-width 2xl centrato

**Validazione**:
- Real-time error messages
- Required field indicators
- Disabled state durante submit
- Form reset on success

---

## Utilities

### cn (classNames merge)

**Path**: `/src/lib/utils/cn.ts`

Utility per merge di Tailwind classes con clsx e tailwind-merge.

**Utilizzo**:
```tsx
import { cn } from "@/lib/utils/cn";

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className
)} />
```

---

## Pagina di Test

**Path**: `/src/app/test-components/page.tsx`

Pagina completa che mostra tutti i componenti per verifica visuale.

**URL**: `http://localhost:3000/test-components`

Contenuto:
- Hero section fullscreen
- Tutti i button variants e sizes
- Cards con e senza hover
- Input fields con stati
- Modal con trigger
- Loaders in 3 sizes
- Image gallery con MasonryGrid
- Lightbox navigation
- Contact form funzionante

---

## Design System

### Colori (Tailwind config)

```css
bg-primary: #000000 (nero puro)
bg-secondary: #0a0a0a (nero leggermente più chiaro)
text-primary: #ffffff (bianco)
text-secondary: #a3a3a3 (grigio)
border: #1a1a1a (grigio scuro)
accent: #3b82f6 (blu)
overlay: rgba(0, 0, 0, 0.7) (nero trasparente)
```

### Font Families

```css
font-heading: Montserrat (sans-serif) - Logo, titoli, nav
font-body: Lato (sans-serif) - Testi, paragrafi
font-accent: Playfair Display (serif) - Citazioni, subtitle
```

### Spacing Scale

```
4: 0.25rem (4px)
8: 0.5rem (8px)
12: 0.75rem (12px)
16: 1rem (16px)
24: 1.5rem (24px)
32: 2rem (32px)
48: 3rem (48px)
64: 4rem (64px)
96: 6rem (96px)
128: 8rem (128px)
```

### Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### Animazioni

- **Durate standard**: 300ms (micro-interactions), 500ms (transitions)
- **Easing**: Tailwind default (cubic-bezier)
- **Prefers-reduced-motion**: Non implementato ancora (TODO)

---

## Accessibilità

Tutti i componenti rispettano:

- Semantic HTML (nav, main, article, etc.)
- ARIA labels appropriati
- Keyboard navigation
- Focus indicators visibili
- Screen reader support
- Role attributes dove necessario

---

## Performance

- Next/Image per tutte le immagini
- Lazy loading (priority solo above-the-fold)
- Memoization con useCallback dove necessario
- No layout shift (aspect ratio preservato)
- Tree-shaking con named exports

---

## TypeScript

Tutti i componenti sono:
- Fully typed con TypeScript strict mode
- Props interface documentate
- No `any` types
- Generic types dove appropriato (forwardRef)

---

## Prossimi Passi (TODO)

1. Aggiungere Storybook per component showcase
2. Implementare prefers-reduced-motion
3. Aggiungere più varianti ai componenti
4. Testing con Jest + React Testing Library
5. Ottimizzare bundle size
6. Implementare lazy loading per componenti pesanti
7. Aggiungere animazioni personalizzate

---

## Crediti

Design ispirato a: [daniferrerfoto.com](https://daniferrerfoto.com)

Caratteristiche distintive copiate:
- Griglia infinita con gap minimo (5px)
- Border offset -7px su hover
- Overlay nero opacity 0.7
- Tema nero/bianco minimale
- Watermark discreto

---

**Sviluppato per**: AntPit Lab Portfolio Fotografico
**Stack**: Next.js 15, TypeScript, Tailwind CSS 4, Framer Motion
**Data**: Ottobre 2025
