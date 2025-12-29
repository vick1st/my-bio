<template>
  <header class="flex flex-col items-center text-center gap-3">
    <img
      :src="profile.avatar"
      alt="avatar"
      class="h-20 w-20 rounded-full border border-brand-600"
    />
    <h1 class="font-semibold text-white flex items-center gap-1">
      <span>{{ profile.name }}</span>
      <BadgeCheckIcon class="w-5 h-5 text-blue-400 translate-y-[1px]" />
    </h1>
    <p class="max-w-md text-zinc-400 text-sm font-bio tracking-wide whitespace-pre-line">
      {{ profile.bio }}
    </p>
  </header>
</template>

<script setup lang="ts">
import type { Profile } from '@/types'
import { BadgeCheck as BadgeCheckIcon } from 'lucide-vue-next'

defineProps<{ profile: Profile }>()
</script>
