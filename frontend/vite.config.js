import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',  // relative base path for correct asset loading on Netlify
  plugins: [react()],
})
