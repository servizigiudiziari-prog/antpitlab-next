# Guida Setup Sanity CMS - AntPit Lab

Questa guida ti accompagna nella configurazione completa di Sanity CMS per il portfolio AntPit Lab.

## Indice

1. [Prerequisiti](#prerequisiti)
2. [Inizializzazione Progetto Sanity](#inizializzazione-progetto-sanity)
3. [Configurazione Environment Variables](#configurazione-environment-variables)
4. [Avvio Sanity Studio](#avvio-sanity-studio)
5. [Popolamento Dati di Test](#popolamento-dati-di-test)
6. [Deploy Sanity Studio](#deploy-sanity-studio)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisiti

Prima di iniziare assicurati di avere:

- Node.js 18+ installato
- Account Sanity.io (gratuito) - [Registrati qui](https://www.sanity.io/get-started)
- Sanity CLI installata globalmente: `npm install -g @sanity/cli`

---

## Inizializzazione Progetto Sanity

### 1. Login a Sanity

```bash
sanity login
```

Questo aprirà il browser per autenticarti con il tuo account Sanity.

### 2. Inizializza il progetto

Dalla root del progetto Next.js, esegui:

```bash
cd sanity
sanity init
```

**Rispondi alle domande:**

1. **Select project to use**: `Create new project`
2. **Project name**: `AntPit Lab Portfolio`
3. **Use the default dataset configuration?**: `Yes`
4. **Project output path**: Premi INVIO (usa la directory corrente)
5. **Select project template**: `Clean project with no predefined schemas`

### 3. Salva Project ID

Alla fine dell'inizializzazione, Sanity mostrerà il tuo **Project ID** (es: `abc123de`).

**IMPORTANTE**: Copia questo ID, ti servirà nel prossimo step!

---

## Configurazione Environment Variables

### 1. Apri il file `.env.local` nella root del progetto

```bash
# Dalla root di antpitlab-next
nano .env.local
# oppure apri con il tuo editor
```

### 2. Inserisci il Project ID

Sostituisci la riga vuota:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
```

Con il tuo Project ID:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123de
```

### 3. Crea API Token

Per permettere operazioni di scrittura e preview mode:

1. Vai su https://www.sanity.io/manage
2. Seleziona il progetto "AntPit Lab Portfolio"
3. Clicca su **API** nel menu laterale
4. Clicca su **+ Add API token**
5. **Name**: `antpitlab-next-token`
6. **Permissions**: Seleziona `Editor`
7. Clicca **Add token**
8. **COPIA IL TOKEN IMMEDIATAMENTE** (non sarà più visibile!)

### 4. Inserisci API Token nel .env.local

```bash
SANITY_API_TOKEN=sk_production_xxx...
```

### 5. File .env.local completo

Il tuo file dovrebbe apparire così:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="AntPit Lab"

NEXT_PUBLIC_SANITY_PROJECT_ID=abc123de
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk_production_xxx...
```

---

## Avvio Sanity Studio

### Opzione 1: Studio Integrato in Next.js (Consigliato)

Avvia il server di sviluppo Next.js:

```bash
npm run dev
```

Apri il browser su: **http://localhost:3000/studio**

### Opzione 2: Studio Standalone

Avvia solo lo Studio:

```bash
npm run sanity:dev
```

Apri il browser su: **http://localhost:3333**

---

## Popolamento Dati di Test

### 1. Crea il documento Settings

1. Vai su http://localhost:3000/studio
2. Clicca su **Impostazioni Sito** nella sidebar
3. Compila i campi obbligatori:
   - **Titolo Sito**: `AntPit Lab`
   - **Descrizione Sito**: `Portfolio fotografico professionale di Antonio Pitocco`
   - **Email**: `info@antpitlab.com`
4. Clicca **Publish**

### 2. Crea le Categorie

Clicca su **Categorie** nella sidebar e crea:

#### Categoria 1: Matrimoni

- **Nome**: `Matrimoni`
- **Slug**: `matrimoni` (auto-generato)
- **Descrizione**: `Servizi fotografici per matrimoni ed eventi speciali`
- **Colore**: `#FF6B9D` (rosa)
- **Ordine**: `0`
- **In Evidenza**: `✓`

#### Categoria 2: Ritratti

- **Nome**: `Ritratti`
- **Slug**: `ritratti`
- **Descrizione**: `Fotografie di ritratto professionale`
- **Colore**: `#4ECDC4` (turchese)
- **Ordine**: `1`

#### Categoria 3: Paesaggi

- **Nome**: `Paesaggi`
- **Slug**: `paesaggi`
- **Descrizione**: `Fotografia di paesaggi e natura`
- **Colore**: `#95E1D3` (verde acqua)
- **Ordine**: `2`

#### Categoria 4: Eventi

- **Nome**: `Eventi`
- **Slug**: `eventi`
- **Descrizione**: `Copertura fotografica per eventi aziendali e privati`
- **Colore**: `#F38181` (corallo)
- **Ordine**: `3`

#### Categoria 5: Street Photography

- **Nome**: `Street Photography`
- **Slug**: `street-photography`
- **Descrizione**: `Fotografia urbana e di strada`
- **Colore**: `#AA96DA` (viola)
- **Ordine**: `4`

### 3. Crea Progetti di Test

Per ogni progetto, segui questi step:

1. Clicca su **Progetti** nella sidebar
2. Clicca **+ Create** → **Progetto Fotografico**
3. Compila i campi

#### Progetto 1: Wedding in Villa

- **Titolo**: `Wedding in Villa Borghese`
- **Slug**: `wedding-villa-borghese` (auto-generato)
- **Descrizione**: `Matrimonio elegante presso Villa Borghese, Roma. Un giorno magico tra storia e natura.`
- **Immagine Copertina**: Carica un'immagine (dalle cartelle `/images/` del vecchio sito)
- **Categoria**: Seleziona `Matrimoni`
- **Tags**: `outdoor`, `elegante`, `villa`, `roma`
- **Data**: Seleziona una data recente
- **Luogo**: `Villa Borghese, Roma`
- **Cliente**: `Maria & Giovanni`
- **In Evidenza**: `✓`
- **Pubblicato**: `✓`
- **Ordine**: `0`

Aggiungi 5-10 immagini alla **Galleria Foto**

#### Progetto 2: Ritratto di Famiglia

- **Titolo**: `Family Portrait Session`
- **Slug**: `family-portrait-session`
- **Descrizione**: `Servizio fotografico familiare in studio con luci naturali.`
- **Categoria**: `Ritratti`
- **Tags**: `famiglia`, `studio`, `indoor`
- **Data**: Data recente
- **Luogo**: `Studio AntPit Lab`
- **In Evidenza**: `✓`
- **Pubblicato**: `✓`

#### Progetto 3-10

Crea altri 5-8 progetti variando:

- Categorie (usa tutte le 5 categorie)
- Tipi di location (indoor/outdoor)
- Date (distribuisci nell'ultimo anno)
- Alcuni in evidenza, altri no
- Usa immagini diverse per varietà

**SUGGERIMENTO**: Usa le immagini presenti in `/images/` del vecchio sito per velocizzare.

### 4. Verifica Dati

Dopo aver popolato i dati:

1. Vai su **Vision** nel menu Studio
2. Prova questa query per verificare:

```groq
*[_type == "project"] | order(date desc) {
  title,
  category->{title},
  "imageCount": count(gallery)
}
```

Dovresti vedere tutti i tuoi progetti con titolo, categoria e numero di immagini.

---

## Deploy Sanity Studio

### Deploy su Sanity Cloud (Gratis)

Per rendere lo Studio accessibile al cliente:

```bash
npm run sanity:deploy
```

Segui le istruzioni. Lo Studio sarà disponibile su:

```
https://antpitlab-portfolio.sanity.studio
```

(o il nome che hai scelto)

### Configura CORS

Per permettere al sito Next.js di accedere all'API:

1. Vai su https://www.sanity.io/manage
2. Seleziona il progetto
3. Clicca su **API** → **CORS Origins**
4. Clicca **+ Add CORS origin**
5. Aggiungi questi origins:
   - `http://localhost:3000` (per sviluppo)
   - `https://tuodominio.com` (per produzione)
6. Abilita **Allow credentials**

---

## Troubleshooting

### Errore: "Project ID not found"

**Soluzione**: Verifica che `.env.local` contenga il Project ID corretto e riavvia il server Next.js.

```bash
# Riavvia il server
# Premi CTRL+C per fermare
npm run dev
```

### Errore: "Invalid API token"

**Soluzione**: Rigenera il token API:

1. Vai su https://www.sanity.io/manage
2. API → Tokens
3. Elimina il vecchio token
4. Crea un nuovo token con permessi `Editor`
5. Aggiorna `.env.local`

### Studio non si carica su /studio

**Soluzione**: Verifica che:

1. Il file `src/app/studio/[[...tool]]/page.tsx` esista
2. Non ci siano errori TypeScript nel progetto
3. La route non sia bloccata da middleware

```bash
# Controlla errori TypeScript
npm run type-check
```

### Immagini non si vedono

**Soluzione**: Configura CORS (vedi sezione Deploy)

### Query GROQ ritorna []

**Soluzione**: Verifica che:

1. I documenti siano **pubblicati** (non solo salvati come draft)
2. Il campo `published` sia `true` per i progetti
3. La query sia corretta (testa in Vision tool)

---

## Script Utili

```bash
# Avvia Next.js con Studio integrato
npm run dev

# Avvia solo Sanity Studio standalone
npm run sanity:dev

# Deploy Studio su Sanity Cloud
npm run sanity:deploy

# Apri pannello gestione progetto
npm run sanity:manage

# Test query GROQ
# Usa Vision tool nello Studio: /studio/vision
```

---

## Prossimi Passi

Ora che Sanity è configurato:

1. Popola almeno 10 progetti con immagini reali
2. Testa le query GROQ in Vision tool
3. Integra i dati nelle pagine Next.js
4. Configura ISR (Incremental Static Regeneration)
5. Imposta webhooks per rebuild automatico

**Documentazione ufficiale**: https://www.sanity.io/docs

---

## Supporto

Per problemi o domande:

- Documentazione Sanity: https://www.sanity.io/docs
- Community Slack: https://slack.sanity.io
- GitHub Issues: https://github.com/sanity-io/sanity/issues

---

**Buon lavoro con Sanity CMS!** 🚀
