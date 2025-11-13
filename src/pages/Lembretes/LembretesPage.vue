<template>
  <div class="lembretes-page-container">
    
    <div class="page-header">
      <h1 class="page-title">Lembretes</h1>
      <Button 
        label="Criar Lembrete" 
        icon="pi pi-plus" 
        class="btn-primaria" 
        @click="abrirModalLembrete"
      />
    </div>

    <div class="card-soft mt-4">
      <ul class="lista-lembretes">
        
        <li 
          v-for="lembrete in lembretesMock" 
          :key="lembrete.id" 
          class="item-lembrete"
        >
          <div class="info-lembrete">
            <Checkbox 
              v-model="lembrete.concluido" 
              :binary="true" 
              :inputId="'check-' + lembrete.id"
            />
            
            <label :for="'check-' + lembrete.id" :class="{ 'concluido': lembrete.concluido }">
              <span class="titulo">{{ lembrete.titulo }}</span>
              <span class="data-limite">Vence em: {{ lembrete.dataLimite }}</span>
            </label>
          </div>

          <div class="status-lembrete">
            <Tag 
              :value="lembrete.concluido ? 'Concluído' : 'Pendente'" 
              :severity="lembrete.concluido ? 'success' : 'warning'" 
            />
          </div>
        </li>

        <li v-if="lembretesMock.length === 0" class="item-vazio">
          Nenhum lembrete encontrado.
        </li>

      </ul>
    </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button' 
import Checkbox from 'primevue/checkbox' // Importante: Usaremos Checkbox
import Tag from 'primevue/tag'             // Importante: Usaremos Tag

// Interface para o nosso lembrete
interface Lembrete {
  id: string;
  titulo: string;
  dataLimite: string;
  concluido: boolean;
}

// --- Dados Mockados ---
const lembretesMock = ref<Lembrete[]>([
  { id: '1', titulo: 'Ligar para Tech Solutions (Contrato)', dataLimite: '15/11/2025', concluido: false },
  { id: '2', titulo: 'Enviar proposta para Coffee House', dataLimite: '16/11/2025', concluido: false },
  { id: '3', titulo: 'Revisar documento de requisitos', dataLimite: '14/11/2025', concluido: true },
  { id: '4', titulo: 'Agendar reunião com Alpha Logistics', dataLimite: '17/11/2025', concluido: false },
])

// Função para abrir o modal (ainda não criado)
function abrirModalLembrete() {
  alert('Abrir o modal para criar um novo lembrete...')
  // Aqui você definiria uma v-model para o modal, ex: modais.value.lembrete = true
}

</script>

<style scoped>
/* Estilos da Página (consistentes com as outras) */
.lembretes-page-container {
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

/* Estilos Específicos da Lista de Lembretes */
.lista-lembretes {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.item-lembrete {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid #eff3f8; /* Linha separadora suave */
}

.item-lembrete:last-child {
  border-bottom: none;
}

.info-lembrete {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-lembrete label {
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.info-lembrete .titulo {
  font-weight: 500;
  color: #333;
}

.info-lembrete .data-limite {
  font-size: 0.85rem;
  color: #6c757d;
}

.info-lembrete label.concluido .titulo {
  text-decoration: line-through;
  color: #999;
}
.info-lembrete label.concluido .data-limite {
  color: #aaa;
}

.item-vazio {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-style: italic;
}
</style>