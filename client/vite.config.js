import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { config } from 'dotenv';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env': process.env
  }
})
