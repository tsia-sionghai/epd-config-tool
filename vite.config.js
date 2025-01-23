// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // React 相關
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    // MUI 相關
                    'mui-vendor': [
                        '@mui/material',
                        '@mui/icons-material',
                        '@emotion/react',
                        '@emotion/styled'
                    ],
                    // i18n 相關
                    'i18n-vendor': ['i18next', 'react-i18next'],
                    // 拖放相關
                    'dnd-vendor': ['@hello-pangea/dnd'],
                    // 工具庫
                    'utils-vendor': [
                        'react-dropzone'
                    ]
                }
            }
        },
        // 其他建置優化
        target: 'esnext',
        minify: 'terser',
        sourcemap: false
    }
});
