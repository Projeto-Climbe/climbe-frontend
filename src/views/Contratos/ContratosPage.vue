<script setup lang="ts">
  import { ref } from 'vue'

  import CabecalhoSecao from '../../components/core/SectionHeader.vue'
  import TabelaDeDados from '../../components/core/TabelaDeDados.vue'

  const carregando = ref({ pessoas: false, empresas: false })
  const pessoas = ref([{ nome: 'Jubileu do creio', email: 'omg...@gmail.com', status: 'Pendente' }])
  const empresas = ref([
    {
      nomeFantasia: 'Tech Solutions',
      email: 'contato@tech...',
      cnpj: '12.345.678/0001-99',
      telefone: '(11) 98765-4321',
    },
  ])

  // lista de contratos pedentes e relatórios usados no cabeçalho (evita erro de referência no template)
  const relatorios = ref<Array<Record<string, any>>>([])
  const pendentes = ref<Array<Record<string, any>>>(pessoas.value)

  // ação vinculada ao botão "Adicionar novo relatório"
  function adicionarRelatorio() {
    relatorios.value.push({
      titulo: `Relatório ${relatorios.value.length + 1}`,
      criadoEm: new Date().toISOString(),
    })
  }

  type Coluna = {
    campo?: string
    titulo?: string
    tipo?: 'status' | 'pendentesAcoes'
    alinhar?: 'left' | 'right' | 'center'
  }

  const colunasPessoas: Coluna[] = [
    { campo: 'nome', titulo: 'Nome' },
    { campo: 'email', titulo: 'Email' },
    { campo: 'status', titulo: 'Status', tipo: 'status' },
  ]
  const colunasEmpresas: Coluna[] = [
    { campo: 'nomeFantasia', titulo: 'Nome fantasia' },
    { campo: 'email', titulo: 'Email' },
    { campo: 'cnpj', titulo: 'Cnpj' },
    { campo: 'telefone', titulo: 'Telefone' },
  ]
</script>

<template>
  <div class="ct-shell">
    <!-- CARD: Contratos -->
    <section class="cl-card ct-card">
      <div class="ct-header">
        <CabecalhoSecao titulo="Contratos" subtitulo="Pendentes de autorização" />
        <div class="ct-total">Total <strong>{{ pendentes.length }}</strong></div>
      </div>

      <div class="ct-table">
        <TabelaDeDados
          variante="contratos"
          :valor="pendentes"
          :carregando="carregando.pessoas"
          :colunas="colunasPessoas"
          :paginador="false"
          :linhas="10"
        />
      </div>
    </section>

    <!-- CARD: Relatórios -->
    <section class="cl-card ct-card">
      <div class="ct-header">
        <CabecalhoSecao titulo="Relatórios" />
        <div class="ct-actions">
          <span class="ct-total">Total <strong>{{ relatorios.length }}</strong></span>
          <Button
            label="Adicionar novo relatório"
            class="btn-add"
            @click="adicionarRelatorio"
          />
        </div>
      </div>

      <div class="ct-table">
        <TabelaDeDados
          variante="contratos"
          compact
          :valor="relatorios"
          :carregando="carregando.empresas"
          :colunas="colunasEmpresas"
          :paginador="false"
          :linhas="10"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* container central */
.ct-shell{
  max-width:1200px;
  margin:0 auto;
  padding:16px 20px;
  display:flex;
  flex-direction:column;
  gap:26px;
}

/* card base (já herda cl-card do tema) */
.ct-card{
  border-radius:24px;
  padding:18px 20px;
  box-shadow: 0 12px 36px rgba(24,39,33,.10);
}

/* faixa do topo dentro do card (idêntica ao Figma) */
.ct-header{
  background:#f3f9f6;
  border-radius:14px;
  padding:12px 16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-bottom:14px;
}
.ct-total{ color:#9aa8a3; font-weight:600; }
.ct-actions{ display:flex; align-items:center; gap:12px }

/* botão */
.btn-add{
  background:#b7f6e4;
  color:#0f6e5b;
  border:none;
  border-radius:999px;
  padding:10px 16px;
  font-weight:700;
  box-shadow:0 18px 30px rgba(31,138,116,.18);
  transition:transform .05s ease, filter .15s ease;
}
.btn-add:hover{ filter:brightness(.98) }
.btn-add:active{ transform:translateY(1px) }

/* envelope da tabela com skin “contratos” já aplicada pela prop variante */
.ct-table{
  border-radius:16px;
  overflow:hidden;
  background:#f5f8f6;
}

/* refinamentos do PrimeVue para bater com o mock */
:deep(.ct-table .p-datatable .p-datatable-thead > tr > th){
  background:transparent;
  border:0;
  color:var(--cl-ink-muted);
  font-weight:600;
  font-size:.92rem;
  padding:10px 16px;
}
:deep(.ct-table .p-datatable .p-datatable-tbody > tr > td){
  border:0;
  padding:16px 16px;
  color:var(--cl-ink);
  background:#ffffff40;
}
:deep(.ct-table .p-datatable .p-datatable-tbody > tr + tr > td){
  border-top:1px solid #e5eeea; /* divisor suave */
}
/* status */
:deep(.ct-table .tag-status.is-pendente){
  background:#baf4df; color:#0f5c4e;
  box-shadow:0 10px 24px rgba(31,138,116,.10) inset;
}

/* responsivo */
@media (max-width: 900px){
  .ct-header{ flex-direction:column; align-items:flex-start; }
}
</style>
