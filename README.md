# AntPit Lab - Portfolio Fotografico

Portfolio fotografico professionale realizzato con Next.js 15, TypeScript e Tailwind CSS.

## Tecnologie Utilizzate

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Type safety e migliore developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Sanity CMS** - Headless CMS per la gestione dei contenuti
- **ESLint & Prettier** - Code quality e formatting
- **Husky & lint-staged** - Pre-commit hooks per qualità del codice

## Prerequisiti

Prima di iniziare, assicurati di avere installato:

- **Node.js** 18.0 o superiore
- **npm** o **yarn** o **pnpm**
- **Git** per il version control

Verifica le versioni installate:

```bash
node --version  # dovrebbe essere >= 18.0
npm --version
```

## Installazione

1. Clona il repository:

```bash
git clone <repository-url>
cd antpitlab-next
```

2. Installa le dipendenze:

```bash
npm install
```

3. Crea il file `.env.local` basandoti su `.env.example`:

```bash
cp .env.example .env.local
```

4. Configura le variabili d'ambiente nel file `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

## Sviluppo

### Comandi Disponibili

```bash
# Avvia il server di sviluppo
npm run dev

# Compila il progetto per la produzione
npm run build

# Avvia il server di produzione
npm start

# Esegue il linting del codice
npm run lint

# Corregge automaticamente gli errori di linting
npm run lint:fix

# Formatta il codice con Prettier
npm run format

# Verifica la formattazione senza modificare i file
npm run format:check

# Verifica i tipi TypeScript
npm run type-check
```

### Server di Sviluppo

Avvia il server di sviluppo:

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser per vedere l'applicazione.

## Struttura del Progetto

```
antpitlab-next/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── layout.tsx         # Layout principale
│   │   ├── page.tsx           # Homepage
│   │   ├── globals.css        # Stili globali
│   │   ├── portfolio/         # Sezione portfolio
│   │   ├── about/             # Pagina about
│   │   └── contact/           # Pagina contatti
│   ├── components/            # Componenti React
│   │   ├── layout/           # Componenti di layout
│   │   ├── ui/               # Componenti UI riutilizzabili
│   │   └── gallery/          # Componenti galleria
│   ├── lib/                   # Utility e configurazioni
│   │   ├── sanity/           # Configurazione Sanity CMS
│   │   └── utils/            # Funzioni di utilità
│   └── styles/                # File di stile aggiuntivi
├── public/                    # File statici
├── .husky/                    # Git hooks
├── .vscode/                   # Configurazione VS Code
├── next.config.ts            # Configurazione Next.js
├── tailwind.config.ts        # Configurazione Tailwind
├── tsconfig.json             # Configurazione TypeScript
└── package.json              # Dipendenze del progetto
```

## Design System

### Colori

Il progetto utilizza un design system dark-mode first:

- `bg-primary`: #000000 (Sfondo principale)
- `bg-secondary`: #0a0a0a (Sfondo secondario)
- `text-primary`: #ffffff (Testo principale)
- `text-secondary`: #a3a3a3 (Testo secondario)
- `border`: #1a1a1a (Bordi)
- `accent`: #3b82f6 (Accento)
- `overlay`: rgba(0, 0, 0, 0.7) (Overlay)

### Font

- **Heading**: Montserrat (sans-serif) - Per titoli e heading
- **Body**: Lato (sans-serif) - Per il testo del corpo
- **Accent**: Playfair Display (serif) - Per accenti decorativi

### Spacing

Sistema di spacing consistente: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 (px)

## Code Quality

### ESLint

Il progetto utilizza ESLint con le configurazioni raccomandate di Next.js e TypeScript:

```bash
npm run lint        # Verifica errori
npm run lint:fix    # Corregge automaticamente
```

### Prettier

Prettier è configurato per formattare automaticamente il codice:

```bash
npm run format          # Formatta tutti i file
npm run format:check    # Verifica la formattazione
```

### Pre-commit Hooks

Husky e lint-staged sono configurati per eseguire automaticamente:

- ESLint su file TypeScript/JavaScript modificati
- Prettier su tutti i file modificati
- Type checking TypeScript

I commit vengono bloccati se ci sono errori di linting o formattazione.

## Configurazione TypeScript

Il progetto utilizza TypeScript in modalità strict:

- `strict: true` - Abilita tutti i controlli strict
- `noUncheckedIndexedAccess: true` - Previene accessi non sicuri agli array
- Path aliases configurati: `@/*` punta a `./src/*`

## Deployment

### Vercel (Raccomandato)

Il modo più semplice per deployare l'applicazione è utilizzare [Vercel](https://vercel.com):

1. Crea un account su Vercel
2. Importa il repository GitHub
3. Configura le variabili d'ambiente
4. Deploy automatico ad ogni push

### Build Manuale

Per creare una build di produzione:

```bash
npm run build
npm start
```

L'applicazione sarà disponibile su `http://localhost:3000`.

## Variabili d'Ambiente

### Richieste

- `SANITY_PROJECT_ID` - ID del progetto Sanity
- `SANITY_DATASET` - Dataset Sanity (solitamente "production")
- `SANITY_API_TOKEN` - Token API Sanity con permessi di lettura

### Opzionali

- `NEXT_PUBLIC_SITE_URL` - URL pubblico del sito
- `NEXT_PUBLIC_SITE_NAME` - Nome del sito
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID

## VS Code

### Estensioni Raccomandate

Il progetto include configurazioni per VS Code. Installa le estensioni raccomandate:

- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

### Configurazione Auto-save

Il progetto è configurato per:

- Formattare automaticamente al salvataggio
- Correggere errori ESLint al salvataggio
- Utilizzare la versione TypeScript del workspace

## Best Practices

### Naming Conventions

- **Componenti**: PascalCase (es. `HeaderNav.tsx`)
- **File utility**: camelCase (es. `formatDate.ts`)
- **Costanti**: UPPER_SNAKE_CASE (es. `API_BASE_URL`)
- **CSS classes**: kebab-case o Tailwind utilities

### Organizzazione Componenti

```tsx
// 1. Imports
import { useState } from "react";
import type { ComponentProps } from "./types";

// 2. Types/Interfaces
interface Props extends ComponentProps {
  title: string;
}

// 3. Component
export default function MyComponent({ title }: Props) {
  // Hooks
  const [state, setState] = useState();

  // Event handlers
  const handleClick = () => {};

  // Render
  return <div>{title}</div>;
}
```

### TypeScript

- Sempre tipizzare props e state
- Usare `type` per oggetti semplici, `interface` per oggetti estendibili
- Evitare `any`, preferire `unknown` quando il tipo non è noto
- Utilizzare type inference quando possibile

### Tailwind CSS

- Preferire utility classes a custom CSS
- Usare `@apply` solo per componenti riutilizzabili complessi
- Mantenere le classi ordinate (layout → spacing → typography → colors)
- Usare il plugin Tailwind CSS IntelliSense per autocompletamento

## Troubleshooting

### Errori comuni

#### "Module not found"

```bash
# Pulisci e reinstalla le dipendenze
rm -rf node_modules package-lock.json
npm install
```

#### "Type errors"

```bash
# Verifica i tipi TypeScript
npm run type-check
```

#### "Build failed"

```bash
# Pulisci la cache di Next.js
rm -rf .next
npm run build
```

## Supporto

Per domande o problemi:

- Email: [your-email@example.com]
- GitHub Issues: [repository-issues-url]

## Licenza

MIT

---

**Realizzato con ❤️ da Antonio Pitocco**
