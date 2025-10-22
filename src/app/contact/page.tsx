import { Metadata } from 'next'
import Script from 'next/script'
import { client } from '@/lib/sanity/client'
import { SETTINGS_QUERY } from '@/lib/sanity/queries'
import { generateBreadcrumbSchema, stringifyJsonLd } from '@/lib/utils/structured-data'

export const metadata: Metadata = {
  title: 'Contatti',
  description:
    'Contatta AntPit Lab per servizi fotografici professionali, collaborazioni e richieste di preventivo.',
  openGraph: {
    title: 'Contatti | AntPit Lab',
    description: 'Contattami per servizi fotografici e collaborazioni.',
    url: 'https://antpitlab.com/contact',
    type: 'website'
  },
  alternates: {
    canonical: 'https://antpitlab.com/contact'
  }
}

export default async function ContactPage() {
  const settings = await client.fetch(SETTINGS_QUERY)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://antpitlab.com' },
    { name: 'Contatti', url: 'https://antpitlab.com/contact' }
  ])

  return (
    <>
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
            Contatti
          </h1>
          <p className="text-text-secondary text-center mb-4">
            Form di contatto in arrivo...
          </p>
          {settings?.contactInfo?.email && (
            <p className="text-center text-sm">
              Email: {settings.contactInfo.email}
            </p>
          )}
        </div>
      </main>
    </>
  )
}
