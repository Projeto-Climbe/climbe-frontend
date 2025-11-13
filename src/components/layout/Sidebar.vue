<template>
  <aside class="sidebar">
    <!-- Bloco superior: logo + menu -->
    <div>
      <!-- Logo Climbe -->
      <div class="sidebar__logo">
        <div class="sidebar__logo-mark">
          <span class="sidebar__logo-text-main">climb.</span>
          <span class="sidebar__logo-text-sub">Investimentos independentes</span>
        </div>
      </div>

      <!-- Navegação -->
      <nav class="sidebar__nav">
        <ul class="sidebar__list">
          <li
            v-for="item in items"
            :key="item.id"
            :class="['sidebar__item', { 'sidebar__item--active': isActive(item) }]"
          >
            <button type="button" class="sidebar__link" @click="handleClick(item)">
              <span class="sidebar__icon-wrap">
                <i :class="['pi', item.icon]" aria-hidden="true" />
              </span>

              <span class="sidebar__label">
                {{ item.label }}
              </span>

              <span v-if="item.badge !== undefined" class="sidebar__badge">
                {{ item.badge }}
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Bloco inferior: usuário -->
    <footer class="sidebar__footer">
      <div class="sidebar__user">
        <div class="sidebar__avatar">
          <span class="sidebar__avatar-initial">L</span>
        </div>
        <div class="sidebar__user-info">
          <span class="sidebar__user-name">Luiz Gustavo</span>
        </div>
      </div>
    </footer>
  </aside>
</template>

<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router'

  interface SidebarItem {
    id: string
    label: string
    icon: string
    to?: string
    badge?: number
  }

  const router = useRouter()
  const route = useRoute()
  const items: SidebarItem[] = [
    { id: 'overview', label: 'Visão geral', icon: 'pi-compass', to: '/dashboard' },
    { id: 'contracts', label: 'Contratos', icon: 'pi-file', badge: 3, to: '/contratos' },
    { id: 'companies', label: 'Empresas', icon: 'pi-building', to: '/companies' },
    { id: 'reminders', label: 'Lembretes', icon: 'pi-bell', to: '/lembretes' },
    { id: 'meetings', label: 'Reuniões', icon: 'pi-calendar', to: '/reunioes' },
    { id: 'settings', label: 'Ajustes', icon: 'pi-cog', to: '/ajustes' },
  ]

  function handleClick(item: SidebarItem) {
    if (!item.to || route.path === item.to) return
    router.push(item.to)
  }
  
  function isActive(item: SidebarItem) {
    if (item.to) {
      return route.path === item.to
    }

    if (item.id === 'overview') {
      return route.name === 'dashboard' || route.path === '/'
    }

    return false
  }
</script>

<style scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    width: 240px;
    padding: 24px 20px;
    background-color: #f2f6f3; /* mesmo feel do Figma */
    box-shadow: 10px 0 35px rgba(15, 23, 42, 0.04);
  }

  /* Logo */
  .sidebar__logo {
    margin-bottom: 24px;
  }

  .sidebar__logo-mark {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .sidebar__logo-text-main {
    font-weight: 800;
    font-size: 24px;
    letter-spacing: 0.01em;
    color: #1b7a5a;
  }

  .sidebar__logo-text-sub {
    font-size: 10px;
    color: #7a8d82;
  }

  /* Menu */
  .sidebar__nav {
    margin-top: 24px;
  }

  .sidebar__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar__item + .sidebar__item {
    margin-top: 6px;
  }

  .sidebar__link {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    padding: 10px 12px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    color: #123b2d;
    font-size: 14px;
  }

  /* Estado ativo (igual Figma: pill verde clara) */
  .sidebar__item--active .sidebar__link {
    background-color: #e0f2eb;
    color: #1b7a5a;
  }

  /* Ícone */
  .sidebar__icon-wrap {
    width: 24px;
    display: flex;
    justify-content: center;
  }

  .sidebar__label {
    flex: 1;
    text-align: left;
  }

  /* Badge vermelho dos contratos */
  .sidebar__badge {
    min-width: 20px;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 11px;
    background-color: #ffe2e0;
    color: #b05454;
  }

  /* Rodapé / Usuário */
  .sidebar__footer {
    margin-top: 32px;
  }

  .sidebar__user {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 999px;
    background-color: #e3f2ec;
  }

  .sidebar__avatar {
    width: 28px;
    height: 28px;
    border-radius: 999px;
    border: 2px solid #1b7a5a;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sidebar__avatar-initial {
    font-size: 13px;
    font-weight: 600;
    color: #1b7a5a;
  }

  .sidebar__user-info {
    display: flex;
    flex-direction: column;
  }

  .sidebar__user-name {
    font-size: 13px;
    font-weight: 500;
    color: #123b2d;
  }
</style>
