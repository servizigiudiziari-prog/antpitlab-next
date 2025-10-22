# Sanity CMS - AntPit Lab Portfolio

Configurazione completa del CMS headless per il portfolio fotografico AntPit Lab.

## Struttura Directory

```
sanity/
├── schemas/              # Schemi dati Sanity
│   ├── project.ts       # Schema progetti fotografici
│   ├── category.ts      # Schema categorie
│   ├── settings.ts      # Schema impostazioni sito (singleton)
│   └── index.ts         # Export schemi
├── lib/
│   └── seed-data.ts     # Dati di esempio per popolamento
├── sanity.config.ts     # Configurazione Studio
├── sanity.cli.ts        # Configurazione CLI
├── SETUP.md             # Guida setup tecnico
├── STUDIO_GUIDE.md      # Guida utente Studio
└── README.md            # Questo file
```

## Documentazione

### Per Sviluppatori

- **[SETUP.md](./SETUP.md)**: Guida completa setup Sanity (installazione, configurazione, deploy)

### Per Utenti Finali

- **[STUDIO_GUIDE.md](./STUDIO_GUIDE.md)**: Manuale d'uso dello Studio per gestire contenuti

## Quick Start

### 1. Installa Dipendenze

```bash
npm install
```

### 2. Configura Environment Variables

Crea `.env.local` nella root e aggiungi:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

### 3. Inizializza Sanity

```bash
cd sanity
sanity init
```

### 4. Avvia Studio

```bash
npm run dev
# Studio disponibile su: http://localhost:3000/studio
```

## Schemi Dati

### Project (Progetto Fotografico)

Rappresenta un servizio fotografico o progetto del portfolio.

**Campi principali:**
- `title`: Titolo progetto
- `slug`: URL univoco
- `description`: Descrizione breve
- `coverImage`: Immagine copertina (con hotspot)
- `gallery`: Array di immagini
- `category`: Riferimento a Category
- `tags`: Array di stringhe
- `date`: Data servizio
- `location`: Luogo
- `client`: Nome cliente (opzionale)
- `featured`: Boolean (in evidenza homepage)
- `published`: Boolean (visibile sul sito)
- `order`: Numero (ordinamento custom)

### Category (Categoria)

Organizza i progetti in gruppi tematici.

**Campi principali:**
- `title`: Nome categoria
- `slug`: URL univoco
- `description`: Descrizione
- `color`: Colore accent (per UI)
- `coverImage`: Immagine copertina
- `order`: Ordinamento
- `featured`: In evidenza

### Settings (Impostazioni Sito)

Singleton per configurazione globale del sito.

**Campi principali:**
- `siteTitle`: Titolo sito
- `siteDescription`: Descrizione SEO
- `siteKeywords`: Array keywords
- `ogImage`: Immagine social share
- `socialLinks`: Oggetto con link social
- `contactInfo`: Oggetto con email, telefono, indirizzo
- `aboutText`: Portable Text (biografia)
- `profileImage`: Foto profilo
- `footerText`: Testo footer
- `enableWatermark`: Boolean
- `watermarkText`: Testo watermark

## GROQ Queries

Tutte le query sono definite in `/src/lib/sanity/queries.ts`.

### Query Principali

```typescript
// Homepage - progetti in evidenza
FEATURED_PROJECTS_QUERY

// Portfolio - tutti i progetti
ALL_PROJECTS_QUERY

// Singolo progetto
PROJECT_BY_SLUG_QUERY

// Tutte le categorie
CATEGORIES_QUERY

// Impostazioni globali
SETTINGS_QUERY
```

### Esempio Uso

```typescript
import { client } from '@/lib/sanity/client'
import { ALL_PROJECTS_QUERY } from '@/lib/sanity/queries'

const projects = await client.fetch(ALL_PROJECTS_QUERY)
```

## Image URL Builder

Utility per trasformare immagini Sanity in URL ottimizzati.

```typescript
import { urlFor, responsiveImageUrl } from '@/lib/sanity/imageBuilder'

// URL base
const url = urlFor(image).width(800).url()

// URL responsive con qualità ottimizzata
const responsiveUrl = responsiveImageUrl(image, {
  width: 1200,
  quality: 85,
  dpr: 2
})

// Genera srcSet per <img>
import { generateSrcSet } from '@/lib/sanity/imageBuilder'
const srcSet = generateSrcSet(image, [400, 800, 1200])
```

