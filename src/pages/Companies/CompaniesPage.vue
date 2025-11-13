<template>
  <div class="empresas-page-container">
    
    <div class="page-header">
      <h1 class="page-title">Empresas</h1>
      <Button 
        label="Adicionar nova empresa" 
        icon="pi pi-plus" 
        class="btn-primaria" 
        @click="modais.empresa = true" 
      />
    </div>

    <div class="card-soft mt-4">
      <TabelaDados 
        :valor="companiesMock" 
        :carregando="loading" 
        :colunas="colunasEmpresas" 
      />
    </div>
    
    <ModalEmpresa
      v-model="modais.empresa"
      @enviar="salvarNovaEmpresa"
    />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button' 
import TabelaDados from '@/components/core/TabelaDeDados.vue'
interface CompanyData {
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  email: string;
  telefone: string;
}

const modais = ref({ empresa: false })
const loading = ref(false)

const companiesMock = ref([
  { id: '1', nomeFantasia: 'Tech Solutions', email: 'contato@tech.com', cnpj: '11.222.333/0001-44', telefone: '(11) 99999-1111' },
  { id: '2', nomeFantasia: 'FILA DA FRUTA', email: 'abu@ABUABU.com', cnpj: '44.555.666/0001-77', telefone: '(22) 98888-2222' },
  { id: '3', nomeFantasia: 'Alpha concursoco', email: 'Evandro@guedes.com', cnpj: '15.794.426/0001-31', telefone: '(45) 99122-3187,' },
])

const colunasEmpresas = [
  { campo: 'nomeFantasia', titulo: 'Nome fantasia' },
  { campo: 'email', titulo: 'Email' },
  { campo: 'cnpj', titulo: 'CNPJ' },
  { campo: 'telefone', titulo: 'Telefone' },
]

function salvarNovaEmpresa(payload: CompanyData) {
  console.log('Salvando dados mockados:', payload)
  
  companiesMock.value.push({
    id: String(Math.random()),
    ...payload
  })

  modais.value.empresa = false
}

</script>

<style scoped>
.empresas-page-container {
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