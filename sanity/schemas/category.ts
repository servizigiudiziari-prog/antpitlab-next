import { defineType, defineField } from 'sanity'
import { TagIcon } from '@sanity/icons'

export default defineType({
  name: 'category',
  title: 'Categoria',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Nome Categoria',
      description: 'Nome della categoria (es: Matrimoni, Ritratti)',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug URL',
      description: 'URL univoco per la categoria',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, ''),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Descrizione',
      description: 'Descrizione della categoria (per SEO e presentazione)',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'color',
      type: 'color',
      title: 'Colore Accent',
      description: 'Colore distintivo per la categoria (usato nella UI)',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Immagine Copertina',
      description: 'Immagine rappresentativa della categoria (opzionale)',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip'],
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Testo Alternativo',
        },
      ],
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Ordine',
      description: 'Numero per ordinare le categorie (0 = prima)',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'In Evidenza',
      description: 'Mostra questa categoria nella homepage',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      order: 'order',
      color: 'color.hex',
    },
    prepare({ title, media, order, color }) {
      return {
        title,
        subtitle: `Ordine: ${order}${color ? ` - ${color}` : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Ordine personalizzato',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Nome A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
