/**
 * Structured Data (JSON-LD) Utilities for AntPit Lab Portfolio
 * Schema.org compliant structured data for SEO optimization
 *
 * Resources:
 * - https://schema.org/
 * - https://developers.google.com/search/docs/appearance/structured-data
 * - https://validator.schema.org/
 */

import { urlFor } from "@/lib/sanity/imageBuilder";

/**
 * Sanity Types (importa dai tipi reali quando disponibili)
 */
interface SanityImage {
  asset?: {
    _id: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  alt?: string;
}

interface Project {
  _id: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug: { current: string };
  description?: string;
  coverImage: SanityImage;
  gallery?: SanityImage[];
  category?: {
    _id: string;
    title: string;
    slug: { current: string };
  };
  tags?: string[];
  date: string;
  location?: string;
  client?: string;
}

interface Settings {
  siteTitle?: string;
  siteDescription?: string;
  profileImage?: SanityImage;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

/**
 * Generate Person schema for photographer/portfolio owner
 * Used on: Homepage, About page
 */
export function generatePersonSchema(settings: Settings | null) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings?.siteTitle || "AntPit Lab",
    url: "https://antpitlab.com",
    image: settings?.profileImage?.asset?.url
      ? urlFor(settings.profileImage).width(800).url()
      : undefined,
    jobTitle: "Fotografo Professionista",
    description: settings?.siteDescription || "Portfolio fotografico professionale",
    knowsAbout: [
      "Fotografia",
      "Ritrattistica",
      "Fotografia di Paesaggio",
      "Fotografia di Eventi",
      "Street Photography",
    ],
    sameAs: [
      settings?.socialLinks?.instagram,
      settings?.socialLinks?.facebook,
      settings?.socialLinks?.linkedin,
      settings?.socialLinks?.youtube,
    ].filter(Boolean),
  };

  // Add contact point if email or phone available
  if (settings?.contactInfo?.email || settings?.contactInfo?.phone) {
    Object.assign(schema, {
      contactPoint: {
        "@type": "ContactPoint",
        email: settings.contactInfo?.email,
        telephone: settings.contactInfo?.phone,
        contactType: "customer service",
        availableLanguage: "Italian",
      },
    });
  }

  return schema;
}

/**
 * Generate ImageObject schema for individual project images
 * Used on: Single project pages
 */
export function generateImageObjectSchema(project: Project) {
  const imageUrl = project.coverImage?.asset?.url
    ? urlFor(project.coverImage).width(1200).quality(90).url()
    : "";

  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: imageUrl,
    name: project.title,
    description: project.description || `Progetto fotografico: ${project.title}`,
    author: {
      "@type": "Person",
      name: "AntPit Lab",
    },
    datePublished: project.date,
    copyrightNotice: `© ${new Date(project.date).getFullYear()} AntPit Lab`,
    creditText: "AntPit Lab",
    thumbnailUrl: project.coverImage?.asset?.url
      ? urlFor(project.coverImage).width(400).url()
      : undefined,
    encodingFormat: "image/jpeg",
    ...(project.location && { contentLocation: project.location }),
  };
}

/**
 * Generate Photograph schema for project detail page
 * More specific than ImageObject for photography portfolios
 * Used on: Single project pages
 */
export function generatePhotographSchema(project: Project) {
  const imageUrl = project.coverImage?.asset?.url
    ? urlFor(project.coverImage).width(1200).quality(90).url()
    : "";

  return {
    "@context": "https://schema.org",
    "@type": "Photograph",
    name: project.title,
    description: project.description,
    image: imageUrl,
    url: `https://antpitlab.com/portfolio/${project.slug.current}`,
    creator: {
      "@type": "Person",
      name: "AntPit Lab",
    },
    dateCreated: project.date,
    genre: project.category?.title || "Photography",
    keywords: project.tags?.join(", "),
    copyrightHolder: {
      "@type": "Person",
      name: "AntPit Lab",
    },
    copyrightYear: new Date(project.date).getFullYear(),
    ...(project.location && { locationCreated: project.location }),
  };
}

/**
 * Generate ImageGallery schema for project with multiple images
 * Used on: Single project pages with gallery
 */
export function generateImageGallerySchema(project: Project) {
  if (!project.gallery || project.gallery.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${project.title} - Galleria`,
    description: project.description,
    about: {
      "@type": "Photograph",
      name: project.title,
    },
    associatedMedia: project.gallery.map((image, index) => ({
      "@type": "ImageObject",
      contentUrl: image.asset?.url ? urlFor(image).width(1200).url() : "",
      name: image.alt || `${project.title} - Immagine ${index + 1}`,
      position: index + 1,
    })),
  };
}

/**
 * Generate CreativeWork schema for portfolio collection
 * Used on: Portfolio page
 */
export function generatePortfolioSchema(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": "https://antpitlab.com/portfolio",
    name: "Portfolio Fotografico AntPit Lab",
    description: "Collezione completa di progetti fotografici professionali",
    author: {
      "@type": "Person",
      name: "AntPit Lab",
    },
    hasPart: projects.slice(0, 12).map((project) => ({
      "@type": "Photograph",
      name: project.title,
      image: project.coverImage?.asset?.url ? urlFor(project.coverImage).width(800).url() : "",
      dateCreated: project.date,
      genre: project.category?.title,
    })),
  };
}

/**
 * Generate BreadcrumbList schema for navigation hierarchy
 * Used on: All pages for better navigation understanding
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate WebSite schema for homepage
 * Used on: Homepage only
 */
export function generateWebSiteSchema(settings: Settings | null) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://antpitlab.com/#website",
    name: settings?.siteTitle || "AntPit Lab",
    description: settings?.siteDescription || "Portfolio fotografico professionale",
    url: "https://antpitlab.com",
    inLanguage: "it-IT",
    publisher: {
      "@type": "Person",
      name: "AntPit Lab",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://antpitlab.com/portfolio?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate CollectionPage schema for category pages
 * Used on: Category pages
 */
export function generateCollectionPageSchema(
  category: { title: string; slug: { current: string }; description?: string },
  projects: Project[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.title} - Portfolio`,
    description: category.description || `Progetti di ${category.title}`,
    url: `https://antpitlab.com/portfolio/${category.slug.current}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Photograph",
          name: project.title,
          image: project.coverImage?.asset?.url ? urlFor(project.coverImage).width(800).url() : "",
          url: `https://antpitlab.com/portfolio/${project.slug.current}`,
        },
      })),
    },
  };
}

/**
 * Helper to safely stringify JSON-LD for script tag
 * Escapes special characters to prevent XSS
 */
export function stringifyJsonLd(data: object): string {
  return JSON.stringify(data, null, 2)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/**
 * Export all schema types for convenience
 */
export const StructuredDataSchemas = {
  person: generatePersonSchema,
  imageObject: generateImageObjectSchema,
  photograph: generatePhotographSchema,
  imageGallery: generateImageGallerySchema,
  portfolio: generatePortfolioSchema,
  breadcrumb: generateBreadcrumbSchema,
  website: generateWebSiteSchema,
  collectionPage: generateCollectionPageSchema,
};
