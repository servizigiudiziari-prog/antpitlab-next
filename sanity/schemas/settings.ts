import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'settings',
  title: 'Impostazioni Sito',
  type: 'document',
  icon: CogIcon,
  // Singleton: solo un documento
  fields: [
    defineField({
      name: 'siteTitle',
      type: 'string',
      title: 'Titolo Sito',
      description: 'Nome del sito (usato nel browser e SEO)',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'siteDescription',
      type: 'text',
      title: 'Descrizione Sito',
      description: 'Descrizione breve per SEO e social media',
      rows: 3,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'siteKeywords',
      type: 'array',
      title: 'Parole Chiave SEO',
      description: 'Keywords principali per il sito',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      title: 'Immagine Social Share',
      description:
        'Immagine mostrata quando il sito viene condiviso (1200x630px)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'socialLinks',
      type: 'object',
      title: 'Link Social Media',
      description: 'Profili social del fotografo',
      fields: [
        {
          name: 'instagram',
          type: 'url',
          title: 'Instagram',
          description: 'URL profilo Instagram',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }),
        },
        {
          name: 'facebook',
          type: 'url',
          title: 'Facebook',
          description: 'URL pagina Facebook',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }),
        },
        {
          name: 'whatsapp',
          type: 'string',
          title: 'WhatsApp',
          description: 'Numero WhatsApp (formato: +39XXXXXXXXXX)',
          validation: (Rule) =>
            Rule.regex(/^\+[1-9]\d{1,14}$/, {
              name: 'phone',
              invert: false,
            }).error('Inserisci un numero in formato internazionale (+39...)'),
        },
        {
          name: 'youtube',
          type: 'url',
          title: 'YouTube',
          description: 'URL canale YouTube',
        },
        {
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn',
          description: 'URL profilo LinkedIn',
        },
      ],
    }),
    defineField({
      name: 'contactInfo',
      type: 'object',
      title: 'Informazioni Contatto',
      description: 'Dati di contatto del fotografo',
      fields: [
        {
          name: 'email',
          type: 'string',
          title: 'Email',
          description: 'Email principale',
          validation: (Rule) =>
            Rule.required()
              .email()
              .error('Inserisci un indirizzo email valido'),
        },
        {
          name: 'phone',
          type: 'string',
          title: 'Telefono',
          description: 'Numero di telefono (formato: +39 XXX XXX XXXX)',
        },
        {
          name: 'address',
          type: 'text',
          title: 'Indirizzo',
          description: 'Indirizzo studio/ufficio (opzionale)',
          rows: 2,
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutText',
      type: 'array',
      title: 'Testo Sezione About',
      description: 'Biografia o presentazione del fotografo',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'profileImage',
      type: 'image',
      title: 'Foto Profilo',
      description: 'Foto del fotografo per la sezione About',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip'],
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Testo Alternativo',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'footerText',
      type: 'text',
      title: 'Testo Footer',
      description: 'Testo breve per il footer del sito',
      rows: 2,
    }),
    defineField({
      name: 'enableWatermark',
      type: 'boolean',
      title: 'Abilita Watermark',
      description: 'Applica watermark automatico alle immagini',
      initialValue: true,
    }),
    defineField({
      name: 'watermarkText',
      type: 'string',
      title: 'Testo Watermark',
      description: 'Testo da usare come watermark (es: © AntPit Lab)',
      initialValue: '© AntPit Lab',
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'siteDescription',
    },
  },
})
