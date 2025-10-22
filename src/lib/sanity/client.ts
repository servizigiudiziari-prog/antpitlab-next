import { createClient } from 'next-sanity'

/**
 * Configurazione base client Sanity
 * - useCdn: true per performance in produzione (cache CDN)
 * - apiVersion: data fissa per garantire stabilità API
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-21',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
})

/**
 * Client per operazioni in preview/draft mode
 * - useCdn: false per avere sempre dati aggiornati
 * - token: necessario per accedere a contenuti draft
 */
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-21',
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_TOKEN,
})

/**
 * Client intelligente che sceglie automaticamente tra preview e published
 */
export function getClient(preview?: boolean) {
  return preview ? previewClient : client
}
