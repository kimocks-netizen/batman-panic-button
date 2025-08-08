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
        widget: resolve(__dirname, 'src/components/widget-entry.tsx')
      },
      output: {
        entryFileNames: (assetInfo) => {
          return assetInfo.name === 'widget' 
            ? 'widget-dist/whatsapp-widget/[name].js' 
            : 'assets/[name]-[hash].js'
        },
        assetFileNames: 'widget-dist/whatsapp-widget/[name].[ext]'
      }
    }
  }
})