self.addEventListener('install', (event) => {
  // Skip waiting to immediately activate the service worker
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Take control of the page as soon as the service worker is active
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // For every fetch request, always fetch from the network (no caching)
  event.respondWith(fetch(event.request).catch((error) => {
    console.error('Fetch failed; returning offline page instead.', error);
    return new Response('Offline, no cache available.', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }));
});
