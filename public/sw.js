/**
 * Service Worker per AntPit Lab Portfolio
 * Implementa caching strategy per offline support e performance
 */

const CACHE_VERSION = 'v1';
const CACHE_NAME = `antpitlab-${CACHE_VERSION}`;

// URLs da cachare immediatamente al momento dell'install
const PRECACHE_URLS = [
  '/',
  '/portfolio',
  '/about',
  '/contact',
  '/offline.html',
];

// Pattern per risorse statiche
const STATIC_ASSETS_PATTERN = /\.(css|js|woff|woff2|ttf|eot|ico|png|jpg|jpeg|webp|avif|svg)$/;

/**
 * Install Event
 * Precache delle risorse essenziali
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precaching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log('[SW] Service Worker installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Precache failed:', error);
      })
  );
});

/**
 * Activate Event
 * Cleanup di vecchie cache
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activated');
        return self.clients.claim();
      })
  );
});

/**
 * Fetch Event
 * Strategy: Stale-While-Revalidate per tutto
 * Cache-First per static assets
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora richieste non-GET
  if (request.method !== 'GET') return;

  // Ignora richieste chrome-extension e altre non-http
  if (!url.protocol.startsWith('http')) return;

  // Strategy per static assets: Cache First
  if (STATIC_ASSETS_PATTERN.test(url.pathname)) {
    event.respondWith(
      cacheFirst(request)
    );
    return;
  }

  // Strategy per HTML e API: Stale While Revalidate
  event.respondWith(
    staleWhileRevalidate(request)
  );
});

/**
 * Cache First Strategy
 * Per static assets che non cambiano
 */
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    console.log('[SW] Cache hit:', request.url);
    return cached;
  }

  try {
    const response = await fetch(request);

    // Cache la risposta se valida
    if (response.status === 200) {
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    throw error;
  }
}

/**
 * Stale While Revalidate Strategy
 * Serve da cache ma aggiorna in background
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  // Fetch fresh data in background
  const fetchPromise = fetch(request)
    .then((response) => {
      // Update cache with fresh response
      if (response.status === 200) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch((error) => {
      console.error('[SW] Fetch failed:', error);

      // Se offline e non in cache, mostra offline page
      if (!cached) {
        return cache.match('/offline.html');
      }

      throw error;
    });

  // Return cached immediately, update in background
  return cached || fetchPromise;
}

/**
 * Network First Strategy (non usata ma disponibile)
 * Prova network prima, poi fallback a cache
 */
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);

    if (response.status === 200) {
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    // Fallback to offline page
    return cache.match('/offline.html');
  }
}

/**
 * Message event handler
 * Per comunicazione con client
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
