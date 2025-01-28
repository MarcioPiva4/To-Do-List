import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/sign-in',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/sign-in',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/CreateAccountView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/task-create',
      name: 'task-create',
      component: () => import('../views/TaskCreateView.vue')
    },
    {
      path: '/task-edit/:id',
      name: 'task-edit',
      component: () => import('../views/TaskPageEdit.vue'),
      props: true,
    }
  ],
})

export default router
