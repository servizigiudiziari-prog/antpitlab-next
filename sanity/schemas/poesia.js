/**
 * Schema Sanity per POESIE
 */

export default {
  name: 'poesia',
  title: 'Poesie',
  type: 'document',
  icon: () => '🖋️',
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
      name: 'testo',
      title: 'Testo della poesia',
      type: 'text',
      rows: 15,
      validation: (Rule) => Rule.required(),
      description: 'Il testo completo della poesia (con a-capo)'
    },
    {
      name: 'data',
      title: 'Data di composizione',
      type: 'date',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'collezione',
      title: 'Collezione / Raccolta',
      type: 'string',
      description: 'Opzionale - nome della raccolta a cui appartiene'
    },
    {
      name: 'tema',
      title: 'Tema',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Amore', value: 'amore' },
          { title: 'Natura', value: 'natura' },
          { title: 'Tempo', value: 'tempo' },
          { title: 'Memoria', value: 'memoria' },
          { title: 'Esistenza', value: 'esistenza' },
          { title: 'Morte', value: 'morte' },
          { title: 'Sogno', value: 'sogno' },
          { title: 'Silenzio', value: 'silenzio' },
          { title: 'Altro', value: 'altro' }
        ]
      }
    },
    {
      name: 'nota',
      title: 'Nota dell\'autore',
      type: 'text',
      rows: 3,
      description: 'Opzionale - commento o contesto'
    }
  ],
  preview: {
    select: {
      title: 'titolo',
      data: 'data',
      collezione: 'collezione'
    },
    prepare(selection) {
      const { title, data, collezione } = selection
      return {
        title: title,
        subtitle: collezione || new Date(data).getFullYear().toString()
      }
    }
  }
}
