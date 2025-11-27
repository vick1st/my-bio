<template>
  <button
    class="card-border w-full sm:w-[460px] h-12 flex items-center justify-center transition-transform active:translate-x-[2px] active:translate-y-[2px]"
    :disabled="!link.isActive"
    @click="onClick"
  >
    <span class="text-gray-900">{{ link.title }}</span>
  </button>
</template>

<script setup lang="ts">
import type { Link } from '@/types'
import { useLinksStore } from '@/stores/links'
import { trackClick } from '@/utils/analytics'

const props = defineProps<{ link: Link }>()
const emit = defineEmits<{ (e: 'link-click', url: string): void }>()
const store = useLinksStore()

function onClick() {
  if (!props.link.isActive) return
  emit('link-click', props.link.url)
  store.incrementClick(props.link.id)
  trackClick(props.link.id)
}
</script>
