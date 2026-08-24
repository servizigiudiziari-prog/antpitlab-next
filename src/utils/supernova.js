/**
 * SUPERNOVA — Stella vibrante per ritorno al portale
 * Una stella instabile, pulsante, che sta per esplodere
 */

import * as THREE from 'three';

export function createSupernova() {
  // Geometria della stella (sfera)
  const geometry = new THREE.SphereGeometry(0.6, 32, 32);

  // Material vibrante con emissione forte
  const material = new THREE.MeshStandardMaterial({
    color: 0xff6b35, // Arancio-rosso vibrante
    emissive: 0xff4500, // Rosso-arancio emissivo
    emissiveIntensity: 1.5,
    metalness: 0.3,
    roughness: 0.4
  });

  const supernova = new THREE.Mesh(geometry, material);

  // Posizione: in alto a destra, visibile ma non invasiva
  supernova.position.set(8, 6, -4);

  // Tag per identificarla nel raycasting
  supernova.userData = { type: 'supernova', isClickable: true };

  // Aura pulsante (doppia sfera esterna)
  const auraGeometry = new THREE.SphereGeometry(0.7, 16, 16);
  const auraMaterial = new THREE.MeshBasicMaterial({
    color: 0xff6b35,
    transparent: true,
    opacity: 0.3,
    side: THREE.BackSide
  });
  const aura = new THREE.Mesh(auraGeometry, auraMaterial);
  supernova.add(aura);

  // Glow esterno (terza sfera molto trasparente)
  const glowGeometry = new THREE.SphereGeometry(1.0, 16, 16);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    transparent: true,
    opacity: 0.1,
    side: THREE.BackSide
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  supernova.add(glow);

  return supernova;
}

// Animazione pulsante (da chiamare nel render loop)
export function animateSupernova(supernova, time) {
  if (!supernova) return;

  // Pulsazione rapida e irregolare (stella instabile)
  const pulse = Math.sin(time * 0.003) * 0.5 + 0.5; // 0 - 1
  const vibration = Math.sin(time * 0.01) * 0.2; // Vibrazione veloce

  // Scala pulsante
  const scale = 1 + pulse * 0.3 + vibration * 0.1;
  supernova.scale.setScalar(scale);

  // Intensità emissiva variabile
  supernova.material.emissiveIntensity = 1.0 + pulse * 1.5;

  // Rotazione irregolare
  supernova.rotation.x += 0.005;
  supernova.rotation.y += 0.008;
  supernova.rotation.z += 0.003;

  // Aura pulsante (se esiste)
  if (supernova.children.length > 0) {
    supernova.children[0].material.opacity = 0.2 + pulse * 0.3;
    supernova.children[1].material.opacity = 0.05 + pulse * 0.15;
  }
}
