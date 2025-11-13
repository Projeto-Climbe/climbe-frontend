<template>
  <section class="dashboard-home">
    <!-- Cabeçalho "Olá, Luiz! Aqui está o resumo de hoje." -->
    <DashboardGreeting user-name="Luiz" />

    <!-- GRID PRINCIPAL -->
    <div class="dashboard-home__grid">
      <!-- Cards de resumo -->
      <div
        v-for="card in dashboardCards"
        :key="card.id"
        class="dashboard-home__area"
        :class="card.areaClass"
      >
        <DashboardSummaryCard
          :title="card.title"
          :value="card.value"
          :value-label="card.valueLabel"
          :badge-label="card.badgeLabel"
          :badge-tone="card.badgeTone"
          :size="card.size"
          @open="handleOpen(card.id)"
        >
          <template #icon>
            <!-- ATENÇÃO: aqui usamos apenas card.id, não card.icon -->
            <component
              :is="iconMap[card.id]"
              class="dashboard-home__icon"
              :size="56"
              weight="regular"
            />
          </template>
        </DashboardSummaryCard>
      </div>

      <!-- Coluna direita: Agenda -->
      <div class="dashboard-home__area dashboard-home__area--agenda">
        <DashboardAgenda
          date-label="Sexta, 29 de ago."
          :items="agendaItems"
        />
      </div>
    </div>

    <!-- POP-UPS / MODAIS -->

    <!-- Contratos -->
    <DashboardCardDialog
      v-model="showContractsDialog"
      title="Contratos"
      subtitle="Resumo dos contratos ativos e próximos do vencimento"
      description="Acesse a visão completa dos contratos para revisar valores, datas de vencimento e status de assinatura. Ideal para acompanhar o que está para vencer e planejar renovações."
      primary-label="Ir para contratos"
      route-to="/contratos"
    />

    <!-- Reuniões (card superior) -->
    <DashboardCardDialog
      v-model="showMeetingsTopDialog"
      title="Reuniões de hoje"
      subtitle="Organize seus encontros e alinhamentos"
      description="Veja a sua agenda de reuniões do dia com horário, participantes e links de acesso. Use essa visão para se preparar antes de cada call."
      primary-label="Ver agenda de reuniões"
      route-to="/reunioes"
    />

    <!-- Documentos -->
    <DashboardCardDialog
      v-model="showDocumentsDialog"
      title="Documentos"
      subtitle="Pendentes de validação e assinatura"
      description="Acompanhe documentos que ainda precisam ser validados ou assinados, evitando pendências que possam atrasar contratos e propostas."
      primary-label="Ir para documentos"
      route-to="/documentos"
    />

    <!-- Propostas -->
    <DashboardCardDialog
      v-model="showProposalsDialog"
      title="Propostas"
      subtitle="Oportunidades em negociação"
      description="Visualize as propostas pendentes, aprovadas e recusadas para entender melhor o seu funil de vendas e próximos passos com cada empresa."
      primary-label="Ir para propostas"
      route-to="/propostas"
    />

    <!-- Reuniões (card inferior) -->
    <DashboardCardDialog
      v-model="showMeetingsBottomDialog"
      title="Reuniões da semana"
      subtitle="Planejamento semanal de encontros"
      description="Tenha uma visão consolidada das reuniões da semana, evitando conflitos de agenda e melhorando seu planejamento."
      primary-label="Ver todas as reuniões"
      route-to="/reunioes"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, type Component } from "vue";

import DashboardGreeting from "../../components/core/Dashboard/DashboardGreenting.vue";
import DashboardSummaryCard from "../../components/core/Dashboard/DashboardSummaryCard.vue";
import DashboardAgenda from "../../components/core/Dashboard/DashboardAgenda.vue";
import DashboardCardDialog from "../../components/core/Dashboard/DashboardCardDialog.vue";

import {
  PhFileText,
  PhCalendarBlank,
  PhFileSearch,
  PhHandCoins,
  PhUsersThree,
} from "@phosphor-icons/vue";

type DashboardCardId =
  | "contracts"
  | "meetingsTop"
  | "documents"
  | "proposals"
  | "meetingsBottom";

/**
 * Configuração dos cards (tipagem forte para o v-for).
 */
interface DashboardCardConfig {
  id: DashboardCardId;
  title: string;
  value: number;
  valueLabel: string;
  badgeLabel?: string;
  badgeTone?: "danger" | "info" | "success";
  size?: "large" | "small";
  areaClass: string; // grid-area CSS
}

/**
 * Tipo dos itens da Agenda – estrutura simples, compatível com DashboardAgenda.
 */
