# 🔒 Guida Setup Sanity CMS - Scrittura

## 📋 Step 1: Crea Account Sanity

1. Vai su [sanity.io](https://www.sanity.io)
2. Clicca "Get Started" o "Sign Up"
3. Registrati con:
   - Google Account (consigliato)
   - GitHub
   - Email

## 🚀 Step 2: Crea Nuovo Progetto

```bash
# Installa Sanity CLI globalmente
npm install -g @sanity/cli

# Login a Sanity
sanity login

# Crea nuovo progetto
sanity init --project-id <TUO-PROJECT-ID> --dataset production
```

**IMPORTANTE**: Quando ti chiede:
- **Use the default dataset configuration?** → Yes
- **Project output path** → Premi Enter (usa la directory corrente `sanity/`)

## 🔑 Step 3: Ottieni Credentials

Dopo aver creato il progetto:

1. Vai su [sanity.io/manage](https://www.sanity.io/manage)
2. Seleziona il tuo progetto
3. Nella dashboard troverai:
   - **Project ID** (es: `abc12345`)
   - **Dataset**: `production`

## 📝 Step 4: Configura Variabili d'Ambiente

Crea un file `.env` nella root del progetto:

```bash
VITE_SANITY_PROJECT_ID=abc12345
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

**Sostituisci `abc12345` con il tuo Project ID reale!**

## 🎨 Step 5: Avvia Sanity Studio

```bash
# Dalla root del progetto
cd sanity
sanity start
```

Oppure aggiungi questo script a `package.json`:

```json
"scripts": {
  "sanity": "cd sanity && sanity start"
}
```

Poi:
```bash
npm run sanity
```

Il tuo Sanity Studio sarà disponibile su:
**http://localhost:3333**

## 🖼️ Step 6: Carica il Primo Libro

1. Apri **http://localhost:3333**
2. Clicca su **"Libri"** nella sidebar
3. Clicca **"+ Create"**
4. Compila i campi:
   - **Titolo**: Il titolo del tuo libro
   - **Slug**: Click "Generate" (auto-generato dal titolo)
   - **Copertina**: Drag & drop dell'immagine
   - **Anno**: Anno di pubblicazione
   - **Genere**: Seleziona dalla lista
   - **Descrizione**: 2-3 frasi accattivanti
   - **Link Amazon**: Copia/incolla il link
   - **Stato**: "Pubblicato"
5. Clicca **"Publish"** in basso

## 🔗 Step 7: Integra con il Portale

Il portale leggerà automaticamente i dati da Sanity!

**Non serve fare altro** - i libri appariranno nella sala Scrittura.

## 🔐 Step 8: Deploy Sanity Studio (Opzionale)

Per accedere allo Studio da qualsiasi posto:

```bash
sanity deploy
```

Ti chiederà un nome per lo studio (es: `antpitlab-scrittura`)

Lo Studio sarà disponibile su:
**https://antpitlab-scrittura.sanity.studio**

## 📱 Accesso dal Portale

Nella sala Scrittura, clicca sul **lucchetto letterario** 🖋️🔒:
- Se Studio è in locale: ti porta a `http://localhost:3333`
- Se hai fatto deploy: ti porta al tuo studio online

## ✅ Checklist Finale

- [ ] Account Sanity creato
- [ ] Progetto creato con `sanity init`
- [ ] Project ID ottenuto
- [ ] File `.env` configurato
- [ ] `sanity start` funzionante
- [ ] Primo libro caricato e pubblicato
- [ ] Libro visibile nel portale

## 🆘 Problemi Comuni

### "Sanity command not found"
```bash
npm install -g @sanity/cli
```

### "Project ID not found"
Controlla che il file `.env` sia nella **root** del progetto (non in `sanity/`)

### "CORS error"
Vai su [sanity.io/manage](https://www.sanity.io/manage) → tuo progetto → **API** → **CORS Origins** → Aggiungi:
- `http://localhost:3000` (sviluppo)
- `https://antpitlab.com` (produzione)
- `https://antpitlab-next.vercel.app` (Vercel)

### I dati non appaiono
1. Controlla che il libro sia **pubblicato** (non bozza)
2. Ricarica la pagina
3. Controlla la console browser (F12) per errori

---

## 🎉 Fatto!

Ora puoi gestire tutti i tuoi contenuti letterari da un'interfaccia professionale!

**Per aggiungere contenuti:**
- **Libri**: Sanity Studio → Libri → + Create
- **Saggi**: Sanity Studio → Saggi → + Create
- **Racconti**: Sanity Studio → Racconti → + Create
- **Poesie**: Sanity Studio → Poesie → + Create
- **Blog**: Sanity Studio → Blog → + Create

**Domande?** Chiedi a Claude! 🚀
