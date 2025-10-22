import type { ImageLoaderProps } from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

/**
 * Builder base per Sanity images
 */
const builder = imageUrlBuilder(client)

/**
 * Custom loader per Next.js Image component
 * Ottimizza automaticamente le immagini da Sanity CDN
 *
 * Features:
 * - Auto-format (WebP/AVIF)
 * - Responsive widths
 * - Quality optimization
 * - Fit strategy per mantenere aspect ratio
 *
 * @example
 * <Image src={sanityImage} loader={sanityLoader} ... />
 */
export function sanityLoader({ src, width, quality }: ImageLoaderProps): string {
  // Se src è già un URL completo, usalo direttamente
  if (typeof src === 'string' && src.startsWith('http')) {
    // Estrai i parametri esistenti
    const url = new URL(src)

    // Sovrascrivi width e quality
    url.searchParams.set('w', width.toString())
    if (quality) {
      url.searchParams.set('q', quality.toString())
    }

    // Assicura auto-format
    if (!url.searchParams.has('fm')) {
      url.searchParams.set('auto', 'format')
    }

    return url.toString()
  }

  // Altrimenti usa il builder
  return builder
    .image(src)
    .width(width)
    .quality(quality || 85)
    .auto('format') // Auto WebP/AVIF
    .fit('max') // Mantieni aspect ratio
    .url()
}

/**
 * Loader con watermark per immagini del portfolio
 * Usa Sanity URL API per applicare watermark
 *
 * NOTA: Attualmente ritorna immagine senza watermark server-side
 * Il watermark è applicato via CSS overlay (vedi ImageCard component)
 *
 * Per watermark server-side, opzioni:
 * 1. Upload watermark PNG su Sanity e usa blend parameter
 * 2. Usa Sanity Image Pipeline con custom processing
 * 3. API route Next.js con Sharp per processing
 */
export function sanityLoaderWithWatermark({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  // Per ora usa il loader standard
  // Il watermark è gestito via CSS
  return sanityLoader({ src, width, quality })
}

/**
 * Genera srcset per immagini responsive
 * Utilizzato internamente da Next.js Image
 */
export function generateSanitySrcSet(
  src: string,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
): string {
  return widths
    .map((width) => {
      const url = sanityLoader({ src, width, quality: 85 })
      return `${url} ${width}w`
    })
    .join(', ')
}

/**
 * Ottieni URL ottimizzato per blur placeholder
 * Immagine tiny (20x20) con blur per LQIP
 */
export function getSanityBlurUrl(src: string): string {
  if (typeof src === 'string' && src.startsWith('http')) {
    const url = new URL(src)
    url.searchParams.set('w', '20')
    url.searchParams.set('h', '20')
    url.searchParams.set('blur', '50')
    url.searchParams.set('q', '20')
    return url.toString()
  }

  return builder.image(src).width(20).height(20).blur(50).quality(20).url()
}
