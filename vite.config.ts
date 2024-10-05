/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => ({
  server: {
    host: true,
  },
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['logo.svg', 'apple-touch-icon.png'],
      manifest: {
        id: '/Shared-Wallet-App/',
        // App Name
        name: 'Shared Wallet App',
        // Short App Name
        short_name: 'SWA',
        // App Description
        description: '共有家計簿アプリ',
        // App Start URL
        start_url: '/login',
        // Display Mode
        display: 'standalone',
        // App Orientation
        orientation: 'portrait',
        // Default Theme Colors
        theme_color: '#83001A',
        // App page background color to display before the stylesheet is loaded
        background_color: '#F5F5F5',
        // favicon and app icon array
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon-512x512-mask.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        // Richer UI install available for desktop
        screenshots: [],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
}));
