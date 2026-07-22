import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const r = (p) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  // Relative base so the build works on GitHub Pages at any sub-path
  // (e.g. https://<user>.github.io/<repo>/) as well as a custom domain.
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      // Two pages: the main site and the standalone QR "connect card".
      input: {
        main: r('./index.html'),
        qr: r('./qr.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
    // Allow tunneling the dev server through ngrok (subdomain changes each run).
    // A leading dot whitelists every subdomain of the given host.
    allowedHosts: ['.ngrok-free.app', '.ngrok.io', '.ngrok.app'],
  },
})
