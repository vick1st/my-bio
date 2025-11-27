<template>
  <div class="app-container">
    <div
      v-if="isFirstVisitLoading"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-6"
    >
      <div class="w-full max-w-xs space-y-4 text-center">
        <div class="flex justify-center mb-1">
          <RouteIcon
            class="w-6 h-6 text-gray-900 loading-route-icon"
            :style="{ opacity: progress / 100 }"
          />
        </div>
        <div class="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-gray-900 transition-all duration-100"
            :style="{ width: `${progress}%` }"
          />
        </div>
        <p class="text-xs text-gray-600 tracking-wide">
          Um momento, estamos otimizando sua experiência!
        </p>
        <p class="text-[11px] text-gray-400">{{ progress.toFixed(0) }}%</p>
      </div>
    </div>

    <div class="w-full flex flex-col items-center gap-6 mt-6">
      <ElSkeleton :loading="loading" animated :rows="0">
        <template #template>
          <div class="flex flex-col items-center gap-3 w-full sm:w-[460px]">
            <div class="h-20 w-20 rounded-full bg-gray-200" />
            <div class="h-5 w-24 rounded bg-gray-200" />
            <div class="h-4 w-64 rounded bg-gray-200" />
          </div>
        </template>
        <ProfileHeader :profile="profile" />
      </ElSkeleton>

      <transition-group
        name="links"
        tag="div"
        class="flex flex-col gap-4 w-full items-center"
      >
        <LinkCard v-for="l in links" :key="l.id" :link="l" />
      </transition-group>

      <div class="flex flex-col gap-4 w-full items-center">
        <EmbedCard
          v-for="e in embeds"
          :key="e.id"
          :src="e.src"
          :height="e.height ?? 352"
        />
      </div>
    </div>

    <div class="mt-auto pb-7 sm:pb-4 pt-10 sm:pt-4">
      <SocialLinks />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileHeader from '@/components/profile-header.vue'
import LinkCard from '@/components/link-card.vue'
import SocialLinks from '@/components/social-links.vue'
import { useLinksStore } from '@/stores/links'
import EmbedCard from '@/components/embed-card.vue'
import { storeToRefs } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'
import { Route as RouteIcon } from 'lucide-vue-next'

const loading = ref(true)
const isFirstVisitLoading = ref(false)
const progress = ref(0)
let progressTimer: number | null = null

const store = useLinksStore()
const { links, profile, embeds } = storeToRefs(store)

onMounted(() => {
  const hasVisited = localStorage.getItem('my-bio:visited')

  // Primeira visita: mostra tela de loading com barra de progresso
  if (!hasVisited) {
    isFirstVisitLoading.value = true
    progress.value = 0

    const duration = 1800 // ms totais
    const step = 40 // intervalo em ms
    const increment = 100 / (duration / step)

    progressTimer = window.setInterval(() => {
      if (progress.value >= 100) {
        progress.value = 100
        isFirstVisitLoading.value = false
        loading.value = false
        localStorage.setItem('my-bio:visited', '1')
        if (progressTimer !== null) {
          clearInterval(progressTimer)
          progressTimer = null
        }
        return
      }
      progress.value = Math.min(100, progress.value + increment)
    }, step)
  } else {
    // Visitas seguintes: mantém apenas o skeleton leve
    setTimeout(() => (loading.value = false), 300)
  }
})

onUnmounted(() => {
  if (progressTimer !== null) {
    clearInterval(progressTimer)
  }
})
</script>

<style scoped>
.links-enter-active,
.links-leave-active {
  transition: all 0.2s ease;
}
.links-enter-from,
.links-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

.loading-route-icon {
  transition: opacity 0.2s linear, transform 0.2s ease-out;
  animation: loading-route-pulse 1.4s ease-in-out infinite;
}

@keyframes loading-route-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.06);
  }
}
</style>
