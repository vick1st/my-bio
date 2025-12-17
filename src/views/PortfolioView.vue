<template>
  <div class="app-container">
    <div class="w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto flex flex-col gap-8 lg:gap-16 mt-6 lg:mt-12 pb-12 px-4 lg:px-8">
      <!-- Botão Voltar -->
      <div class="w-full flex justify-start">
        <router-link
          to="/bio"
          class="inline-flex items-center gap-2 px-3 py-2 text-sm lg:text-base text-gray-500 hover:text-gray-700 transition-colors group"
        >
          <ArrowLeftIcon class="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:-translate-x-1" />
          <span>Voltar</span>
        </router-link>
      </div>

      <!-- Header Minimalista -->
      <div class="flex flex-col items-center gap-4 lg:gap-6 w-full">
        <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 tracking-tight">
          Victor Hugo
        </h1>
        <p class="text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-800 tracking-wide">
          Desenvolvedor FullStack
        </p>
      </div>

      <!-- Divisor Visual -->
      <div class="w-full flex items-center gap-4">
        <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div class="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
        <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      <!-- Seção Stack Principal -->
      <div class="w-full">
        <TechStack :technologies="mainTechnologies" />
      </div>

      <!-- Seção Projetos -->
      <div class="w-full flex flex-col gap-6 lg:gap-8">
        <h2 class="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 text-center">Projetos</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5 lg:gap-6 w-full">
          <ProjectCard
            v-for="project in activeProjects"
            :key="project.id"
            :project="project"
          />
        </div>
      </div>

      <!-- CTA Contato -->
      <div class="flex justify-center gap-4">
        <a
          href="https://wa.me/5541988232894"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 rounded-full border border-gray-300 text-sm lg:text-base text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <MessageCircleIcon class="w-4 h-4 lg:w-5 lg:h-5" />
          <span>Contato</span>
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
</style>

