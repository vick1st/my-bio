<template>
  <div class="app-container">
    <div class="w-full flex flex-col items-center gap-8 mt-8">
      <!-- Mensagem de Boas-vindas -->
      <div class="flex flex-col items-center gap-6 w-full sm:w-[460px] animate-fade-in">
        <div class="flex flex-col items-center gap-4 text-center">
          <h1 class="text-4xl font-bold text-gray-900 tracking-tight">
            Seja muito bem vindo!
          </h1>
          
          <p class="text-lg text-gray-600 leading-relaxed max-w-md px-4">
            Essa página ainda está em desenvolvimento, mas você pode acessar
          </p>
        </div>

        <!-- Animação Lottie -->
        <div class="relative my-4 flex items-center justify-center">
          <DotLottieVue
            style="height: 320px; width: 320px"
            autoplay
            loop
            src="/Loader cat.json"
          />
        </div>

        <!-- Botões de Navegação -->
        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
          <router-link
            to="/bio"
            class="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-card border border-brand-600 text-base font-medium text-gray-900 hover:bg-brand-600 hover:text-white transition-all duration-200 shadow-card hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <span>Link Bio</span>
            <svg
              class="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </router-link>

          <router-link
            to="/portfolio"
            class="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-card border border-brand-600 text-base font-medium text-gray-900 hover:bg-brand-600 hover:text-white transition-all duration-200 shadow-card hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <span>Portfolio</span>
            <svg
              class="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
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

