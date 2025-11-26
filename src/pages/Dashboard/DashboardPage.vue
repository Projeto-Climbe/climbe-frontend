<template>
  <section class="dashboard-home">
    <DashboardGreeting user-name="Luiz" />

    <div class="dashboard-home__grid">
      <DashboardSummaryCard
        v-for="card in dashboardCards"
        :key="card.id"
        :title="card.title"
        :value="card.value"
        :value-label="card.valueLabel"
        :badge-label="card.badgeLabel"
        :badge-tone="card.badgeTone"
        :class="card.areaClass"
        @open="handleOpen(card.id)"
      >
        <template #icon>
          <i :class="['pi', card.icon]" style="font-size: 2.5rem; color: #123b2d"></i>
        </template>
      </DashboardSummaryCard>

      <div class="dashboard-home__area--agenda">
        <DashboardAgenda
          date-label="Sexta, 29 de ago."
          :items="agendaItems"
          class="clickable-card"
          @click="irParaReunioes"
        />
      </div>
    </div>

    <DashboardCardDialog
      v-model="showContractsDialog"
      title="Contratos"
      description="Visão completa dos contratos para revisar valores e datas."
      primary-label="Ir para contratos"
      route-to="/contratos"
    />

    <DashboardCardDialog
      v-model="showMeetingsDialog"
      title="Reuniões"
      description="Sua agenda de reuniões do dia e da semana."
      primary-label="Ver reuniões"
      route-to="/reunioes"
    />
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router' 
  import DashboardGreeting from '../../components/core/Dashboard/DashboardGreenting.vue'
  import DashboardSummaryCard from '../../components/core/Dashboard/DashboardSummaryCard.vue'
  import DashboardAgenda from '../../components/core/Dashboard/DashboardAgenda.vue'
  import DashboardCardDialog from '../../components/core/Dashboard/DashboardCardDialog.vue'


  const router = useRouter()

  type DashboardCardId = 'contracts' | 'meetingsTop' | 'documents' | 'proposals' | 'meetingsBottom'

  interface DashboardCardConfig {
    id: DashboardCardId
    title: string
    value: number
    valueLabel: string
    badgeLabel?: string
    badgeTone?: 'danger' | 'info' | 'success'
    areaClass: string
    icon: string
  }

  // Cards Configuração
  const dashboardCards: DashboardCardConfig[] = [
    {
      id: 'contracts',
      title: 'Contratos',
      value: 12,
      valueLabel: 'ativos',
      badgeLabel: '3 Vencendo',
      badgeTone: 'danger',
      areaClass: 'area-contracts',
      icon: 'pi-file',
    },
    {
      id: 'meetingsTop',
      title: 'Reuniões',
      value: 3,
      valueLabel: 'Hoje',
      badgeLabel: '7 Esta semana',
      badgeTone: 'info',
      areaClass: 'area-meetings-top',
      icon: 'pi-video',
    },
    {
      id: 'documents',
      title: 'Documentos',
      value: 3,
      valueLabel: 'Pendentes de Validação',
      badgeLabel: '25 Total',
      badgeTone: 'info',
      areaClass: 'area-documents',
      icon: 'pi-copy',
    },
    {
      id: 'proposals',
      title: 'Propostas',
      value: 5,
      valueLabel: 'Pendentes',
      badgeLabel: '8 Aprovadas',
      badgeTone: 'success',
      areaClass: 'area-proposals',
      icon: 'pi-wallet',
    },
    {
      id: 'meetingsBottom',
      title: 'Reuniões',
      value: 3,
      valueLabel: 'Hoje',
      badgeLabel: '7 Semana',
      badgeTone: 'info',
      areaClass: 'area-meetings-bottom',
      icon: 'pi-camera',
    },
  ]

  // Agenda está em mock por enquanto
  const agendaItems = [
    { id: 1, title: 'Daily Mobile', startTime: '10:00', endTime: '10:30' },
    { id: 2, title: 'Daily Mobile', startTime: '10:00', endTime: '10:30' },
    { id: 3, title: 'Daily Mobile', startTime: '10:00', endTime: '10:30' },
    { id: 4, title: 'Daily Mobile', startTime: '10:00', endTime: '10:30' },
  ]

  const showContractsDialog = ref(false)
  const showMeetingsDialog = ref(false)

  function handleOpen(id: string) {
    if (id === 'contracts') showContractsDialog.value = true
    if (id === 'meetingsTop' || id === 'meetingsBottom') showMeetingsDialog.value = true
  }

  function irParaReunioes() {
    router.push('/reunioes')
  }
</script>

<style scoped>
  .dashboard-home {
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .dashboard-home__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 320px;
    grid-template-areas:
      'contracts meetingsTop agenda'
      'documents documents agenda'
      'proposals meetingsBot agenda';
    gap: 1.5rem;
  }

  /* Mapeamento de Áreas */
  .area-contracts {
    grid-area: contracts;
  }
  .area-meetings-top {
    grid-area: meetingsTop;
  }
  .area-documents {
    grid-area: documents;
  }
  .area-proposals {
    grid-area: proposals;
  }
  .area-meetings-bottom {
    grid-area: meetingsBot;
  }
  .dashboard-home__area--agenda {
    grid-area: agenda;
  }

  .clickable-card {
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    height: 100%;
  }

  .clickable-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 1100px) {
    .dashboard-home__grid {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        'contracts meetingsTop'
        'documents documents'
        'proposals meetingsBot'
        'agenda agenda';
    }

    .clickable-card {
      height: auto;
    }
  }
</style>
