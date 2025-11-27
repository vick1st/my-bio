import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separar Element Plus em chunks menores
          if (id.includes('node_modules/element-plus')) {
            // Dividir Element Plus em chunks menores por funcionalidade
            if (id.includes('element-plus/es/components')) {
              return 'element-plus-components'
            }
            return 'element-plus-core'
          }
          // Separar outros UI libraries
          if (id.includes('node_modules/@headlessui/vue')) {
            return 'headlessui'
          }
          if (id.includes('node_modules/@element-plus/icons-vue')) {
            return 'element-icons'
          }
          // Separar state management
          if (id.includes('node_modules/pinia') || id.includes('node_modules/@vueuse/core')) {
            return 'state'
          }
          // Vue e outras dependências principais
          if (id.includes('node_modules/vue') || id.includes('node_modules/lucide-vue-next')) {
            return 'vue-vendor'
          }
          // Agrupar outras dependências de node_modules
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Aumentar limite para 1MB (opcional)
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
