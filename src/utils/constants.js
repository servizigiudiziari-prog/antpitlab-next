/**
 * Costanti visive e percettive del portale cosmico
 */

export const COLORS = {
  void: 0x000000,
  deep: 0x0a0a12,
  twilight: 0x1a1a2e,
  steel: 0x3a3a4a,
  frost: 0xb8c1d9,
  light: 0xe8eaf6,
};

// Palette per le 7 sfere (spettro armonico freddo)
export const SPHERE_COLORS = [
  0x4a90e2, // Blu profondo - Fotografia
  0x9b59b6, // Viola cosmico - Musica
  0x3498db, // Azzurro elettrico - Coding
  0x1abc9c, // Turchese - Scrittura
  0x34495e, // Grigio metallico - Diritto & Aste
  0x95a5a6, // Argento - Filosofia
  0xe74c3c  // Rosso profondo - Innovazione/AI
];

// Proporzioni classiche
export const MONOLITH_RATIO = 1 / 2.35; // Proporzione iconica (1:2.35)

// Animazioni
export const ANIMATION = {
  monolithOscillation: 0.0008, // Oscillazione impercettibile
  sphereFloat: 0.001,          // Fluttuazione delle sfere
  fadeInDuration: 1000,        // ms
  fadeOutDuration: 500,        // ms
};

// Camera
export const CAMERA = {
  fov: 50,
  near: 0.1,
  far: 1000,
  position: { x: 0, y: 0, z: 15 }
};

// Post-processing
export const BLOOM = {
  strength: 0.4,
  radius: 0.5,
  threshold: 0.1
};
