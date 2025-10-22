"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatedButton } from "@/components/animations/AnimatedButton";
import { LoadingSpinner } from "@/components/animations/LoadingSpinner";
import { ScrollIndicator } from "@/components/animations/ScrollIndicator";
import { MasonryGrid } from "@/components/gallery/MasonryGrid";
import { ImageCard } from "@/components/gallery/ImageCard";
import { Lightbox } from "@/components/gallery/Lightbox";

/**
 * Demo page per visualizzare tutte le animazioni implementate
 * Utile per testing e reference
 */
export default function AnimationDemoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Demo images
  const demoImages = [
    {
      src: "https://cdn.sanity.io/images/demo/production/placeholder-1.jpg",
      alt: "Demo Image 1",
      title: "Ritratto 1",
    },
    {
      src: "https://cdn.sanity.io/images/demo/production/placeholder-2.jpg",
      alt: "Demo Image 2",
      title: "Paesaggio 1",
    },
    {
      src: "https://cdn.sanity.io/images/demo/production/placeholder-3.jpg",
      alt: "Demo Image 3",
      title: "Architettura 1",
    },
    {
      src: "https://cdn.sanity.io/images/demo/production/placeholder-4.jpg",
      alt: "Demo Image 4",
      title: "Still Life 1",
    },
  ];

  const handleLoadingTest = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center bg-gradient-to-b from-bg-primary to-bg-secondary">
        <ScrollReveal direction="up" delay={0}>
          <h1 className="text-7xl font-heading text-center text-text-primary">
            Animation Demo
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <p className="text-xl text-text-secondary text-center mt-6">
            Sistema di animazioni AntPit Lab Portfolio
          </p>
        </ScrollReveal>

        <div className="absolute bottom-12">
          <ScrollIndicator />
        </div>
      </section>

      {/* Buttons Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <h2 className="text-5xl font-heading text-text-primary mb-12">
            Animated Buttons
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="p-8 bg-bg-secondary rounded-lg">
              <h3 className="text-xl font-heading text-text-primary mb-4">
                Primary
              </h3>
              <AnimatedButton
                variant="primary"
                size="lg"
                animationStyle="scale"
                className="w-full"
              >
                Scale Animation
              </AnimatedButton>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="p-8 bg-bg-secondary rounded-lg">
              <h3 className="text-xl font-heading text-text-primary mb-4">
                Secondary
              </h3>
              <AnimatedButton
                variant="secondary"
                size="lg"
                animationStyle="lift"
                className="w-full"
              >
                Lift Animation
              </AnimatedButton>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="p-8 bg-bg-secondary rounded-lg">
              <h3 className="text-xl font-heading text-text-primary mb-4">
                Ghost
              </h3>
              <AnimatedButton
                variant="ghost"
                size="lg"
                animationStyle="glow"
                className="w-full"
              >
                Glow Animation
              </AnimatedButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Loading Spinner Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <h2 className="text-5xl font-heading text-text-primary mb-12">
            Loading States
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="p-8 bg-bg-secondary rounded-lg flex flex-col items-center">
              <h3 className="text-xl font-heading text-text-primary mb-6">
                Small
              </h3>
              <LoadingSpinner size="sm" color="primary" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="p-8 bg-bg-secondary rounded-lg flex flex-col items-center">
              <h3 className="text-xl font-heading text-text-primary mb-6">
                Medium
              </h3>
              <LoadingSpinner size="md" color="accent" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="p-8 bg-bg-secondary rounded-lg flex flex-col items-center">
              <h3 className="text-xl font-heading text-text-primary mb-6">
                Large
              </h3>
              <LoadingSpinner size="lg" color="white" />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={0.4}>
          <div className="mt-12 text-center">
            <AnimatedButton
              variant="primary"
              size="md"
              onClick={handleLoadingTest}
            >
              Test Loading (3s)
            </AnimatedButton>
            {isLoading && (
              <div className="mt-6 flex justify-center">
                <LoadingSpinner size="lg" color="accent" />
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* Scroll Reveal Directions */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <h2 className="text-5xl font-heading text-text-primary mb-12">
            Scroll Reveal Directions
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal direction="up" delay={0}>
            <div className="p-12 bg-bg-secondary rounded-lg text-center">
              <p className="text-text-primary text-xl">From Bottom (Up)</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="down" delay={0}>
            <div className="p-12 bg-bg-secondary rounded-lg text-center">
              <p className="text-text-primary text-xl">From Top (Down)</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0}>
            <div className="p-12 bg-bg-secondary rounded-lg text-center">
              <p className="text-text-primary text-xl">From Right (Left)</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0}>
            <div className="p-12 bg-bg-secondary rounded-lg text-center">
              <p className="text-text-primary text-xl">From Left (Right)</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Image Gallery with Stagger */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <h2 className="text-5xl font-heading text-text-primary mb-12">
            Gallery Stagger Animation
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <MasonryGrid columns={{ sm: 2, md: 2, lg: 4 }} gap={10}>
            {demoImages.map((image, index) => (
              <ImageCard
                key={index}
                src={image.src}
                alt={image.alt}
                title={image.title}
                aspectRatio="4:3"
                priority={index < 2}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </MasonryGrid>
        </ScrollReveal>
      </section>

      {/* Stagger List Example */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <h2 className="text-5xl font-heading text-text-primary mb-12">
            Stagger List Animation
          </h2>
        </ScrollReveal>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <ScrollReveal key={item} direction="left" delay={index * 0.1}>
              <div className="p-6 bg-bg-secondary rounded-lg hover:bg-border transition-colors">
                <p className="text-text-primary text-lg">
                  List Item {item} - Delay {index * 100}ms
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Information Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="p-12 bg-bg-secondary rounded-lg">
            <h2 className="text-4xl font-heading text-text-primary mb-6">
              Performance & Accessibility
            </h2>
            <ul className="space-y-3 text-text-secondary text-lg">
              <li>✓ 60fps garantiti su tutte le animazioni</li>
              <li>✓ GPU-accelerated (transform, opacity only)</li>
              <li>✓ Supporto completo prefers-reduced-motion</li>
              <li>✓ CLS &lt; 0.1 (Core Web Vitals)</li>
              <li>✓ Framer Motion + CSS animations</li>
              <li>✓ IntersectionObserver per scroll reveals</li>
            </ul>

            <div className="mt-8">
              <AnimatedButton
                variant="primary"
                size="md"
                onClick={() =>
                  window.open("/ANIMATIONS.md", "_blank")
                }
              >
                Leggi Documentazione
              </AnimatedButton>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={demoImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setCurrentImageIndex}
      />
    </div>
  );
}
