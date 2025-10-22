"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import {
  getResponsiveImageProps,
  IMAGE_SIZES,
  type AspectRatio,
} from "@/lib/utils/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { timings, easings, hoverAnimations } from "@/lib/utils/motion";

interface ImageCardProps {
  /**
   * Image source - può essere SanityImageSource o URL string
   */
  src: SanityImageSource | string;
  /**
   * Alt text for accessibility
   */
  alt: string;
  /**
   * Image title shown on hover
   */
  title: string;
  /**
   * Optional category badge
   */
  category?: string;
  /**
   * Aspect ratio of the image
   */
  aspectRatio?: AspectRatio;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Load image with priority (for above-the-fold images)
   * Usa true per LCP images (hero, primi 4 in gallery)
   */
  priority?: boolean;
  /**
   * Custom sizes attribute per responsive loading
   */
  sizes?: string;
  /**
   * Quality immagine (1-100, default 85)
   */
  quality?: number;
  /**
   * Mostra watermark (default true)
   */
  showWatermark?: boolean;
}

const aspectRatioStyles: Record<AspectRatio, string> = {
  "1:1": "aspect-square",
  "4:3": "aspect-[4/3]",
  "16:9": "aspect-video",
  "21:9": "aspect-[21/9]",
  "3:2": "aspect-[3/2]",
};

/**
 * Image card ottimizzato con:
 * - Lazy loading intelligente (priority per LCP)
 * - Blur placeholder (LQIP da Sanity)
 * - Responsive images (srcset automatico)
 * - Watermark CSS overlay
 * - Hover effects professionali
 * - Auto-format (AVIF > WebP > JPEG)
 *
 * Performance targets:
 * - LCP < 2.5s per hero images
 * - Thumbnail < 100KB
 * - CLS = 0 (aspect ratio fisso)
 */
export function ImageCard({
  src,
  alt,
  title,
  category,
  aspectRatio = "4:3",
  onClick,
  priority = false,
  sizes = IMAGE_SIZES.gallery4Col,
  quality = 85,
  showWatermark = true,
}: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Genera props ottimizzate per Next/Image
  const imageProps = getResponsiveImageProps({
    src,
    alt,
    sizes,
    priority,
    aspectRatio,
    quality,
    maxWidth: 1920,
  });

  return (
    <motion.article
      whileHover={hoverAnimations.scaleSubtle}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: timings.fast, ease: easings.easeOut }}
      className={cn(
        "group relative overflow-hidden cursor-pointer",
        aspectRatioStyles[aspectRatio],
        // Border offset effect su hover
        "before:absolute before:inset-0 before:border-[3px] before:border-black before:z-20 before:transition-all before:duration-300 before:pointer-events-none",
        "hover:before:-translate-x-[7px] hover:before:-translate-y-[7px]"
      )}
      onClick={onClick}
      // Performance: hint browser per preload
      style={{ contentVisibility: priority ? "auto" : "auto" }}
    >
      {/* Image con ottimizzazioni complete */}
      <div className="relative w-full h-full">
        <Image
          {...imageProps}
          className={cn(
            "object-cover transition-all duration-500",
            // Fade-in smooth quando caricata
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
            // Zoom su hover
            "group-hover:scale-110"
          )}
          onLoad={() => setIsLoaded(true)}
          // IMPORTANTE: priority loading strategico
          // - true: per hero e primi 4 in gallery (LCP optimization)
          // - false: lazy load per below-the-fold
          loading={priority ? "eager" : "lazy"}
          // Fetch priority per LCP images
          fetchPriority={priority ? "high" : "auto"}
        />
      </div>

      {/* Black overlay on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.7 }}
        transition={{ duration: timings.medium }}
        className="absolute inset-0 bg-black z-10"
        aria-hidden="true"
      />

      {/* Category badge (top-right) */}
      {category && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-bg-primary/80 backdrop-blur-sm border border-border">
          <span className="text-text-primary text-xs font-heading uppercase tracking-wider">
            {category}
          </span>
        </div>
      )}

      {/* Title (fade-in from bottom on hover) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-heading text-text-primary text-xl tracking-wide">
          {title}
        </h3>
      </div>

      {/* Watermark automatico (bottom-right) */}
      {showWatermark && (
        <div
          className="absolute bottom-4 right-4 z-20 opacity-60 pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="text-text-primary text-xs font-body tracking-wider drop-shadow-md">
            © AntPit Lab
          </span>
        </div>
      )}

      {/* Loading skeleton con blur placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-bg-secondary animate-pulse z-0" />
      )}
    </motion.article>
  );
}
