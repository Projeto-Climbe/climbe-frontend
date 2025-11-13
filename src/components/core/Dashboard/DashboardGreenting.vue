<template>
  <header class="greeting">
    <h1 class="greeting__title">
      Olá, {{ userName }}!
      <span class="greeting__icon" aria-hidden="true">🤝</span>
    </h1>
    <p class="greeting__subtitle">Aqui está o resumo de hoje.</p>
  </header>
</template>

<script setup lang="ts">
  const props = defineProps<{
    userName: string
  }>()
</script>

<style scoped>
  .greeting {
    margin-bottom: 28px;
  }

  .greeting__title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 28px;
    font-weight: 700;
    color: var(--climb-green-900);
    margin: 0;
  }

  .greeting__icon {
    font-size: 24px;
  }

  .greeting__subtitle {
    margin: 6px 0 0;
    font-size: 14px;
    color: var(--climb-muted);
  }
</style>
