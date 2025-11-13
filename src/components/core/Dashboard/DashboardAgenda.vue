<template>
  <article class="agenda-card">
    <header class="agenda-card__header">
      <h2 class="agenda-card__title">Agenda</h2>
      <button class="agenda-card__chevron" type="button">
        <span class="agenda-card__chevron-icon">›</span>
      </button>
    </header>

    <div class="agenda-card__day-header">
      <span class="agenda-card__day-label">Hoje</span>
      <span class="agenda-card__day-date">
        {{ dateLabel }}
      </span>
    </div>

    <ul class="agenda-card__list">
      <li v-for="item in items" :key="item.id" class="agenda-card__item">
        <div class="agenda-card__item-main">
          <span class="agenda-card__item-title">
            {{ item.title }}
          </span>
          <span class="agenda-card__item-time">
            {{ item.startTime }}
          </span>
        </div>

        <div class="agenda-card__item-meta">
          <span class="agenda-card__item-link"> meet.google.com </span>
          <span class="agenda-card__item-endtime">
            {{ item.endTime }}
          </span>
        </div>
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
  export interface AgendaItem {
    id: number | string
    title: string
    startTime: string
    endTime: string
  }

  const props = defineProps<{
    dateLabel: string
    items: AgendaItem[]
  }>()
</script>

<style scoped>
  .agenda-card {
    background-color: var(--climb-card-bg);
    border-radius: var(--climb-radius-card);
    box-shadow: var(--climb-shadow-soft);
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* Cabeçalho */
  .agenda-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .agenda-card__title {
    font-size: 18px;
    font-weight: 600;
    color: var(--climb-green-700);
    margin: 0;
  }

  .agenda-card__chevron {
    border-radius: 999px;
    border: none;
    background: transparent;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .agenda-card__chevron-icon {
    font-size: 18px;
    color: var(--climb-muted);
  }

  /* Linha Hoje + Data */
  .agenda-card__day-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
  }

  .agenda-card__day-label {
    font-weight: 500;
    color: var(--climb-green-900);
  }

  .agenda-card__day-date {
    color: var(--climb-muted);
  }

  /* Lista de eventos */
  .agenda-card__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .agenda-card__item {
    padding: 10px 12px;
    border-radius: 18px;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .agenda-card__item-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .agenda-card__item-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--climb-green-900);
  }

  .agenda-card__item-time {
    font-size: 14px;
    font-weight: 600;
    color: var(--climb-green-900);
  }

  .agenda-card__item-meta {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: var(--climb-muted);
  }

  .agenda-card__item-link {
    opacity: 0.9;
  }

  .agenda-card__item-endtime {
    opacity: 0.8;
  }
</style>
