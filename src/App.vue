<template>
  <div class="app-container">
    <div class="w-full flex flex-col items-center gap-6 mt-6">
      <ElSkeleton :loading="loading" animated :rows="0">
        <template #template>
          <div class="flex flex-col items-center gap-3 w-full sm:w-[460px]">
            <div class="h-20 w-20 rounded-full bg-gray-200" />
            <div class="h-5 w-24 rounded bg-gray-200" />
            <div class="h-4 w-64 rounded bg-gray-200" />
          </div>
        </template>
        <ProfileHeader :profile="profile" />
      </ElSkeleton>

      <transition-group
        name="links"
        tag="div"
        class="flex flex-col gap-4 w-full items-center"
      >
        <LinkCard v-for="l in links" :key="l.id" :link="l" />
      </transition-group>

      <div class="flex flex-col gap-4 w-full items-center">
        <EmbedCard
          v-for="e in embeds"
          :key="e.id"
          :src="e.src"
          :height="e.height ?? 352"
        />
      </div>
    </div>

    <div class="mt-auto pb-7 sm:pb-4 pt-10 sm:pt-4">
      <SocialLinks />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileHeader from '@/components/profile-header.vue'
import LinkCard from '@/components/link-card.vue'
import SocialLinks from '@/components/social-links.vue'
import { useLinksStore } from '@/stores/links'
import EmbedCard from '@/components/embed-card.vue'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

const loading = ref(true)
const store = useLinksStore()
const { links, profile, embeds } = storeToRefs(store)

onMounted(() => {
  setTimeout(() => (loading.value = false), 300)
})
</script>

<style scoped>
.links-enter-active,
.links-leave-active {
  transition: all 0.2s ease;
}
.links-enter-from,
.links-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
