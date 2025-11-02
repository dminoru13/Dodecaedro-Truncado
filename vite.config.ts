import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // A linha 'base' está perfeita para o GitHub Pages!
  base: '/Dodecaedro-Truncado/', 
  
  // A definição dos plugins deve aparecer apenas uma vez.
  plugins: [react()], 
})