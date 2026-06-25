import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    // SECURITY NOTE: This proxy ONLY works during local `vite dev`.
    // In production (Vercel), /api-proxy does NOT exist.
    // If you need this proxy in production, create a matching Vercel
    // serverless function in /api/ directory.
    proxy: {
      '/api-proxy': {
        target: 'https://soullovenearth.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-proxy/, ''),
        secure: true,
      }
    }
  }
})