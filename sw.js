// Installable app: the storefront and product photos work offline; API calls (prices, stock, orders) always go to the network.
const VERSION = 'ej-v42';
const SHELL = ['/', '/styles.css', '/brand.css', '/cutouts.css', '/photography.css', '/store.css', '/retailer-data.js', '/photo-overrides.js', '/catalog.js', '/lang-en.js', '/app.js', '/store.js', '/assets/logo.png', '/assets/logo-perla.png', '/assets/favicon.png', '/manifest.webmanifest'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== VERSION).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== location.origin || url.pathname.startsWith('/api/') || url.pathname.startsWith('/admin') || url.pathname.startsWith('/pay/')) return;
  if (url.pathname.startsWith('/assets/products/') || url.pathname.startsWith('/assets/hero/')) {
    event.respondWith(caches.open(VERSION).then(async cache => {
      const hit = await cache.match(event.request);
      if (hit) return hit;
      const response = await fetch(event.request);
      if (response.ok) cache.put(event.request, response.clone());
      return response;
    }));
    return;
  }
  // Network first for the app shell so updates appear immediately; cache as fallback offline.
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok) { const copy = response.clone(); caches.open(VERSION).then(cache => cache.put(event.request, copy)); }
    return response;
  }).catch(() => caches.match(event.request, { ignoreSearch: true }).then(hit => hit || caches.match('/'))));
});
