/**
 * Sanity Client per Frontend
 */

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // `false` se vuoi dati sempre freschi
  apiVersion: '2024-01-01',
})

// Helper per generare URL immagini
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Query helper
export async function getLibri() {
  return client.fetch(`
    *[_type == "libro"] | order(ordine asc, anno desc) {
      _id,
      titolo,
      sottotitolo,
      slug,
      copertina,
      anno,
      genere,
      descrizione,
      linkAmazon,
      stato,
      dataUscita
    }
  `)
}

export async function getSaggi() {
  return client.fetch(`
    *[_type == "saggio"] | order(data desc) {
      _id,
      titolo,
      slug,
      data,
      abstract,
      categoria,
      linkEsterno
    }
  `)
}

export async function getRacconti() {
  return client.fetch(`
    *[_type == "racconto"] | order(data desc) {
      _id,
      titolo,
      slug,
      data,
      anteprima,
      categoria,
      immagine,
      tempoLettura
    }
  `)
}

export async function getPoesie() {
  return client.fetch(`
    *[_type == "poesia"] | order(data desc) {
      _id,
      titolo,
      slug,
      testo,
      data,
      collezione,
      tema
    }
  `)
}

export async function getArticoliBlog() {
  return client.fetch(`
    *[_type == "articoloBlog" && pubblicato == true] | order(data desc) {
      _id,
      titolo,
      slug,
      data,
      sommario,
      immagineCopertina,
      tag
    }
  `)
}

// Query per singolo elemento
export async function getLibroBySlug(slug) {
  return client.fetch(`
    *[_type == "libro" && slug.current == $slug][0] {
      _id,
      titolo,
      sottotitolo,
      slug,
      copertina,
      anno,
      genere,
      descrizione,
      linkAmazon,
      stato,
      estratto
    }
  `, { slug })
}

export async function getArticoloBlogBySlug(slug) {
  return client.fetch(`
    *[_type == "articoloBlog" && slug.current == $slug && pubblicato == true][0] {
      _id,
      titolo,
      slug,
      data,
      sommario,
      immagineCopertina,
      contenuto,
      tag
    }
  `, { slug })
}
