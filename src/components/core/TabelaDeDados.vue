<template>
  <div class="table-container">
    <div v-if="carregando" class="loading-overlay">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem; color: var(--climb-green-500)"></i>
    </div>

    <table class="data-table" :class="{ 'loading-state': carregando }">
      <thead>
        <tr>
          <th v-for="coluna in colunas" :key="coluna.campo">
            {{ coluna.titulo }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in valor" :key="item.id || Math.random()">
          <td v-for="coluna in colunas" :key="coluna.campo + item.id">
            <span
              v-if="coluna.campo === 'status'"
              class="status-pill"
              :data-status="item[coluna.campo]?.toLowerCase()"
            >
              {{ item[coluna.campo] }}
            </span>
            <span v-else>
              {{ item[coluna.campo] }}
            </span>
          </td>
        </tr>
        <tr v-if="valor && valor.length === 0 && !carregando">
          <td :colspan="colunas.length" class="no-data">Nenhum dado encontrado.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  interface Coluna {
    campo: string
    titulo: string
  }
  interface ItemTabela {
    [key: string]: any
  }
  defineProps<{
    valor: ItemTabela[]
    carregando?: boolean
    colunas: Coluna[]
  }>()
</script>

<style scoped>
  .table-container {
    position: relative;
    width: 100%;
    overflow-x: auto;
    background-color: transparent;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    font-weight: 500;
    color: #123b2d;
  }

  .data-table thead th {
    text-align: left;
    padding: 1rem 0;
    color: #7a8d82;
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #e5e7eb;
    white-space: nowrap;
  }

  .data-table tbody td {
    text-align: left;
    padding: 1.25rem 0;
    vertical-align: middle;
    border-bottom: 1px solid #f3f4f6;
    color: #374151;
  }

  .data-table tbody tr:last-child td {
    border-bottom: none;
  }

  .status-pill {
    display: inline-block;
    padding: 0.35rem 1rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 700;
    text-align: center;
    background-color: #e5e7eb;
    color: #374151;
  }

  .status-pill[data-status='pendente'] {
    background-color: #ccfbf1;
    color: #115e59;
  }

  .status-pill[data-status='ativo'],
  .status-pill[data-status='concluído'] {
    background-color: #d1fae5;
    color: #065f46;
  }

  .status-pill[data-status='vencendo'],
  .status-pill[data-status='cancelado'] {
    background-color: #fee2e2;
    color: #991b1b;
  }

  .no-data {
    text-align: center;
    padding: 3rem 1rem;
    color: #9ca3af;
    font-style: italic;
  }

  .loading-overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  .loading-state {
    opacity: 0.5;
    pointer-events: none;
  }
</style>
