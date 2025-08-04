import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['leaflet'],
  },
  build: {
    target: 'esnext', // ✅ ensures modern output, but adjust if needed
    lib: {
      entry: path.resolve(__dirname, 'src/widget.tsx'),
      name: 'WhatsAppWidget',
      fileName: (format) => `whatsapp-widget.${format}.js`,
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    emptyOutDir: false, // ✅ Prevents deleting other files in `public/`
  },
});
