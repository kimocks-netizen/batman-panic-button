**CREATING A WIDGET**
## STEPS
1.  Create a vite widget.config.ts
```text
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/widget.tsx'),
      name: 'WhatsAppWidget',
      fileName: () => `whatsapp-widget.umd.js`,
      formats: ['umd'],
    },
    outDir: 'widget-dist', // Separate folder for ```widget
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    emptyOutDir: true,
  },
});
```
2. Build Vite
````bash
vite build --config vite.widget.config.ts
````
This creates:
````bash
widget-dist/
└── whatsapp-widget.umd.js
````

3. Add an NPM Script in package.json
````bash
"scripts": {
  "build:widget": "vite build --config vite.widget.config.ts"
}
````
Now just run:
````env
npm run build:widget
````
