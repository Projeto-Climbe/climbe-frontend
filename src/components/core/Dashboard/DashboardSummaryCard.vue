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
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  cursor: pointer;
}

.summary-card--small {
  padding-block: 18px;
}

.summary-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.summary-card__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--climb-green-700);
  margin: 0;
}

.summary-card__chevron {
  border: none;
  background: transparent;
  border-radius: 999px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.summary-card__chevron-icon {
  font-size: 18px;
  color: var(--climb-muted);
}

.summary-card__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.summary-card__info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.summary-card__value-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.summary-card__value {
  font-size: 36px;
  font-weight: 700;
  color: var(--climb-green-900);
}

.summary-card__value-label {
  font-size: 14px;
  color: var(--climb-muted);
}

.summary-card__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
}

.summary-card__badge-dot {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background-color: currentColor;
  opacity: 0.9;
}

.summary-card__badge-text {
  font-weight: 500;
}

/* Variações de cor das badges */
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

.summary-card__icon {
  font-size: 64px;
  color: #2b3b33;
  opacity: 0.9;
}
</style>
