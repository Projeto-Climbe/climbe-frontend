<template>
  <article
    class="summary-card"
    :class="`summary-card--${size}`"
    @click="handleOpen"
  >
    <header class="summary-card__header">
      <h2 class="summary-card__title">
        {{ title }}
      </h2>

      <button
        class="summary-card__chevron"
        type="button"
        @click.stop="handleOpen"
      >
        <span class="summary-card__chevron-icon">›</span>
      </button>
    </header>

    <div class="summary-card__body">
      <div class="summary-card__info">
        <div class="summary-card__value-row">
          <span class="summary-card__value">
            {{ value }}
          </span>

          <span class="summary-card__value-label">
            {{ valueLabel }}
          </span>
        </div>

        <div
          v-if="badgeLabel"
          class="summary-card__badge"
          :class="badgeClass"
        >
          <span class="summary-card__badge-dot" />
          <span class="summary-card__badge-text">
            {{ badgeLabel }}
          </span>
        </div>
      </div>

      <div class="summary-card__icon">
        <slot name="icon" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    title: string;
    value: string | number;
    valueLabel: string;
    badgeLabel?: string;
    badgeTone?: "danger" | "info" | "success";
    size?: "large" | "small";
  }>(),
  {
    badgeTone: "info",
    size: "large",
  }
);

const emit = defineEmits<{
  (e: "open"): void;
}>();

const badgeClass = computed(() => {
  return {
    "summary-card__badge--danger": props.badgeTone === "danger",
    "summary-card__badge--info": props.badgeTone === "info",
    "summary-card__badge--success": props.badgeTone === "success",
  };
});

function handleOpen() {
  emit("open");
}
</script>

<style scoped>
.summary-card {
  background-color: var(--climb-card-bg);
  border-radius: var(--climb-radius-card);
  box-shadow: var(--climb-shadow-soft);
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease,
    background-color 0.16s ease;
}

/* variação de tamanho, batendo com o grid */
.summary-card--large {
  min-height: 150px;
}

.summary-card--small {
  min-height: 130px;
}

/* hover leve, sem desconfigurar */
.summary-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  background-color: #f9fdfb;
}

/* header: título + chevron */
.summary-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.summary-card__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--climb-green-700);
}

.summary-card__chevron {
  border: none;
  background: transparent;
  border-radius: 999px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.summary-card__chevron-icon {
  font-size: 18px;
  color: var(--climb-muted);
}

/* corpo: texto à esquerda + ícone à direita */
.summary-card__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.summary-card__info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.summary-card__value-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.summary-card__value {
  margin: 0;
  font-size: 32px;
  line-height: 1;
  font-weight: 700;
  color: var(--climb-green-900);
}

.summary-card__value-label {
  font-size: 13px;
  color: var(--climb-muted);
}

/* badge (pill) na parte de baixo do card */
.summary-card__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
}

.summary-card__badge-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background-color: currentColor;
}

.summary-card__badge-text {
  white-space: nowrap;
}

/* variações de cor da badge usando seus tokens */
.summary-card__badge--danger {
  background-color: var(--climb-pill-red-bg);
  color: var(--climb-pill-red-text);
}

.summary-card__badge--info {
  background-color: var(--climb-pill-blue-bg);
  color: var(--climb-pill-blue-text);
}

.summary-card__badge--success {
  background-color: var(--climb-pill-green-bg);
  color: var(--climb-pill-green-text);
}

/* ícone à direita: deixamos o slot “livre”, sem moldura extra */
.summary-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  /* o tamanho visual vem do componente de ícone (Ph*) */
}
</style>
