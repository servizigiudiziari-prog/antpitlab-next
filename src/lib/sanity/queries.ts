import { groq } from 'next-sanity'

/**
 * GROQ Queries per AntPit Lab Portfolio
 * Documentazione GROQ: https://www.sanity.io/docs/groq
 *
 * Best practices:
 * - Usare proiezioni {} per limitare i campi ritornati
 * - Ordinare con | order() per performance
 * - Usare coalesce() per valori di fallback
 * - Includere solo i dati necessari alla view
 */

// ============================================
// HOMEPAGE QUERIES
// ============================================

/**
 * Query: Progetti in evidenza per la homepage
 * Ritorna max 6 progetti marcati come "featured"
 * Ordinati per order ascendente, poi per data discendente
 * Performance target: <200ms
 */
export const FEATURED_PROJECTS_QUERY = groq`
  *[_type == "project" && featured == true && published == true]
  | order(order asc, date desc)
  [0...6] {
    _id,
    _createdAt,
    title,
    slug,
    description,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt
    },
    category->{
      _id,
      title,
      slug,
      color
    },
    date,
    location
  }
`

/**
 * Query: Statistiche homepage (conteggi)
 * Ritorna numero totale di progetti e categorie
 */
export const HOMEPAGE_STATS_QUERY = groq`
  {
    "totalProjects": count(*[_type == "project" && published == true]),
    "totalCategories": count(*[_type == "category"]),
    "featuredProjects": count(*[_type == "project" && featured == true && published == true])
  }
`

// ============================================
// PORTFOLIO QUERIES
// ============================================

/**
 * Query: Tutti i progetti pubblicati
 * Per la pagina portfolio con filtri
 * Performance target: <500ms
 */
export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project" && published == true]
  | order(order asc, date desc) {
    _id,
    _createdAt,
    title,
    slug,
    description,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt
    },
    category->{
      _id,
      title,
      slug,
      color
    },
    tags,
    date,
    location,
    featured
  }
`

/**
 * Query: Progetti filtrati per categoria
 * @param categorySlug - Slug della categoria
 */
export const PROJECTS_BY_CATEGORY_QUERY = groq`
  *[_type == "project" && published == true && category->slug.current == $categorySlug]
  | order(order asc, date desc) {
    _id,
    title,
    slug,
    description,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt
    },
    category->{
      title,
      slug,
      color
    },
    date,
    location
  }
`

/**
 * Query: Progetti con paginazione
 * @param start - Indice di partenza
 * @param end - Indice di fine
 */
export const PAGINATED_PROJECTS_QUERY = groq`
  *[_type == "project" && published == true]
  | order(order asc, date desc)
  [$start...$end] {
    _id,
    title,
    slug,
    description,
    coverImage {
      asset->{
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt
    },
    category->{
      title,
      slug,
      color
    },
    date
  }
`

// ============================================
// SINGLE PROJECT QUERIES
// ============================================

/**
 * Query: Singolo progetto per slug
 * Include galleria completa e metadati estesi
 * @param slug - Slug del progetto
 */
export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug && published == true][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions,
          palette {
            dominant {
              background,
              foreground
            }
          }
        }
      },
      alt
    },
    gallery[] {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions,
          exif {
            ISO,
            FNumber,
            ExposureTime,
            FocalLength
          }
        }
      },
      alt,
      caption
    },
    category->{
      _id,
      title,
      slug,
      description,
      color
    },
    tags,
    date,
    location,
    client,
    "nextProject": *[_type == "project" && published == true && date < ^.date] | order(date desc) [0] {
      title,
      slug,
      coverImage {
        asset->{ url, metadata { lqip } },
        alt
      }
    },
    "prevProject": *[_type == "project" && published == true && date > ^.date] | order(date asc) [0] {
      title,
      slug,
      coverImage {
        asset->{ url, metadata { lqip } },
        alt
      }
    }
  }
`

/**
 * Query: Progetti correlati (stessa categoria, escluso corrente)
 * @param categoryId - ID della categoria
 * @param currentId - ID del progetto corrente da escludere
 */
export const RELATED_PROJECTS_QUERY = groq`
  *[_type == "project"
    && published == true
    && category._ref == $categoryId
    && _id != $currentId
  ] | order(date desc) [0...4] {
    _id,
    title,
    slug,
    coverImage {
      asset->{ url, metadata { lqip, dimensions } },
      alt
    },
    category->{ title, slug },
    date
  }
`

// ============================================
// CATEGORY QUERIES
// ============================================

/**
 * Query: Tutte le categorie con conteggio progetti
 * Ordinata per order personalizzato
 */
export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    color,
    coverImage {
      asset->{ url, metadata { lqip } },
      alt
    },
    order,
    featured,
    "projectCount": count(*[_type == "project" && published == true && references(^._id)])
  }
