<template>
  <div class="linha">
    <div>
      <h3 class="titulo">{{ titulo }}</h3>
      <small v-if="subtitulo" class="sub">{{ subtitulo }}</small>
    </div>
    <div><slot name="acoes" /></div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ titulo: string; subtitulo?: string }>()
</script>

<style scoped>
  .linha {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .titulo {
    color: var(--teal-800);
    margin: 0;
    font-weight: 600;
  }
  .sub {
    color: var(--text-500);
  }
</style>
