<template>
  <header class="flex flex-col items-center text-center gap-3">
    <img
      :src="profile.avatar"
      alt="avatar"
      class="h-20 w-20 rounded-full border border-brand-600"
    />
    <h1 class="font-semibold text-gray-900">{{ profile.name }}</h1>
    <p class="max-w-md text-gray-700 text-sm font-bio tracking-wide">
      {{ profile.bio }}
    </p>
  </header>
</template>

<script setup lang="ts">
import type { Profile } from '@/types'
defineProps<{ profile: Profile }>()
</script>
