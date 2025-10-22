# Quick Reference - AntPit Lab Components

## File Paths Completi

### Documentazione

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/COMPONENTS.md
```

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/IMPLEMENTATION_SUMMARY.md
```

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/INTEGRATION_EXAMPLE.tsx
```

### Layout Components

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/components/layout/Header.tsx
```

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/components/layout/Footer.tsx
```

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/components/layout/Navigation.tsx
```

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/components/layout/MobileMenu.tsx
```

### UI Components

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/components/ui/Button.tsx
```

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/components/ui/Card.tsx
```

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/components/ui/Input.tsx
```

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/components/ui/Modal.tsx
```

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/components/ui/Loader.tsx
```

### Gallery Components

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/components/gallery/ImageCard.tsx
```

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/components/gallery/MasonryGrid.tsx
```

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/components/gallery/Lightbox.tsx
```

### Section Components

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/components/sections/Hero.tsx
```

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/components/sections/ContactForm.tsx
```

### Utilities

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/lib/utils/cn.ts
```

### Test Page

```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/app/test-components/page.tsx
```

---

## Quick Start Commands

### 1. Avvia Development Server

```bash
cd "/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next"
npm run dev
```

Apri: http://localhost:3000

### 2. Visualizza Test Components

Apri: http://localhost:3000/test-components

### 3. Type Check

```bash
npm run type-check
```

### 4. Build Production

```bash
npm run build
```

### 5. Lint & Format

```bash
npm run lint
npm run format
```

---

## Import Shortcuts

### Layout

```tsx
import { Header, Footer, Navigation, MobileMenu } from "@/components/layout";
```

### UI

```tsx
import { Button, Card, Input, Modal, Loader } from "@/components/ui";
```

### Gallery

```tsx
import { ImageCard, MasonryGrid, Lightbox } from "@/components/gallery";
```

### Sections

```tsx
import { Hero, ContactForm } from "@/components/sections";
```

### Utils

```tsx
import { cn } from "@/lib/utils/cn";
```

---

## Component Stats

| Category | Count | LOC  |
|----------|-------|------|
| Layout   | 4     | ~400 |
| UI       | 5     | ~350 |
| Gallery  | 3     | ~450 |
| Sections | 2     | ~250 |
| **Total**| **14**| **~1450** |

---

## Design Tokens Quick Ref

### Colors

```css
bg-primary: #000000
bg-secondary: #0a0a0a
text-primary: #ffffff
text-secondary: #a3a3a3
border: #1a1a1a
accent: #3b82f6
```

### Fonts

```css
font-heading: Montserrat
font-body: Lato
font-accent: Playfair Display
```

### Breakpoints

```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

---

## Most Used Patterns

### Button

```tsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

### ImageCard in Grid

```tsx
<MasonryGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={5}>
  {images.map((img, i) => (
    <ImageCard key={i} {...img} onClick={() => openLightbox(i)} />
  ))}
</MasonryGrid>
```

### Hero Section

```tsx
<Hero
  imageSrc="/hero.jpg"
  title="Your Title"
  subtitle="Your subtitle"
  ctaText="Explore"
/>
```

### Contact Form

```tsx
<ContactForm onSubmit={async (data) => {
  await submitToAPI(data);
}} />
```

---

## Troubleshooting

### TypeScript Errors

Se vedi errori TypeScript, verifica:
1. Tutti i file importano da `@/...` (alias configurato)
2. Props interfaces sono complete
3. `npm run type-check` per check completo

### Style Not Applying

1. Verifica Tailwind config in `tailwind.config.ts`
2. Check che il componente sia in `content` array
3. Usa `cn()` utility per merge classes

### Images Not Loading

1. Verifica path immagini
2. Per immagini esterne, aggiungi domain in `next.config.js`:

```js
images: {
  domains: ['images.unsplash.com'],
}
```

---

## Next Steps

1. Integra componenti in `/src/app/page.tsx`
2. Collega Sanity per immagini reali
3. Personalizza colori/font se necessario
4. Deploy su Vercel

---

## Support

Per domande o problemi, consulta:
- `COMPONENTS.md` per documentazione completa
- `IMPLEMENTATION_SUMMARY.md` per overview
- `INTEGRATION_EXAMPLE.tsx` per esempi pratici
