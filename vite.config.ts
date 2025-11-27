import { defineConfig, splitVendorChunkPlugin } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(), splitVendorChunkPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue'],
          state: ['pinia', '@vueuse/core'],
          ui: ['element-plus', '@headlessui/vue', '@element-plus/icons-vue']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173
  }
})
