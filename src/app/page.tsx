import Script from 'next/script'
import { client } from '@/lib/sanity/client'
import { SETTINGS_QUERY, FEATURED_PROJECTS_QUERY } from '@/lib/sanity/queries'
import {
  generatePersonSchema,
  generateWebSiteSchema,
  stringifyJsonLd
} from '@/lib/utils/structured-data'

export default async function Home() {
  // Fetch data from Sanity
  const [settings, featuredProjects] = await Promise.all([
    client.fetch(SETTINGS_QUERY),
    client.fetch(FEATURED_PROJECTS_QUERY)
  ])

  // Generate structured data
  const personSchema = generatePersonSchema(settings)
  const websiteSchema = generateWebSiteSchema(settings)

  return (
    <>
      {/* Structured Data JSON-LD */}
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(personSchema)
        }}
      />

      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(websiteSchema)
        }}
      />

      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-heading font-bold text-center mb-8">
            AntPit Lab
          </h1>
          <p className="text-text-secondary text-center mb-4">
            Portfolio Fotografico Professionale
          </p>
          <div className="mt-8 text-center">
            <p className="text-sm text-text-secondary">
              {featuredProjects?.length || 0} progetti in evidenza
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
