import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/play',
      component: () => import('../views/GamePage.vue')
    }
  ]
})

export default router
