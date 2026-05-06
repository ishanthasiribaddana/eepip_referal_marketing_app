import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import viteImagemin from 'vite-plugin-imagemin';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'EEPIP MLM',
        short_name: 'EEPIP',
        description: 'EEPIP MLM Frontend Application',
        theme_color: '#6366f1',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
    // Only use visualizer in development for bundle analysis
    !isProduction && visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/bundle-analysis.html',
    }),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.65, 0.9] },
      svgo: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
                addAttributesToSVGElement: {
                  attributes: [
                    { name: 'xmlns', value: 'http://www.w3.org/2000/svg' },
                  ],
                },
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 3004,
    proxy: {
      '/eepip-api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/temco-api': {
        target: 'http://localhost:8085',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'recharts-vendor': ['recharts'],
        },
      },
    },
  },
});
