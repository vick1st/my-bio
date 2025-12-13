<template>
  <div class="app-container">
    <div class="w-full flex flex-col items-center gap-8 mt-8">
      <!-- Header Profissional -->
      <div class="flex flex-col items-center gap-5 w-full sm:w-[460px] animate-fade-in">
        <div class="flex flex-col items-center gap-4">
          <div class="relative">
            <h1 class="text-4xl font-bold text-gray-900 tracking-tight">
              Victor Hugo
            </h1>
            <div class="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 opacity-20 rounded-full"></div>
          </div>
          
          <div class="flex flex-col items-center gap-1">
            <p class="text-xl font-semibold text-gray-800 tracking-wide">
              Web Developer
            </p>
          </div>
        </div>
        
        <p class="text-sm text-gray-600 text-center max-w-md leading-relaxed px-4">
          Desenvolvedor FullStack | Web Development • DevOps • AWS
        </p>
      </div>

      <!-- Divisor Visual -->
      <div class="w-full sm:w-[460px] flex items-center gap-4 my-2">
        <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div class="w-2 h-2 rounded-full bg-brand-600"></div>
        <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      <!-- Título da Seção -->
      <div class="flex flex-col items-center gap-2 w-full sm:w-[460px]">
        <h2 class="text-2xl font-bold text-gray-900">Projetos</h2>
        <p class="text-sm text-gray-500 text-center">
          Alguns dos projetos que desenvolvi
        </p>
      </div>

      <!-- Lista de Projetos -->
      <div class="flex flex-col gap-5 w-full items-center">
        <ProjectCard
          v-for="(project, index) in activeProjects"
          :key="project.id"
          :project="project"
          :style="{ animationDelay: `${index * 100}ms` }"
          class="animate-slide-up"
        />
      </div>

      <!-- CTA Contato -->
      <div class="mt-4">
        <a
          href="https://wa.me/5541988232894"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-600 text-sm text-gray-900 hover:bg-brand-600 hover:text-white transition-colors"
        >
          <MessageCircleIcon class="w-4 h-4" />
          <span>Entrar em contato</span>
        </a>
      </div>

      <!-- Link de Volta -->
      <div class="mt-8 pb-7 sm:pb-4">
        <router-link
          to="/bio"
          class="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-all duration-200"
        >
          <svg
            class="w-4 h-4 transition-transform group-hover:-translate-x-1"
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
          <span>Voltar para Bio</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import { storeToRefs } from 'pinia'
import ProjectCard from '@/components/project-card.vue'
import { MessageCircle as MessageCircleIcon } from 'lucide-vue-next'

const store = useProjectsStore()
const { projects } = storeToRefs(store)

const activeProjects = computed(() =>
  projects.value.filter(p => p.isActive)
)
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

