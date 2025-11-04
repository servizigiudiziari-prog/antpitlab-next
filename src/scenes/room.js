/**
 * ROOM — Le Sale Orizzontali
 * Ogni sala è una dimensione creativa, uno spazio contemplativo.
 */

import { DIMENSIONS } from '../data/dimensions.js';

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

    this.roomTitle.textContent = dimension.name;
    this.roomDescription.textContent = dimension.description;

    // Colore dinamico del gradiente
    const color = `#${dimension.color.toString(16).padStart(6, '0')}`;
    this.roomUI.querySelector('.relative.w-full').style.background = `linear-gradient(135deg, #0a0a12 0%, ${color}22 100%)`;

    // Placeholder immagine (puoi aggiungere immagini reali in futuro)
    this.roomImage.innerHTML = `<span class="text-cosmic-steel text-sm">[ ${dimension.name.toLowerCase()} — visuale in arrivo ]</span>`;
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
