import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {noSidebar: true}
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/MainView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../components/UserTable/UserTable.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { public: true }
    },
    {
      path: '/dashboard2',
      name: 'dashboard2',
      component: () => import('../views/Dashboard2.vue'),
      meta: { public: true }
    }

  ],
})

// 👇 guard com bypass em dev
router.beforeEach((to, _from, next) => {
  // bypass se: (1) rota for pública, (2) env flag ligada, (3) build dev
  const bypass =
    to.meta?.public === true ||
    import.meta.env.VITE_BYPASS_AUTH === 'true' ||
    import.meta.env.DEV

  if (bypass) return next()

  const token = localStorage.getItem('token')
  if (!token) return next({ name: 'home' }) // volta pro login/página inicial
  return next()
})

export default router
