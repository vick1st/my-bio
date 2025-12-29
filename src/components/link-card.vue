<template>
  <button
    class="card-border w-full sm:w-[460px] h-12 flex items-center justify-center transition-transform active:translate-x-[2px] active:translate-y-[2px]"
    :disabled="!link.isActive"
    @click="onClick"
  >
    <div class="flex items-center gap-2">
      <component
        v-if="link.lucideIcon && LucideIcon"
        :is="LucideIcon"
        class="w-4 h-4 text-zinc-100"
      />
      <div
        v-else-if="getLinkIcon(link.id)"
        class="w-4 h-4"
        v-html="getLinkIcon(link.id)"
      />
      <span class="text-zinc-100 font-medium tracking-wide">{{ link.title }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { Link } from '@/types'
import { useLinksStore } from '@/stores/links'
import { trackClick } from '@/utils/analytics'
import { getLinkIcon } from '@/utils/link-icons'
import { computed } from 'vue'
import { CodeXml, Clapperboard } from 'lucide-vue-next'

const props = defineProps<{ link: Link }>()
const emit = defineEmits<{ (e: 'link-click', url: string): void }>()
const store = useLinksStore()

const lucideIconMap: Record<string, any> = {
  'code-xml': CodeXml,
  'clapperboard': Clapperboard,
}

const LucideIcon = computed(() => {
  if (!props.link.lucideIcon) return null
  return lucideIconMap[props.link.lucideIcon] || null
})

function onClick() {
  if (!props.link.isActive) return
  emit('link-click', props.link.url)
  store.incrementClick(props.link.id)
  trackClick(props.link.id)
}
</script>
