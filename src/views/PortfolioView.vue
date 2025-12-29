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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import { storeToRefs } from 'pinia'
import ProjectCard from '@/components/project-card.vue'
import TechStack from '@/components/tech-stack.vue'
import { MessageCircle as MessageCircleIcon, ArrowLeft as ArrowLeftIcon } from 'lucide-vue-next'

const store = useProjectsStore()
const { projects } = storeToRefs(store)

const activeProjects = computed(() =>
  projects.value.filter(p => p.isActive)
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
</style>

