import { Metadata } from 'next'
import Script from 'next/script'
import { client } from '@/lib/sanity/client'
import { SETTINGS_QUERY } from '@/lib/sanity/queries'
import {
  generatePersonSchema,
  generateBreadcrumbSchema,
  stringifyJsonLd
} from '@/lib/utils/structured-data'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Scopri di più su AntPit Lab, fotografo professionista specializzato in ritratti, paesaggi, eventi e street photography.',
  openGraph: {
    title: 'About | AntPit Lab',
    description: 'Fotografo professionista con passione per la narrazione visiva.',
    url: 'https://antpitlab.com/about',
    type: 'profile'
  },
  alternates: {
    canonical: 'https://antpitlab.com/about'
  }
}

export default async function AboutPage() {
  const settings = await client.fetch(SETTINGS_QUERY)

  const personSchema = generatePersonSchema(settings)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://antpitlab.com' },
    { name: 'About', url: 'https://antpitlab.com/about' }
  ])

  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(personSchema)
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
            About
          </h1>
          <p className="text-text-secondary text-center">
            Informazioni sul fotografo in arrivo...
          </p>
        </div>
      </main>
    </>
  )
}
