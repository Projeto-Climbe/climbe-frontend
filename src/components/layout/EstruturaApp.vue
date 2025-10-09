<template>
  <div class="estrutura">
    <aside class="lateral"><BarraLateral /></aside>
    <main class="conteudo"><slot /></main>
  </div>
</template>

<script setup lang="ts">
  import BarraLateral from '../layout/Sidebar.vue'
</script>

<style scoped>
  .estrutura {
    display: grid;
    grid-template-columns: 260px 1fr;
    min-height: 100dvh;
  }
  .lateral {
    background: #f0f6f3;
    padding: 1rem;
    border-right: 1px solid #e6f0ec;
  }
  .conteudo {
    padding: 1.25rem 1.25rem 2rem;
  }

  @media (max-width: 1200px) {
    .estrutura {
      grid-template-columns: 80px 1fr;
    }
  }
</style>
