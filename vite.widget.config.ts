import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'public/widget-dist',
    rollupOptions: {
      input: {
        widget: resolve(__dirname, 'src/components/widget-entry.tsx')
      },
      output: {
        entryFileNames: 'whatsapp-widget.js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
}) 