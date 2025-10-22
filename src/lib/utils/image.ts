import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { urlFor, blurDataUrl, getImageDimensions } from '@/lib/sanity/imageBuilder'
import { sanityLoader, getSanityBlurUrl } from '@/lib/sanity/loader'

/**
 * Aspect ratios supportati per le immagini
 */
export type AspectRatio = '1:1' | '4:3' | '16:9' | '21:9' | '3:2'

/**
 * Sizes attribute per layout comuni
 */
export const IMAGE_SIZES = {
  // Layout full width
  fullWidth: '100vw',

  // Gallery grid responsive
  // Mobile: 100vw, Tablet: 50vw, Desktop: 33vw, Large: 25vw
  galleryGrid: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw',

  // Gallery grid 2 colonne
  gallery2Col: '(max-width: 768px) 100vw, 50vw',

  // Gallery grid 3 colonne
  gallery3Col: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',

  // Gallery grid 4 colonne
  gallery4Col:
    '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw',

  // Thumbnail piccolo
  thumbnail: '(max-width: 768px) 100px, 150px',

  // Hero image
  hero: '100vw',

  // Card media
  card: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
} as const

/**
 * Aspect ratio helpers
 */
export const ASPECT_RATIOS: Record<
  AspectRatio,
  { ratio: number; width: number; height: number }
> = {
  '1:1': { ratio: 1, width: 1, height: 1 },
  '4:3': { ratio: 4 / 3, width: 4, height: 3 },
  '16:9': { ratio: 16 / 9, width: 16, height: 9 },
  '21:9': { ratio: 21 / 9, width: 21, height: 9 },
  '3:2': { ratio: 3 / 2, width: 3, height: 2 },
}

/**
 * Props per immagini responsive
 */
export interface ResponsiveImageProps {
  src: SanityImageSource
  alt: string
  sizes?: string
  priority?: boolean
  aspectRatio?: AspectRatio
  quality?: number
  maxWidth?: number
}

/**
 * Genera props ottimizzate per Next.js Image component
 * Include: src, blur placeholder, sizes, quality
 *
 * @example
 * const imageProps = getResponsiveImageProps({
 *   src: sanityImage,
 *   alt: "Description",
 *   sizes: IMAGE_SIZES.galleryGrid
 * })
 * <Image {...imageProps} />
 */
export function getResponsiveImageProps(props: ResponsiveImageProps) {
  const {
    src,
    alt,
    sizes = IMAGE_SIZES.galleryGrid,
    priority = false,
    aspectRatio = '4:3',
    quality = 85,
    maxWidth = 1920,
  } = props

  // Ottieni dimensioni originali se disponibili
  const dimensions = getImageDimensions(src)
  const aspectData = ASPECT_RATIOS[aspectRatio]

  // Calcola dimensioni target
  let width = dimensions?.width || maxWidth
  let height = dimensions?.height || Math.round(maxWidth / aspectData.ratio)

  // Se abbiamo dimensioni originali, mantienile
  if (dimensions) {
    width = Math.min(dimensions.width, maxWidth)
    height = Math.round(width / dimensions.aspectRatio)
  } else {
    // Usa aspect ratio specificato
    width = maxWidth
    height = Math.round(width / aspectData.ratio)
  }

  // Genera URL base
  const srcUrl = urlFor(src).width(width).quality(quality).auto('format').url()

  // Genera blur placeholder
  let blurDataURL: string | undefined
  try {
    // Prova a usare LQIP da metadata
    if (typeof src === 'object' && 'asset' in src) {
      const asset = src.asset as any
      blurDataURL = asset?.metadata?.lqip || blurDataUrl(src)
    } else if (typeof src === 'string') {
      blurDataURL = getSanityBlurUrl(src)
    }
  } catch (error) {
    console.warn('Failed to generate blur placeholder:', error)
  }

  return {
    src: srcUrl,
    alt,
    width,
    height,
    sizes,
    quality,
    priority,
    placeholder: blurDataURL ? ('blur' as const) : undefined,
    blurDataURL,
    loader: sanityLoader,
  }
}

/**
 * Genera srcset manualmente per controllo granulare
 */
export function generateResponsiveSrcSet(
  src: SanityImageSource,
  widths: number[] = [320, 640, 960, 1280, 1920, 2560]
): string {
  return widths
    .map((width) => {
      const url = urlFor(src).width(width).quality(85).auto('format').url()
      return `${url} ${width}w`
    })
    .join(', ')
}

/**
 * Ottieni URL ottimizzato per dimensione specifica
 */
export function getOptimizedImageUrl(
  src: SanityImageSource,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpg' | 'png'
  }
): string {
  const { width = 1200, height, quality = 85, format } = options || {}

  let builder = urlFor(src).width(width).quality(quality)

  if (height) {
    builder = builder.height(height)
  }

  if (format) {
    builder = builder.format(format)
  } else {
    builder = builder.auto('format')
  }

  return builder.url()
}

/**
 * Verifica se un'immagine dovrebbe avere priority
 * Usa per LCP optimization
 */
export function shouldHavePriority(
  index: number,
  layout: 'grid' | 'masonry' | 'carousel' = 'grid'
): boolean {
  switch (layout) {
    case 'grid':
      // Prime 4 immagini in grid
      return index < 4
    case 'masonry':
      // Prime 3 immagini in masonry
      return index < 3
    case 'carousel':
      // Solo la prima immagine
      return index === 0
    default:
      return false
  }
}

/**
 * Converti base64 a data URL per blur placeholder
 */
export function toBase64(str: string): string {
  if (typeof window === 'undefined') {
    return Buffer.from(str).toString('base64')
  }
  return btoa(str)
}

/**
 * Shimmer placeholder SVG (alternativa a blur)
 */
export function shimmerPlaceholder(width: number, height: number): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#e0e0e0;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f0f0f0;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#shimmer)" />
    </svg>
  `

  return `data:image/svg+xml;base64,${toBase64(svg)}`
}
