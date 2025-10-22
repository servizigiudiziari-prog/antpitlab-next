import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// Configurazione struttura desk per singleton settings
const structure = (S: any) =>
  S.list()
    .title('Contenuti')
    .items([
      // Singleton Settings - sempre visibile
      S.listItem()
        .title('Impostazioni Sito')
        .icon(() => '⚙️')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .title('Impostazioni')
        ),
      S.divider(),

      // Progetti
      S.listItem()
        .title('Progetti')
        .icon(() => '📸')
        .child(
          S.documentTypeList('project')
            .title('Progetti Fotografici')
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
            .filter('_type == "project"')
        ),

      // Categorie
      S.listItem()
        .title('Categorie')
        .icon(() => '🏷️')
        .child(
          S.documentTypeList('category')
            .title('Categorie')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // Tutti gli altri documenti (fallback)
      ...S.documentTypeListItems().filter(
        (listItem: any) =>
          !['settings', 'project', 'category'].includes(listItem.getId())
      ),
    ])

export default defineConfig({
  name: 'default',
  title: 'AntPit Lab Portfolio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  // Percorso base per lo Studio (accessibile su /studio)
  basePath: '/studio',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool({
      defaultApiVersion: '2024-01-21',
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  // Tema e personalizzazione UI
  theme: {
    // Colori brand personalizzati (opzionale)
  },

  document: {
    // Azioni personalizzate per i documenti
    actions: (prev, { schemaType }) => {
      // Limita azioni per settings (no delete, no duplicate)
      if (schemaType === 'settings') {
        return prev.filter(
          ({ action }) => !['delete', 'duplicate'].includes(action || '')
        )
      }
      return prev
    },
  },
})
