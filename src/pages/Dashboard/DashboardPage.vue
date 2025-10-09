<template>
  <div>
    <header class="boasvindas">
      <h1>Olá, {{ nomeUsuario }}!</h1>
      <p class="sub">Aqui está o resumo de hoje.</p>
    </header>

    <div class="grade">
      <section>
        <div class="cards">
          <CartaoEstatistica
            titulo="Contratos"
            :valor="estatisticas.contratos.ativos"
            descricao="ativos"
            :selo="{ texto: `${estatisticas.contratos.vencendo} Vencendo`, tipo: 'alerta' }"
            icone="pi pi-file-edit"
            rota="/contratos"
          />
          <CartaoEstatistica
            titulo="Reuniões"
            :valor="estatisticas.reunioes.hoje"
            descricao="Hoje"
            :selo="{ texto: `${estatisticas.reunioes.semana} Esta semana`, tipo: 'info' }"
            icone="pi pi-video"
            rota="/reunioes"
          />
          <CartaoEstatistica
            titulo="Documentos"
            :valor="estatisticas.documentos.pendentes"
            descricao="Pendentes de Validação"
            :selo="{ texto: `${estatisticas.documentos.total} Total`, tipo: 'neutro' }"
            icone="pi pi-file"
            rota="/documentos"
          />
          <CartaoEstatistica
            titulo="Propostas"
            :valor="estatisticas.propostas.pendentes"
            descricao="Pendentes"
            :selo="{ texto: `${estatisticas.propostas.aprovadas} Aprovadas`, tipo: 'sucesso' }"
            icone="pi pi-wallet"
            rota="/propostas"
          />
        </div>
      </section>

      <aside>
        <ListaAgenda
          :rotulo-data="rotuloAgenda"
          :cabecalho-direita="textoDireitaAgenda"
          :itens="itensAgenda"
        />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CartaoEstatistica from '../../components/core/CartaoEstatistica.vue'
  import ListaAgenda from '../../components/core/AgendaList.vue'

  const nomeUsuario = 'Luiz'

  const estatisticas = {
    contratos: { ativos: 12, vencendo: 3 },
    reunioes: { hoje: 3, semana: 7 },
    documentos: { pendentes: 3, total: 25 },
    propostas: { pendentes: 5, aprovadas: 8 },
  }

  const rotuloAgenda = 'Hoje'
  const textoDireitaAgenda = 'Sexta, 29 de ago.'
  const itensAgenda = Array(4).fill({
    titulo: 'Daily Mobile',
    link: 'https://meet.google.com',
    inicio: '10:00',
    fim: '10:30',
  })
</script>

<style scoped>
  .boasvindas h1 {
    color: #113c36;
    font-weight: 700;
    margin: 0;
  }
  .sub {
    color: var(--text-500);
    margin: 0.25rem 0 0;
  }

  .grade {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 1.25rem;
    margin-top: 1rem;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  @media (max-width: 1200px) {
    .grade {
      grid-template-columns: 1fr;
    }
    .cards {
      grid-template-columns: 1fr;
    }
  }
</style>
