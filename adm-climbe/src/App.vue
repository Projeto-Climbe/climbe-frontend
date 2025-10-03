<script setup>
import { useRoute } from 'vue-router'
import AsideComponent from './components/Aside/AsideComponent.vue';

const route = useRoute()
</script>

<template>
  <div id="app" :class="{ 'no-sidebar': route.meta.noSidebar }">
    <aside-component v-if="!route.meta.noSidebar" />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
#app {
  display: grid;
  grid-template-areas: "sidebar main";
  grid-template-columns: 250px 1fr; 
  height: 100vh;
  overflow: hidden;
}

#app.no-sidebar {
  grid-template-areas: "main";
  grid-template-columns: 1fr;
}

aside-component {
  grid-area: sidebar;
}

.main-content {
  grid-area: main;
  overflow-y: auto;
  background: #f8f9fa;
}
</style>
