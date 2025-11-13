<template>
  <div class="contratos-page-container">
    
    <div class="page-header">
      <h1 class="page-title">Contratos</h1>
      <Button 
        label="Criar Contrato" 
        icon="pi pi-plus" 
        class="btn-primaria" 
        @click="modais.contrato = true" 
      />
    </div>

    <div class="card-soft mt-4">
      <TabelaDados 
        :valor="contratosMock" 
        :carregando="loading" 
        :colunas="colunasContratos" 
      />
    </div>
    
    <ModalContrato
      v-model="modais.contrato"
      @enviar="salvarNovoContrato"
    />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button' 
import TabelaDados from '@/components/core/TabelaDeDados.vue'
import ModalContrato from '@/components/domain/Contratos/ModalContrato.vue' 

interface ContratoData {
  propostaId: number;
  data_inicio: string; 
  data_fim: string;
  status: string;
}

const modais = ref({ contrato: false })
const loading = ref(false)
const contratosMock = ref([
  { id: 1, nomeEmpresa: 'Tech Solutions', data_inicio: '01/01/2025', data_fim: '31/12/2025', status: 'Ativo' },
  { id: 2, nomeEmpresa: 'Fila da Fruta', data_inicio: '11/033/2021', data_fim: '15/08/2025', status: 'Ativo' },
  { id: 3, nomeEmpresa: 'Alpha Concusco', data_inicio: '10/03/2025', data_fim: '10/03/2026', status: 'Pendente' },
])

const colunasContratos = [
  { campo: 'nomeEmpresa', titulo: 'Empresa (da Proposta)' },
  { campo: 'data_inicio', titulo: 'Data de Início' },
  { campo: 'data_fim', titulo: 'Data de Fim' },
  { campo: 'status', titulo: 'Status' },
]

function salvarNovoContrato(payload: ContratoData) {
  console.log('Salvando dados mockados:', payload)
  
  const nomeEmpresaMock = `Empresa da Proposta #${payload.propostaId}`
  
  contratosMock.value.push({
    id: Math.random(),
    nomeEmpresa: nomeEmpresaMock,
    data_inicio: payload.data_inicio,
    data_fim: payload.data_fim,
    status: payload.status,
  })

  modais.value.contrato = false
}

</script>

<style scoped>
.contratos-page-container {
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