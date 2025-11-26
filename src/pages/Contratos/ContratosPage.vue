<template>
  <div class="page-container">
    <div class="section-card mb-card">
      <div class="card-header">
        <div class="header-left">
          <h2 class="card-title">Contratos</h2>
          <span class="card-subtitle">Pendentes de autorização</span>
        </div>
        <span class="badge-total">Total {{ contratosPendentes.length }}</span>
      </div>

      <TabelaDados :valor="contratosPendentes" :colunas="colunasContratos" />
    </div>

    <div class="section-card">
      <div class="card-header">
        <div class="header-left">
          <h2 class="card-title">Relatórios</h2>
        </div>

        <div class="header-actions">
          <span class="badge-total mr-4">Total {{ relatoriosMock.length }}</span>

          <Button
            label="Adicionar novo relatório"
            class="btn-primaria"
            @click="modais.relatorio = true"
          />
        </div>
      </div>

      <TabelaDados :valor="relatoriosMock" :colunas="colunasRelatorios" />
    </div>

    <ModalContrato v-model="modais.contrato" @enviar="salvarNovoContrato" />

    <ModalRelatorio v-model="modais.relatorio" @enviar="salvarNovoRelatorio" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Button from 'primevue/button'
  import TabelaDados from '@/components/core/TabelaDeDados.vue'
  import ModalContrato from '@/components/domain/Contratos/ModalContrato.vue'
  // Importar o novo modal
  import ModalRelatorio from '@/components/domain/Relatorios/ModalRelatorio.vue'

  // Interfaces
  interface ContratoData {
    propostaId: number
    data_inicio: string
    data_fim: string
    status: string
  }

  const modais = ref({
    contrato: false,
    relatorio: false, // Esta flag agora controla o ModalRelatorio
  })

  // --- DADOS MOCKADOS ---
  const contratosPendentes = ref([
    { id: 1, nome: 'Jubileu do creio', email: 'omghihiihihihi@gmail.com', status: 'Pendente' },
    { id: 2, nome: 'Jubileu do creio', email: 'omghihiihihihi@gmail.com', status: 'Pendente' },
    { id: 3, nome: 'Jubileu do creio', email: 'omghihiihihihi@gmail.com', status: 'Pendente' },
  ])

  const colunasContratos = [
    { campo: 'nome', titulo: 'Nome' },
    { campo: 'email', titulo: 'Email' },
    { campo: 'status', titulo: 'Status' },
  ]

  const relatoriosMock = ref([
    {
      id: 1,
      nomeFantasia: 'Tech Solutions',
      email: 'contato@techsolutions.com',
      cnpj: '12.345.678/0001-99',
      telefone: '(11) 98765-4321',
    },
    {
      id: 2,
      nomeFantasia: 'Tech Solutions',
      email: 'contato@techsolutions.com',
      cnpj: '12.345.678/0001-99',
      telefone: '(11) 98765-4321',
    },
    {
      id: 3,
      nomeFantasia: 'Tech Solutions',
      email: 'contato@techsolutions.com',
      cnpj: '12.345.678/0001-99',
      telefone: '(11) 98765-4321',
    },
  ])

  const colunasRelatorios = [
    { campo: 'nomeFantasia', titulo: 'Nome fantasia' },
    { campo: 'email', titulo: 'Email' },
    { campo: 'cnpj', titulo: 'Cnpj' },
    { campo: 'telefone', titulo: 'Telefone' },
  ]

  // --- FUNÇÕES ---
  function salvarNovoContrato(payload: ContratoData) {
    console.log('Salvando contrato:', payload)
    modais.value.contrato = false
  }

  function salvarNovoRelatorio(payload: any) {
    // Adiciona na lista visualmente
    relatoriosMock.value.push({
      id: Math.random(), // ID temporário
      ...payload,
    })
    modais.value.relatorio = false
  }
</script>

<style scoped>
  .page-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .mb-card {
    margin-bottom: 1.5rem;
  }

  .section-card {
    background-color: #ffffff;
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.04);
  }

  /* Headers */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .header-actions {
    display: flex;
    align-items: center;
  }

  /* Tipografia */
  .card-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #123b2d;
    margin: 0;
  }

  .card-subtitle {
    font-size: 0.85rem;
    color: #9ca3af;
    font-weight: 500;
  }

  .badge-total {
    font-size: 0.85rem;
    color: #9ca3af;
    font-weight: 600;
  }

  .mr-4 {
    margin-right: 1rem;
  }
</style>
