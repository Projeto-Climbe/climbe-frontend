<template>
  <section class="card-soft dashboard-section mt-4">
    <div class="section-header-row">
      <CabecalhoSecao :titulo="'Empresas'" :subtitulo="`Total ${empresas.length}`" />
      <Button label="Adicionar nova empresa" class="btn-primaria" @click="modais.empresa = true" />
    </div>

    <div
      v-if="erroEmpresas"
      style="color: red; margin: 10px 0; padding: 10px; border: 1px solid red; border-radius: 4px;"
    >
      <strong>Erro:</strong> {{ erroEmpresas }}
    </div>

    <TabelaDados 
      :valor="empresas" 
      :carregando="carregandoEmpresas" 
      :colunas="colunasEmpresas" 
    />
    
    </section>

  </template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button' 

import CabecalhoSecao from '../../components/core/SectionHeader.vue';
interface Contrato { status: string; }

const loading = ref(true)

const carregando = ref({ pessoas: false, empresas: false })
const modais = ref({ empresa: false, usuario: false, cargo: false })

const pessoas = ref<any[]>([
  { nome: 'Ana Silva', email: 'ana.silva@email.com', status: 'Pendente' },
  { nome: 'Bruno Costa', email: 'bruno.costa@email.com', status: 'Pendente' },
]);

const colunasPessoas = ref([
 { campo: 'nome', titulo: 'Nome' },
 { campo: 'email', titulo: 'E-mail' },
 { campo: 'status', titulo: 'Status' },
])

const empresas = ref<any[]>([]);
const carregandoEmpresas = ref(false);
const erroEmpresas = ref<string | null>(null); 
const salvandoEmpresa = ref(false); 

function mockFetchCompanies() {
  carregandoEmpresas.value = true;
  setTimeout(() => {
    empresas.value = [
      { id: '1', nomeFantasia: 'Tech Solutions', email: 'contato@tech.com', cnpj: '11.222.333/0001-44', telefone: '(11) 99999-1111' },
      { id: '2', nomeFantasia: 'Coffee House', email: 'cafe@coffee.com', cnpj: '44.555.666/0001-77', telefone: '(22) 98888-2222' },
      { id: '3', nomeFantasia: 'Alpha Logistics', email: 'log@alpha.com', cnpj: '77.888.999/0001-00', telefone: '(33) 97777-3333' },
    ];
    carregandoEmpresas.value = false;
  }, 1000);
}

const colunasEmpresas = [
{ campo: 'nomeFantasia', titulo: 'Nome fantasia' },
{ campo: 'email', titulo: 'Email' },
{ campo: 'cnpj', titulo: 'CNPJ' },
{ campo: 'telefone', titulo: 'Telefone' },
]

const funcoes = ref<any[]>([])

async function buscarDadosDashboard() {
  loading.value = false
}

onMounted(() => {
 buscarDadosDashboard()
 mockFetchCompanies() 
})

async function criarEmpresa(payload: any) { 
  console.log('Tentando criar empresa:', payload)
  salvandoEmpresa.value = true;

  setTimeout(() => {
    empresas.value.push({
      id: String(Math.random()), 
      ...payload
    });

    salvandoEmpresa.value = false;
    modais.value.empresa = false;
    console.log('Empresa criada com sucesso!');
  }, 1500); 
}

</script>

<style scoped>
.pagina-dashboard-layout {
}
.card-soft {
}
.mt-4 {
  margin-top: 1rem; 
}</style>
