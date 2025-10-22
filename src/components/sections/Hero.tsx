"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  /**
   * Background image source
   */
  imageSrc: string;
  /**
   * Hero title
   */
  title: string;
  /**
   * Hero subtitle
   */
  subtitle?: string;
  /**
   * CTA button text
   */
  ctaText?: string;
  /**
   * CTA button click handler
   */
  onCtaClick?: () => void;
}

/**
 * Fullscreen hero section with background image and centered content
 */
export function Hero({
  imageSrc,
  title,
  subtitle,
  ctaText = "Esplora il Portfolio",
  onCtaClick,
}: HeroProps) {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-text-primary tracking-wider uppercase mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="font-accent text-xl md:text-2xl text-text-secondary italic mb-12 max-w-2xl">
              {subtitle}
            </p>
          )}
          <Button
            variant="primary"
            size="lg"
            onClick={onCtaClick || scrollToContent}
          >
            {ctaText}
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToContent}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-text-primary hover:text-accent transition-colors"
            aria-label="Scroll down"
          >
            <span className="text-xs uppercase tracking-wider font-heading">
              Scroll
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
