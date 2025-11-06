<template>
  <div class="campo">
    <label class="rotulo">{{ rotulo }}</label>
    <slot />
    <small v-if="mensagemErro" class="erro">{{ mensagemErro }}</small>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ rotulo: string; mensagemErro?: string }>()
</script>

<style scoped>
  .campo {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .rotulo {
    color: var(--ink-900);
    font-weight: 600;
  }
  .erro {
    color: #b91c1c;
  }
</style>
