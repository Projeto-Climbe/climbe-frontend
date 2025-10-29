<script setup lang="ts">
import CartaoEstatistica from '@/components/core/CartaoEstatistica.vue'
import AgendaList from '@/components/core/AgendaList.vue'

const nomeUsuario = 'Luiz'
const estatisticas = {
  contratos: { ativos: 12, vencendo: 3 },
  reunioes: { hoje: 3, semana: 7 },
  documentos: { pendentes: 3, total: 25 },
  propostas: { pendentes: 5, aprovadas: 8 },
}
const rotuloAgenda = 'Hoje'
const textoDireitaAgenda = 'Sexta, 29 de ago.'
const itensAgenda = Array.from({ length: 4 }, () => ({
  titulo: 'Daily Mobile',
  link: 'https://meet.google.com',
  inicio: '10:00',
  fim: '10:30',
}))
</script>

<template>
  <div class="wrap">
    <header class="hdr">
      <h1>Olá, {{ nomeUsuario }}!</h1>
      <p>🖐️ Aqui está o resumo de hoje.</p>
    </header>

    <div class="grid">
      <section class="cards">
        <!-- topo -->
        <CartaoEstatistica
          class="c-contratos"
          titulo="Contratos"
          :valor="estatisticas.contratos.ativos"
          descricao="ativos"
          :selo="{ texto: `${estatisticas.contratos.vencendo} Vencendo`, tipo: 'alerta' }"
          icone="pi pi-file-edit"
          rota="/contratos"
        />
        <CartaoEstatistica
          class="c-reunioes-top"
          titulo="Reuniões"
          :valor="estatisticas.reunioes.hoje"
          descricao="Hoje"
          :selo="{ texto: `${estatisticas.reunioes.semana} Esta semana`, tipo: 'info' }"
          icone="pi pi-video"
          rota="/reunioes"
        />

        <!-- documentos faixa inteira -->
        <CartaoEstatistica
          class="c-documentos"
          titulo="Documentos"
          :valor="estatisticas.documentos.pendentes"
          descricao="Pendentes de Validação"
          :selo="{ texto: `${estatisticas.documentos.total} Total`, tipo: 'neutro' }"
          icone="pi pi-file"
          rota="/documentos"
        />

        <!-- última linha -->
        <CartaoEstatistica
          class="c-propostas"
          titulo="Propostas"
          :valor="estatisticas.propostas.pendentes"
          descricao="Pendentes"
          :selo="{ texto: `${estatisticas.propostas.aprovadas} Aprovadas`, tipo: 'sucesso' }"
          icone="pi pi-wallet"
          rota="/propostas"
        />
        <CartaoEstatistica
          class="c-reunioes-bot"
          titulo="Reuniões"
          :valor="estatisticas.reunioes.hoje"
          descricao="Hoje"
          :selo="{ texto: `${estatisticas.reunioes.semana} Semana`, tipo: 'info' }"
          icone="pi pi-calendar"
          rota="/reunioes"
        />
      </section>

      <aside class="agenda">
        <AgendaList
          :rotulo-data="rotuloAgenda"
          :cabecalho-direita="textoDireitaAgenda"
          :itens="itensAgenda"
        />
      </aside>
    </div>
  </div>
</template>

<style scoped>
.wrap{ max-width:1200px; margin:0 auto; padding:16px 18px }
.hdr{ display:flex; align-items:center; gap:12px; margin-bottom:12px }
.hdr h1{ margin:0; color:#113c36; font-weight:800; font-size:2rem }
.hdr p{ margin:0; color:#6a7b75 }

/* grid principal */
.grid{ display:grid; grid-template-columns: 1fr 380px; gap:18px }
.cards{
  display:grid; gap:16px; grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "contratos reunioesTop"
    "documentos documentos"
    "propostas reunioesBot";
}
/* posição */
.c-contratos{ grid-area:contratos }
.c-reunioes-top{ grid-area:reunioesTop }
.c-documentos{ grid-area:documentos }
.c-propostas{ grid-area:propostas }
.c-reunioes-bot{ grid-area:reunioesBot }

/* responsivo */
@media (max-width: 1200px){
  .grid{ grid-template-columns: 1fr }
  .cards{
    grid-template-columns: 1fr;
    grid-template-areas:
      "contratos"
      "reunioesTop"
      "documentos"
      "propostas"
      "reunioesBot";
  }
}
</style>
