/**
 * Centralized exports for utility functions
 */

// Class name utilities
export { cn } from './cn'

// Image optimization utilities
export {
  getResponsiveImageProps,
  generateResponsiveSrcSet,
  getOptimizedImageUrl,
  shouldHavePriority,
  toBase64,
  shimmerPlaceholder,
  IMAGE_SIZES,
  ASPECT_RATIOS,
  type AspectRatio,
  type ResponsiveImageProps,
} from './image'

// Performance monitoring utilities
export {
  reportWebVitals,
  observeLCP,
  observeCLS,
  measureImagePerformance,
  getImageSize,
  checkImageOptimization,
  checkPerformanceBudget,
  getMetricRating,
  VITALS_THRESHOLDS,
  PERFORMANCE_BUDGET,
  type WebVitalsMetric,
} from './performance'

// Motion/Animation utilities
export { timings, easings, hoverAnimations } from './motion'
