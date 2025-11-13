import { createRouter, createWebHistory } from 'vue-router'

const PaginaDashboard = () => import('../pages/Dashboard/DashboardPage.vue')
const PaginaEmpresas = () => import('../pages/Companies/CompaniesPage.vue')
const PaginaReunioes = () => import('../pages/Reunioes/ReunioesPage.vue')

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', name: 'dashboard', component: PaginaDashboard },
    { path: '/empresas', name: 'empresas', component: PaginaEmpresas },
    { path: '/contratos', component: { template: '<div />' } },
    { path: '/reunioes', name: 'reunioes', component: PaginaReunioes },
    { path: '/lembretes', component: { template: '<div />' } },
    { path: '/ajustes', component: { template: '<div />' } }
  ]
})
