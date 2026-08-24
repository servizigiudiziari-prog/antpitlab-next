/**
 * SCRITTURA — Sala letteraria
 * Gestione contenuti: libri, saggi, racconti, poesie, blog
 */

import { getLibri, getSaggi, getRacconti, getPoesie, getArticoliBlog, urlFor } from '../lib/sanity/client.js';

// Stato per i contenuti caricati
let contentCache = {
  libri: null,
  saggi: null,
  racconti: null,
  poesie: null,
  blog: null
};

export function createScritturaContent() {
  return `
    <div class="h-full overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-amber-800/30">
      <!-- Header con stile letterario -->
      <div class="text-center mb-12 border-b-2 border-amber-900/30 pb-8">
        <h1 class="font-serif text-6xl text-amber-50 mb-4 tracking-wide">Scrittura</h1>
        <p class="font-serif text-xl text-amber-100/70 italic">
          Tracce di senso — parole che tessono il reale
        </p>
      </div>

      <!-- Tabs letterari -->
      <div class="flex justify-center gap-6 mb-12 flex-wrap">
        <button data-tab="libri" class="tab-btn active px-6 py-3 font-serif text-lg border-b-2 border-amber-600 text-amber-50 hover:text-amber-300 transition-colors">
          📚 Libri
        </button>
        <button data-tab="saggi" class="tab-btn px-6 py-3 font-serif text-lg border-b-2 border-transparent text-amber-100/60 hover:text-amber-300 transition-colors">
          📄 Saggi
        </button>
        <button data-tab="racconti" class="tab-btn px-6 py-3 font-serif text-lg border-b-2 border-transparent text-amber-100/60 hover:text-amber-300 transition-colors">
          📖 Racconti
        </button>
        <button data-tab="poesie" class="tab-btn px-6 py-3 font-serif text-lg border-b-2 border-transparent text-amber-100/60 hover:text-amber-300 transition-colors">
          🖋️ Poesie
        </button>
        <button data-tab="blog" class="tab-btn px-6 py-3 font-serif text-lg border-b-2 border-transparent text-amber-100/60 hover:text-amber-300 transition-colors">
          ✍️ Blog
        </button>
      </div>

      <!-- Contenuto tabs -->
      <div id="tab-content" class="max-w-4xl mx-auto">
        <!-- Libri (default) -->
        <div data-content="libri" class="tab-content">
          ${createLibriContent()}
        </div>

        <!-- Saggi -->
        <div data-content="saggi" class="tab-content hidden">
          ${createSaggiContent()}
        </div>

        <!-- Racconti -->
        <div data-content="racconti" class="tab-content hidden">
          ${createRaccontiContent()}
        </div>

        <!-- Poesie -->
        <div data-content="poesie" class="tab-content hidden">
          ${createPoesieContent()}
        </div>

        <!-- Blog -->
        <div data-content="blog" class="tab-content hidden">
          ${createBlogContent()}
        </div>
      </div>

      <!-- Lucchetto letterario (accesso backend) -->
      <div class="fixed bottom-8 right-8">
        <button id="admin-lock" class="group flex items-center gap-3 px-6 py-4 bg-amber-900/40 hover:bg-amber-900/60 backdrop-blur-sm border border-amber-700/50 rounded-lg transition-all shadow-lg hover:shadow-amber-900/50">
          <span class="text-2xl">🖋️</span>
          <span class="text-xl">🔒</span>
          <span class="font-serif text-amber-100 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            Gestisci Contenuti
          </span>
        </button>
      </div>
    </div>
  `;
}

// === LIBRI ===
function createLibriContent() {
  return `
    <div id="libri-container" class="space-y-8">
      <!-- Loading state -->
      <div class="text-center py-12">
        <div class="animate-pulse text-amber-100/60 font-serif italic">
          Caricamento libri...
        </div>
      </div>
    </div>
  `;
}

