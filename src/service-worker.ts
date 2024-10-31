/// <reference lib="webworker" />

const CACHE_NAME = 'hiv-med-reminder-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
];

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', (event: PushEvent) => {
  const options = {
    body: event.data?.text() ?? 'Time to take your medication',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'take',
        title: 'Take Now',
      },
      {
        action: 'snooze',
        title: 'Snooze',
      },
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Medication Reminder', options)
  );
});