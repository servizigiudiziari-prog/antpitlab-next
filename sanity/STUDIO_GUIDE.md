# Guida all'utilizzo di Sanity Studio - AntPit Lab

**Benvenuto nel CMS del tuo portfolio fotografico!**

Questa guida ti aiuterà a gestire i contenuti del tuo sito web in totale autonomia.

---

## Indice

1. [Accesso allo Studio](#accesso-allo-studio)
2. [Panoramica Interfaccia](#panoramica-interfaccia)
3. [Gestione Progetti](#gestione-progetti)
4. [Gestione Categorie](#gestione-categorie)
5. [Impostazioni Sito](#impostazioni-sito)
6. [Caricamento Immagini](#caricamento-immagini)
7. [Pubblicazione Contenuti](#pubblicazione-contenuti)
8. [Best Practices](#best-practices)
9. [FAQ](#faq)

---

## Accesso allo Studio

### URL Studio

Il tuo Sanity Studio è accessibile a questi indirizzi:

- **Sviluppo locale**: `http://localhost:3000/studio`
- **Produzione**: `https://tuosito.com/studio` (dopo deploy)
- **Sanity Cloud**: `https://antpitlab-portfolio.sanity.studio`

### Login

1. Apri l'URL dello Studio
2. Clicca su **Login**
3. Accedi con il tuo account Sanity (Google/GitHub/Email)

---

## Panoramica Interfaccia

Quando apri lo Studio, troverai:

### Sidebar Sinistra

- **⚙️ Impostazioni Sito**: Configurazione globale del sito
- **📸 Progetti**: Tutti i tuoi progetti fotografici
- **🏷️ Categorie**: Categorie per organizzare i progetti

### Area Principale

- Lista dei documenti del tipo selezionato
- Editor per creare/modificare contenuti

### Toolbar Superiore

- **Vision**: Tool per testare query avanzate
- **Publish**: Pulsante per pubblicare modifiche
- **User menu**: Impostazioni account

---

## Gestione Progetti

I progetti sono il cuore del tuo portfolio. Ogni progetto rappresenta un servizio fotografico.

### Creare un Nuovo Progetto

1. Clicca su **📸 Progetti** nella sidebar
2. Clicca sul pulsante **+ Create** in alto a destra
3. Seleziona **Progetto Fotografico**

### Campi del Progetto

#### Informazioni Base

**Titolo** *(obbligatorio)*
- Nome del progetto
- Esempio: "Wedding in Villa Borghese"
- Lunghezza: 3-100 caratteri

**Slug URL** *(obbligatorio)*
- URL univoco per il progetto
- Si genera automaticamente dal titolo
- Esempio: `wedding-villa-borghese`
- ⚠️ Non modificare dopo pubblicazione (rompe link esterni)

**Descrizione** *(opzionale)*
- Descrizione breve del progetto
- Massimo 500 caratteri
- Sarà visualizzata nelle anteprime e card

#### Immagini

**Immagine Copertina** *(obbligatorio)*
- Immagine principale del progetto
- Ratio consigliato: 16:9 (landscape)
- Dimensione consigliata: almeno 1920x1080px
- Formati supportati: JPG, PNG, WebP

**Testo Alternativo** *(obbligatorio)*
- Descrizione immagine per accessibilità
- Esempio: "Sposi che si baciano al tramonto a Villa Borghese"
- Importante per SEO e screen reader

**Galleria Foto** *(opzionale)*
- Collezione di foto del progetto
- Massimo 50 immagini
- Puoi riordinare trascinando le immagini
- Ogni immagine può avere:
  - **Didascalia**: Descrizione specifica
  - **Testo Alt**: Per accessibilità

#### Categorizzazione

**Categoria** *(obbligatorio)*
- Seleziona la categoria del progetto
- Esempi: Matrimoni, Ritratti, Eventi
- Se manca la categoria, creala prima (vedi sezione Categorie)

**Tags** *(opzionale)*
- Parole chiave per il progetto
- Utili per ricerca e filtri
- Esempi: "outdoor", "elegante", "roma", "vintage"
- Premi INVIO dopo ogni tag

#### Dettagli Servizio

**Data Progetto** *(obbligatorio)*
- Data di realizzazione del servizio
- Usata per ordinare i progetti
- Default: data corrente

**Luogo** *(opzionale)*
- Location del servizio
- Esempio: "Villa Borghese, Roma"

**Cliente** *(opzionale)*
- Nome del cliente (se vuoi mostrarlo)
- Esempio: "Maria & Giovanni"

#### Impostazioni Pubblicazione

**In Evidenza Homepage** *(checkbox)*
- ✅ Mostra il progetto nella homepage
- Usa per i lavori migliori (max 6 consigliati)

**Pubblicato** *(checkbox)*
- ✅ Rende visibile il progetto sul sito
- ❌ Nasconde il progetto (draft mode)
- Default: ✅ Pubblicato

**Ordine Visualizzazione** *(numero)*
- Numero per ordinare i progetti
- 0 = primo posto
- I progetti sono ordinati per: ordine → data

### Modificare un Progetto Esistente

1. Clicca su **📸 Progetti**
2. Trova il progetto nella lista
3. Clicca sul titolo per aprirlo
4. Modifica i campi necessari
5. Clicca **Publish** per salvare

### Eliminare un Progetto

1. Apri il progetto
2. Clicca sui tre puntini (...) in alto a destra
3. Seleziona **Delete**
4. Conferma l'eliminazione

⚠️ **Attenzione**: L'eliminazione è permanente!

---

## Gestione Categorie

Le categorie organizzano i tuoi progetti in gruppi tematici.

### Creare una Nuova Categoria

1. Clicca su **🏷️ Categorie**
2. Clicca **+ Create**
3. Compila i campi

### Campi della Categoria

**Nome Categoria** *(obbligatorio)*
- Nome della categoria
- Esempio: "Matrimoni", "Ritratti"
- Lunghezza: 2-50 caratteri

**Slug URL** *(obbligatorio)*
- URL per la pagina categoria
- Auto-generato dal nome
- Esempio: `matrimoni`

**Descrizione** *(opzionale)*
- Descrizione della categoria
- Massimo 300 caratteri
- Usata per SEO e pagina categoria

**Colore Accent** *(opzionale)*
- Colore distintivo per la categoria
- Usato nell'interfaccia per identificare rapidamente
- Clicca sul quadrato per aprire il color picker

**Immagine Copertina** *(opzionale)*
- Immagine rappresentativa della categoria
- Mostrata nella pagina categorie

**Ordine** *(numero)*
- Posizione nella lista categorie
- 0 = prima posizione

**In Evidenza** *(checkbox)*
- ✅ Mostra nella homepage
- Usa per le categorie principali

### Best Practices Categorie

- **Non creare troppe categorie**: 5-8 categorie sono ideali
- **Nomi chiari**: Usa nomi descrittivi e comprensibili
- **Colori distintivi**: Aiutano a identificare visivamente
- **Descrizioni SEO-friendly**: Includi parole chiave rilevanti

---

## Impostazioni Sito

Configurazione globale del sito (dati mostrati su tutte le pagine).

### Accesso

1. Clicca su **⚙️ Impostazioni Sito** nella sidebar
2. Puoi solo modificare (non eliminare o duplicare)

### Campi Impostazioni

#### SEO e Metadati

**Titolo Sito** *(obbligatorio)*
- Nome del sito (max 60 caratteri)
- Esempio: "AntPit Lab"
- Usato nel browser tab e SEO

**Descrizione Sito** *(obbligatorio)*
- Descrizione breve (max 160 caratteri)
- Esempio: "Portfolio fotografico professionale..."
- Usata per SEO e social share

**Parole Chiave SEO** *(opzionale)*
- Keywords principali del sito
- Esempio: "fotografo roma", "matrimoni"

**Immagine Social Share** *(opzionale)*
- Immagine mostrata quando condividi il sito
- Dimensione consigliata: 1200x630px

#### Social Media

**Instagram** *(URL)*
- Link profilo Instagram
- Esempio: `https://www.instagram.com/antpitlab`

**Facebook** *(URL)*
- Link pagina Facebook

**WhatsApp** *(numero)*
- Numero WhatsApp in formato internazionale
- Esempio: `+393331234567`

**YouTube** *(URL)*
- Link canale YouTube

**LinkedIn** *(URL)*
- Link profilo LinkedIn

#### Informazioni Contatto

**Email** *(obbligatorio)*
- Email principale
- Esempio: `info@antpitlab.com`

**Telefono** *(opzionale)*
- Numero di telefono
- Esempio: `+39 333 123 4567`

**Indirizzo** *(opzionale)*
- Indirizzo studio/ufficio
- Puoi scrivere su più righe

#### Sezione About

**Testo About** *(rich text)*
- Biografia o presentazione
- Puoi formattare il testo:
  - **Grassetto** e *corsivo*
  - Titoli (H2, H3)
  - Liste puntate/numerate
  - Link

**Foto Profilo** *(immagine)*
- Tua foto per la sezione About
- Formato: Quadrato o verticale

#### Footer e Watermark

**Testo Footer** *(testo)*
- Testo breve per il footer
- Esempio: "© 2024 AntPit Lab. Tutti i diritti riservati."

**Abilita Watermark** *(checkbox)*
- ✅ Applica watermark automatico alle immagini
- ❌ Nessun watermark

**Testo Watermark** *(testo)*
- Testo del watermark
- Esempio: "© AntPit Lab"

---

## Caricamento Immagini

### Formati Supportati

- **JPG/JPEG**: Consigliato per foto
- **PNG**: Per immagini con trasparenza
- **WebP**: Formato moderno (opzionale)

### Dimensioni Consigliate

| Tipo | Dimensione Minima | Ratio Consigliato |
|------|-------------------|-------------------|
| Copertina Progetto | 1920x1080px | 16:9 |
| Galleria Foto | 1200x800px | Variabile |
| Foto Profilo | 800x800px | 1:1 |
| Categoria Cover | 1200x800px | 3:2 |

### Come Caricare

1. Clicca sul campo immagine
2. **Trascina** l'immagine o clicca **Upload**
3. Seleziona file dal tuo computer
4. Attendi il caricamento
5. (Opzionale) Regola hotspot/crop:
   - Clicca sull'immagine caricata
   - Clicca **Edit**
   - Trascina il punto rosso per definire il focus
   - Salva

### Hotspot e Crop

L'**hotspot** è il punto focale dell'immagine (es: viso di una persona).

- Sanity usa l'hotspot per ritagli automatici intelligenti
- Il crop automatico mantiene sempre visibile l'hotspot
- Essenziale per immagini responsive

**Come impostare l'hotspot:**

1. Apri l'immagine in edit
2. Clicca sulla tab **Hotspot**
3. Trascina il punto rosso sul soggetto principale
4. Clicca **Save**

### Metadati Automatici

Sanity estrae automaticamente:

- **LQIP**: Placeholder a bassa qualità (per loading progressivo)
- **Dimensioni**: Larghezza e altezza
- **Palette colori**: Colori dominanti
- **EXIF**: Dati fotocamera (ISO, tempo, diaframma, focale)

---

## Pubblicazione Contenuti

### Stati dei Documenti

**Draft** (Bozza)
- Documento non pubblicato
- Solo tu puoi vederlo nello Studio
- NON appare sul sito pubblico

**Published** (Pubblicato)
- Documento visibile sul sito
- Aggiornamenti si vedono entro 30 secondi (ISR)

### Come Pubblicare

1. Crea o modifica un documento
2. Clicca **Publish** in alto a destra
3. Conferma

### Come Salvare Bozza

1. Modifica il documento
2. Le modifiche si salvano automaticamente
3. NON cliccare Publish
4. Il documento rimane in draft

### Annullare Pubblicazione

1. Apri il documento pubblicato
2. Clicca **Unpublish** (menù azioni)
3. Il documento torna in draft

### Aggiornare Contenuto Pubblicato

1. Apri il documento pubblicato
2. Modifica i campi
3. Clicca **Publish** di nuovo
4. Le modifiche appaiono sul sito in ~30 secondi

---

## Best Practices

### Nomenclatura

✅ **Buone pratiche**
- Titoli chiari e descrittivi
- Slug leggibili (es: `wedding-villa-borghese`)
- Tag coerenti (sempre minuscolo, usa `-` invece di spazi)

❌ **Da evitare**
- Titoli generici (es: "Progetto 1", "Test")
- Slug con caratteri speciali
- Tag duplicati con spelling diverso

### Immagini

✅ **Buone pratiche**
- Comprimere prima dell'upload (usa TinyPNG o Squoosh)
- Nominare file descrittivamente
- Settare sempre hotspot su immagini con persone
- Compilare sempre il testo alternativo

❌ **Da evitare**
- Caricare immagini troppo pesanti (>5MB)
- Usare screenshot o immagini a bassa risoluzione
- Lasciare alt text vuoto

### SEO

✅ **Buone pratiche**
- Descrizioni uniche per ogni progetto
- Tag pertinenti al contenuto
- Titoli con parole chiave (es: "Matrimonio Elegante Villa Roma")
- Compilare metadati social

❌ **Da evitare**
- Duplicare descrizioni
- Keyword stuffing (ripetere troppe volte la stessa parola)
- Lasciare campi SEO vuoti

### Organizzazione

✅ **Buone pratiche**
- Assegnare sempre una categoria
- Usare l'ordine personalizzato per progetti importanti
- Marcare come "In evidenza" solo i lavori migliori
- Mantenere numero progetti in evidenza tra 4-8

❌ **Da evitare**
- Progetti senza categoria
- Troppi progetti in evidenza (confonde)
- Non usare le date (importanti per ordinamento)

---

## FAQ

### Come modifico l'ordine dei progetti in homepage?

Usa il campo **Ordine Visualizzazione**:
- 0 = primo posto
- 1 = secondo posto
- etc.

Se hanno lo stesso numero, vengono ordinati per data.

### Posso caricare video?

Attualmente il sistema è ottimizzato per foto. Per video:
- Carica su YouTube/Vimeo
- Embed nella descrizione (se supportato)

### Come aggiungo un progetto senza pubblicarlo?

1. Crea il progetto
2. Compila i campi
3. **NON** cliccare Publish
4. Torna indietro - il progetto è salvato come draft

### Quanto tempo ci vuole per vedere le modifiche sul sito?

- **Modifiche a contenuti esistenti**: 30 secondi (ISR)
- **Nuovi progetti/categorie**: Fino a 60 secondi
- **Impostazioni globali**: Fino a 2 minuti

Se non vedi le modifiche, prova a ricaricare la pagina con CTRL+F5 (o CMD+SHIFT+R su Mac).

### Posso recuperare un progetto eliminato?

No, le eliminazioni sono permanenti. Per sicurezza:
- Invece di eliminare, togli la spunta da **Pubblicato**
- Il progetto sarà nascosto ma recuperabile

### Come cambio la lingua dello Studio?

Lo Studio è in inglese by default. Per cambiare:
- Controlla nelle impostazioni utente (icona profilo)
- Alcuni plugin supportano italiano

### Chi può accedere allo Studio?

Solo gli utenti che inviti:
1. Vai su https://www.sanity.io/manage
2. Seleziona il progetto
3. **Members** → **Invite member**
4. Inserisci email e ruolo (Editor/Viewer)

### Come faccio backup dei dati?

Sanity fa backup automatici. Per export manuale:
1. Usa Vision tool con query: `*[_type == "project"]`
2. Oppure usa Sanity CLI: `sanity dataset export`

### Lo Studio funziona da mobile?

Sì, ma l'esperienza è ottimizzata per desktop/tablet.
Per modifiche rapide va bene, per lavoro esteso usa un computer.

---

## Supporto

### Hai bisogno di aiuto?

- **Documentazione ufficiale**: https://www.sanity.io/docs
- **Community**: https://slack.sanity.io
- **Email sviluppatore**: [inserisci la tua email]

### Problemi comuni

**"Non riesco a caricare immagini"**
- Controlla dimensione file (<10MB)
- Verifica formato (JPG/PNG)
- Prova a ricaricare la pagina

**"Non vedo il pulsante Publish"**
- Controlla di aver compilato tutti i campi obbligatori (*)
- Verifica di non avere errori di validazione (segnalati in rosso)

**"Le modifiche non si vedono sul sito"**
- Aspetta 30-60 secondi
- Ricarica la pagina con CTRL+F5
- Verifica di aver cliccato Publish

---

**Buon lavoro con il tuo portfolio! 🚀📸**

*Ultimo aggiornamento: Ottobre 2024*
