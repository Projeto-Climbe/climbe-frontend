<template>
  <div class="page-container">
    <div class="grid-layout">
      <div class="col-main">
        <div class="section-card mb-card">
          <div class="card-header">
            <div class="header-left">
              <h2 class="card-title">Pessoas</h2>
              <span class="card-subtitle">Pendentes de autorização</span>
            </div>
            <span class="badge-total">Total {{ pessoasMock.length }}</span>
          </div>

          <TabelaDados :valor="pessoasMock" :colunas="colunasPessoas" />
        </div>

        <div class="section-card">
          <div class="card-header">
            <div class="header-left">
              <h2 class="card-title">Empresas</h2>
            </div>

            <div class="header-actions">
              <span class="badge-total mr-4">Total {{ companiesMock.length }}</span>
              <Button
                label="Adicionar nova empresa"
                class="btn-primaria"
                @click="modais.empresa = true"
              />
            </div>
          </div>

          <TabelaDados :valor="companiesMock" :carregando="loading" :colunas="colunasEmpresas" />
        </div>
      </div>

      <div class="col-sidebar">
        <div class="section-card sticky-card">
          <div class="card-header-simples">
            <h2 class="card-title">Permissões</h2>
          </div>

          <div class="permissoes-body">
            <Button
              label="Adicionar nova permissão"
              class="btn-primaria full-width mb-6"
              @click="modais.cargo = true"
            />

            <div class="lista-permissoes">
              <div class="permissao-item-header">
                <span class="permissao-label">Nome</span>
              </div>

              <div v-for="(perm, index) in permissoesMock" :key="index" class="permissao-row">
                <span class="permissao-texto">{{ perm.nome }}</span>
                <div class="linha-separator"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalEmpresa v-model="modais.empresa" @enviar="salvarNovaEmpresa" />

    <ModalCargo v-model="modais.cargo" @save="salvarNovoCargo" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Button from 'primevue/button'
  import TabelaDados from '@/components/core/TabelaDeDados.vue'
  import ModalEmpresa from '@/components/core/EmpresasComponents/ModalEmpresa.vue'
  import ModalCargo from '@/components/core/EmpresasComponents/ModalCargo.vue'

  // --- ESTADOS ---
  const modais = ref({
    empresa: false,
    cargo: false,
  })
  const loading = ref(false)

  // --- DADOS MOCKADOS ---

  // 1. Pessoas
  const pessoasMock = ref([
    { id: 1, nome: 'Jubileu do creio', email: 'omghihiihihihi@gmail.com', status: 'Pendente' },
    { id: 2, nome: 'Jubileu do creio', email: 'omghihiihihihi@gmail.com', status: 'Pendente' },
    { id: 3, nome: 'Jubileu do creio', email: 'omghihiihihihi@gmail.com', status: 'Pendente' },
  ])

  const colunasPessoas = [
    { campo: 'nome', titulo: 'Nome' },
    { campo: 'email', titulo: 'Email' },
    { campo: 'status', titulo: 'Status' },
  ]

  // 2. Empresas
  const companiesMock = ref([
    {
      id: '1',
      nomeFantasia: 'Tech Solutions',
      email: 'contato@tech.com',
      cnpj: '12.345.678/0001-99',
      telefone: '(11) 98765-4321',
    },
    {
      id: '2',
      nomeFantasia: 'Tech Solutions',
      email: 'contato@tech.com',
      cnpj: '12.345.678/0001-99',
      telefone: '(11) 98765-4321',
    },
    {
      id: '3',
      nomeFantasia: 'Tech Solutions',
      email: 'contato@tech.com',
      cnpj: '12.345.678/0001-99',
      telefone: '(11) 98765-4321',
    },
    {
      id: '4',
      nomeFantasia: 'Tech Solutions',
      email: 'contato@tech.com',
      cnpj: '12.345.678/0001-99',
      telefone: '(11) 98765-4321',
    },
  ])

  const colunasEmpresas = [
    { campo: 'nomeFantasia', titulo: 'Nome fantasia' },
    { campo: 'email', titulo: 'Email' },
    { campo: 'cnpj', titulo: 'Cnpj' },
    { campo: 'telefone', titulo: 'Telefone' },
  ]

  // 3. Permissões
  const permissoesMock = ref([
    { nome: 'Pode criar usuários' },
    { nome: 'Pode criar usuários' },
    { nome: 'Pode criar usuários' },
  ])

  // --- FUNÇÕES ---

  function salvarNovaEmpresa(payload: any) {
    companiesMock.value.push({ id: String(Math.random()), ...payload })
    modais.value.empresa = false
  }

  function salvarNovoCargo(payload: any) {
    console.log('Novo cargo:', payload)
    modais.value.cargo = false
  }
</script>

<style scoped>
  .page-container {
    width: 100%;
  }

  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 1.5rem;
    align-items: start;
  }

  .col-main {
    display: flex;
    flex-direction: column;
  }

  .col-sidebar {
    display: flex;
    flex-direction: column;
  }

  /* Cards */
  .section-card {
    background-color: #ffffff;
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.04);
  }

  .mb-card {
    margin-bottom: 1.5rem;
  }

  /* Headers */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
  }

  .card-header-simples {
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

  .card-title {
    font-size: 1.25rem;
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

  .full-width {
    width: 100%;
  }

  .mb-6 {
    margin-bottom: 1.5rem;
  }

  .lista-permissoes {
    display: flex;
    flex-direction: column;
  }

  .permissao-item-header {
    margin-bottom: 1rem;
  }

  .permissao-label {
    font-size: 0.8rem;
    color: #9ca3af;
    font-weight: 600;
  }

  .permissao-row {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .permissao-texto {
    color: #374151;
    font-size: 0.95rem;
  }

  .linha-separator {
    height: 4px;
    width: 40px;
    background-color: #f3f4f6;
    border-radius: 99px;
  }

  @media (max-width: 1100px) {
    .grid-layout {
      grid-template-columns: 1fr;
    }
  }
</style>
