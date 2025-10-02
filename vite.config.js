import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    
    // Base public path - adjust if deploying to subdirectory
    base: '/',
    
    // Build configuration
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false, // Set to true for debugging production builds
      minify: 'esbuild', // Options: 'esbuild' (fastest), 'terser', or false
      target: 'esnext', // ✅ modern browsers; change to 'es2018' if you want wider support
      
      // Advanced Rollup options
      rollupOptions: {
        output: {
          // Customize chunk names for better caching
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    
    // Development server configuration
    server: {
      port: 5173, // Default Vite port
      open: true, // Auto-open browser
      host: true // Listen on all addresses
    },
    
    // Preview server (for testing production build)
    preview: {
      port: 4173
    },
    
    // Path aliases for cleaner imports
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@assets': path.resolve(__dirname, './src/assets')
      }
    },
    
    // Global constant replacements
    define: {
      __APP_VERSION__: JSON.stringify(env.npm_package_version)
    }
  };
});
