<template>
  <Dialog
    v-model:visible="visivel"
    :modal="true"
    :dismissable-mask="true"
    :closable="false"
    :style="{ width: largura }"
    :pt="{ mask: { class: 'backdrop-blur-sm' } }"
  >
    <template #header>
      <div class="cab">
        <h3 class="titulo">{{ titulo }}</h3>
        <button type="button" class="btn-fechar" @click="fechar">
          <i class="pi pi-times"></i>
        </button>
      </div>
    </template>

    <div class="conteudo-modal">
      <slot />
    </div>

    <template #footer>
      <div class="rodape">
        <slot name="footer-actions">
          <Button
            v-if="mostrarVoltar"
            :label="rotuloVoltar || 'Voltar'"
            class="btn-voltar"
            @click="$emit('voltar')"
          />
          <Button :label="rotuloPrimario" class="btn-primaria" @click="$emit('primario')" />
        </slot>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import Button from 'primevue/button'
  import Dialog from 'primevue/dialog'

  const props = withDefaults(
    defineProps<{
      modelValue: boolean
      titulo: string
      largura?: string
      rotuloPrimario?: string
      rotuloVoltar?: string
      mostrarVoltar?: boolean
    }>(),
    {
      largura: '500px',
      rotuloPrimario: 'Salvar',
      mostrarVoltar: false,
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
    color: #123b2d;
    font-weight: 700;
    font-size: 1.25rem;
    margin: 0;
  }

  .btn-fechar {
    background: transparent;
    border: none;
    cursor: pointer;
    color: #9ca3af;
    font-size: 1.1rem;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
  }

  .btn-fechar:hover {
    color: #123b2d;
  }

  .conteudo-modal {
    padding: 0.5rem 0;
  }

  .rodape {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    width: 100%;
  }
</style>
