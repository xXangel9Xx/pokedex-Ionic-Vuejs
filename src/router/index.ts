import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/index'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/index'
      },
      {
        path: 'index',
        component: () => import('@/views/indexPokemons.vue')
      },
      {
        path: 'battle',
        component: () => import('@/views/battle.vue')
      },
      {
        path: 'favorites',
        component: () => import('@/views/favorites.vue')
      }
    ]
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
