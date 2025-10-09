<template>
  <div>
    <div class="cab">
      <h3 class="titulo">Agenda</h3>
      <small class="info">{{ cabecalhoDireita }}</small>
    </div>

    <div class="card-soft bloco">
      <div class="data">{{ rotuloData }}</div>
      <ul class="lista">
        <li v-for="(it, i) in itens" :key="i" class="linha">
          <div>
            <div class="nome">{{ it.titulo }}</div>
            <a v-if="it.link" :href="it.link" target="_blank" rel="noopener" class="link"
              >meet.google.com</a
            >
          </div>
          <div class="hora">
            <span>{{ it.inicio }}</span
            ><span class="sep">–</span><span class="fim">{{ it.fim }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    rotuloData: string
    cabecalhoDireita?: string
    itens: Array<{ titulo: string; link?: string; inicio: string; fim: string }>
  }>()
</script>

<style scoped>
  .cab {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5rem;
  }
  .titulo {
    color: var(--teal-800);
    margin: 0;
  }
  .info {
    color: var(--muted-400);
  }
  .bloco {
    padding: 1rem;
  }
  .data {
    color: var(--teal-800);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .lista {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .linha {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff40;
    padding: 0.6rem 0.75rem;
    border-radius: 16px;
  }
  .nome {
    color: var(--ink-900);
    font-weight: 600;
  }
  .link {
    font-size: 0.8rem;
    color: #9ca3af;
    text-decoration: none;
  }
  .hora {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    color: var(--ink-900);
    font-weight: 600;
  }
  .sep {
    opacity: 0.6;
  }
  .fim {
    color: #9ca3af;
  }
</style>
