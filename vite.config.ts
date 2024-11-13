// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  build: {
    sourcemap: true,
    cssTarget: 'chrome61',
    cssMinify: true,
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            '> 1%',
            'last 2 versions',
            'Chrome >= 61',
            'Firefox >= 60',
            'Edge >= 16',
            'Safari >= 11',
            'iOS >= 11'
          ]
        })
      ]
    }
  }
});
