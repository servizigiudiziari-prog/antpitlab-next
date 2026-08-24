/**
 * ROOM — Le Sale Orizzontali
 * Ogni sala è una dimensione creativa, uno spazio contemplativo.
 */

import { DIMENSIONS } from '../data/dimensions.js';
import { createScritturaContent, initScritturaTabs } from '../components/scrittura.js';

export class RoomManager {
  constructor(onBackToHub) {
    this.onBackToHub = onBackToHub;
    this.currentDimensionIndex = 0;
    this.isTransitioning = false;

    this.roomUI = document.getElementById('room-ui');
    this.roomTitle = document.getElementById('room-title');
    this.roomDescription = document.getElementById('room-description');
    this.roomImage = document.getElementById('room-image');

    this.prevButton = document.getElementById('room-prev');
    this.nextButton = document.getElementById('room-next');
    this.backButton = document.getElementById('back-to-hub');

    this.initEvents();
  }

  initEvents() {
    this.prevButton.addEventListener('click', () => this.navigate(-1));
    this.nextButton.addEventListener('click', () => this.navigate(1));
    this.backButton.addEventListener('click', () => this.exitRoom());

    // Frecce tastiera
    document.addEventListener('keydown', (e) => {
      if (this.roomUI.classList.contains('hidden')) return;

      if (e.key === 'ArrowLeft') this.navigate(-1);
      if (e.key === 'ArrowRight') this.navigate(1);
      if (e.key === 'Escape') this.exitRoom();
    });
  }

  enter(dimension) {
    // Trova l'indice della dimensione
    this.currentDimensionIndex = DIMENSIONS.findIndex(d => d.id === dimension.id);

    // Mostra la sala
    this.roomUI.classList.remove('hidden');
    setTimeout(() => {
      this.roomUI.style.opacity = '1';
    }, 50);

    // Carica il contenuto
    this.loadDimension(this.currentDimensionIndex);
  }

  navigate(direction) {
    if (this.isTransitioning) return;

    this.isTransitioning = true;

    // Fade out
    this.roomUI.style.opacity = '0';

    setTimeout(() => {
      // Cambia indice (ciclico)
      this.currentDimensionIndex = (this.currentDimensionIndex + direction + DIMENSIONS.length) % DIMENSIONS.length;

      // Carica nuova dimensione
      this.loadDimension(this.currentDimensionIndex);

      // Fade in
      this.roomUI.style.opacity = '1';

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    }, 500);
  }

  loadDimension(index) {
    const dimension = DIMENSIONS[index];
    const roomContainer = this.roomUI.querySelector('.relative.w-full');

    // Contenuto custom per dimensione specifica
    if (dimension.id === 'scrittura') {
      this.loadScritturaRoom(roomContainer);
    } else {
      this.loadGenericRoom(dimension, roomContainer);
    }
  }

  loadScritturaRoom(container) {
    // Stile letterario con texture carta
    container.style.background = `
      linear-gradient(135deg, #1a1410 0%, #2d1810 100%),
      repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(120, 80, 40, 0.03) 2px, rgba(120, 80, 40, 0.03) 4px)
    `;
    container.style.backgroundBlendMode = 'multiply';

    // Carica contenuto letterario
    const content = document.getElementById('room-content');
    content.innerHTML = createScritturaContent();

    // Inizializza tabs e interazioni
    setTimeout(() => {
      initScritturaTabs();
    }, 100);

    // Nascondi frecce navigazione (non servono in questa sala)
    document.getElementById('room-prev').style.display = 'none';
    document.getElementById('room-next').style.display = 'none';
  }

  loadGenericRoom(dimension, container) {
    // Ripristina frecce navigazione
    document.getElementById('room-prev').style.display = 'flex';
    document.getElementById('room-next').style.display = 'flex';

    // Stile cosmico generico
    const color = `#${dimension.color.toString(16).padStart(6, '0')}`;
    container.style.background = `linear-gradient(135deg, #0a0a12 0%, ${color}22 100%)`;

    // Contenuto generico
    const content = document.getElementById('room-content');
    content.innerHTML = `
      <div class="relative h-full flex flex-col justify-between p-12 text-cosmic-frost">
        <div class="flex-1 flex flex-col justify-center">
          <h1 class="text-5xl font-light mb-6 tracking-wide">${dimension.name}</h1>
          <p class="text-xl leading-relaxed opacity-80 max-w-2xl">${dimension.description}</p>
        </div>
        <div class="mt-8 w-full h-64 bg-cosmic-steel/20 rounded flex items-center justify-center">
          <span class="text-cosmic-steel text-sm">[ ${dimension.name.toLowerCase()} — contenuto in arrivo ]</span>
        </div>
      </div>
    `;
  }

  exitRoom() {
    if (this.isTransitioning) return;

    // Fade out
    this.roomUI.style.opacity = '0';

    setTimeout(() => {
      this.roomUI.classList.add('hidden');
      this.onBackToHub();
    }, 500);
  }
}
