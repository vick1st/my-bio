<template>
  <div
    class="card-border w-full p-6 lg:p-8 flex flex-col gap-4 lg:gap-5 transition-transform hover:scale-[1.02]"
  >
    <!-- Header: Título + Badge -->
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1">
        <h3 class="text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900 mb-2">
          {{ hobby.title }}
        </h3>
        <div v-if="hobby.client" class="text-sm lg:text-base text-gray-600">
          Cliente: <span class="font-medium">{{ hobby.client }}</span>
        </div>
      </div>
      <span
        class="inline-flex items-center px-2.5 py-0.5 lg:px-3 lg:py-1 rounded-full text-xs lg:text-sm font-medium flex-shrink-0"
        :class="getTypeClass(hobby.type)"
      >
        {{ getTypeLabel(hobby.type) }}
      </span>
    </div>

    <!-- Descrição -->
    <p v-if="hobby.description" class="text-sm lg:text-base text-gray-700">
      {{ hobby.description }}
    </p>

    <!-- Vídeo/Embed -->
    <div v-if="hobby.embedUrl" class="w-full rounded-xl overflow-hidden bg-gray-100">
      <iframe
        :src="hobby.embedUrl"
        width="100%"
        height="400"
        frameborder="0"
        allowfullscreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        class="w-full"
      />
    </div>

    <!-- Imagem -->
    <div v-else-if="hobby.imageUrl" class="w-full rounded-xl overflow-hidden bg-gray-100">
      <img
        :src="hobby.imageUrl"
        :alt="hobby.title"
        class="w-full h-auto object-cover"
        loading="lazy"
      />
    </div>

    <!-- Tags -->
    <div v-if="hobby.tags && hobby.tags.length > 0" class="flex flex-wrap gap-2">
      <span
        v-for="tag in hobby.tags"
        :key="tag"
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Data -->
    <div v-if="hobby.date" class="text-xs lg:text-sm text-gray-500">
      {{ formatDate(hobby.date) }}
    </div>

    <!-- Link Externo -->
    <div v-if="hobby.externalUrl" class="pt-2 lg:pt-3 border-t border-gray-200">
      <a
        :href="hobby.externalUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-sm lg:text-base text-gray-700 hover:text-gray-900 transition-colors"
      >
        <span>Ver projeto completo</span>
        <svg
          class="w-4 h-4 lg:w-5 lg:h-5"
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
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hobby } from '@/types'

defineProps<{
  hobby: Hobby
}>()

function getTypeClass(type: string) {
  const typeClasses: Record<string, string> = {
    'video': 'bg-blue-100 text-blue-800',
    'edição': 'bg-purple-100 text-purple-800',
    'drone': 'bg-green-100 text-green-800',
    'freela': 'bg-orange-100 text-orange-800',
    'imagem': 'bg-pink-100 text-pink-800',
    'outro': 'bg-gray-100 text-gray-800',
  }
  return typeClasses[type] || 'bg-gray-100 text-gray-800'
}

function getTypeLabel(type: string) {
  const labels: Record<string, string> = {
    'video': 'Vídeo',
    'edição': 'Edição',
    'drone': 'Drone',
    'freela': 'Freela',
    'imagem': 'Imagem',
    'outro': 'Outro',
  }
  return labels[type] || type
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>

