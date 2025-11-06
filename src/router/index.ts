import { createRouter, createWebHistory } from 'vue-router'

const PaginaDashboard = () => import('../views/Dashboard/DashboardPage.vue')
const PaginaEmpresas = () => import('../views/Empresas/CompaniesPage.vue')
const PaginaContratos = () => import('../views/Contratos/ContratosPage.vue')

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', name: 'dashboard', component: PaginaDashboard },
    { path: '/empresas', name: 'empresas', component: PaginaEmpresas },
    { path: '/contratos', name: 'contratos', component: PaginaContratos },
    { path: '/reunioes', component: { template: '<div />' } },
    { path: '/lembretes', component: { template: '<div />' } },
    { path: '/ajustes', component: { template: '<div />' } }
  ]
})
