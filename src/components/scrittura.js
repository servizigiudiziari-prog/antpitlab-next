/**
 * SCRITTURA — Sala letteraria
 * Gestione contenuti: libri, saggi, racconti, poesie, blog
 */

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
    <div class="space-y-8">
      <!-- Libro pubblicato - Placeholder -->
      <div class="book-card bg-gradient-to-r from-amber-950/40 to-amber-900/20 rounded-lg p-8 border border-amber-800/30 shadow-xl hover:shadow-2xl transition-all">
        <div class="flex gap-8 items-start">
          <!-- Copertina placeholder -->
          <div class="flex-shrink-0 w-48 h-72 bg-amber-900/30 rounded-lg border-2 border-amber-700/50 flex items-center justify-center">
            <div class="text-center p-4">
              <span class="text-amber-600 text-6xl">📖</span>
              <p class="text-amber-100/40 text-xs mt-2 font-serif">Copertina in arrivo</p>
            </div>
          </div>

          <!-- Info libro -->
          <div class="flex-1">
            <h3 class="font-serif text-3xl text-amber-50 mb-2">[Titolo Libro]</h3>
            <p class="text-amber-200/60 text-sm mb-4 font-serif">
              <span>2024</span> · <span>Genere</span>
            </p>
            <p class="text-amber-100/80 leading-relaxed mb-6 font-serif">
              Descrizione del libro... Una sinossi accattivante che invita alla lettura.
              Massimo 3-4 righe per mantenere il mistero e l'eleganza.
            </p>
            <a href="#" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 bg-amber-700/40 hover:bg-amber-700/60 text-amber-50 rounded border border-amber-600/50 transition-all font-serif">
              <span>→</span> Leggi su Amazon
            </a>
          </div>
        </div>
      </div>

      <!-- Libro in arrivo -->
      <div class="book-card bg-gradient-to-r from-slate-900/40 to-slate-800/20 rounded-lg p-8 border border-slate-700/30 shadow-xl relative overflow-hidden">
        <!-- Badge "In arrivo" -->
        <div class="absolute top-4 right-4 px-4 py-2 bg-amber-600/80 text-amber-50 text-sm font-serif rounded-full">
          Prossimamente
        </div>

        <div class="flex gap-8 items-start opacity-75">
          <!-- Copertina locked -->
          <div class="flex-shrink-0 w-48 h-72 bg-slate-800/50 rounded-lg border-2 border-slate-600/50 flex items-center justify-center relative">
            <span class="text-slate-500 text-6xl">🔒</span>
            <div class="absolute inset-0 backdrop-blur-sm"></div>
          </div>

          <!-- Info libro -->
          <div class="flex-1">
            <h3 class="font-serif text-3xl text-slate-200 mb-2">Il segreto del Sacro Chiodo</h3>
            <p class="text-slate-400 text-sm mb-4 font-serif">
              <span>In lavorazione</span> · <span>Mistero</span>
            </p>
            <p class="text-slate-300/70 leading-relaxed mb-6 font-serif italic">
              Un teaser misterioso che incuriosisce senza svelare troppo...
              La storia di un segreto custodito nei secoli.
            </p>
            <div class="inline-flex items-center gap-2 px-6 py-3 bg-slate-700/40 text-slate-400 rounded border border-slate-600/50 font-serif cursor-not-allowed">
              <span>🔒</span> Prossima uscita
            </div>
          </div>
        </div>
      </div>

      <!-- CTA per aggiungere -->
      <div class="text-center py-12 border-2 border-dashed border-amber-800/30 rounded-lg">
        <p class="text-amber-100/40 font-serif italic">
          Altri libri verranno aggiunti qui...
        </p>
      </div>
    </div>
  `;
}

// === SAGGI ===
function createSaggiContent() {
  return `
    <div class="space-y-6">
      <p class="text-amber-100/60 font-serif italic text-center py-12">
        Nessun saggio pubblicato ancora.<br/>
        Usa il lucchetto letterario per aggiungere contenuti.
      </p>
    </div>
  `;
}

// === RACCONTI ===
function createRaccontiContent() {
  return `
    <div class="space-y-6">
      <p class="text-amber-100/60 font-serif italic text-center py-12">
        Nessun racconto pubblicato ancora.<br/>
        Usa il lucchetto letterario per aggiungere contenuti.
      </p>
    </div>
  `;
}

// === POESIE ===
function createPoesieContent() {
  return `
    <div class="space-y-6">
      <p class="text-amber-100/60 font-serif italic text-center py-12">
        Nessuna poesia pubblicata ancora.<br/>
        Usa il lucchetto letterario per aggiungere contenuti.
      </p>
    </div>
  `;
}

// === BLOG ===
function createBlogContent() {
  return `
    <div class="space-y-6">
      <p class="text-amber-100/60 font-serif italic text-center py-12">
        Nessun articolo nel blog ancora.<br/>
        Usa il lucchetto letterario per aggiungere contenuti.
      </p>
    </div>
  `;
}

// Gestione tabs
export function initScritturaTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Rimuovi active da tutti
      tabButtons.forEach(b => {
        b.classList.remove('active', 'border-amber-600', 'text-amber-50');
        b.classList.add('border-transparent', 'text-amber-100/60');
      });

      // Aggiungi active al cliccato
      btn.classList.add('active', 'border-amber-600', 'text-amber-50');
      btn.classList.remove('border-transparent', 'text-amber-100/60');

      // Mostra contenuto corretto
      tabContents.forEach(content => {
        if (content.getAttribute('data-content') === targetTab) {
          content.classList.remove('hidden');
          content.classList.add('animate-fadeIn');
        } else {
          content.classList.add('hidden');
        }
      });
    });
  });

  // Admin lock click
  const adminLock = document.getElementById('admin-lock');
  if (adminLock) {
    adminLock.addEventListener('click', () => {
      alert('🔒 Backend Sanity CMS\n\nVerrà configurato nel prossimo step.\nPotrai caricare copertine, contenuti e gestire tutto da qui.');
    });
  }
}
