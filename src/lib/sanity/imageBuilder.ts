import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

/**
 * Builder per trasformare immagini Sanity in URL ottimizzati
 * Documentazione: https://www.sanity.io/docs/image-url
 */
const builder = imageUrlBuilder(client)

/**
 * Helper base per generare URL immagini
 * @example
 * urlFor(image).width(800).height(600).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * URL ottimizzato per thumbnail (piccole anteprime)
 * - Auto format (WebP su browser supportati)
 * - Qualità 80%
 * - Fit max per mantenere aspect ratio
 */
export function thumbnailUrl(
  source: SanityImageSource,
  width = 400,
  height = 300
) {
  return builder
    .image(source)
    .width(width)
    .height(height)
    .fit('max')
    .auto('format')
    .quality(80)
    .url()
}

/**
 * URL ottimizzato per immagini responsive
 * - Auto format
 * - Qualità configurabile
 * - Supporto DPR (Device Pixel Ratio)
 */
export function responsiveImageUrl(
  source: SanityImageSource,
  options?: {
    width?: number
    height?: number
    quality?: number
    dpr?: number
  }
) {
  const { width, height, quality = 85, dpr } = options || {}

  let imageBuilder = builder.image(source).auto('format').quality(quality)

  if (width) imageBuilder = imageBuilder.width(width)
  if (height) imageBuilder = imageBuilder.height(height)
  if (dpr) imageBuilder = imageBuilder.dpr(dpr)

  return imageBuilder.url()
}

/**
 * URL con watermark applicato
 * Usa il blend mode per sovrapporre il watermark
 *
 * NOTA: Il watermark avanzato richiede configurazione lato Sanity
 * Per ora ritorna URL con parametri di qualità ottimizzati
 * TODO: Implementare watermark custom via Sanity Assets API
 */
export function urlForWithWatermark(
  source: SanityImageSource,
  options?: {
    width?: number
    quality?: number
  }
) {
  const { width, quality = 85 } = options || {}

  let imageBuilder = builder
    .image(source)
    .auto('format')
    .fit('max')
    .quality(quality)

  if (width) imageBuilder = imageBuilder.width(width)

  return imageBuilder.url()
}

/**
 * Genera srcset per immagini responsive
 * @example
 * <img srcSet={generateSrcSet(image, [400, 800, 1200])} />
 */
export function generateSrcSet(
  source: SanityImageSource,
  widths: number[] = [400, 800, 1200, 1600]
): string {
  return widths
    .map((width) => {
      const url = builder
        .image(source)
        .width(width)
        .auto('format')
        .quality(85)
        .url()
      return `${url} ${width}w`
    })
    .join(', ')
}

/**
 * Genera set di URL per diverse risoluzioni (1x, 2x, 3x)
 */
export function generateDprSet(
  source: SanityImageSource,
  width: number
): { x1: string; x2: string; x3: string } {
  return {
    x1: builder.image(source).width(width).dpr(1).auto('format').url(),
    x2: builder.image(source).width(width).dpr(2).auto('format').url(),
    x3: builder.image(source).width(width).dpr(3).auto('format').url(),
  }
}

/**
 * Estrae metadati immagine da asset Sanity
 */
export function getImageDimensions(source: any): {
  width: number
  height: number
  aspectRatio: number
} | null {
  if (!source?.asset?._ref) return null

  // Parse reference: image-<id>-<width>x<height>-<format>
  const ref = source.asset._ref
  const match = ref.match(/image-[a-f0-9]+-(\d+)x(\d+)-/)

  if (!match) return null

  const width = parseInt(match[1], 10)
  const height = parseInt(match[2], 10)

  return {
    width,
    height,
    aspectRatio: width / height,
  }
}

/**
 * Genera URL per blur placeholder (LQIP - Low Quality Image Placeholder)
 */
export function blurDataUrl(source: SanityImageSource): string {
  return builder
    .image(source)
    .width(20)
    .height(20)
    .blur(10)
    .quality(50)
    .url()
}

/**
 * Helper per Next.js Image component
 * Ritorna props ottimizzate per <Image />
 */
export function getImageProps(
  source: any,
  options?: {
    width?: number
    height?: number
    priority?: boolean
  }
) {
  const { width = 1200, height, priority = false } = options || {}

  const dimensions = getImageDimensions(source)

  return {
    src: urlFor(source).width(width).auto('format').url(),
    alt: source.alt || '',
    width: dimensions?.width || width,
    height:
      height || (dimensions ? Math.round(width / dimensions.aspectRatio) : 800),
    blurDataURL: source.asset?.metadata?.lqip || blurDataUrl(source),
    placeholder: 'blur' as const,
    priority,
  }
}
