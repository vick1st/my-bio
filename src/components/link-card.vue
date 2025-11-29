<template>
  <button
    class="card-border w-full sm:w-[460px] h-12 flex items-center justify-center transition-transform active:translate-x-[2px] active:translate-y-[2px]"
    :disabled="!link.isActive"
    @click="onClick"
  >
    <div class="flex items-center gap-2">
      <div
        v-if="getLinkIcon(link.id)"
        class="w-4 h-4"
        v-html="getLinkIcon(link.id)"
      />
      <span class="text-gray-900">{{ link.title }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { Link } from '@/types'
import { useLinksStore } from '@/stores/links'
import { trackClick } from '@/utils/analytics'
import { getLinkIcon } from '@/utils/link-icons'

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
