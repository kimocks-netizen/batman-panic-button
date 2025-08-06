import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // Ensure modern JS output
          lib: {
        entry: path.resolve(__dirname, 'src/widget/widget.tsx'),
        name: 'WhatsAppWidget',
        fileName: 'whatsapp-widget',
        formats: ['iife'] // Use IIFE instead of UMD for browser
      },
    outDir: 'public/widget-dist',
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        },
        // Force browser-friendly output
        format: 'iife',
        inlineDynamicImports: true
      }
    }
  }
});