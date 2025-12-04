import { createRouter, createWebHistory } from 'vue-router'

const PaginaSignin = () => import('../pages/Signin/SigninPage.vue')
const PaginaSignup = () => import('../pages/Signup/SignupPage.vue')
const PaginaGoogleCallback = () => import('../pages/Signin/GoogleCallbackPage.vue')
const PaginaDashboard = () => import('../pages/Dashboard/DashboardPage.vue')
const PaginaEmpresas = () => import('../pages/Companies/CompaniesPage.vue')
const PaginaReunioes = () => import('../pages/Reunioes/ReunioesPage.vue')
const PaginaLembretes = () => import('../pages/Lembretes/LembretesPage.vue')
const PaginaContratos = () => import('../pages/Contratos/ContratosPage.vue')
const PaginaVazia = { render: () => null }


export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/signin' },
    { path: '/signin', name: 'signin', component: PaginaSignin },
    { path: '/signup', name: 'signup', component: PaginaSignup },
    { path: '/auth/google/callback', name: 'google-callback', component: PaginaGoogleCallback },
    { path: '/dashboard', name: 'dashboard', component: PaginaDashboard },
    { path: '/empresas', name: 'empresas', component: PaginaEmpresas },
    { path: '/contratos', name: 'contratos', component: PaginaContratos },
    { path: '/reunioes', name: 'reunioes', component: PaginaReunioes },
    { path: '/lembretes', name: 'lembretes', component: PaginaLembretes },
    { path: '/documentos', name: 'documentos', component: PaginaVazia },
    { path: '/ajustes', component: PaginaVazia },
    { path: '/companies', redirect: '/empresas' }
  ]
})
