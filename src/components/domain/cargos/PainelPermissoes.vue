<template>
  <div class="card-soft bloco">
    <div class="cab">
      <h3 class="titulo">Permissões</h3>
      <Button
        label="Adicionar nova permissão"
        class="btn-primaria rounded-2xl"
        @click="$emit('adicionar')"
      />
    </div>

    <ul class="lista">
      <li v-for="f in funcoes" :key="f.id" class="item">
        <div>
          <div class="nome">{{ f.nome }}</div>
          <small class="desc">{{ f.permissoes.join(', ') }}</small>
        </div>
        <Button icon="pi pi-pencil" text rounded />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import Button from 'primevue/button'
  defineProps<{ funcoes?: Array<{ id: string; nome: string; permissoes: string[] }> }>()
  defineEmits(['adicionar'])
</script>

<style scoped>
  .bloco {
    padding: 1rem;
  }
  .cab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .titulo {
    color: var(--teal-800);
    margin: 0;
    font-weight: 600;
  }
  .lista {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e6f0ec;
  }
  .item:last-child {
    border-bottom: 0;
  }
  .nome {
    font-weight: 600;
  }
  .desc {
    color: var(--muted-400);
  }
</style>