`

/**
 * Query: Singola categoria per slug con progetti
 * @param slug - Slug della categoria
 */
export const CATEGORY_BY_SLUG_QUERY = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    color,
    coverImage {
      asset->{ url, metadata { lqip } },
      alt
    },
    "projects": *[_type == "project" && published == true && category._ref == ^._id]
      | order(date desc) {
        _id,
        title,
        slug,
        coverImage {
          asset->{ url, metadata { lqip, dimensions } },
          alt
        },
        date,
        location
      }
  }
`

/**
 * Query: Categorie in evidenza per homepage
 */
export const FEATURED_CATEGORIES_QUERY = groq`
  *[_type == "category" && featured == true] | order(order asc) [0...4] {
    _id,
    title,
    slug,
    description,
    color,
    coverImage {
      asset->{ url, metadata { lqip } },
      alt
    },
    "projectCount": count(*[_type == "project" && published == true && references(^._id)])
  }
`

// ============================================
// SETTINGS QUERIES
// ============================================

/**
 * Query: Impostazioni globali del sito
 * Singleton - ritorna sempre un solo documento
 */
export const SETTINGS_QUERY = groq`
  *[_type == "settings"][0] {
    _id,
    siteTitle,
    siteDescription,
    siteKeywords,
    ogImage {
      asset->{ url }
    },
    socialLinks {
      instagram,
      facebook,
      whatsapp,
      youtube,
      linkedin
    },
    contactInfo {
      email,
      phone,
      address
    },
    aboutText,
    profileImage {
      asset->{
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt
    },
    footerText,
    enableWatermark,
    watermarkText
  }
`

/**
 * Query: Solo info di contatto (per footer rapido)
 */
export const CONTACT_INFO_QUERY = groq`
  *[_type == "settings"][0] {
    contactInfo,
    socialLinks
  }
`

// ============================================
// SITEMAP & SEO QUERIES
// ============================================

/**
 * Query: Tutti gli slug dei progetti per sitemap
 * Ritorna solo slug e ultima modifica
 */
export const ALL_PROJECT_SLUGS_QUERY = groq`
  *[_type == "project" && published == true] {
    "slug": slug.current,
    _updatedAt
  }
`

/**
 * Query: Tutti gli slug delle categorie per sitemap
 */
export const ALL_CATEGORY_SLUGS_QUERY = groq`
  *[_type == "category"] {
    "slug": slug.current,
    _updatedAt
  }
`

// ============================================
// SEARCH QUERY
// ============================================

/**
 * Query: Ricerca full-text nei progetti
 * @param searchTerm - Termine di ricerca
 */
export const SEARCH_PROJECTS_QUERY = groq`
  *[_type == "project"
    && published == true
    && (
      title match $searchTerm
      || description match $searchTerm
      || $searchTerm in tags
    )
  ] | order(date desc) [0...20] {
    _id,
    title,
    slug,
    description,
    coverImage {
      asset->{ url, metadata { lqip } },
      alt
    },
    category->{ title, slug },
    date
  }
`

// ============================================
// ADMIN QUERIES (Draft mode)
// ============================================

/**
 * Query: Tutti i progetti (inclusi draft)
 * Usato in preview mode
 */
export const ALL_PROJECTS_ADMIN_QUERY = groq`
  *[_type == "project"] | order(_updatedAt desc) {
    _id,
    title,
    slug,
    published,
    featured,
    _updatedAt,
    category->{ title }
  }
`

/**
 * Helper type per type-safety
 * Esporta il tipo delle query per TypeScript
 */
export type QueryParams = {
  slug?: string
  categorySlug?: string
  categoryId?: string
  currentId?: string
  start?: number
  end?: number
  searchTerm?: string
}
