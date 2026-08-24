/**
 * PORTALE COSMICO — Entry Point
 * Orchestrazione delle tre fasi percettive:
 * 1. Portale (Monolite)
 * 2. Hub (Costellazione)
 * 3. Sala (Dimensione)
 */

import './styles/main.css';
import { PortalScene } from './scenes/portal.js';
import { HubScene } from './scenes/hub.js';
import { RoomManager } from './scenes/room.js';

class CosmicPortal {
  constructor() {
    this.canvas = document.getElementById('portal-canvas');
    this.currentScene = 'portal'; // 'portal' | 'hub' | 'room'

    this.portalScene = null;
    this.hubScene = null;
    this.roomManager = null;

    this.init();
  }

  init() {
    // Inizia con il portale (monolite)
    this.portalScene = new PortalScene(this.canvas, () => this.enterHub());
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.currentScene === 'portal' && this.portalScene) {
      this.portalScene.render();
    } else if (this.currentScene === 'hub' && this.hubScene) {
      this.hubScene.render();
    }
  }

  enterHub() {
    // Pulisci portale
    if (this.portalScene) {
      this.portalScene.dispose();
      this.portalScene = null;
    }

    // Nascondi UI portale
    document.getElementById('portal-ui').classList.add('hidden');

    // Inizializza hub
    this.currentScene = 'hub';
    this.hubScene = new HubScene(
      this.canvas,
      (dimension) => this.enterRoom(dimension),
      () => this.backToPortal()
    );
  }

  enterRoom(dimension) {
    this.currentScene = 'room';

    // Nascondi canvas (non serve più Three.js nelle sale)
    this.canvas.style.opacity = '0';

    // Inizializza room manager se non esiste
    if (!this.roomManager) {
      this.roomManager = new RoomManager(() => this.backToHub());
    }

    // Entra nella sala
    setTimeout(() => {
      this.roomManager.enter(dimension);
    }, 300);
  }

  backToHub() {
    // Ritorna alla costellazione
    this.currentScene = 'hub';

    // Mostra di nuovo il canvas
    this.canvas.style.opacity = '1';

    // Resetta le sfere (fade in)
    if (this.hubScene) {
      this.hubScene.reset();
    }
  }

  backToPortal() {
    // Pulisci hub
    if (this.hubScene) {
      this.hubScene.dispose();
      this.hubScene = null;
    }

    // Nascondi UI hub
    const hubUI = document.getElementById('hub-ui');
    hubUI.classList.add('hidden');
    hubUI.style.opacity = '0';

    // Ricrea il portale
    this.currentScene = 'portal';
    this.portalScene = new PortalScene(this.canvas, () => this.enterHub());

    // Mostra UI portale con fade in
    setTimeout(() => {
      const portalUI = document.getElementById('portal-ui');
      portalUI.classList.remove('hidden');
      setTimeout(() => {
        portalUI.style.opacity = '1';
      }, 100);
    }, 500);
  }
}

// Avvia il portale
new CosmicPortal();
