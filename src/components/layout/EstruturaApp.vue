<template>
  <div class="dashboard-shell">
    <ClimbSidebar
      class="dashboard-shell__sidebar"
      active-item="overview"
    />

    <main class="dashboard-shell__main">
      <div class="dashboard-shell__content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ClimbSidebar from "@/components/layout/Sidebar.vue";
</script>

<style scoped>
.dashboard-shell {
  display: flex;
  min-height: 100vh;
  background-color: var(--climb-bg);
}

/* Sidebar fixa à esquerda */
.dashboard-shell__sidebar {
  flex: 0 0 240px;
}

/* Conteúdo principal */
.dashboard-shell__main {
  flex: 1;
  padding: 32px 48px;
}

/* Wrapper para alinhar com o Figma (espaço entre sidebar e cards) */
.dashboard-shell__content {
  max-width: 1120px;
  margin: 0 auto;
}
</style>
