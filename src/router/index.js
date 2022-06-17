import { createRouter, createWebHistory } from 'vue-router';
import { auth_required, authenticated } from './helpers';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      beforeEnter: [authenticated],
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/about/',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/dashboard/',
      name: 'dashboard',
      beforeEnter: [auth_required],
      component: () => import('../views/Dashboard.vue')
    }
  ]
});

export default router;
