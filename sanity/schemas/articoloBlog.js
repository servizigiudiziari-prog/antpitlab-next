/**
 * Schema Sanity per BLOG
 */

export default {
  name: 'articoloBlog',
  title: 'Blog',
  type: 'document',
  icon: () => '✍️',
  fields: [
    {
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
      validation: (Rule) => Rule.required()
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
      name: 'data',
      title: 'Data di pubblicazione',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'sommario',
      title: 'Sommario',
      type: 'text',
      rows: 3,
      description: 'Breve riassunto dell\'articolo (apparirà in anteprima)'
    },
    {
      name: 'immagineCopertina',
      title: 'Immagine di copertina',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Testo alternativo',
          type: 'string'
        }
      ]
    },
    {
      name: 'contenuto',
      title: 'Contenuto',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normale', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Citazione', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Grassetto', value: 'strong' },
              { title: 'Corsivo', value: 'em' },
              { title: 'Sottolineato', value: 'underline' }
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
                    title: 'URL'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Testo alternativo'
            }
          ]
        }
      ],
      validation: (Rule) => Rule.required()
    },
    {
      name: 'tag',
      title: 'Tag',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'pubblicato',
      title: 'Pubblicato',
      type: 'boolean',
      initialValue: true,
      description: 'Disattiva per salvare come bozza'
    }
  ],
  preview: {
    select: {
      title: 'titolo',
      media: 'immagineCopertina',
      data: 'data',
      pubblicato: 'pubblicato'
    },
    prepare(selection) {
      const { title, data, pubblicato } = selection
      return {
        title: title,
        subtitle: `${new Date(data).toLocaleDateString('it-IT')} ${!pubblicato ? '(Bozza)' : ''}`
      }
    }
  }
}
