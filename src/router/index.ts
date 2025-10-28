import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', name: 'dashboard', component: DashboardView },

    // colocar views quando criar
    { path: '/contratos', name: 'contratos', component: DashboardView },
    { path: '/empresas', name: 'empresas', component: DashboardView },
    { path: '/lembretes', name: 'lembretes', component: DashboardView },
    { path: '/reunioes',  name: 'reunioes',  component: DashboardView },
    { path: '/ajustes',   name: 'ajustes',   component: DashboardView },
  ],
})
