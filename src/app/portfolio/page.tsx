import { Metadata } from 'next'
import Script from 'next/script'
import { client } from '@/lib/sanity/client'
import { ALL_PROJECTS_QUERY } from '@/lib/sanity/queries'
import {
  generatePortfolioSchema,
  generateBreadcrumbSchema,
  stringifyJsonLd
} from '@/lib/utils/structured-data'

/**
 * Incremental Static Regeneration (ISR)
 * Revalidate ogni ora per mantenere contenuto fresco
 */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Esplora il portfolio fotografico completo di AntPit Lab. Progetti di ritratti, paesaggi, eventi e street photography.',
  openGraph: {
    title: 'Portfolio Fotografico | AntPit Lab',
    description: 'Collezione completa di progetti fotografici professionali.',
    url: 'https://antpitlab.com/portfolio',
    type: 'website'
  },
  alternates: {
    canonical: 'https://antpitlab.com/portfolio'
  }
}

export default async function PortfolioPage() {
  // Fetch all published projects
  const projects = await client.fetch(ALL_PROJECTS_QUERY)

  // Generate structured data
  const portfolioSchema = generatePortfolioSchema(projects)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://antpitlab.com' },
    { name: 'Portfolio', url: 'https://antpitlab.com/portfolio' }
  ])

  return (
    <>
      {/* Structured Data JSON-LD */}
      <Script
        id="portfolio-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(portfolioSchema)
        }}
      />

      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(breadcrumbSchema)
        }}
      />

      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between">
          <h1 className="text-4xl font-heading font-bold text-center mb-8">
            Portfolio
          </h1>
          <p className="text-text-secondary text-center mb-4">
            Galleria fotografica in arrivo...
          </p>
          <p className="text-sm text-text-secondary text-center">
            {projects.length} progetti pubblicati
          </p>
        </div>
      </main>
    </>
  )
}
