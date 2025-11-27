<template>
  <div ref="containerRef" class="w-full sm:w-[460px]">
    <iframe
      v-if="shouldLoad"
      :style="{ borderRadius: '12px' }"
      :src="src"
      width="100%"
      :height="height"
      frameborder="0"
      allowfullscreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
    <div
      v-else
      class="w-full bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
      :style="{ height: `${height}px`, borderRadius: '12px' }"
      @click="shouldLoad = true"
    >
      <span class="text-gray-600 text-sm">Clique para carregar conteúdo</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ src: string; height?: number }>()
const shouldLoad = ref(false)
const containerRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

// Carregar apenas quando o componente estiver visível ou após um delay
onMounted(() => {
  // Usar Intersection Observer para carregar apenas quando visível
  if ('IntersectionObserver' in window && containerRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          shouldLoad.value = true
          observer?.disconnect()
        }
      },
      { rootMargin: '50px' }
    )
    
    observer.observe(containerRef.value)
    
    // Fallback: carregar após 3 segundos se não estiver visível
    setTimeout(() => {
      if (!shouldLoad.value) {
        shouldLoad.value = true
        observer?.disconnect()
      }
    }, 3000)
  } else {
    // Fallback para navegadores sem IntersectionObserver
    setTimeout(() => {
      shouldLoad.value = true
    }, 2000)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
