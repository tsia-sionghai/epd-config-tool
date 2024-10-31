import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']  // 優先使用 TypeScript 檔案
  },
  build: {
    sourcemap: true  // 方便除錯
  }
});
