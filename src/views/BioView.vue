<template>
  <div class="bio-view bg-black min-h-screen text-white overflow-x-hidden relative">
      <!-- Background Effects (Granulated Gradient) -->
      <div class="fixed inset-0 z-0 bg-zinc-900 pointer-events-none">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-900 to-black opacity-80"></div>
          <div class="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

    <div
      v-if="isFirstVisitLoading || isClickLoading"
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md px-6 transition-all duration-500"
    >
      <div class="w-full max-w-xs space-y-4 text-center">
        <div class="flex justify-center mb-1">
          <RouteIcon
            :class="[
              'w-6 h-6 text-white loading-route-icon',
              { 'loading-route-icon-final': currentProgress >= 100 }
            ]"
            :style="{ opacity: currentProgress / 100 }"
          />
        </div>
        <div class="h-1.5 w-full bg-zinc-800/50 rounded-full overflow-hidden border border-zinc-700/50">
          <div
            class="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-100"
            :style="{ width: `${currentProgress}%` }"
          />
        </div>
        <p class="text-xs text-zinc-400 tracking-wide font-medium">
          {{ currentLoadingMessage }}
        </p>
        <p class="text-[11px] text-zinc-500 font-mono">{{ currentProgress.toFixed(0) }}%</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 w-full flex flex-col items-center gap-6 mt-12 px-4 max-w-md mx-auto">
      <ElSkeleton :loading="loading" animated :rows="0" class="w-full flex flex-col items-center">
        <template #template>
          <div class="flex flex-col items-center gap-4 w-full">
            <div class="h-24 w-24 rounded-full bg-zinc-800 animate-pulse" />
            <div class="h-6 w-32 rounded bg-zinc-800 animate-pulse" />
            <div class="h-4 w-48 rounded bg-zinc-800 animate-pulse" />
          </div>
        </template>
        <ProfileHeader :profile="profile" />
      </ElSkeleton>

      <transition-group
        name="links"
        tag="div"
        class="flex flex-col gap-4 w-full items-center"
      >
        <LinkCard
          v-for="l in links"
          :key="l.id"
          :link="l"
          @link-click="handleLinkClick"
        />
      </transition-group>
    </div>

    <div class="relative z-10 mt-auto pb-8 pt-12">
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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Route as RouteIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const loading = ref(true)
const isFirstVisitLoading = ref(false)
const isClickLoading = ref(false)
const progress = ref(0)
const clickProgress = ref(0)
const pendingUrl = ref<string | null>(null)
let progressTimer: number | null = null
let clickProgressTimer: number | null = null

const currentProgress = computed(() =>
  isFirstVisitLoading.value ? progress.value : clickProgress.value
)

const currentLoadingMessage = computed(() => {
  if (isFirstVisitLoading.value) {
    return 'Um momento, estamos otimizando sua experiência!'
  }

  if (clickProgress.value < 40) return 'Preparando seu destino, só um instante...'
  if (clickProgress.value < 90) return 'Quase lá...'
  return 'Pronto!'
})

const store = useLinksStore()
const { links, profile, embeds } = storeToRefs(store)
const router = useRouter()

function handleLinkClick(url: string) {
  // Se for uma rota interna (começa com /), navega diretamente sem loading
  if (url.startsWith('/')) {
    router.push(url)
    return
  }

  // Para links externos, mantém o loading state
  isClickLoading.value = true
  pendingUrl.value = url
  clickProgress.value = 0

  if (clickProgressTimer !== null) {
    clearInterval(clickProgressTimer)
  }

  const duration = 1600 // ms totais para clique (mais lento)
  const step = 40
  const increment = 100 / (duration / step)

  clickProgressTimer = window.setInterval(() => {
    if (clickProgress.value >= 100) {
      clickProgress.value = 100
      if (clickProgressTimer !== null) {
        clearInterval(clickProgressTimer)
        clickProgressTimer = null
      }

      // manter 2s em 100% com pulsação antes de navegar
      setTimeout(() => {
        if (pendingUrl.value) {
          const urlToGo = pendingUrl.value
          pendingUrl.value = null
          window.location.href = urlToGo
        }
        isClickLoading.value = false
      }, 2000)

      return
    }
    clickProgress.value = Math.min(100, clickProgress.value + increment)
  }, step)
}

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
  if (clickProgressTimer !== null) {
    clearInterval(clickProgressTimer)
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

.loading-route-icon-final {
  animation-duration: 0.9s;
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