## TypeScript Types

Tutti i types sono in `/src/lib/types/sanity.ts`.

```typescript
import type {
  Project,
  Category,
  Settings,
  ProjectPreview
} from '@/lib/types/sanity'
```

## Performance

### Target Metriche

- **Query GROQ**: < 500ms
- **Studio load**: < 3s
- **ISR update**: < 30s
- **Image CDN**: Automatico via Sanity CDN

### Ottimizzazioni Implementate

1. **Query Projections**: Solo dati necessari
2. **Image Metadata**: blurhash, lqip per lazy loading
3. **CDN Caching**: Auto-gestito da Sanity
4. **TypeScript**: Type-safety completo
5. **ISR**: Revalidation automatica

## Scripts NPM

```bash
# Avvia Next.js con Studio integrato
npm run dev

# Avvia solo Sanity Studio standalone
npm run sanity:dev

# Deploy Studio su Sanity Cloud
npm run sanity:deploy

# Apri pannello gestione progetto
npm run sanity:manage
```

## Deploy

### Studio Integrato (Consigliato)

Lo Studio è integrato in Next.js su `/studio`.

Deploy insieme al sito Next.js (Vercel/Netlify).

### Studio Standalone

Deploy su Sanity Cloud:

```bash
npm run sanity:deploy
```

Studio sarà disponibile su: `https://your-project.sanity.studio`

## Configurazione CORS

Per permettere al sito di accedere all'API Sanity:

1. Vai su https://www.sanity.io/manage
2. Seleziona il progetto
3. **API** → **CORS Origins**
4. Aggiungi:
   - `http://localhost:3000` (dev)
   - `https://tuodominio.com` (production)
5. Abilita "Allow credentials"

## Webhooks (ISR)

Per rebuild automatico su modifica contenuti:

### Vercel

1. Vercel Dashboard → Settings → Git → Deploy Hooks
2. Crea hook (es: `content-update`)
3. Copia URL webhook
4. Sanity Dashboard → API → Webhooks → Add webhook
5. URL: URL webhook Vercel
6. Trigger: `create`, `update`, `delete`
7. Filter: `_type == "project" || _type == "category" || _type == "settings"`

### Netlify

Procedura simile con Netlify Build Hooks.

## Backup e Export

### Export Dati

```bash
# Export completo dataset
sanity dataset export production backup.tar.gz

# Export specifico tipo
sanity dataset export production backup.tar.gz --types project,category
```

### Import Dati

```bash
sanity dataset import backup.tar.gz production
```

## Troubleshooting

### Errore "Project ID not found"

Verifica `.env.local` e riavvia server Next.js.

### Immagini non si caricano

Configura CORS (vedi sezione sopra).

### Query ritorna []

Verifica che i documenti siano **pubblicati** e non solo draft.

### Studio non accessibile su /studio

Verifica che esista:
- `src/app/studio/[[...tool]]/page.tsx`
- Configurazione in `sanity/sanity.config.ts`

## Testing

### Test Page

Pagina di test disponibile su: `http://localhost:3000/sanity-test`

Mostra:
- Connessione Sanity OK
- Dati popolati
- Query funzionanti
- Immagini caricate

**RIMUOVI in produzione!**

### Vision Tool

Tool integrato per testare query GROQ:

1. Vai su `/studio/vision`
2. Scrivi query GROQ
3. Visualizza risultati in tempo reale

## Risorse

- **Documentazione Sanity**: https://www.sanity.io/docs
- **GROQ Cheat Sheet**: https://www.sanity.io/docs/query-cheat-sheet
- **Community Slack**: https://slack.sanity.io
- **GitHub**: https://github.com/sanity-io/sanity

## Supporto

Per problemi o domande:

- Consulta [SETUP.md](./SETUP.md) per setup
- Consulta [STUDIO_GUIDE.md](./STUDIO_GUIDE.md) per uso Studio
- Documentazione ufficiale Sanity
- Community Slack

---

**Configurazione Sanity completata con successo!** ✨

*Versione: 1.0 | Ultimo aggiornamento: Ottobre 2024*
