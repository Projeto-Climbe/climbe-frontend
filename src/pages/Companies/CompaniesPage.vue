<template>
<div class="pagina-dashboard-layout">
    <div v-if="loading" class="page-loading">
Carregando dados do dashboard...
</div>

<div v-else>
      <section class="card-soft dashboard-section">
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

        <div v-if="erroEmpresas" style="color: red; margin: 10px 0; padding: 10px; border: 1px solid red; border-radius: 4px;">
          <strong>Erro ao carregar empresas:</strong> {{ erroEmpresas }}
        </div>

        <TabelaDados 
          :valor="empresas" 
          :carregando="carregandoEmpresas" 
          :colunas="colunasEmpresas" 
        />
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

// Seus imports de componentes
import CabecalhoSecao from '../../components/core/SectionHeader.vue';
import TabelaDados from '../../components/core/TabelaDeDados.vue';
import PainelPermissoes from '../../components/domain/cargos/PainelPermissoes.vue';
import ModalEmpresa from '../../components/domain/empresas/ModalEmpresas.vue';
import ModalUsuario from '../../components/domain/usuarios/ModalUsuario.vue';
import ModalCargo from '../../components/domain/cargos/ModalCargos.vue';

import { useCompanies } from '../../composables/useCompanies';

// Suas interfaces
interface Contrato { status: string; }
interface Reuniao { status: string; }
interface Documento { status: string; }
interface Proposta { status: string; }

// --- ESTADO DO DASHBOARD ---
const estatisticas = ref({
contratos: { ativos: 0, vencendo: 0 },
reunioes: { hoje: 0, semana: 0 },
documentos: { pendentes: 0, total: 0 },
propostas: { pendentes: 0, aprovadas: 0 }
});

const itemsAgenda = ref([]); 
const nomeUsuario = ref('Usuário');
const loading = ref(true); // Loading geral da página

// Função para buscar dados gerais do dashboard
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

    // ... (lógica para processar estatísticas) ...

} catch (error) {
console.error("Erro ao buscar dados do dashboard:", error);
} finally {
loading.value = false; // Termina o loading geral
}
}

// --- ESTADO DAS SEÇÕES (PESSOAS, EMPRESAS, CARGOS) ---

// Carregamento específico (o de empresas não é mais usado)
const carregando = ref({ pessoas: false, empresas: false }); 
const modais = ref({ empresa: false, usuario: false, cargo: false }); 

// --- Seção Pessoas (ainda mockado) ---
const pessoas = ref([{ nome: 'Jubileu do creio', email: 'omg...@gmail.com', status: 'Pendente' }]);
const colunasPessoas = [
{ campo: 'nome', titulo: 'Nome' },
{ campo: 'email', titulo: 'Email' },
{ campo: 'status', titulo: 'Status', tipo: 'status' },
{ titulo: '', tipo: 'pendentesAcoes' },
];

// --- Seção Empresas (AGORA VEM DO COMPOSABLE) ---
const { 
    companies: empresas,           // Renomeado para 'empresas'
    loading: carregandoEmpresas, // Renomeado para 'carregandoEmpresas'
    error: erroEmpresas,         // Renomeado para 'erroEmpresas'
    fetchCompanies 
} = useCompanies();

const colunasEmpresas = [
{ campo: 'nomeFantasia', titulo: 'Nome fantasia' },
{ campo: 'email', titulo: 'Email' },
{ campo: 'cnpj', titulo: 'Cnpj' },
{ campo: 'telefone', titulo: 'Telefone' },
];

// --- Seção Funções/Cargos (ainda mockado) ---
const funcoes = ref([
{ id: '1', nome: 'Analista', permissoes: ['Criar proposta', 'Validar documento'] },
]);

// --- ON MOUNTED ---
onMounted(() => {
buscarDadosDashboard(); 
fetchCompanies();       
  // (Quando tiver o de pessoas, chame aqui também)
});

function aprovar(_row: any) { console.log("Aprovar:", _row); }
function rejeitar(_row: any) { console.log("Rejeitar:", _row); }
function criarEmpresa(_payload: any) {
modais.value.empresa = false;
console.log("Empresa criada:", _payload);
  // IDEALMENTE: Chamar fetchCompanies() aqui para atualizar a lista
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

<style scoped>
.pagina-dashboard-layout {
}
.card-soft {
}
.mt-4 {
  margin-top: 1rem; 
}
</style>