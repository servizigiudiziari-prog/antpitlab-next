/**
 * ESEMPIO DI INTEGRAZIONE - Homepage AntPit Lab
 *
 * Questo file mostra come integrare tutti i componenti creati
 * in una homepage completa per il portfolio fotografico.
 *
 * Path suggerito: src/app/page.tsx (sostituisci quello esistente)
 */

"use client";

import { useState } from "react";
import { Header, Footer } from "@/components/layout";
import { Hero } from "@/components/sections";
import { ImageCard, MasonryGrid, Lightbox } from "@/components/gallery";
import { Button } from "@/components/ui";

// Mock data - sostituisci con dati reali da Sanity
const portfolioImages = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600",
    alt: "Mountain landscape with sunset",
    title: "Mountain Vista",
    category: "Landscapes",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=800",
    alt: "Forest path in autumn",
    title: "Forest Path",
    category: "Nature",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600",
    alt: "Sunset over valley",
    title: "Sunset Valley",
    category: "Landscapes",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=800",
    alt: "Autumn leaves closeup",
    title: "Autumn Leaves",
    category: "Nature",
  },
  {
    src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600",
    alt: "Mountain peak adventure",
    title: "Mountain Peak",
    category: "Adventure",
  },
  {
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=800",
    alt: "Misty morning landscape",
    title: "Misty Morning",
    category: "Nature",
  },
  {
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600",
    alt: "Ocean waves at sunset",
    title: "Ocean Sunset",
    category: "Seascapes",
  },
  {
    src: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800&h=800",
    alt: "Winter mountain landscape",
    title: "Winter Mountains",
    category: "Landscapes",
  },
];

export default function HomePage() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Prepare images for lightbox
  const lightboxImages = portfolioImages.map((img) => ({
    src: img.src,
    alt: img.alt,
    title: img.title,
  }));

  // Handle image click
  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <>
      {/* Header con transparent per hero section */}
      <Header transparent />

      {/* Hero Section Fullscreen */}
      <Hero
        imageSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080"
        title="antpit lab studio"
        subtitle="Le immagini parlano quando le parole tacciono"
        ctaText="Esplora il Portfolio"
        onCtaClick={() => {
          // Scroll to gallery section
          document.getElementById("gallery")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
      />

      {/* Main Content */}
      <main className="bg-bg-primary">
        {/* Intro Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-text-primary mb-6">
            Portfolio Fotografico
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto mb-12">
            Benvenuto nel mio studio fotografico. Ogni immagine racconta una
            storia, cattura un momento, trasmette un&apos;emozione. Esplora le
            mie collezioni e lasciati ispirare.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" size="md">
              Tutte le Categorie
            </Button>
            <Button variant="ghost" size="md">
              Landscapes
            </Button>
            <Button variant="ghost" size="md">
              Nature
            </Button>
            <Button variant="ghost" size="md">
              Adventure
            </Button>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="max-w-7xl mx-auto px-6 pb-24">
          <MasonryGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={5}>
            {portfolioImages.map((image, index) => (
              <ImageCard
                key={index}
                {...image}
                onClick={() => handleImageClick(index)}
                priority={index < 4} // Priority per le prime 4 immagini
              />
            ))}
          </MasonryGrid>

          {/* Load More Button */}
          <div className="text-center mt-16">
            <Button variant="primary" size="lg">
              Carica Altre Immagini
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 text-center border-t border-border">
          <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-6">
            Lavoriamo Insieme
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Hai un progetto fotografico in mente? Contattami per una
            collaborazione o per discutere della tua prossima sessione
            fotografica.
          </p>
          <Button variant="primary" size="lg">
            Contattami
          </Button>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Lightbox per visualizzazione immagini */}
      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}

/**
 * INTEGRAZIONE CON SANITY CMS
 *
 * Per integrare con Sanity, sostituisci i mock data con query reali:
 *
 * 1. Crea un hook per fetch immagini:
 *
 * ```tsx
 * import { client } from "@/lib/sanity/client";
 *
 * async function getPortfolioImages() {
 *   return await client.fetch(`
 *     *[_type == "photo"] | order(publishedAt desc) {
 *       _id,
 *       title,
 *       "src": image.asset->url,
 *       alt,
 *       "category": category->title
 *     }
 *   `);
 * }
 *
 * export default async function HomePage() {
 *   const images = await getPortfolioImages();
 *   // ... render components
 * }
 * ```
 *
 * 2. Per filtering dinamico, usa "use client" e state:
 *
 * ```tsx
 * const [selectedCategory, setSelectedCategory] = useState("all");
 * const filteredImages = selectedCategory === "all"
 *   ? images
 *   : images.filter(img => img.category === selectedCategory);
 * ```
 *
 * 3. Per infinite scroll, usa Intersection Observer:
 *
 * ```tsx
 * const [page, setPage] = useState(1);
 * const loadMore = () => setPage(prev => prev + 1);
 * // Fetch more images when page changes
 * ```
 */

/**
 * OTTIMIZZAZIONI PERFORMANCE
 *
 * 1. Image optimization:
 *    - Usa next/image (già implementato in ImageCard)
 *    - Priority flag per above-the-fold images
 *    - Lazy loading per resto della gallery
 *
 * 2. Code splitting:
 *    - Lightbox è già lazy (solo quando isOpen)
 *    - Considera dynamic import per Hero se pesante
 *
 * 3. Caching:
 *    - Usa SWR o React Query per cache Sanity data
 *    - Implement ISR (Incremental Static Regeneration)
 *
 * 4. Bundle size:
 *    - Tree-shaking automatico con named exports
 *    - Framer Motion potrebbe essere heavy (considera alternative)
 */

/**
 * ACCESSIBILITY CHECKLIST
 *
 * ✅ Semantic HTML (main, section, header, footer)
 * ✅ ARIA labels su tutti i componenti interattivi
 * ✅ Keyboard navigation (Tab, Enter, ESC)
 * ✅ Focus indicators visibili
 * ✅ Alt text su tutte le immagini
 * ⏳ TODO: Skip links per screen reader
 * ⏳ TODO: Prefers-reduced-motion per animazioni
 */

/**
 * SEO METADATA
 *
 * Aggiungi in layout.tsx o questa pagina:
 *
 * ```tsx
 * export const metadata: Metadata = {
 *   title: "AntPit Lab - Portfolio Fotografico",
 *   description: "Portfolio fotografico professionale...",
 *   keywords: ["fotografia", "portfolio", "nature", "landscapes"],
 *   openGraph: {
 *     title: "AntPit Lab Studio",
 *     description: "Le immagini parlano quando le parole tacciono",
 *     images: ["/og-image.jpg"],
 *   },
 * };
 * ```
 */
