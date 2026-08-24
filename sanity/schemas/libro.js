/**
 * Schema Sanity per LIBRI
 */

export default {
  name: 'libro',
  title: 'Libri',
  type: 'document',
  icon: () => '📚',
  fields: [
    {
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'sottotitolo',
      title: 'Sottotitolo',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titolo',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'copertina',
      title: 'Copertina',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Testo alternativo',
          type: 'string',
          description: 'Importante per SEO e accessibilità'
        }
      ]
    },
    {
      name: 'anno',
      title: 'Anno di pubblicazione',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(2100)
    },
    {
      name: 'genere',
      title: 'Genere',
      type: 'string',
      options: {
        list: [
          { title: 'Narrativa', value: 'narrativa' },
          { title: 'Saggio', value: 'saggio' },
          { title: 'Thriller', value: 'thriller' },
          { title: 'Giallo', value: 'giallo' },
          { title: 'Storico', value: 'storico' },
          { title: 'Filosofico', value: 'filosofico' },
          { title: 'Romanzo', value: 'romanzo' },
          { title: 'Altro', value: 'altro' }
        ]
      }
    },
    {
      name: 'descrizione',
      title: 'Descrizione / Sinossi',
      type: 'text',
      rows: 4,
      description: '2-3 frasi accattivanti per invogliare alla lettura'
    },
    {
      name: 'linkAmazon',
      title: 'Link Amazon',
      type: 'url',
      description: 'Link diretto alla pagina Amazon del libro'
    },
    {
      name: 'stato',
      title: 'Stato',
      type: 'string',
      options: {
        list: [
          { title: 'Pubblicato', value: 'pubblicato' },
          { title: 'In arrivo', value: 'in_arrivo' },
          { title: 'Bozza', value: 'bozza' }
        ]
      },
      initialValue: 'pubblicato'
    },
    {
      name: 'dataUscita',
      title: 'Data di uscita (per libri in arrivo)',
      type: 'date',
      description: 'Opzionale - solo per libri in arrivo'
    },
    {
      name: 'estratto',
      title: 'Estratto',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Opzionale - un estratto del libro da mostrare'
    },
    {
      name: 'ordine',
      title: 'Ordine di visualizzazione',
      type: 'number',
      description: 'Numero più basso appare per primo'
    }
  ],
  preview: {
    select: {
      title: 'titolo',
      sottotitolo: 'sottotitolo',
      media: 'copertina',
      anno: 'anno'
    },
    prepare(selection) {
      const { title, sottotitolo, anno } = selection
      return {
        title: title,
        subtitle: sottotitolo ? `${sottotitolo} (${anno})` : anno?.toString()
      }
    }
  }
}
