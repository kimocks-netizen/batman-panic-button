import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'public/widget-dist',
    rollupOptions: {
      input: {
        widget: resolve(__dirname, 'src/components/whatsapp-widget.js')
      },
      output: {
        entryFileNames: 'whatsapp-widget.js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
}) 