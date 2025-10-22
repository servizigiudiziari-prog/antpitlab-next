import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  name: 'project',
  title: 'Progetto Fotografico',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titolo',
      description: 'Nome del progetto fotografico',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug URL',
      description: 'URL univoco per il progetto (es: matrimonio-villa-antica)',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Descrizione',
      description: 'Descrizione breve del progetto (max 500 caratteri)',
      rows: 4,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Immagine Copertina',
      description: 'Immagine principale del progetto (ratio 16:9 consigliato)',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Testo Alternativo',
          description: 'Descrizione immagine per accessibilità e SEO',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Galleria Foto',
      description: 'Collezione di foto del progetto (max 50 immagini)',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette', 'exif'],
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Didascalia',
              description: 'Descrizione della foto',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Testo Alternativo',
              description: 'Descrizione per accessibilità',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Categoria',
      description: 'Categoria del progetto (es: Matrimoni, Ritratti)',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      description: 'Parole chiave per il progetto (es: outdoor, studio, vintage)',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      title: 'Data Progetto',
      description: 'Data di realizzazione del servizio fotografico',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Luogo',
      description: 'Location del servizio (es: Roma, Villa Borghese)',
    }),
    defineField({
      name: 'client',
      type: 'string',
      title: 'Cliente',
      description: 'Nome del cliente (opzionale)',
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'In Evidenza Homepage',
      description: 'Mostra questo progetto nella homepage',
      initialValue: false,
    }),
    defineField({
      name: 'published',
      type: 'boolean',
      title: 'Pubblicato',
      description: 'Rendi visibile il progetto sul sito',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Ordine Visualizzazione',
      description: 'Numero per ordinare i progetti (0 = primo)',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      category: 'category.title',
      date: 'date',
      published: 'published',
    },
    prepare({ title, media, category, date, published }) {
      const dateString = date
        ? new Date(date).toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'short',
          })
        : 'No date'
      return {
        title: `${published ? '✓' : '✗'} ${title}`,
        subtitle: `${category || 'No category'} - ${dateString}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Data (più recente)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Data (più vecchia)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
    {
      title: 'Ordine personalizzato',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'date', direction: 'desc' },
      ],
    },
  ],
})
