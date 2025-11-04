/**
 * HUB — La Costellazione
 * Sette sfere fluttuanti, sette dimensioni creative.
 */

import * as THREE from 'three';
import { COLORS, SPHERE_COLORS, ANIMATION, CAMERA } from '../utils/constants.js';
import { DIMENSIONS } from '../data/dimensions.js';
import { createComposer, resizeComposer } from '../utils/postprocessing.js';

export class HubScene {
  constructor(canvas, onDimensionSelect) {
    this.canvas = canvas;
    this.onDimensionSelect = onDimensionSelect;

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
    this.spheres = [];
    this.time = 0;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredSphere = null;

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

    // Creare le 7 sfere
    this.createConstellation();

    // Luce ambientale
    const ambientLight = new THREE.AmbientLight(COLORS.frost, 0.3);
    this.scene.add(ambientLight);

    // Luce principale
    const mainLight = new THREE.PointLight(COLORS.light, 1, 50);
    mainLight.position.set(0, 0, 10);
    this.scene.add(mainLight);

    // Postprocessing (bloom)
    this.composer = createComposer(this.renderer, this.scene, this.camera);

    // Eventi interazione
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('click', () => this.onClick());
    window.addEventListener('resize', () => this.onResize());

    // Fade in hub UI
    setTimeout(() => {
      const hubUI = document.getElementById('hub-ui');
      hubUI.classList.remove('hidden');
      hubUI.style.opacity = '1';
    }, 500);
  }

  createConstellation() {
    DIMENSIONS.forEach((dimension, index) => {
      const geometry = new THREE.SphereGeometry(0.8, 32, 32);

      const material = new THREE.MeshStandardMaterial({
        color: dimension.color,
        metalness: 0.5,
        roughness: 0.3,
        emissive: dimension.color,
        emissiveIntensity: 0.2
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(dimension.position.x, dimension.position.y, dimension.position.z);
      sphere.userData = { dimension, index };

      // Aura percettiva (piccola sfera esterna)
      const auraGeometry = new THREE.SphereGeometry(0.85, 16, 16);
      const auraMaterial = new THREE.MeshBasicMaterial({
        color: dimension.color,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
      });
      const aura = new THREE.Mesh(auraGeometry, auraMaterial);
      sphere.add(aura);

      this.scene.add(sphere);
      this.spheres.push(sphere);
    });
  }

  onMouseMove(event) {
    // Coordinate normalizzate
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycast
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.spheres);

    // Reset hover precedente
    if (this.hoveredSphere) {
      this.hoveredSphere.scale.setScalar(1);
      this.hideDimensionLabel();
    }

    // Nuovo hover
    if (intersects.length > 0) {
      this.hoveredSphere = intersects[0].object;
      this.hoveredSphere.scale.setScalar(1.2);
      this.showDimensionLabel(this.hoveredSphere.userData.dimension, event);
      document.body.style.cursor = 'pointer';
    } else {
      this.hoveredSphere = null;
      document.body.style.cursor = 'default';
    }
  }

  onClick() {
    if (this.hoveredSphere) {
      const dimension = this.hoveredSphere.userData.dimension;

      // Fade out costellazione
      const hubUI = document.getElementById('hub-ui');
      hubUI.style.opacity = '0';

      // Animazione dissoluzione sfere
      this.spheres.forEach((sphere, i) => {
        setTimeout(() => {
          const startScale = sphere === this.hoveredSphere ? 1.2 : 1;
          this.animateSphereDissolve(sphere, startScale);
        }, i * 50);
      });

      // Passa alla sala dopo 800ms
      setTimeout(() => {
        this.onDimensionSelect(dimension);
      }, 800);
    }
  }

  animateSphereDissolve(sphere, startScale) {
    const duration = 600;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      sphere.scale.setScalar(startScale - (startScale * eased));
      sphere.material.opacity = 1 - eased;
      sphere.material.transparent = true;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  showDimensionLabel(dimension, event) {
    const hubUI = document.getElementById('hub-ui');
    let label = document.getElementById('dimension-label');

    if (!label) {
      label = document.createElement('div');
      label.id = 'dimension-label';
      label.className = 'fixed pointer-events-none text-cosmic-frost text-lg tracking-wider glow';
      hubUI.appendChild(label);
    }

    label.textContent = dimension.name;
    label.style.left = `${event.clientX + 20}px`;
    label.style.top = `${event.clientY - 10}px`;
    label.style.opacity = '1';
  }

  hideDimensionLabel() {
    const label = document.getElementById('dimension-label');
    if (label) {
      label.style.opacity = '0';
    }
  }

  render() {
    this.time += ANIMATION.sphereFloat;

    // Fluttuazione delle sfere
    this.spheres.forEach((sphere, i) => {
      const offset = i * 0.5;
      sphere.position.y += Math.sin(this.time + offset) * 0.001;
      sphere.rotation.y += 0.002;
    });

    this.composer.render();
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    resizeComposer(this.composer);
  }

  reset() {
    // Resetta per tornare dall'hub
    this.spheres.forEach((sphere, i) => {
      sphere.scale.setScalar(0);
      sphere.material.opacity = 0;
      sphere.material.transparent = true;

      setTimeout(() => {
        const duration = 600;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          sphere.scale.setScalar(eased);
          sphere.material.opacity = eased;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            sphere.material.transparent = false;
          }
        };

        animate();
      }, i * 80);
    });

    const hubUI = document.getElementById('hub-ui');
    setTimeout(() => {
      hubUI.classList.remove('hidden');
      hubUI.style.opacity = '1';
    }, 500);
  }

  dispose() {
    this.spheres.forEach(sphere => {
      sphere.geometry.dispose();
      sphere.material.dispose();
    });
    window.removeEventListener('mousemove', (e) => this.onMouseMove(e));
    window.removeEventListener('click', () => this.onClick());
    window.removeEventListener('resize', () => this.onResize());
  }
}
