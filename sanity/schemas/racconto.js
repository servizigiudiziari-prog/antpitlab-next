/**
 * Schema Sanity per RACCONTI
 */

export default {
  name: 'racconto',
  title: 'Racconti',
  type: 'document',
  icon: () => '📖',
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
      name: 'sottotitolo',
      title: 'Sottotitolo',
      type: 'string'
    },
    {
      name: 'anteprima',
      title: 'Anteprima',
      type: 'text',
      rows: 3,
      description: 'Breve descrizione del racconto (1-2 frasi)'
    },
    {
      name: 'testo',
      title: 'Testo completo',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required()
    },
    {
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Narrativa', value: 'narrativa' },
          { title: 'Fantasy', value: 'fantasy' },
          { title: 'Fantascienza', value: 'fantascienza' },
          { title: 'Thriller', value: 'thriller' },
          { title: 'Realismo', value: 'realismo' },
          { title: 'Sperimentale', value: 'sperimentale' },
          { title: 'Altro', value: 'altro' }
        ]
      }
    },
    {
      name: 'immagine',
      title: 'Immagine di copertina',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'tempoLettura',
      title: 'Tempo di lettura (minuti)',
      type: 'number',
      description: 'Stima del tempo di lettura'
    }
  ],
  preview: {
    select: {
      title: 'titolo',
      media: 'immagine',
      data: 'data'
    },
    prepare(selection) {
      const { title, data } = selection
      return {
        title: title,
        subtitle: new Date(data).toLocaleDateString('it-IT')
      }
    }
  }
}
