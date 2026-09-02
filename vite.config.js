import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    base: '/',

    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
      minify: 'esbuild',
      target: 'esnext',
      reportCompressedSize: false, // Skip — slows down build, not needed

      rollupOptions: {
        output: {
          // Split vendor chunks so they can be cached long-term independently
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-framer': ['framer-motion'],
            'vendor-utils': ['lucide-react'],
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          // Remove whitespace/comments for smaller output
          compact: true,
        },
      },
    },

    server: {
      port: 5173,
      open: true,
      host: true,
    },

    preview: {
      port: 4173,
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@assets': path.resolve(__dirname, './src/assets'),
      },
    },

    define: {
      __APP_VERSION__: JSON.stringify(env.npm_package_version),
    },
  };
});
