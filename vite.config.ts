import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        widget: resolve(__dirname, 'public/whatsapp-widget.js')
      },
      output: {
        entryFileNames: (assetInfo) => {
          return assetInfo.name === 'widget' 
            ? 'whatsapp-widget/[name].js' 
            : 'assets/[name]-[hash].js'
        },
        assetFileNames: 'whatsapp-widget/[name].[ext]'
      }
    }
  }
})