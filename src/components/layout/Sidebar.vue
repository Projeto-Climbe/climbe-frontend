<template>
  <aside class="sidebar">
    <div>
      <div class="sidebar__logo">
        <div class="sidebar__logo-mark">
          <span class="sidebar__logo-text-main">climb.</span>
          <span class="sidebar__logo-text-sub">Investimentos independentes</span>
        </div>
      </div>

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

              <span v-if="item.badge" class="sidebar__badge">
                {{ item.badge }}
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>

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
    { id: 'overview', label: 'Visão geral', icon: 'pi-objects-column', to: '/dashboard' },
    { id: 'contracts', label: 'Contratos', icon: 'pi-file', badge: 3, to: '/contratos' },
    { id: 'companies', label: 'Empresas', icon: 'pi-briefcase', to: '/empresas' },
    { id: 'reminders', label: 'Lembretes', icon: 'pi-bell', to: '/lembretes' },
    { id: 'meetings', label: 'Reuniões', icon: 'pi-video', to: '/reunioes' },
    { id: 'settings', label: 'Ajustes', icon: 'pi-cog', to: '/ajustes' },
  ]

  function handleClick(item: SidebarItem) {
    if (!item.to) return
    router.push(item.to)
  }

  function isActive(item: SidebarItem) {
    if (item.to) return route.path.startsWith(item.to)
    return false
  }
</script>

<style scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    width: 260px;
    padding: 32px 24px;
    background-color: var(--climb-sidebar-bg);
    border-right: 1px solid rgba(0, 0, 0, 0.03);
  }

  /* Logo */
  .sidebar__logo-mark {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .sidebar__logo-text-main {
    font-weight: 800;
    font-size: 26px;
    color: var(--climb-green-900);
    letter-spacing: -0.5px;
  }
  .sidebar__logo-text-sub {
    font-size: 11px;
    color: var(--climb-muted);
    font-weight: 500;
  }

  /* Nav */
  .sidebar__nav {
    margin-top: 40px;
  }
  .sidebar__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .sidebar__item {
    position: relative;
  }

  .sidebar__link {
    width: 100%;
    border: none;
    background: transparent;
    padding: 12px 16px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    color: #586961;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s;
  }

  .sidebar__link:hover {
    background-color: rgba(0, 0, 0, 0.02);
    color: var(--climb-green-900);
  }

  .sidebar__item--active .sidebar__link {
    background-color: transparent;
    color: var(--climb-green-900);
    font-weight: 700;
  }

  .sidebar__item--active::before {
    content: '';
    position: absolute;
    left: -24px;
    top: 50%;
    transform: translateY(-50%);
    height: 24px;
    width: 4px;
    background-color: var(--climb-green-700);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .sidebar__icon-wrap {
    font-size: 18px;
  }

  .sidebar__badge {
    background-color: #ffe2e0;
    color: #b05454;
    font-size: 11px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 99px;
    margin-left: auto;
  }

  /* User Footer */
  .sidebar__user {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .sidebar__avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--climb-green-700);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--climb-green-700);
    font-weight: 700;
  }
  .sidebar__user-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--climb-green-900);
  }
</style>
