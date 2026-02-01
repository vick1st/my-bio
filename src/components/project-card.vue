<template>
  <div
    class="card-border w-full sm:w-full lg:w-full p-6 lg:p-8 flex flex-col gap-4 lg:gap-5 transition-all duration-300 hover:scale-[1.01] bg-zinc-900/50 border-zinc-800 hover:border-zinc-600"
  >
    <!-- Header: Título + Links -->
    <div class="flex items-start justify-between gap-4">
      <h3 class="text-lg lg:text-xl xl:text-2xl font-bold text-white tracking-tight">{{ project.title }}</h3>
      <div class="flex gap-2 flex-shrink-0">
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-zinc-500 hover:text-white transition-colors"
          title="Ver no GitHub"
          @click.stop
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
        </a>
        <button
          v-if="project.url"
          type="button"
          class="text-zinc-500 hover:text-white transition-colors"
          title="Prévia do projeto"
          aria-label="Abrir prévia do projeto"
          @click.stop="emitPreview"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Badge de Status -->
    <div v-if="project.status" class="flex items-center gap-2">
      <span
        class="inline-flex items-center px-2.5 py-0.5 lg:px-3 lg:py-1 rounded-full text-xs lg:text-sm font-medium border border-opacity-20"
        :class="getStatusClass(project.status)"
      >
        {{ project.status }}
      </span>
    </div>

    <!-- Stack: Ícones das tecnologias -->
    <div v-if="project.technologies.length > 0" class="flex flex-wrap gap-3 lg:gap-4 items-center">
      <div
        v-for="tech in project.technologies"
        :key="tech"
        class="group relative"
        :title="tech"
      >
        <div
          v-if="getTechIcon(tech)"
          class="w-6 h-6 lg:w-7 lg:h-7 transition-transform hover:scale-110 grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
          v-html="getTechIcon(tech)"
        />
        <span
          v-else
          class="text-xs text-zinc-500"
        >
          {{ tech }}
        </span>
      </div>
    </div>

    <!-- Escopo -->
    <div v-if="project.scope" class="flex items-center gap-2 lg:gap-3">
      <span class="text-sm lg:text-base text-zinc-400 font-medium">Escopo:</span>
      <span class="inline-flex items-center px-2.5 py-0.5 lg:px-3 lg:py-1 rounded-full text-xs lg:text-sm font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
        {{ project.scope }}
      </span>
    </div>

    <!-- Responsabilidades -->
    <div v-if="project.responsibility && project.responsibility.length > 0" class="flex items-start gap-2 lg:gap-3">
      <span class="text-sm lg:text-base text-zinc-400 font-medium flex-shrink-0">Responsabilidades:</span>
      <span class="text-sm lg:text-base text-zinc-300">
        {{ project.responsibility.join(' • ') }}
      </span>
    </div>

    <!-- Resultado -->
    <div v-if="project.result" class="pt-2 lg:pt-3 border-t border-zinc-800">
      <p class="text-sm lg:text-base font-medium text-white mb-1 lg:mb-2">Resultado:</p>
      <p class="text-sm lg:text-base text-zinc-400 leading-relaxed">{{ project.result }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '@/types'
import { getTechIcon } from '@/utils/tech-icons'

const props = defineProps<{
  project: Project
}>()

const emit = defineEmits<{
  (e: 'preview', payload: { url: string; thumbnail?: string }): void
}>()

function emitPreview() {
  if (!props.project.url) return
  emit('preview', { url: props.project.url, thumbnail: props.project.image })
}

function getStatusClass(status: string) {
  const statusClasses: Record<string, string> = {
    'Em produção': 'bg-green-900/30 text-green-300 border-green-500',
    'Beta': 'bg-blue-900/30 text-blue-300 border-blue-500',
    'Desenvolvimento': 'bg-yellow-900/30 text-yellow-300 border-yellow-500',
    'Concluído': 'bg-zinc-800 text-zinc-300 border-zinc-600',
  }
  return statusClasses[status] || 'bg-zinc-800 text-zinc-300 border-zinc-600'
}
</script>

