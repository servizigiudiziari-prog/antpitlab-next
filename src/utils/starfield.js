/**
 * STARFIELD — Campo stellare cosmico
 * Via Lattea procedurale con particelle fluttuanti
 */

import * as THREE from 'three';
import { COLORS } from './constants.js';

export function createStarfield(count = 5000) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  // Palette di colori stellari (bianco, blu, azzurro tenue)
  const starColors = [
    new THREE.Color(0xffffff), // Bianco
    new THREE.Color(COLORS.frost), // Blu-grigio
    new THREE.Color(0xadd8e6), // Azzurro chiaro
    new THREE.Color(0xe8f4f8), // Bianco tenue
  ];

  for (let i = 0; i < count; i++) {
    // Posizione sferica (distribuzione uniforme)
    const radius = 100 + Math.random() * 200;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    // Colore casuale dalla palette
    const color = starColors[Math.floor(Math.random() * starColors.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    // Dimensione casuale (stelle più piccole e grandi)
    sizes[i] = Math.random() * 2 + 0.5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // Material con texture circolare per le stelle
  const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true
  });

  // Crea shader custom per stelle circolari
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
      `
        // Crea stella circolare
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        alpha = alpha * diffuseColor.a;

        // Glow tenue
        alpha += (1.0 - smoothstep(0.0, 0.5, dist)) * 0.2;

        gl_FragColor = vec4( outgoingLight, alpha );
      `
    );
  };

  const starfield = new THREE.Points(geometry, material);
  return starfield;
}

// Funzione per animare il campo stellare (rotazione lenta)
export function animateStarfield(starfield, delta) {
  starfield.rotation.y += delta * 0.00005;
  starfield.rotation.x += delta * 0.00002;
}
