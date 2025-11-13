<template>
  <div>
    <div class="page-header">
      <h1>Minhas Reuniões</h1>
      <Button label="Agendar Reunião" icon="pi pi-plus" class="btn-primaria" />
    </div>

    <div class="card-soft mt-4">
      <TabelaDados
        :valor="reunioesMock"
        :carregando="carregando"
        :colunas="colunas"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import TabelaDados from '@/components/core/TabelaDeDados.vue' 

const carregando = ref(false)

const reunioesMock = ref([
  { id: 1, assunto: 'Reunião de Alinhamento Semanal', data: '14/11/2025 10:00', participantes: 'Ana, Bruno, Carla' },
  { id: 2, assunto: 'Demonstração Cliente X', data: '15/11/2025 14:30', participantes: 'Equipe de Vendas, Cliente X' },
  { id: 3, assunto: 'Review Sprint 15', data: '18/11/2025 16:00', participantes: 'Equipe Dev, PO' },
])

const colunas = ref([
  { campo: 'assunto', titulo: 'Assunto' },
  { campo: 'data', titulo: 'Data e Hora' },
  { campo: 'participantes', titulo: 'Participantes' },
])

</script>

<style scoped>
.reunioes-page-container {
  padding: 2rem; 
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 1.8rem; 
  color: #333; 
  font-weight: 600; 
}

.btn-primaria {
  background-color: #34d399; 
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-primaria:hover {
  background-color: #2ebc83; 
}

.mt-4 {
  margin-top: 1rem;
}

.card-soft {
  padding: 1.5rem;
  background-color: #ffffff; 
  border-radius: 8px; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); 
}
</style>