<template>
  <div class="app-container">
    <div class="w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto flex flex-col gap-8 lg:gap-16 mt-6 lg:mt-12 pb-12 px-4 lg:px-8">
      <!-- Botão Voltar -->
      <div class="w-full flex justify-start">
        <router-link
          to="/bio"
          class="inline-flex items-center gap-2 px-3 py-2 text-sm lg:text-base text-gray-500 hover:text-gray-700 transition-colors group"
        >
          <ArrowLeftIcon class="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:-translate-x-1" />
          <span>Voltar</span>
        </router-link>
      </div>

      <!-- Header -->
      <div class="flex flex-col items-center gap-4 lg:gap-6 w-full animate-fade-in">
        <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 tracking-tight">
          Hobbies & Criatividade
        </h1>
        <p class="text-xl lg:text-2xl text-gray-600 text-center max-w-2xl">
          Trabalhos de edição, gravações com drone e projetos criativos
        </p>
      </div>

      <!-- Divisor Visual -->
      <div class="w-full flex items-center gap-4">
        <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div class="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
        <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      <!-- CTA Banner para Freelas -->
      <div class="w-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 lg:p-8 border border-blue-100">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div class="flex-1 text-center lg:text-left">
            <h2 class="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
              Interessado em trabalhos de edição ou gravação com drone?
            </h2>
            <p class="text-sm lg:text-base text-gray-600">
              Entre em contato para orçamentos e propostas de projetos
            </p>
          </div>
          <a
            href="https://wa.me/5541988232894"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors font-medium"
          >
            <MessageCircleIcon class="w-5 h-5" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>

      <!-- Grid de Hobbies -->
      <div class="w-full flex flex-col gap-6 lg:gap-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 w-full">
          <HobbyCard
            v-for="hobby in activeHobbies"
            :key="hobby.id"
            :hobby="hobby"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHobbiesStore } from '@/stores/hobbies'
import HobbyCard from '@/components/hobby-card.vue'
import { ArrowLeft as ArrowLeftIcon, MessageCircle as MessageCircleIcon } from 'lucide-vue-next'

const store = useHobbiesStore()
const { activeHobbies } = storeToRefs(store)
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>

