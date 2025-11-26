<template>
  <Teleport to="body">
    <transition name="dialog-fade">
      <div v-if="modelValue" class="card-dialog__backdrop" @click.self="handleClose">
        <div class="card-dialog">
          <header class="card-dialog__header">
            <h2 class="card-dialog__title">{{ title }}</h2>
            <p v-if="subtitle" class="card-dialog__subtitle">
              {{ subtitle }}
            </p>
          </header>

          <section class="card-dialog__body">
            <slot>
              <p v-if="description" class="card-dialog__description">
                {{ description }}
              </p>
            </slot>
          </section>

          <footer class="card-dialog__footer">
            <button
              type="button"
              class="card-dialog__btn card-dialog__btn--primary"
              @click="handlePrimary"
            >
              {{ primaryLabel }}
            </button>

            <button
              type="button"
              class="card-dialog__btn card-dialog__btn--ghost"
              @click="handleClose"
            >
              {{ secondaryLabel }}
            </button>
          </footer>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title: string;
    subtitle?: string;
    description?: string;
    primaryLabel: string;
    secondaryLabel?: string;
    routeTo: string;
  }>(),
  {
    subtitle: "",
    description: "",
    secondaryLabel: "Fechar",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const router = useRouter();

function handleClose() {
  emit("update:modelValue", false);
}

function handlePrimary() {
  if (props.routeTo) {
    router.push(props.routeTo);
  }
  emit("update:modelValue", false);
}
</script>

<style scoped>
.card-dialog__backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
}

.card-dialog {
  width: 420px;
  max-width: 90vw;
  border-radius: 28px;
  background-color: #ffffff;
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.45);
  padding: 26px 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* Cabeçalho do modal */
.card-dialog__header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card-dialog__title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--climb-green-900);
}

.card-dialog__subtitle {
  margin: 0;
  font-size: 13px;
  color: var(--climb-muted);
}

/* Corpo (texto ou slot custom) */
.card-dialog__body {
  font-size: 14px;
  color: #33413a;
}

.card-dialog__description {
  margin: 0;
  line-height: 1.5;
}

/* Rodapé com ações */
.card-dialog__footer {
  margin-top: 6px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.card-dialog__btn {
  border-radius: 999px;
  border: 1px solid transparent;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.card-dialog__btn--primary {
  background-color: var(--climb-green-700);
  border-color: var(--climb-green-700);
  color: #ffffff;
}

.card-dialog__btn--primary:hover {
  background-color: var(--climb-green-500);
}

.card-dialog__btn--ghost {
  background-color: transparent;
  color: var(--climb-green-900);
  border-color: rgba(0, 0, 0, 0.06);
}

.card-dialog__btn--ghost:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>

