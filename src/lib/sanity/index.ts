/**
 * Centralized exports for Sanity utilities
 */

// Client exports
export { client, previewClient, getClient } from './client'

// Image builder exports
export {
  urlFor,
  thumbnailUrl,
  responsiveImageUrl,
  urlForWithWatermark,
  generateSrcSet,
  generateDprSet,
  getImageDimensions,
  blurDataUrl,
  getImageProps,
} from './imageBuilder'

// Image loader exports
export {
  sanityLoader,
  sanityLoaderWithWatermark,
  generateSanitySrcSet,
  getSanityBlurUrl,
} from './loader'

// Query exports
export * from './queries'
