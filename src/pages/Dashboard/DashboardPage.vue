<script setup lang="ts">
import { ref, onMounted } from 'vue';
import https from '@/services/https'; 
import CartaoEstatistica from '@/components/core/CartaoEstatistica.vue'; 
import AgendaList from '@/components/core/AgendaList.vue';

interface Contrato {
  status: string;
}

interface Reuniao {
  status: string;
}

interface Documento {
  status: string;
}

interface Proposta {
  status: string;
}

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
</script>

<template>
  <div v-if="loading" class="page-loading">
    Carregando dados...
    </div>

  <div class="page" v-else>
    <header class="boasvindas">
      <h1>Olá, {{ nomeUsuario }}!</h1>
      <p class="sub">Aqui está o resumo de hoje.</p>
    </header>

    <div class="grade">
      <section>
        <CartaoEstatistica
          titulo="Contratos"
          :valor="estatisticas.contratos.ativos"
          descricao="Ativos"
          :selo="{ texto: `${estatisticas.contratos.vencendo} vencendo`, tipo: 'alerta' }"
          icone="pi pi-file-edit"
          rota="/contratos"
        />
        
        <CartaoEstatistica
          titulo="Reuniões"
          :valor="estatisticas.reunioes.hoje"
          descricao="Hoje"
          :selo="{ texto: `${estatisticas.reunioes.semana} esta semana`, tipo: 'info' }"
          icone="pi pi-video"
          rota="/reunioes"
        />

        <CartaoEstatistica
          titulo="Documentos"
          :valor="estatisticas.documentos.pendentes"
          descricao="Pendentes de Validação"
          :selo="{ texto: `${estatisticas.documentos.total} total`, tipo: 'neutro' }"
          icone="pi pi-file"
          rota="/documentos"
        />
        
        <CartaoEstatistica
          titulo="Propostas"
          :valor="estatisticas.propostas.pendentes"
          descricao="Pendentes"
          :selo="{ texto: `${estatisticas.propostas.aprovadas} aprovadas`, tipo: 'sucesso' }"
          icone="pi pi-wallet"
          rota="/propostas"
        />
      </section>

      <aside>
        <AgendaList
          rotulo-data="Próximos eventos"  cabecalho-direita="Ver todos"
          :items="itemsAgenda"
        />
      </aside>
    </div>
  </div>
</template>

<style scoped>
/* Adicione seus estilos aqui... */
.page-loading {
  padding: 2rem;
  text-align: center;
  font-size: 1.2rem;
}
</style>