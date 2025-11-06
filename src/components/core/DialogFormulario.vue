<template>
  <Dialog
    v-model:visible="visivel"
    :modal="true"
    :dismissable-mask="true"
    :style="{ width: largura }"
    :pt="{ mask: { class: 'backdrop-blur-sm' } }"
  >
    <template #header>
      <div class="cab">
        <h3 class="titulo">{{ titulo }}</h3>
        <Button icon="pi pi-times" text rounded aria-label="Fechar" @click="fechar" />
      </div>
    </template>

    <slot />

    <template #footer>
      <div class="rodape">
        <Button
          v-if="mostrarVoltar"
          label="Voltar"
          outlined
          class="rounded-2xl"
          @click="$emit('voltar')"
        />
        <Button
          :label="rotuloPrimario"
          class="rounded-2xl btn-primaria"
          @click="$emit('primario')"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = withDefaults(
    defineProps<{
      modelValue: boolean
      titulo: string
      largura?: string
      rotuloPrimario?: string
      mostrarVoltar?: boolean
    }>(),
    {
      largura: '760px',
      rotuloPrimario: 'Salvar',
    },
  )

  const emit = defineEmits(['update:modelValue', 'primario', 'voltar'])

  const visivel = computed({
    get: () => props.modelValue,
    set: (v: boolean) => emit('update:modelValue', v),
  })

  function fechar() {
    emit('update:modelValue', false)
  }
</script>

<style scoped>
  .cab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .titulo {
    color: var(--teal-800);
    font-weight: 600;
    margin: 0;
  }
  .rodape {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }
</style>
