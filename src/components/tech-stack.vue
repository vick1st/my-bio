<template>
  <div class="flex flex-wrap gap-4 lg:gap-6 items-center justify-center">
    <div
      v-for="tech in technologies"
      :key="tech"
      class="group relative flex items-center justify-center"
      :title="tech"
    >
      <div
        v-if="getTechIcon(tech)"
        class="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 transition-transform hover:scale-110"
        v-html="getTechIcon(tech)"
      />
      <span
        v-else
        class="text-sm text-zinc-500 font-medium"
      >
        {{ tech }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTechIcon } from '@/utils/tech-icons'

defineProps<{
  technologies: string[]
}>()
</script>

