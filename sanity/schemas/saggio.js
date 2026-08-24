/**
 * Schema Sanity per SAGGI
 */

export default {
  name: 'saggio',
  title: 'Saggi',
  type: 'document',
  icon: () => '📄',
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
      type: 'date',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      rows: 3,
      description: 'Breve riassunto del saggio'
    },
    {
      name: 'contenuto',
      title: 'Contenuto',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Filosofia', value: 'filosofia' },
          { title: 'Letteratura', value: 'letteratura' },
          { title: 'Storia', value: 'storia' },
          { title: 'Arte', value: 'arte' },
          { title: 'Società', value: 'societa' },
          { title: 'Altro', value: 'altro' }
        ]
      }
    },
    {
      name: 'pdf',
      title: 'File PDF',
      type: 'file',
      options: {
        accept: '.pdf'
      }
    },
    {
      name: 'linkEsterno',
      title: 'Link esterno',
      type: 'url',
      description: 'Opzionale - link a pubblicazione su altro sito'
    }
  ],
  preview: {
    select: {
      title: 'titolo',
      data: 'data',
      categoria: 'categoria'
    },
    prepare(selection) {
      const { title, data, categoria } = selection
      return {
        title: title,
        subtitle: `${categoria} - ${new Date(data).getFullYear()}`
      }
    }
  }
}