// Carica e renderizza libri dinamicamente
async function loadLibriContent() {
  const container = document.getElementById('libri-container');
  if (!container) return;

  try {
    // Usa cache se disponibile
    if (!contentCache.libri) {
      contentCache.libri = await getLibri();
    }
    const libri = contentCache.libri;

    // Separa libri pubblicati e in arrivo
    const pubblicati = libri.filter(l => l.stato === 'pubblicato');
    const inArrivo = libri.filter(l => l.stato === 'in_arrivo');

    let html = '<div class="space-y-8">';

    // Renderizza libri pubblicati
    pubblicati.forEach(libro => {
      const coverUrl = libro.copertina ? urlFor(libro.copertina).width(400).url() : null;

      html += `
        <div class="book-card bg-gradient-to-r from-amber-950/40 to-amber-900/20 rounded-lg p-8 border border-amber-800/30 shadow-xl hover:shadow-2xl transition-all">
          <div class="flex gap-8 items-start">
            <!-- Copertina -->
            <div class="flex-shrink-0 w-48 h-72 bg-amber-900/30 rounded-lg border-2 border-amber-700/50 overflow-hidden">
              ${coverUrl
                ? `<img src="${coverUrl}" alt="${libro.titolo}" class="w-full h-full object-cover"/>`
                : `<div class="w-full h-full flex items-center justify-center">
                     <div class="text-center p-4">
                       <span class="text-amber-600 text-6xl">📖</span>
                       <p class="text-amber-100/40 text-xs mt-2 font-serif">Copertina in arrivo</p>
                     </div>
                   </div>`
              }
            </div>

            <!-- Info libro -->
            <div class="flex-1">
              <h3 class="font-serif text-3xl text-amber-50 mb-2">${libro.titolo}</h3>
              ${libro.sottotitolo ? `<p class="font-serif text-xl text-amber-100/70 italic mb-2">${libro.sottotitolo}</p>` : ''}
              <p class="text-amber-200/60 text-sm mb-4 font-serif">
                ${libro.anno ? `<span>${libro.anno}</span>` : ''} ${libro.anno && libro.genere ? '·' : ''} ${libro.genere ? `<span>${libro.genere}</span>` : ''}
              </p>
              <p class="text-amber-100/80 leading-relaxed mb-6 font-serif">
                ${libro.descrizione || 'Descrizione in arrivo...'}
              </p>
              ${libro.linkAmazon
                ? `<a href="${libro.linkAmazon}" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 bg-amber-700/40 hover:bg-amber-700/60 text-amber-50 rounded border border-amber-600/50 transition-all font-serif">
                     <span>→</span> Leggi su Amazon
                   </a>`
                : ''
              }
            </div>
          </div>
        </div>
      `;
    });

    // Renderizza libri in arrivo
    inArrivo.forEach(libro => {
      html += `
        <div class="book-card bg-gradient-to-r from-slate-900/40 to-slate-800/20 rounded-lg p-8 border border-slate-700/30 shadow-xl relative overflow-hidden">
          <!-- Badge "In arrivo" -->
          <div class="absolute top-4 right-4 px-4 py-2 bg-amber-600/80 text-amber-50 text-sm font-serif rounded-full">
            ${libro.dataUscita ? `Prossimamente ${libro.dataUscita}` : 'Prossimamente'}
          </div>

          <div class="flex gap-8 items-start opacity-75">
            <!-- Copertina locked -->
            <div class="flex-shrink-0 w-48 h-72 bg-slate-800/50 rounded-lg border-2 border-slate-600/50 flex items-center justify-center relative">
              <span class="text-slate-500 text-6xl">🔒</span>
              <div class="absolute inset-0 backdrop-blur-sm"></div>
            </div>

            <!-- Info libro -->
            <div class="flex-1">
              <h3 class="font-serif text-3xl text-slate-200 mb-2">${libro.titolo}</h3>
              <p class="text-slate-400 text-sm mb-4 font-serif">
                <span>In lavorazione</span>${libro.genere ? ` · <span>${libro.genere}</span>` : ''}
              </p>
              <p class="text-slate-300/70 leading-relaxed mb-6 font-serif italic">
                ${libro.descrizione || 'Un mistero in arrivo...'}
              </p>
              <div class="inline-flex items-center gap-2 px-6 py-3 bg-slate-700/40 text-slate-400 rounded border border-slate-600/50 font-serif cursor-not-allowed">
                <span>🔒</span> Prossima uscita
              </div>
            </div>
          </div>
        </div>
      `;
    });

    // Se non ci sono libri, mostra placeholder
    if (libri.length === 0) {
      html += `
        <div class="text-center py-12 border-2 border-dashed border-amber-800/30 rounded-lg">
          <p class="text-amber-100/60 font-serif italic mb-4">
            Nessun libro ancora.<br/>
            Usa il lucchetto letterario per aggiungere il primo libro.
          </p>
        </div>
      `;
    }

    html += '</div>';
    container.innerHTML = html;

  } catch (error) {
    console.error('Errore caricamento libri:', error);
    // Mostra messaggio di errore con fallback a placeholder
    container.innerHTML = `
      <div class="text-center py-12 border-2 border-amber-800/30 rounded-lg">
        <p class="text-amber-100/60 font-serif italic mb-2">
          ${error.message.includes('projectId')
            ? 'Configura Sanity CMS per visualizzare i libri.<br/>Segui la guida in <code>sanity/SETUP_GUIDE.md</code>'
            : 'Impossibile caricare i libri al momento.'}
        </p>
        ${error.message.includes('projectId')
          ? `<p class="text-amber-100/40 text-sm font-serif mt-4">
               Oppure usa il lucchetto letterario 🖋️🔒 per accedere a Sanity Studio.
             </p>`
          : ''
        }
      </div>
    `;
  }
}

