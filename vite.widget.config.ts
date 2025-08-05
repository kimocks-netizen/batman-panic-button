import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/FloatingWhatsappButton.tsx'),
      name: 'WhatsAppWidget',
      fileName: 'whatsapp-widget',
      formats: ['umd']
    },
    outDir: 'widget-dist',
    rollupOptions: {
      external: ['react', 'react-dom/client', 'react-icons/fa'],
      output: {
        globals: {
          react: 'React',
          'react-dom/client': 'ReactDOM',
          'react-icons/fa': 'ReactIcons'
        }
      }
    }
  }
});