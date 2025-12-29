import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BioView from '@/views/BioView.vue'
import PortfolioView from '@/views/PortfolioView.vue'
import HobbiesView from '@/views/HobbiesView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bio',
      name: 'bio',
      component: BioView,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioView,
    },
    {
      path: '/hobbies/audiovisual',
      name: 'hobbiesAudiovisual',
      component: HobbiesView,
    },
  ],
})

export default router

