<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="app-shell">
    <Sidebar />
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-shell{
  display: grid;
  grid-template-columns: 260px 1fr; /* largura da sidebar */
  min-height: 100vh;
  background: var(--cl-bg);
}
.app-main{
  min-width: 0; /* evita overflow quando grid aperta */
}
</style>
