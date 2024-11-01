import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
//import { requestNotificationPermission } from './services/notifications';
import { registerSW } from 'virtual:pwa-register';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
//import 'react-toastify/dist/ReactToastify.min.css';


// Request notification permission on load


/* Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.ts', { type: 'module' })
      .then(registration => {
        console.log('ServiceWorker registration successful');
        console.log(registration)
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}*/


// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        registration.showNotification("hey!")
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);


registerSW({
  onOfflineReady() {
    toast.success('App is ready for offline use!');
  },
});

// requestNotificationPermission().then((granted) => {
//   if (granted) {
//     console.log('Notification permission granted');
//   } else {
//     console.log('Notification permission denied');
//   }
// });