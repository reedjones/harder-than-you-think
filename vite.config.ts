import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { icons } from "./icons.json";



export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',

      injectManifest: {
        minify: false,
        enableWorkboxModulesLogs: true,
      },
      devOptions: {
        type: 'module',
        enabled: true, // Enable PWA in development for testing
      },
      srcDir: 'src',
      filename: 'service-worker.js',
      manifest: {
        name: 'Harder Than You Think 🕗',
        short_name: 'HTYT 🕗',
        description: `Managing your HIV medication is crucial,
        but it doesn’t have to be difficult. Our app is here to keep you on track,
        day by day, dose by dose. 🕗`,
        display: "minimal-ui",
        theme_color: '#1bfffd',
        background_color: "#000000",
        icons: icons
      }, //'!**/service-worker.js'
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,gif,svg}', 'index.html'],

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
            },
          },
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
            },
          },
          {
            urlPattern: /\/api\/.*\/*.json/,
            handler: 'NetworkOnly',
            options: {
              backgroundSync: {
                name: 'myQueueName',
                options: {
                  maxRetentionTime: 24 * 60,
                },
              },
            },
          },
        ],
      },
    })
  ]
});


/*

 icons: [
          {
            src: 'ios/64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'  
          },
          {
            src: 'ios/1024.png',
            sizes: '1024x1024',
            type: 'image/png',
            purpose: 'any'  
          },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]

*/