# Indice File Configurazione Sanity CMS

Tutti i file creati per l'integrazione Sanity CMS nel progetto AntPit Lab.

---

## File Configurazione Sanity

### Schemi Dati

**Project Schema** (Schema progetti fotografici)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/sanity/schemas/project.ts
```

**Category Schema** (Schema categorie)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/sanity/schemas/category.ts
```

**Settings Schema** (Schema impostazioni sito)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/sanity/schemas/settings.ts
```

**Schema Index** (Export tutti gli schemi)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/sanity/schemas/index.ts
```

### Configurazione Studio

**Sanity Config** (Configurazione principale Studio)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/sanity/sanity.config.ts
```

**Sanity CLI Config** (Configurazione CLI)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/sanity/sanity.cli.ts
```

### Dati di Seed

**Seed Data** (Dati di esempio per test)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/sanity/lib/seed-data.ts
```

---

## File Integrazione Next.js

### Client e Queries

**Sanity Client** (Client configurato per Next.js)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/lib/sanity/client.ts
```

**GROQ Queries** (15+ query ottimizzate)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/lib/sanity/queries.ts
```

**Image Builder** (Utilities per immagini)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/lib/sanity/imageBuilder.ts
```

### TypeScript Types

**Sanity Types** (Type definitions complete)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/lib/types/sanity.ts
```

---

## Route Next.js

### Studio Route

**Studio Page** (Route principale Studio)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/app/studio/[[...tool]]/page.tsx
```

### Test Page

**Sanity Test Page** (Pagina verifica integrazione)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/src/app/sanity-test/page.tsx
```

---

## Documentazione

### Guide Tecniche

**Setup Guide** (Guida setup completa)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/sanity/SETUP.md
```

**README Sanity** (Panoramica generale)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/sanity/README.md
```

### Guide Utente

**Studio Guide** (Manuale uso Studio per cliente)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/sanity/STUDIO_GUIDE.md
```

### Riepilogo Setup

**Setup Complete** (Riepilogo configurazione)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/SANITY_SETUP_COMPLETE.md
```

**Files Index** (Questo file)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/SANITY_FILES_INDEX.md
```

---

## File Configurazione

### Environment Variables

**Environment File** (.env.local)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/.env.local
```

**Environment Example** (.env.example)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/.env.example
```

### Package Configuration

**Package.json** (Scripts Sanity aggiunti)
```
/Users/antoniopitocco/Library/CloudStorage/GoogleDrive-servizigiudiziari@gmail.com/Il mio Drive/antpitlab.com/antpitlab-next/package.json
```

---

## Riassunto File Creati

### Totale: 19 file

**Configurazione Sanity**: 7 file
- 4 schemi (project, category, settings, index)
- 2 config (sanity.config, sanity.cli)
- 1 seed data

**Integrazione Next.js**: 4 file
- client.ts
- queries.ts
- imageBuilder.ts
- types/sanity.ts

**Route e Test**: 2 file
- studio/[[...tool]]/page.tsx
- sanity-test/page.tsx

**Documentazione**: 5 file
- SETUP.md
- README.md
- STUDIO_GUIDE.md
- SANITY_SETUP_COMPLETE.md
- SANITY_FILES_INDEX.md

**Configurazione**: 1 file modificato
- package.json (scripts aggiunti)

---

## Come Navigare i File

### Per Setup Tecnico

1. Leggi: `SANITY_SETUP_COMPLETE.md` (panoramica)
2. Segui: `sanity/SETUP.md` (guida passo-passo)
3. Consulta: `sanity/README.md` (dettagli tecnici)

### Per Uso Studio

1. Leggi: `sanity/STUDIO_GUIDE.md` (manuale utente completo)
2. Testa: Apri `/studio` dopo setup
3. Verifica: Visita `/sanity-test` per check dati

### Per Sviluppo

1. Client: `src/lib/sanity/client.ts`
2. Queries: `src/lib/sanity/queries.ts`
3. Types: `src/lib/types/sanity.ts`
4. Images: `src/lib/sanity/imageBuilder.ts`

---

## Quick Reference

### Aprire Studio

```bash
npm run dev
# Poi: http://localhost:3000/studio
```

### Testare Queries

```typescript
import { client } from '@/lib/sanity/client'
import { ALL_PROJECTS_QUERY } from '@/lib/sanity/queries'

const projects = await client.fetch(ALL_PROJECTS_QUERY)
```

### Usare Image Builder

```typescript
import { urlFor } from '@/lib/sanity/imageBuilder'

const imageUrl = urlFor(sanityImage).width(800).url()
```

---

**Tutti i file sono pronti e funzionanti!** ✅

Per iniziare, segui la guida: `sanity/SETUP.md`
