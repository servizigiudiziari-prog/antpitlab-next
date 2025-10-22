import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { ALL_PROJECTS_QUERY, CATEGORIES_QUERY } from '@/lib/sanity/queries'

/**
 * Dynamic Sitemap for AntPit Lab Portfolio
 * Automatically includes all published projects and categories from Sanity CMS
 *
 * Resources:
 * - https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * - https://www.sitemaps.org/protocol.html
 */

interface SitemapProject {
  slug: { current: string }
  _updatedAt?: string
  date: string
}

interface SitemapCategory {
  slug: { current: string }
  _updatedAt?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://antpitlab.com'

  try {
    // Fetch all published projects and categories from Sanity
    const [projects, categories] = await Promise.all([
      client.fetch<SitemapProject[]>(ALL_PROJECTS_QUERY),
      client.fetch<SitemapCategory[]>(CATEGORIES_QUERY)
    ])

    // Static pages with highest priority
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0
      },
      {
        url: `${baseUrl}/portfolio`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6
      }
    ]

    // Dynamic project pages
    const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug.current}`,
      lastModified: project._updatedAt
        ? new Date(project._updatedAt)
        : new Date(project.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8
    }))

    // Dynamic category pages
    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${baseUrl}/category/${category.slug.current}`,
      lastModified: category._updatedAt
        ? new Date(category._updatedAt)
        : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    }))

    // Combine all pages
    return [...staticPages, ...projectPages, ...categoryPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)

    // Fallback to static pages only if Sanity fetch fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0
      },
      {
        url: `${baseUrl}/portfolio`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6
      }
    ]
  }
}
