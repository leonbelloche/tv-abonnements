import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Chemins relatifs plutôt qu'absolus (/assets/...) pour que le build
  // fonctionne quel que soit le sous-dossier depuis lequel il est servi
  // (utile pour GitHub Pages en repo project, ou un aperçu d'artifact).
  base: './',
  plugins: [react(), tailwindcss()],
})
