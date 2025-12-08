// Service Worker for Offline Support
const CACHE_NAME = 'tashi-delek-v1';
const API_CACHE_NAME = 'tashi-delek-api-v1';
const MODELS_CACHE_NAME = 'tashi-delek-models-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/images/logo.png',
  '/placeholder.svg',
  '/favicon.ico',
];

// Models to cache
const MODELS = [
  '/assets/Models/Rumtek.glb',
  '/assets/Models/encheymonasterymodel.glb',
  '/assets/Models/pelinggumpa.glb',
  '/assets/Models/phodong.glb',
  '/assets/Models/ravangla.glb',
];

// Images to cache
const IMAGES = [
  '/assets/Monaestries/Rumtek.jpeg',
  '/assets/Monaestries/Enchey.jpeg',
  '/assets/Monaestries/Pemayangtse.jpeg',
  '/assets/Monaestries/phodong.webp',
  '/assets/Monaestries/Ravangla.webp',
  '/images/1.jpg',
  '/images/2.jpeg',
  '/images/3.jpeg',
  '/images/4.jpeg',
  '/images/5.jpg',
  '/images/7.jpg',
  '/images/8.jpg',
  '/images/9.jpg',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(MODELS_CACHE_NAME).then((cache) => {
        console.log('[Service Worker] Caching 3D models');
        return cache.addAll(MODELS);
      }),
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[Service Worker] Caching images');
        return cache.addAll(IMAGES);
      }),
    ]).then(() => {
      console.log('[Service Worker] Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return (
              name !== CACHE_NAME &&
              name !== API_CACHE_NAME &&
              name !== MODELS_CACHE_NAME
            );
          })
          .map((name) => {
            console.log('[Service Worker] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[Service Worker] Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle model files (.glb)
  if (url.pathname.endsWith('.glb')) {
    event.respondWith(handleModelRequest(request));
    return;
  }

  // Handle images
  if (
    url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ||
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/assets/Monaestries/')
  ) {
    event.respondWith(handleImageRequest(request));
    return;
  }

  // Handle other assets (CSS, JS, etc.)
  event.respondWith(handleAssetRequest(request));
});

// Handle API requests with IndexedDB fallback
async function handleApiRequest(request) {
  try {
    // Try network first
    const response = await fetch(request.clone());
    
    if (response.ok) {
      // Cache successful API responses
      const cache = await caches.open(API_CACHE_NAME);
      cache.put(request, response.clone());
      
      // Also store in IndexedDB for offline access
      const data = await response.clone().json();
      await storeApiData(request.url, data);
      
      return response;
    }
  } catch (error) {
    console.log('[Service Worker] Network failed, trying cache:', error);
  }

  // Network failed, try cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Cache failed, try IndexedDB
  const dbData = await getApiData(request.url);
  if (dbData) {
    return new Response(JSON.stringify(dbData), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // All failed, return offline response
  return new Response(
    JSON.stringify({
      success: false,
      message: 'You are offline. Please check your connection.',
      offline: true,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 503,
    }
  );
}

// Handle 3D model requests
async function handleModelRequest(request) {
  const cache = await caches.open(MODELS_CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[Service Worker] Model fetch failed:', error);
    return new Response('Model not available offline', { status: 503 });
  }
}

// Handle image requests
async function handleImageRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[Service Worker] Image fetch failed:', error);
    return new Response('Image not available offline', { status: 503 });
  }
}

// Handle other asset requests
async function handleAssetRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[Service Worker] Asset fetch failed:', error);
    return new Response('Asset not available offline', { status: 503 });
  }
}

// IndexedDB helpers
async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('TashiDelekDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('apiCache')) {
        db.createObjectStore('apiCache', { keyPath: 'url' });
      }
    };
  });
}

async function storeApiData(url, data) {
  try {
    const db = await openDB();
    const tx = db.transaction('apiCache', 'readwrite');
    const store = tx.objectStore('apiCache');
    await store.put({ url, data, timestamp: Date.now() });
  } catch (error) {
    console.log('[Service Worker] Failed to store API data:', error);
  }
}

async function getApiData(url) {
  try {
    const db = await openDB();
    const tx = db.transaction('apiCache', 'readonly');
    const store = tx.objectStore('apiCache');
    const result = await store.get(url);
    return result ? result.data : null;
  } catch (error) {
    console.log('[Service Worker] Failed to get API data:', error);
    return null;
  }
}