// === SAGGI ===
function createSaggiContent() {
  return `
    <div id="saggi-container" class="space-y-6">
      <div class="text-center py-12">
        <div class="animate-pulse text-amber-100/60 font-serif italic">
          Caricamento saggi...
        </div>
      </div>
    </div>
  `;
}

async function loadSaggiContent() {
  const container = document.getElementById('saggi-container');
  if (!container) return;

  try {
    if (!contentCache.saggi) {
      contentCache.saggi = await getSaggi();
    }
    const saggi = contentCache.saggi;

    if (saggi.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12">
          <p class="text-amber-100/60 font-serif italic">
            Nessun saggio pubblicato ancora.<br/>
            Usa il lucchetto letterario per aggiungere contenuti.
          </p>
        </div>
      `;
      return;
    }

    let html = '<div class="space-y-6">';
    saggi.forEach(saggio => {
      html += `
        <div class="bg-amber-950/30 rounded-lg p-6 border border-amber-800/20 hover:border-amber-700/40 transition-all">
          <h3 class="font-serif text-2xl text-amber-50 mb-2">${saggio.titolo}</h3>
          <p class="text-amber-200/50 text-sm mb-4 font-serif">
            ${new Date(saggio.data).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
            ${saggio.categoria ? ` · ${saggio.categoria}` : ''}
          </p>
          <p class="text-amber-100/70 leading-relaxed font-serif mb-4">
            ${saggio.abstract || ''}
          </p>
          ${saggio.linkEsterno
            ? `<a href="${saggio.linkEsterno}" target="_blank" class="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-serif text-sm">
                 Leggi il saggio completo →
               </a>`
            : ''
          }
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;

  } catch (error) {
    console.error('Errore caricamento saggi:', error);
    container.innerHTML = `
      <div class="text-center py-12">
        <p class="text-amber-100/60 font-serif italic">
          ${error.message.includes('projectId')
            ? 'Configura Sanity CMS per visualizzare i saggi.'
            : 'Impossibile caricare i saggi al momento.'}
        </p>
      </div>
    `;
  }
}

// === RACCONTI ===
function createRaccontiContent() {
  return `
    <div id="racconti-container" class="space-y-6">
      <div class="text-center py-12">
        <div class="animate-pulse text-amber-100/60 font-serif italic">
          Caricamento racconti...
        </div>
      </div>
    </div>
  `;
}

async function loadRaccontiContent() {
  const container = document.getElementById('racconti-container');
  if (!container) return;

  try {
    if (!contentCache.racconti) {
      contentCache.racconti = await getRacconti();
    }
    const racconti = contentCache.racconti;

    if (racconti.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12">
          <p class="text-amber-100/60 font-serif italic">
            Nessun racconto pubblicato ancora.<br/>
            Usa il lucchetto letterario per aggiungere contenuti.
          </p>
        </div>
      `;
      return;
    }

    let html = '<div class="grid md:grid-cols-2 gap-6">';
    racconti.forEach(racconto => {
      const imgUrl = racconto.immagine ? urlFor(racconto.immagine).width(600).url() : null;
      html += `
        <div class="bg-amber-950/30 rounded-lg overflow-hidden border border-amber-800/20 hover:border-amber-700/40 transition-all">
          ${imgUrl
            ? `<div class="w-full h-48 overflow-hidden">
                 <img src="${imgUrl}" alt="${racconto.titolo}" class="w-full h-full object-cover"/>
               </div>`
            : ''
          }
          <div class="p-6">
            <h3 class="font-serif text-xl text-amber-50 mb-2">${racconto.titolo}</h3>
            <p class="text-amber-200/50 text-xs mb-3 font-serif">
              ${new Date(racconto.data).toLocaleDateString('it-IT', { year: 'numeric', month: 'long' })}
              ${racconto.tempoLettura ? ` · ${racconto.tempoLettura} min lettura` : ''}
            </p>
            <p class="text-amber-100/70 text-sm leading-relaxed font-serif">
              ${racconto.anteprima || ''}
            </p>
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;

  } catch (error) {
    console.error('Errore caricamento racconti:', error);
    container.innerHTML = `
      <div class="text-center py-12">
        <p class="text-amber-100/60 font-serif italic">
          ${error.message.includes('projectId')
            ? 'Configura Sanity CMS per visualizzare i racconti.'
            : 'Impossibile caricare i racconti al momento.'}
        </p>
      </div>
    `;
  }
}

// === POESIE ===
function createPoesieContent() {
  return `
    <div id="poesie-container" class="space-y-6">
      <div class="text-center py-12">
        <div class="animate-pulse text-amber-100/60 font-serif italic">
          Caricamento poesie...
        </div>
      </div>
    </div>
  `;
}

async function loadPoesieContent() {
  const container = document.getElementById('poesie-container');
  if (!container) return;

  try {
    if (!contentCache.poesie) {
      contentCache.poesie = await getPoesie();
    }
    const poesie = contentCache.poesie;

    if (poesie.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12">
          <p class="text-amber-100/60 font-serif italic">
            Nessuna poesia pubblicata ancora.<br/>
            Usa il lucchetto letterario per aggiungere contenuti.
          </p>
        </div>
      `;
      return;
    }

    let html = '<div class="space-y-8">';
    poesie.forEach(poesia => {
      html += `
        <div class="bg-amber-950/20 rounded-lg p-8 border border-amber-800/10">
          <h3 class="font-serif text-2xl text-amber-50 mb-2 text-center">${poesia.titolo}</h3>
          <p class="text-amber-200/40 text-xs mb-6 text-center font-serif">
            ${poesia.collezione ? `${poesia.collezione} · ` : ''}${new Date(poesia.data).getFullYear()}
          </p>
          <div class="text-amber-100/80 font-serif leading-loose whitespace-pre-line text-center max-w-2xl mx-auto">
            ${poesia.testo || ''}
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;

  } catch (error) {
    console.error('Errore caricamento poesie:', error);
    container.innerHTML = `
      <div class="text-center py-12">
        <p class="text-amber-100/60 font-serif italic">
          ${error.message.includes('projectId')
            ? 'Configura Sanity CMS per visualizzare le poesie.'
            : 'Impossibile caricare le poesie al momento.'}
        </p>
      </div>
    `;
  }
}

// === BLOG ===
function createBlogContent() {
  return `
    <div id="blog-container" class="space-y-6">
      <div class="text-center py-12">
        <div class="animate-pulse text-amber-100/60 font-serif italic">
          Caricamento articoli...
        </div>
      </div>
    </div>
  `;
}

async function loadBlogContent() {
  const container = document.getElementById('blog-container');
  if (!container) return;

  try {
    if (!contentCache.blog) {
      contentCache.blog = await getArticoliBlog();
    }
    const articoli = contentCache.blog;

    if (articoli.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12">
          <p class="text-amber-100/60 font-serif italic">
            Nessun articolo nel blog ancora.<br/>
            Usa il lucchetto letterario per aggiungere contenuti.
          </p>
        </div>
      `;
      return;
    }

    let html = '<div class="space-y-6">';
    articoli.forEach(articolo => {
      const imgUrl = articolo.immagineCopertina ? urlFor(articolo.immagineCopertina).width(800).url() : null;
      html += `
        <article class="bg-amber-950/30 rounded-lg overflow-hidden border border-amber-800/20 hover:border-amber-700/40 transition-all">
          ${imgUrl
            ? `<div class="w-full h-64 overflow-hidden">
                 <img src="${imgUrl}" alt="${articolo.titolo}" class="w-full h-full object-cover"/>
               </div>`
            : ''
          }
          <div class="p-6">
            <h3 class="font-serif text-2xl text-amber-50 mb-3">${articolo.titolo}</h3>
            <p class="text-amber-200/50 text-sm mb-4 font-serif">
              ${new Date(articolo.data).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p class="text-amber-100/70 leading-relaxed font-serif mb-4">
              ${articolo.sommario || ''}
            </p>
            ${articolo.tag && articolo.tag.length > 0
              ? `<div class="flex flex-wrap gap-2">
                   ${articolo.tag.map(tag => `<span class="text-xs px-3 py-1 bg-amber-900/30 text-amber-300 rounded-full font-serif">${tag}</span>`).join('')}
                 </div>`
              : ''
            }
          </div>
        </article>
      `;
    });
    html += '</div>';
    container.innerHTML = html;

  } catch (error) {
    console.error('Errore caricamento blog:', error);
    container.innerHTML = `
      <div class="text-center py-12">
        <p class="text-amber-100/60 font-serif italic">
          ${error.message.includes('projectId')
            ? 'Configura Sanity CMS per visualizzare gli articoli del blog.'
            : 'Impossibile caricare gli articoli al momento.'}
        </p>
      </div>
    `;
  }
}

// Mappa delle funzioni di caricamento per ogni tab
const contentLoaders = {
  libri: loadLibriContent,
  saggi: loadSaggiContent,
  racconti: loadRaccontiContent,
  poesie: loadPoesieContent,
  blog: loadBlogContent
};

// Gestione tabs
export function initScritturaTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Funzione per caricare contenuto di un tab
  const loadTabContent = async (targetTab) => {
    // Mostra contenuto corretto
    tabContents.forEach(content => {
      if (content.getAttribute('data-content') === targetTab) {
        content.classList.remove('hidden');
        content.classList.add('animate-fadeIn');
      } else {
        content.classList.add('hidden');
      }
    });

    // Carica i dati se esiste un loader per questo tab
    if (contentLoaders[targetTab]) {
      await contentLoaders[targetTab]();
    }
  };

  // Event listener per i bottoni
  tabButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetTab = btn.getAttribute('data-tab');

      // Rimuovi active da tutti
      tabButtons.forEach(b => {
        b.classList.remove('active', 'border-amber-600', 'text-amber-50');
        b.classList.add('border-transparent', 'text-amber-100/60');
      });

      // Aggiungi active al cliccato
      btn.classList.add('active', 'border-amber-600', 'text-amber-50');
      btn.classList.remove('border-transparent', 'text-amber-100/60');

      // Carica contenuto
      await loadTabContent(targetTab);
    });
  });

  // Carica il tab di default (Libri) all'avvio
  setTimeout(() => {
    loadTabContent('libri');
  }, 100);

  // Admin lock click - Apre Sanity Studio
  const adminLock = document.getElementById('admin-lock');
  if (adminLock) {
    adminLock.addEventListener('click', () => {
      // Prova prima lo studio deployed, poi quello locale
      const studioUrl = import.meta.env.VITE_SANITY_STUDIO_URL || 'http://localhost:3333';

      window.open(studioUrl, '_blank');

      // Messaggio informativo
      setTimeout(() => {
        console.log('🔒 Sanity Studio aperto in una nuova finestra');
        console.log('Se non si apre, vai manualmente su:', studioUrl);
      }, 100);
    });
  }
}
