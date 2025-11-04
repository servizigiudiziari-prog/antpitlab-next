# Portale Cosmico

> Un portale esperienziale multidimensionale — attraversamento ontologico tra mondi creativi.

## Concept

Non un sito web tradizionale, ma un'**interfaccia percettiva** che si apre su sette dimensioni dell'identità creativa. L'esperienza si sviluppa in tre fasi:

### 1. Il Monolite (Portale Iniziale)
- Presenza primordiale: un monolite di basalto che attende nell'abisso cosmico
- Oscillazione impercettibile, bordo luminoso, glow tenue
- Interazione volontaria: "avvicinati" → attraversamento della soglia

### 2. La Costellazione (Hub)
- Sette sfere fluttuanti, ognuna rappresenta una dimensione creativa:
  - **Fotografia** — Il tempo fermato
  - **Musica** — Frequenze dell'anima
  - **Coding** — Architetture di pensiero
  - **Scrittura** — Tracce di senso
  - **Diritto & Aste** — L'architettura del giusto
  - **Filosofia** — Interrogare il fondamento
  - **Innovazione / AI** — Creare il futuro
- Hover → etichetta
- Click → ingresso nella sala

### 3. Le Sale Orizzontali
- Ogni sala è uno spazio contemplativo dedicato a una dimensione
- Navigazione: ← → (frecce o tastiera)
- Torna alla costellazione con "← Costellazione"

## Stack Tecnico

- **Three.js** — Rendering WebGL (monolite + costellazione)
- **Vite** — Build tool moderno e veloce
- **Tailwind CSS** — Utility-first styling
- **PostProcessing** — UnrealBloomPass per glow percettivo

## Installazione

```bash
# Installa dipendenze
npm install

# Avvia dev server
npm run dev

# Build per produzione
npm run build

# Anteprima build
npm run preview
```

## Struttura del Progetto

```
.
├── index.html              # Entry point HTML
├── src/
│   ├── main.js            # Orchestratore principale
│   ├── scenes/
│   │   ├── portal.js      # Scena monolite
│   │   ├── hub.js         # Scena costellazione
│   │   └── room.js        # Manager sale
│   ├── utils/
│   │   ├── constants.js   # Costanti visive
│   │   └── postprocessing.js  # Bloom effect
│   ├── data/
│   │   └── dimensions.js  # Le 7 dimensioni
│   └── styles/
│       └── main.css       # Tailwind + custom styles
└── public/                # Asset statici
```

## Filosofia Visiva

- **Minimalismo sacro** (non religioso)
- **Presenza cosmica**, non tecnologica
- Nessun rumore visivo
- Interazioni lente, volontarie
- Palette: nero profondo, blu-grigio, bianco tenue, luce fredda

## Performance

- Pixel ratio limitato a 2x per performance
- Postprocessing ottimizzato
- Geometrie semplici, materiali leggeri
- Animazioni percettive (subsonic)

## Future Enhancements

- [ ] Aggiungere immagini/video nelle sale
- [ ] Sound design (frequenze subsoniche)
- [ ] Transizioni 3D tra sale
- [ ] Modalità VR (WebXR)
- [ ] Contenuti dinamici via CMS

---

**Tono e Feeling**: *Minimalismo contemplativo. Non un sito, ma una soglia.*
