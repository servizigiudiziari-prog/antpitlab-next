'use client';

import { useEffect } from 'react';

/**
 * Service Worker Registration Component
 * Registra il service worker per PWA functionality
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    // Registra solo in production
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      registerServiceWorker();
    }
  }, []);

  return null;
}

/**
 * Registra il Service Worker
 */
async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('[PWA] Service Worker registered:', registration.scope);

    // Check for updates periodically
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;

      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New service worker available
          console.log('[PWA] New version available! Please refresh.');

          // Opzionale: notifica l'utente che c'è un aggiornamento
          if (confirm('Una nuova versione è disponibile. Vuoi ricaricare?')) {
            newWorker.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
          }
        }
      });
    });

    // Check for updates every hour
    setInterval(() => {
      registration.update();
    }, 60 * 60 * 1000);
  } catch (error) {
    console.error('[PWA] Service Worker registration failed:', error);
  }
}

/**
 * Hook per Service Worker status
 */
export function useServiceWorkerStatus() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const checkStatus = () => {
      if (navigator.serviceWorker.controller) {
        console.log('[PWA] Service Worker is active');
      } else {
        console.log('[PWA] No active Service Worker');
      }
    };

    // Check subito
    checkStatus();

    // Check quando lo stato cambia
    navigator.serviceWorker.addEventListener('controllerchange', checkStatus);

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', checkStatus);
    };
  }, []);
}
