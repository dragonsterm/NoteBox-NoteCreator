import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import fs from 'fs-extra'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-backend',
      closeBundle: async () => {
        // Copy backend files to dist
        await fs.copy(
          resolve(__dirname, '../backend'),
          resolve(__dirname, 'dist/backend'),
          {
            filter: (src) => {
              return !src.includes('node_modules') && !src.includes('.git');
            }
          }
        );
        // Create necessary directories
        await fs.ensureDir(resolve(__dirname, 'dist/uploads'));
        await fs.ensureDir(resolve(__dirname, 'dist/data'));
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.tsx'),
        content: resolve(__dirname, 'src/content.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'style.css';
          }
          return 'assets/[name].[ext]';
        },
      },
    },
    copyPublicDir: true,
    assetsDir: 'assets',
  },
})
