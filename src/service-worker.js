import { precacheAndRoute, createHandlerBoundToURL, cleanupOutdatedCaches } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
//import { ExpirationPlugin } from 'workbox-expiration';
import { clientsClaim } from 'workbox-core';
import { CacheFirst, NetworkOnly } from 'workbox-strategies';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
// declare let self: ServiceWorkerGlobalScope;

clientsClaim();
const CACHE_NAME = 'harder-than-you-think-v1';
precacheAndRoute(self.__WB_MANIFEST || []);
// clean old assets
cleanupOutdatedCaches()
let allowlist = undefined;
if (import.meta.env.DEV) {
  allowlist = [/^\/$/]
}
// to allow work offline
// registerRoute(new NavigationRoute(
//   createHandlerBoundToURL('/index.html'),
//   { allowlist }
// ))


const ASSETS_TO_CACHE = [
  '/',

  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
];


// Precache all assets generated by vite


// Single Page Application handling
//const handler = createHandlerBoundToURL('/index.html');

//const navigationRoute = new NavigationRoute(handler);

//registerRoute(navigationRoute);


registerRoute(
  /^https:\/\/fonts\.googleapis\.com\/.*/i,
  new CacheFirst({
    cacheName: 'google-fonts',
  })
);

registerRoute(
  /^https:\/\/images\.unsplash\.com\/.*/i,
  new CacheFirst({
    cacheName: 'unsplash-images',
  })
);

// API route with background sync
const bgSyncPlugin = new BackgroundSyncPlugin('myQueueName', {
  maxRetentionTime: 24 * 60, // Retry for 24 hours
});

registerRoute(
  /\/api\/.*\/*.json/,
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  })
);

// Cache Unsplash images

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() ?? 'Time to take your medication',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72-transparent.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'take',
        title: 'Take Now'
      },
      {
        action: 'snooze',
        title: 'Snooze'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Medication Reminder', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  console.log(event)
  if (event.action === 'take') {
    // Handle "Take Now" action
    event.waitUntil(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      clients.matchAll({ type: 'window' }).then(windowClients => {
        if (windowClients.length > 0) {
          windowClients[0].focus();
          windowClients[0].postMessage({
            type: 'MEDICATION_TAKEN',
            timestamp: new Date().toISOString()
          });
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          clients.openWindow('/');
        }
      })
    );
  } else if (event.action === 'snooze') {
    // Reschedule notification for 15 minutes later
    event.waitUntil(
      self.registration.showNotification('Medication Reminder', {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        ...event.notification.options,
        body: 'Reminder snoozed for 15 minutes',
        timestamp: Date.now() + 15 * 60 * 1000
      })
    );
  }
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() ?? 'Time to take your medication',
    icon: '/ios/72.png',
    badge: '/badge-72x72-transparent.png',
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



for (const asset of ['/index.html']) {
  const asset_handler = createHandlerBoundToURL(asset)
  //const asset_route = new NavigationRoute(asset_handler)
  const asset_route = new NavigationRoute(
    asset_handler,
    { allowlist }
  )
  registerRoute(asset_route)
}