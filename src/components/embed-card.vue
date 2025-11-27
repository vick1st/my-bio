<template>
  <div class="w-full sm:w-[460px]">
    <iframe
      :style="{ borderRadius: '12px' }"
      :src="src"
      width="100%"
      :height="height"
      frameborder="0"
      allowfullscreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ src: string; height?: number }>()
</script>
