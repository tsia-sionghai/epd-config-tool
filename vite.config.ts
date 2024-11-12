// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']  // 優先使用 TypeScript 檔案
  },
  build: {
    sourcemap: true,  // 方便除錯
    cssTarget: 'chrome61',  // 增加 CSS 目標瀏覽器
    cssMinify: true,
  },
  css: {
    postcss: {
      plugins: [
        require('autoprefixer')({
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
