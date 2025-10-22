import type { PortableTextBlock } from '@portabletext/types'
import type { Image as SanityImageType } from 'sanity'

/**
 * TypeScript types per i documenti Sanity
 * Corrispondono agli schemi definiti in /sanity/schemas/
 */

// ============================================
// BASE TYPES
// ============================================

export interface SanityImage extends SanityImageType {
  asset: {
    _id: string
    url: string
    metadata?: {
      lqip?: string
      dimensions?: {
        width: number
        height: number
        aspectRatio: number
      }
      palette?: {
        dominant?: {
          background: string
          foreground: string
        }
      }
      exif?: {
        ISO?: number
        FNumber?: number
        ExposureTime?: number
        FocalLength?: number
      }
    }
  }
  alt?: string
  caption?: string
}

export interface Slug {
  current: string
  _type: 'slug'
}

export interface Color {
  hex: string
  alpha?: number
  hsl?: {
    h: number
    s: number
    l: number
    a: number
  }
  hsv?: {
    h: number
    s: number
    v: number
    a: number
  }
  rgb?: {
    r: number
    g: number
    b: number
    a: number
  }
}

// ============================================
// DOCUMENT TYPES
// ============================================

/**
 * Tipo: Progetto Fotografico
 */
export interface Project {
  _id: string
  _type: 'project'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: Slug
  description?: string
  coverImage: SanityImage
  gallery?: SanityImage[]
  category?: Category
  tags?: string[]
  date: string
  location?: string
  client?: string
  featured?: boolean
  published?: boolean
  order?: number
  // Campi calcolati (da query)
  nextProject?: ProjectPreview
  prevProject?: ProjectPreview
}

/**
 * Tipo: Anteprima Progetto (versione ridotta)
 */
export interface ProjectPreview {
  _id: string
  title: string
  slug: Slug
  description?: string
  coverImage: SanityImage
  category?: Pick<Category, '_id' | 'title' | 'slug' | 'color'>
  date: string
  location?: string
  featured?: boolean
}

/**
 * Tipo: Categoria
 */
export interface Category {
  _id: string
  _type: 'category'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: Slug
  description?: string
  color?: Color
  coverImage?: SanityImage
  order?: number
  featured?: boolean
  // Campi calcolati (da query)
  projectCount?: number
  projects?: ProjectPreview[]
}

/**
 * Tipo: Impostazioni Sito (Singleton)
 */
export interface Settings {
  _id: string
  _type: 'settings'
  siteTitle: string
  siteDescription: string
  siteKeywords?: string[]
  ogImage?: SanityImage
  socialLinks?: {
    instagram?: string
    facebook?: string
    whatsapp?: string
    youtube?: string
    linkedin?: string
  }
  contactInfo: {
    email: string
    phone?: string
    address?: string
  }
  aboutText?: PortableTextBlock[]
  profileImage?: SanityImage
  footerText?: string
  enableWatermark?: boolean
  watermarkText?: string
}

// ============================================
// QUERY RESULT TYPES
// ============================================

/**
 * Risultato query: Homepage Stats
 */
export interface HomepageStats {
  totalProjects: number
  totalCategories: number
  featuredProjects: number
}

/**
 * Risultato query: Progetti con paginazione
 */
export interface PaginatedProjects {
  projects: ProjectPreview[]
  total: number
  hasMore: boolean
}

/**
 * Risultato query: Slug per sitemap
 */
export interface SitemapSlug {
  slug: string
  _updatedAt: string
}

// ============================================
// UTILITY TYPES
// ============================================

/**
 * Tipo helper per riferimenti Sanity
 */
export interface Reference {
  _ref: string
  _type: 'reference'
}

/**
 * Tipo base per tutti i documenti Sanity
 */
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

/**
 * Parametri comuni per queries
 */
export interface QueryOptions {
  preview?: boolean
  cache?: RequestCache
  next?: {
    revalidate?: number
    tags?: string[]
  }
}

// ============================================
// TYPE GUARDS
// ============================================

/**
 * Type guard: Verifica se un valore è un Project
 */
export function isProject(value: unknown): value is Project {
  return (
    typeof value === 'object' &&
    value !== null &&
    '_type' in value &&
    value._type === 'project'
  )
}

/**
 * Type guard: Verifica se un valore è una Category
 */
export function isCategory(value: unknown): value is Category {
  return (
    typeof value === 'object' &&
    value !== null &&
    '_type' in value &&
    value._type === 'category'
  )
}

/**
 * Type guard: Verifica se un valore è Settings
 */
export function isSettings(value: unknown): value is Settings {
  return (
    typeof value === 'object' &&
    value !== null &&
    '_type' in value &&
    value._type === 'settings'
  )
}

// ============================================
// FORM TYPES (per contact/newsletter)
// ============================================

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  subject?: string
  projectType?: string
}

export interface NewsletterFormData {
  email: string
  name?: string
}
