import { createRouter, createWebHistory } from 'vue-router'
import BioView from '@/views/BioView.vue'
import PortfolioView from '@/views/PortfolioView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'bio',
      component: BioView,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioView,
    },
  ],
})

export default router

