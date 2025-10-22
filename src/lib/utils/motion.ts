/**
 * Animation utilities and motion helpers
 * Inspired by daniferrerfoto.com subtle, elegant animations
 */

/**
 * Check if user prefers reduced motion
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get transition configuration respecting user preferences
 */
export function getTransition(duration: number, ease: string = 'easeInOut') {
  return shouldReduceMotion()
    ? { duration: 0.01 }
    : { duration, ease };
}

/**
 * Common easing functions
 */
export const easings = {
  // Smooth deceleration (best for entrances)
  easeOut: [0.25, 0.1, 0.25, 1],
  // Smooth acceleration (best for exits)
  easeIn: [0.42, 0, 1, 1],
  // Smooth both ways (best for bidirectional)
  easeInOut: [0.42, 0, 0.58, 1],
  // Custom elastic for playful interactions
  elastic: [0.68, -0.55, 0.265, 1.55],
  // Custom smooth for natural feel
  smooth: [0.25, 0.46, 0.45, 0.94],
} as const;

/**
 * Timing constants following daniferrerfoto.com style
 */
export const timings = {
  fast: 0.2,        // 200ms - micro-interactions (hover, tap)
  medium: 0.35,     // 350ms - standard transitions
  slow: 0.6,        // 600ms - page transitions, reveals
  veryFast: 0.15,   // 150ms - instant feedback
  verySlow: 0.8,    // 800ms - dramatic reveals
} as const;

/**
 * Stagger configuration for list animations
 */
export const stagger = {
  fast: 0.05,       // 50ms between items
  medium: 0.1,      // 100ms between items
  slow: 0.15,       // 150ms between items
} as const;

/**
 * Common animation variants
 */
export const variants = {
  // Fade in from bottom (most common)
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  },

  // Fade in from top
  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  },

  // Fade in from left
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
  },

  // Fade in from right
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  },

  // Simple fade
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },

  // Scale in (for modals, lightbox)
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },

  // Scale out (for cards)
  scaleOut: {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  },
} as const;

/**
 * Container variants for stagger animations
 */
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.medium,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: stagger.fast,
      staggerDirection: -1,
    },
  },
};

/**
 * Item variants for stagger animations
 */
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timings.medium,
      ease: easings.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: timings.fast,
    },
  },
};

/**
 * Page transition variants
 */
export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: timings.slow,
      ease: easings.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: timings.medium,
      ease: easings.easeIn,
    },
  },
};

/**
 * Hover animation configs
 */
export const hoverAnimations = {
  // Subtle lift
  lift: {
    scale: 1.02,
    y: -5,
    transition: { duration: timings.fast, ease: easings.easeOut },
  },

  // Scale up
  scale: {
    scale: 1.05,
    transition: { duration: timings.fast, ease: easings.easeOut },
  },

  // Slight scale
  scaleSubtle: {
    scale: 1.02,
    transition: { duration: timings.fast, ease: easings.easeOut },
  },

  // Glow effect (for buttons)
  glow: {
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
    transition: { duration: timings.fast },
  },
};

/**
 * Tap animation configs
 */
export const tapAnimations = {
  default: {
    scale: 0.95,
    transition: { duration: timings.veryFast },
  },

  subtle: {
    scale: 0.98,
    transition: { duration: timings.veryFast },
  },
};
