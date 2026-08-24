/**
 * PORTALE — Il Monolite
 * Presenza ontologica: un oggetto che attende, respira, osserva.
 */

import * as THREE from 'three';
import { COLORS, MONOLITH_RATIO, ANIMATION, CAMERA } from '../utils/constants.js';
import { createComposer, resizeComposer } from '../utils/postprocessing.js';
import { createStarfield, animateStarfield } from '../utils/starfield.js';

export class PortalScene {
  constructor(canvas, onEnter) {
    this.canvas = canvas;
    this.onEnter = onEnter;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      CAMERA.fov,
      window.innerWidth / window.innerHeight,
      CAMERA.near,
      CAMERA.far
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false
    });

    this.composer = null;
    this.monolith = null;
    this.starfield = null;
    this.time = 0;
    this.isAnimating = false;

    this.init();
  }

  init() {
    // Setup renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(COLORS.void);

    // Setup camera
    this.camera.position.set(CAMERA.position.x, CAMERA.position.y, CAMERA.position.z);
    this.camera.lookAt(0, 0, 0);

    // Creare campo stellare (via lattea)
    this.starfield = createStarfield(5000);
    this.scene.add(this.starfield);

    // Creare il monolite
    this.createMonolith();

    // Luce ambientale tenue
    const ambientLight = new THREE.AmbientLight(COLORS.frost, 0.1);
    this.scene.add(ambientLight);

    // Luce direzionale (bordo tagliente)
    const directionalLight = new THREE.DirectionalLight(COLORS.light, 0.8);
    directionalLight.position.set(5, 10, 7);
    this.scene.add(directionalLight);

    // Edge light (micro-glow percettivo)
    const edgeLight = new THREE.PointLight(COLORS.frost, 0.6, 20);
    edgeLight.position.set(-3, 0, 5);
    this.scene.add(edgeLight);

    // Postprocessing (bloom)
    this.composer = createComposer(this.renderer, this.scene, this.camera);

    // Gestione resize
    window.addEventListener('resize', () => this.onResize());

    // Mostra UI dopo un secondo
    setTimeout(() => {
      document.getElementById('portal-ui').style.opacity = '1';
    }, 1000);

    // Click sul CTA
    document.getElementById('portal-cta').addEventListener('click', () => {
      this.enterPortal();
    });
  }

  createMonolith() {
    const height = 8;
    const width = height * MONOLITH_RATIO;
    const depth = width * 0.5;

    const geometry = new THREE.BoxGeometry(width, height, depth);

    // Material: basalto primordiale con leggera riflessione
    const material = new THREE.MeshStandardMaterial({
      color: COLORS.void,
      metalness: 0.9,
      roughness: 0.2,
      emissive: COLORS.steel,
      emissiveIntensity: 0.05
    });

    this.monolith = new THREE.Mesh(geometry, material);

    // Bordo sottile luminoso (edge highlight)
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: COLORS.frost,
      linewidth: 1,
      transparent: true,
      opacity: 0.3
    });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    this.monolith.add(edges);

    this.scene.add(this.monolith);
  }

  enterPortal() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    // Fade out UI
    const portalUI = document.getElementById('portal-ui');
    portalUI.style.opacity = '0';

    // Animazione: il monolite si dissolve
    const startScale = 1;
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing out
      const eased = 1 - Math.pow(1 - progress, 3);

      this.monolith.scale.setScalar(startScale - eased);
      this.monolith.material.opacity = 1 - eased;
      this.monolith.material.transparent = true;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Passaggio alla costellazione
        this.onEnter();
      }
    };

    animate();
  }

  render() {
    if (!this.isAnimating) {
      // Oscillazione impercettibile del monolite
      this.time += ANIMATION.monolithOscillation;
      this.monolith.rotation.y = Math.sin(this.time) * 0.01;
      this.monolith.position.y = Math.sin(this.time * 2) * 0.02;
    }

    // Animazione campo stellare (rotazione lenta)
    if (this.starfield) {
      animateStarfield(this.starfield, 1);
    }

    this.composer.render();
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    resizeComposer(this.composer);
  }

  dispose() {
    this.monolith.geometry.dispose();
    this.monolith.material.dispose();
    window.removeEventListener('resize', () => this.onResize());
  }
}
