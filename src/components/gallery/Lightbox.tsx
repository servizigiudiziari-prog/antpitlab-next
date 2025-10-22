"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { variants, timings, easings, hoverAnimations, tapAnimations } from "@/lib/utils/motion";

interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
}

interface LightboxProps {
  /**
   * Array of images to display
   */
  images: LightboxImage[];
  /**
   * Index of currently displayed image
   */
  currentIndex: number;
  /**
   * Whether lightbox is open
   */
  isOpen: boolean;
  /**
   * Callback when lightbox should close
   */
  onClose: () => void;
  /**
   * Callback when image index changes
   */
  onIndexChange?: (index: number) => void;
}

/**
 * Fullscreen image lightbox with keyboard navigation
 * Placeholder implementation with basic functionality
 */
export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const [index, setIndex] = useState(currentIndex);

  // Sync internal index with prop
  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handlePrevious = useCallback(() => {
    const newIndex = index > 0 ? index - 1 : images.length - 1;
    setIndex(newIndex);
    onIndexChange?.(newIndex);
  }, [index, images.length, onIndexChange]);

  const handleNext = useCallback(() => {
    const newIndex = index < images.length - 1 ? index + 1 : 0;
    setIndex(newIndex);
    onIndexChange?.(newIndex);
  }, [index, images.length, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrevious, handleNext]);

  const currentImage = images[index];

  return (
    <AnimatePresence mode="wait">
      {isOpen && currentImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with smooth fade */}
          <motion.div
            variants={variants.fade}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: timings.medium }}
            className="absolute inset-0 bg-black"
            onClick={onClose}
          />

          {/* Image container with scale + fade */}
          <motion.div
            key={index}
            variants={variants.scaleIn}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: timings.medium, ease: easings.easeOut }}
            className="relative z-10 max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-8"
          >
            <motion.div
              className="relative w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: timings.fast }}
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Close button with hover animation */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={tapAnimations.default}
            transition={{ duration: timings.fast }}
            className="absolute top-6 right-6 z-20 p-2 text-text-primary hover:text-accent transition-colors"
            aria-label="Close lightbox"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </motion.button>

          {/* Navigation arrows with smooth hover */}
          {images.length > 1 && (
            <>
              <motion.button
                onClick={handlePrevious}
                whileHover={{ scale: 1.2, x: -5 }}
                whileTap={tapAnimations.default}
                transition={{ duration: timings.fast }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 text-text-primary hover:text-accent transition-colors"
                aria-label="Previous image"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </motion.button>

              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.2, x: 5 }}
                whileTap={tapAnimations.default}
                transition={{ duration: timings.fast }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 text-text-primary hover:text-accent transition-colors"
                aria-label="Next image"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </motion.button>
            </>
          )}

          {/* Image info with fade-in */}
          {currentImage.title && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: timings.medium }}
              className="absolute bottom-6 left-6 z-20 text-text-primary"
            >
              <h2 className="font-heading text-xl tracking-wide">
                {currentImage.title}
              </h2>
              <p className="text-text-secondary text-sm mt-1">
                {index + 1} / {images.length}
              </p>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
