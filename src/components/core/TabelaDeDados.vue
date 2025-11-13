<template>
  <div class="table-container">
    <div v-if="carregando" class="loading-overlay">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem;"></i> Carregando...
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
        <tr v-for="item in valor" :key="item.id || Math.random()"> <td v-for="coluna in colunas" :key="coluna.campo + item.id">
            {{ item[coluna.campo] }}
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
// Definição de props mais robusta
interface Coluna {
  campo: string;
  titulo: string;
}

interface ItemTabela {
  [key: string]: any; // Permite que os itens tenham qualquer propriedade
}

const props = defineProps<{ 
  valor: ItemTabela[]; 
  carregando?: boolean; 
  colunas: Coluna[]; 
}>()
</script>

<style scoped>
.table-container {
  position: relative; /* Para posicionar o overlay de carregamento */
  overflow-x: auto; /* Garante que a tabela seja responsiva em telas pequenas */
  border-radius: 8px; /* Adiciona bordas arredondadas ao container da tabela */
  background-color: #ffffff; /* Fundo branco para a área da tabela */
}

.data-table {
  width: 100%;
  border-collapse: separate; /* Permite border-spacing */
  border-spacing: 0; /* Remove espaço padrão */
  font-size: 0.95rem;
  color: #495057;
  /* border: 1px solid #e0e6ed; */ /* Removi a borda externa para um visual mais limpo */
}

.data-table th, .data-table td {
  padding: 1rem 1.25rem; /* Mais padding para um visual mais espaçoso */
  text-align: left;
  border-bottom: 1px solid #eff3f8; /* Bordas mais suaves entre as linhas */
}

.data-table thead th {
  background-color: #f8f9fa; /* Fundo levemente cinza para o cabeçalho */
  font-weight: 600;
  color: #344767; /* Cor mais escura para o texto do cabeçalho */
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
}

/* Bordas arredondadas para o cabeçalho */
.data-table thead tr th:first-child {
  border-top-left-radius: 8px;
}
.data-table thead tr th:last-child {
  border-top-right-radius: 8px;
}

.data-table tbody tr:hover {
  background-color: #f2f7fb; /* Cor de fundo no hover para as linhas */
}

/* Estilo para a última linha (opcional) */
.data-table tbody tr:last-child td {
  border-bottom: none; 
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-style: italic;
}

/* Estado de carregamento */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7); /* Fundo semi-transparente */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #344767;
  z-index: 10;
  border-radius: 8px;
}

.loading-state {
  opacity: 0.7; /* Diminui a opacidade da tabela quando carregando */
  pointer-events: none; /* Impede interações enquanto carrega */
}

/* Estilo básico do ícone de spinner do PrimeVue, se estiver usando */
.pi-spin {
    animation: pi-spin 2s infinite linear;
}

@keyframes pi-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>