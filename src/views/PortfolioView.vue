<template>
  <div class="portfolio-view bg-black min-h-screen text-white overflow-x-hidden relative">
      <!-- Background Effects (Granulated Gradient) -->
      <div class="fixed inset-0 z-0 bg-zinc-900 pointer-events-none">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-900 to-black opacity-80"></div>
          <div class="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

    <div class="relative z-10 w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto flex flex-col gap-8 lg:gap-16 mt-6 lg:mt-12 pb-12 px-4 lg:px-8">
      <!-- Botão Voltar -->
      <div class="w-full flex justify-start">
        <router-link
          to="/bio"
          class="inline-flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-sm font-medium hover:bg-white/10 transition-all border border-white/10 group"
        >
          <ArrowLeftIcon class="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:-translate-x-1" />
          <span>Voltar</span>
        </router-link>
      </div>

      <!-- Header Minimalista -->
      <div class="flex flex-col items-center gap-4 lg:gap-6 w-full animate-fade-in text-center">
        <h1 class="text-5xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
          VICTOR HUGO
        </h1>
        <p class="text-xl lg:text-3xl font-light text-zinc-400 tracking-wide">
          Desenvolvedor FullStack
        </p>
      </div>

      <!-- Divisor Visual Styled -->
      <div class="w-full flex items-center justify-center gap-4 opacity-50">
        <div class="h-px w-24 bg-gradient-to-r from-transparent via-zinc-500 to-transparent"></div>
        <div class="w-1.5 h-1.5 rounded-full bg-zinc-500"></div>
        <div class="h-px w-24 bg-gradient-to-r from-transparent via-zinc-500 to-transparent"></div>
      </div>

      <!-- Seção Stack Principal -->
      <div class="w-full animate-slide-up" style="animation-delay: 100ms">
        <TechStack :technologies="mainTechnologies" />
      </div>

      <!-- Seção Projetos -->
      <div class="w-full flex flex-col gap-6 lg:gap-8">
        <h2 class="text-3xl lg:text-4xl font-bold text-white text-center tracking-widest uppercase flex items-center justify-center gap-3">
             <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Projetos</span>
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5 lg:gap-6 w-full">
          <ProjectCard
            v-for="(project, index) in activeProjects"
            :key="project.id"
            :project="project"
            @preview="openPreview"
            :style="{ animationDelay: `${(index + 2) * 100}ms` }"
            class="animate-slide-up"
          />
        </div>
      </div>

      <!-- CTA Contato Styled -->
      <div class="flex flex-wrap justify-center gap-4 mt-8">
        <a
          href="https://wa.me/5541988232894"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-bold border border-white hover:bg-zinc-200 transition-all uppercase tracking-wider"
        >
          <MessageCircleIcon class="w-5 h-5" />
          <span>Solicitar Contato</span>
        </a>

        <a
          href="https://github.com/vick1st"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-zinc-900/50 text-white font-bold border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500 transition-all uppercase tracking-wider backdrop-blur-sm"
        >
          <img src="https://skillicons.dev/icons?i=github" class="w-5 h-5 filter invert" alt="GitHub" />
          <span>GitHub</span>
        </a>
      </div>
    </div>

    <!-- Preview Modal (Projetos) -->
    <Transition name="modal">
      <div
        v-if="webUrl"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6"
        @click.self="closePreview"
      >
        <div
          class="relative w-full max-w-6xl bg-white/10 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-2xl animate-scale-in mx-auto browser-window border border-white/20"
          style="height: 85vh; max-height: 900px"
        >
          <!-- Browser Toolbar -->
          <div class="absolute top-0 left-0 right-0 z-40">
            <!-- Top Bar (Tab Bar) -->
            <div
              class="flex items-center gap-2 px-3 py-2 bg-black/30 backdrop-blur-xl rounded-t-2xl border-b border-white/10"
            >
              <!-- macOS Window Controls -->
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors shadow-sm"
                  aria-label="Fechar"
                  @click="closePreview"
                ></button>
                <button
                  type="button"
                  class="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors shadow-sm"
                  aria-label="Minimizar"
                ></button>
                <button
                  type="button"
                  class="w-3 h-3 rounded-full bg-[#28ca42] hover:bg-[#28ca42]/80 transition-colors shadow-sm"
                  aria-label="Maximizar"
                ></button>
              </div>

              <!-- Tab Area -->
              <div class="flex-1 flex items-center gap-1 min-w-0">
                <div
                  class="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-t-lg border border-b-0 border-white/20 min-w-0"
                >
                  <div class="w-2 h-2 rounded-full bg-white/60"></div>
                  <span
                    class="text-xs text-white/90 truncate max-w-[120px] sm:max-w-[200px] font-medium"
                    :title="getDomainName(webUrl)"
                  >
                    {{ getDomainName(webUrl) }}
                  </span>
                  <button
                    type="button"
                    class="ml-1 w-4 h-4 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Fechar aba"
                    @click="closePreview"
                  >
                    <XIcon class="w-2.5 h-2.5 text-white/70" />
                  </button>
                </div>
                <button
                  type="button"
                  class="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="Nova aba"
                >
                  <span class="text-white/70 text-lg leading-none">+</span>
                </button>
              </div>
            </div>

            <!-- Navigation Bar -->
            <div
              class="flex items-center gap-2 px-3 py-2.5 bg-white/5 backdrop-blur-xl border-b border-white/10"
            >
              <!-- Navigation Icons (Hidden on mobile) -->
              <div class="hidden md:flex items-center gap-1">
                <button
                  type="button"
                  class="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="Voltar"
                >
                  <svg
                    class="w-4 h-4 text-white/80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="Avançar"
                >
                  <svg
                    class="w-4 h-4 text-white/80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="Recarregar"
                >
                  <svg
                    class="w-4 h-4 text-white/80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>

              <!-- URL Bar -->
              <div
                class="flex-1 flex items-center gap-2 px-3 md:px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 min-w-0"
              >
                <svg
                  class="w-4 h-4 text-white/70 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span
                  class="flex-1 text-xs md:text-sm text-white/90 font-medium break-all"
                  :title="webUrl || ''"
                >
                  {{ webUrl }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-2">
                <a
                  :href="webUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-3 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all flex items-center gap-1.5 md:gap-2 text-white text-xs md:text-sm font-semibold shadow-sm hover:shadow-md whitespace-nowrap"
                  @click.stop
                >
                  <ExternalLinkIcon class="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span class="hidden sm:inline">Abrir Site</span>
                  <span class="sm:hidden">Abrir</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Preview Container -->
          <div class="w-full h-full pt-[105px] bg-white/5 backdrop-blur-sm overflow-hidden">
            <iframe
              v-if="useIframe && webUrl && !iframeError"
              :src="webUrl"
              class="w-full h-full border-0"
              frameborder="0"
              :title="`Prévia de ${webUrl}`"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
              @error="handleIframeError"
            ></iframe>

            <div
              v-else
              class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-black/20 via-black/10 to-black/20 overflow-auto p-4"
            >
              <div
                v-if="webThumbnail"
                class="w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md"
              >
                <img
                  :src="webThumbnail"
                  :alt="`Prévia de ${webUrl}`"
                  class="w-full h-auto object-contain"
                />
              </div>

              <div
                v-else
                class="flex flex-col items-center justify-center gap-6 text-white/70 max-w-md text-center"
              >
                <div
                  class="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center"
                >
                  <ExternalLinkIcon class="w-10 h-10 text-white/70" />
                </div>
                <div>
                  <p class="text-xl font-semibold text-white/90 mb-2">
                    Prévia não disponível
                  </p>
                  <p class="text-sm text-white/60">
                    Clique no botão abaixo para visitar o site
                  </p>
                </div>
                <a
                  :href="webUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center gap-2 border border-white/30 shadow-lg hover:shadow-xl"
                  @click.stop
                >
                  <ExternalLinkIcon class="w-5 h-5" />
                  <span>Abrir Site</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import { storeToRefs } from 'pinia'
import ProjectCard from '@/components/project-card.vue'
import TechStack from '@/components/tech-stack.vue'
import {
  MessageCircle as MessageCircleIcon,
  ArrowLeft as ArrowLeftIcon,
  X as XIcon,
  ExternalLink as ExternalLinkIcon,
} from 'lucide-vue-next'

const store = useProjectsStore()
const { projects } = storeToRefs(store)

const activeProjects = computed(() =>
  projects.value.filter(p => p.isActive)
)

const webUrl = ref<string | null>(null)
const webThumbnail = ref<string | undefined>(undefined)
const useIframe = true
const iframeError = ref(false)

function openPreview(payload: { url: string; thumbnail?: string }) {
  webUrl.value = payload.url
  webThumbnail.value = payload.thumbnail
}

function closePreview() {
  webUrl.value = null
  webThumbnail.value = undefined
  iframeError.value = false
}

function getDomainName(url: string | null): string {
  if (!url) return ''
  try {
    const domain = new URL(url).hostname
    return domain.replace('www.', '')
  } catch {
    return url
  }
}

function handleIframeError() {
  iframeError.value = true
}

watch(
  () => webUrl.value,
  () => {
    iframeError.value = false
  },
  { immediate: true },
)

const mainTechnologies = [
  'Vue.js',
  'Vite',
  'GitHub',
  'Docker',
  'JavaScript',
  'Java',
  'AWS'
]
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out both;
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.browser-window {
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
}
</style>

