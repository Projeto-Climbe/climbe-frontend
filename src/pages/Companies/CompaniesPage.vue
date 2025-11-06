<template>
  <div class="pagina-dashboard-layout">
    <div v-if="loading" class="page-loading">
      Carregando dados do dashboard...
    </div>

    <div v-else> <section class="card-soft dashboard-section">
        <CabecalhoSecao titulo="Pessoas" subtitulo="Pendentes de autorização">
          <template #acoes>
            <Button label="Adicionar usuário" class="btn-primaria" @click="modais.usuario = true" />
          </template>
        </CabecalhoSecao>
        <TabelaDados
          :valor="pessoas"
          :carregando="carregando.pessoas"
          :colunas="colunasPessoas"
          @aprovar="aprovar"
          @rejeitar="rejeitar"
        />
      </section>

      <section class="card-soft dashboard-section mt-4">
        <div class="section-header-row">
          <CabecalhoSecao :titulo="'Empresas'" :subtitulo="`Total ${empresas.length}`" />
          <Button label="Adicionar nova empresa" class="btn-primaria" @click="modais.empresa = true" />
        </div>
        <TabelaDados :valor="empresas" :carregando="carregando.empresas" :colunas="colunasEmpresas" />
      </section>

      <section class="card-soft dashboard-section mt-4">
        <PainelPermissoes :funcoes="funcoes" @adicionar="modais.cargo = true" />
      </section>

      <ModalEmpresa v-model="modais.empresa" @enviar="criarEmpresa" />
      <ModalUsuario v-model="modais.usuario" @enviar="criarUsuario" @voltar="modais.usuario = false" />
      <ModalCargo v-model="modais.cargo" @enviar="criarCargo" @voltar="modais.cargo = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import https from '@/services/https';
import Button from 'primevue/button'; 

import CabecalhoSecao from '../../components/core/SectionHeader.vue';
import TabelaDados from '../../components/core/TabelaDeDados.vue';
import PainelPermissoes from '../../components/domain/cargos/PainelPermissoes.vue';
import ModalEmpresa from '../../components/domain/empresas/ModalEmpresas.vue';
import ModalUsuario from '../../components/domain/usuarios/ModalUsuario.vue';
import ModalCargo from '../../components/domain/cargos/ModalCargos.vue';

interface Contrato { status: string; }
interface Reuniao { status: string; }
interface Documento { status: string; }
interface Proposta { status: string; }

const estatisticas = ref({
  contratos: { ativos: 0, vencendo: 0 },
  reunioes: { hoje: 0, semana: 0 },
  documentos: { pendentes: 0, total: 0 },
  propostas: { pendentes: 0, aprovadas: 0 }
});

const itemsAgenda = ref([]); 
const nomeUsuario = ref('Usuário');
const loading = ref(true); 

async function buscarDadosDashboard() {
  loading.value = true;
  console.log("Iniciando busca de dados do dashboard...");

  try {
    const [
      responseContratos,
      responseReunioes,
      responseDocumentos,
      responsePropostas
    ] = await Promise.all([
      https.get('/api/contract'),
      https.get('/api/reuniao'),
      https.get('/api/document'),
      https.get('/api/proposta')
    ]);

    console.log("Dados recebidos:", {
      contratos: responseContratos.data,
      reunioes: responseReunioes.data,
      documentos: responseDocumentos.data,
      propostas: responsePropostas.data,
    });

    const todosContratos: Contrato[] = responseContratos.data;
    estatisticas.value.contratos.ativos = todosContratos.filter(c => c.status === 'ativo').length;
    estatisticas.value.contratos.vencendo = todosContratos.filter(c => c.status === 'vencendo').length;

    const todasReunioes: Reuniao[] = responseReunioes.data;
    estatisticas.value.reunioes.hoje = todasReunioes.filter(r => r.status === 'hoje').length;
    estatisticas.value.reunioes.semana = todasReunioes.filter(r => r.status === 'semana').length;

    const todosDocumentos: Documento[] = responseDocumentos.data;
    estatisticas.value.documentos.pendentes = todosDocumentos.filter(d => d.status === 'pendente').length;
    estatisticas.value.documentos.total = todosDocumentos.length;

    const todasPropostas: Proposta[] = responsePropostas.data;
    estatisticas.value.propostas.pendentes = todasPropostas.filter(p => p.status === 'pendente').length;
    estatisticas.value.propostas.aprovadas = todasPropostas.filter(p => p.status === 'aprovada').length;

  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  buscarDadosDashboard();
});

const carregando = ref({ pessoas: false, empresas: false }); 
const modais = ref({ empresa: false, usuario: false, cargo: false }); 

const pessoas = ref([{ nome: 'Jubileu do creio', email: 'omg...@gmail.com', status: 'Pendente' }]);
const empresas = ref([
  {
    nomeFantasia: 'Tech Solutions',
    email: 'contato@tech...',
    cnpj: '12.345.678/0001-99',
    telefone: '(11) 98765-4321',
  },
]);
const funcoes = ref([
  { id: '1', nome: 'Analista', permissoes: ['Criar proposta', 'Validar documento'] },
]);

const colunasPessoas = [
  { campo: 'nome', titulo: 'Nome' },
  { campo: 'email', titulo: 'Email' },
  { campo: 'status', titulo: 'Status', tipo: 'status' },
  { titulo: '', tipo: 'pendentesAcoes' },
];
const colunasEmpresas = [
  { campo: 'nomeFantasia', titulo: 'Nome fantasia' },
  { campo: 'email', titulo: 'Email' },
  { campo: 'cnpj', titulo: 'Cnpj' },
  { campo: 'telefone', titulo: 'Telefone' },
];

function aprovar(_row: any) { console.log("Aprovar:", _row); }
function rejeitar(_row: any) { console.log("Rejeitar:", _row); }
function criarEmpresa(_payload: any) {
  modais.value.empresa = false;
  console.log("Empresa criada:", _payload);
}
function criarUsuario(_payload: any) {
  modais.value.usuario = false;
  console.log("Usuário criado:", _payload);
}
function criarCargo(_payload: any) {
  modais.value.cargo = false;
  console.log("Cargo criado:", _payload);
}
</script>
