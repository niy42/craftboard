import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// Use import.meta.resolve if available, otherwise fallback to path.resolve
const resolvePath = (module: string) => path.resolve(__dirname, 'node_modules', module);
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@babel/runtime': resolvePath('@babel/runtime'),
      'core-js-pure': resolvePath('core-js-pure'),
      'prop-types': resolvePath('prop-types'),
    },
  },
})
