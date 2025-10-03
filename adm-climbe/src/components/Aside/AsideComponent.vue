<template>
  <aside class="sidebar" v-if="!route.meta.noSidebar">
    <div class="sidebar-header">
      <img src="/img/climbe-logo.png" alt="logo Climbe" class="logo" />
    </div>

    <div class="profile">
      <div class="profile-avatar">
        <div class="avatar-placeholder">
          {{ getInitials(userName) }}
        </div>
      </div>
      <div class="profile-info">
        <p class="profile-name">{{ userName || 'Usuário' }}</p>
        <p class="profile-email">{{ userEmail || 'email@exemplo.com' }}</p>
      </div>
    </div>

    <nav class="menu-nav">
      <div class="menu-section">
        <h3 class="menu-title">Menu Principal</h3>
        <div class="menu-items">
          <MenuButton text="Usuários" link="/users" />
        </div>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="version-info">
        <span class="version-text">v1.0.0</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { jwtDecode } from 'jwt-decode'
import MenuButton from './components/MenuButton.vue'

const route = useRoute()
const userName = ref('')
const userEmail = ref('')

const getInitials = (name) => {
  if (!name) return 'U'
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    const payload = jwtDecode(token)
    userName.value = payload.name || ''
    userEmail.value = payload.email || ''
  } catch (err) {
    console.error('Erro ao decodificar token:', err)
  }
})
</script>

<style scoped>
.sidebar {
  grid-area: sidebar;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
}

.sidebar-header {
  padding: 2rem 1.5rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
}

.logo {
  width: 100%;
  max-width: 10rem;
  height: auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.profile {
  padding: 2rem 1.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
}

.profile-avatar {
  margin-bottom: 1rem;
}

.avatar-placeholder {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  margin: 0 auto;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.avatar-placeholder:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
}

.profile-info {
  margin-top: 1rem;
}

.profile-name {
  color: #f8fafc;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.profile-email {
  color: #94a3b8;
  font-size: 0.85rem;
  margin: 0;
  opacity: 0.8;
  word-break: break-all;
}

.menu-nav {
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
}

.menu-section {
  padding: 0 1.5rem;
}

.menu-title {
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 1rem 0;
  padding: 0 0.5rem;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
}

.version-info {
  text-align: center;
}

.version-text {
  color: #64748b;
  font-size: 0.75rem;
  opacity: 0.6;
}

.menu-nav::-webkit-scrollbar {
  width: 4px;
}

.menu-nav::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.menu-nav::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 2px;
}

.menu-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}

@media (max-width: 768px) {
  .sidebar {
    min-width: 280px;
  }
  
  .sidebar-header,
  .profile,
  .menu-section,
  .sidebar-footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .logo {
    max-width: 8rem;
  }
}
</style>