interface AgendaItem {
  id: number | string;
  title: string;
  startTime: string;
  endTime: string;
}

/**
 * Mapa id -> componente de ícone da lib.
 */
const iconMap: Record<DashboardCardId, Component> = {
  contracts: PhFileText,
  meetingsTop: PhCalendarBlank,
  documents: PhFileSearch,
  proposals: PhHandCoins,
  meetingsBottom: PhUsersThree,
};

/**
 * Cards estáticos do dashboard.
 */
const dashboardCards: DashboardCardConfig[] = [
  {
    id: "contracts",
    title: "Contratos",
    value: 12,
    valueLabel: "ativos",
    badgeLabel: "3 Vencendo",
    badgeTone: "danger",
    size: "large",
    areaClass: "dashboard-home__area--contracts",
  },
  {
    id: "meetingsTop",
    title: "Reuniões",
    value: 3,
    valueLabel: "Hoje",
    badgeLabel: "7 Esta semana",
    badgeTone: "info",
    size: "large",
    areaClass: "dashboard-home__area--meetingsTop",
  },
  {
    id: "documents",
    title: "Documentos",
    value: 3,
    valueLabel: "Pendentes de Validação",
    badgeLabel: "25 Total",
    badgeTone: "info",
    size: "large",
    areaClass: "dashboard-home__area--documents",
  },
  {
    id: "proposals",
    title: "Propostas",
    value: 5,
    valueLabel: "Pendentes",
    badgeLabel: "8 Aprovadas",
    badgeTone: "success",
    size: "small",
    areaClass: "dashboard-home__area--proposals",
  },
  {
    id: "meetingsBottom",
    title: "Reuniões",
    value: 3,
    valueLabel: "Hoje",
    badgeLabel: "7 Semana",
    badgeTone: "info",
    size: "small",
    areaClass: "dashboard-home__area--meetingsBottom",
  },
];

/**
 * Itens da Agenda – array simples, exatamente AgendaItem[].
 */
const agendaItems: AgendaItem[] = [
  { id: 1, title: "Daily Mobile", startTime: "10:00", endTime: "10:30" },
  { id: 2, title: "Daily Mobile", startTime: "10:00", endTime: "10:30" },
  { id: 3, title: "Daily Mobile", startTime: "10:00", endTime: "10:30" },
  { id: 4, title: "Daily Mobile", startTime: "10:00", endTime: "10:30" },
  { id: 5, title: "Daily Mobile", startTime: "10:00", endTime: "10:30" },
];

/**
 * Estados dos modais (um por card).
 */
const showContractsDialog = ref(false);
const showMeetingsTopDialog = ref(false);
const showDocumentsDialog = ref(false);
const showProposalsDialog = ref(false);
const showMeetingsBottomDialog = ref(false);

/**
 * Centraliza a lógica de qual modal abrir para cada card.
 */
function handleOpen(cardId: DashboardCardId) {
  switch (cardId) {
    case "contracts":
      showContractsDialog.value = true;
      break;
    case "meetingsTop":
      showMeetingsTopDialog.value = true;
      break;
    case "documents":
      showDocumentsDialog.value = true;
      break;
    case "proposals":
      showProposalsDialog.value = true;
      break;
    case "meetingsBottom":
      showMeetingsBottomDialog.value = true;
      break;
  }
}
</script>

<style scoped>
.dashboard-home {
  display: flex;
  flex-direction: column;
  padding: 32px 40px;
}

/* GRID principal replicando o layout do Figma */
.dashboard-home__grid {
  display: grid;
  grid-template-columns: 2.1fr 2.1fr 2.4fr;
  grid-auto-rows: minmax(140px, auto);
  grid-template-areas:
    "contracts meetingsTop agenda"
    "documents documents  agenda"
    "proposals meetingsBottom agenda";
  gap: 24px;
}

/* Áreas do grid */
.dashboard-home__area--contracts {
  grid-area: contracts;
}

.dashboard-home__area--meetingsTop {
  grid-area: meetingsTop;
}

.dashboard-home__area--documents {
  grid-area: documents;
}

.dashboard-home__area--agenda {
  grid-area: agenda;
}

.dashboard-home__area--proposals {
  grid-area: proposals;
}

.dashboard-home__area--meetingsBottom {
  grid-area: meetingsBottom;
}

/* Estilo base dos ícones: central, proporção fixa, traço escuro */
.dashboard-home__icon {
  width: 64px;
  height: 64px;
  color: #27352f;
  flex-shrink: 0;
}
</style>
