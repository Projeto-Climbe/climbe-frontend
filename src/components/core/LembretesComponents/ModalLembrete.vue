<template>
  <DialogoFormulario v-model="visivel" titulo="Novo Lembrete" largura="550px">
    <div class="form-stack">
      <div class="campo-wrapper">
        <InputText v-model="form.titulo" placeholder="Título do lembrete" class="input-clean" />
      </div>

      <div class="campo-wrapper">
        <InputMask
          v-model="form.dataLimite"
          mask="99/99/9999"
          placeholder="Data limite (dd/mm/aaaa)"
          class="input-clean"
        />
      </div>
    </div>

    <template #footer-actions>
      <Button label="Criar Lembrete" class="btn-primaria btn-wide" @click="salvar" />
    </template>
  </DialogoFormulario>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import DialogoFormulario from '@/components/core/DialogFormulario.vue'
  import InputText from 'primevue/inputtext'
  import InputMask from 'primevue/inputmask'
  import Button from 'primevue/button'

  const props = defineProps<{ modelValue: boolean }>()
  const emit = defineEmits(['update:modelValue', 'save'])

  const visivel = computed({
    get: () => props.modelValue,
    set: (v: boolean) => emit('update:modelValue', v),
  })

  const form = ref({
    titulo: '',
    dataLimite: '',
  })

  function salvar() {
    if (!form.value.titulo) return

    emit('save', { ...form.value })

    form.value.titulo = ''
    form.value.dataLimite = ''
    visivel.value = false
  }
</script>

<style scoped>
  .form-stack {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 0;
  }

  .campo-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .btn-wide {
    min-width: 160px;
    border-radius: 12px;
    background-color: #6ee7b7 !important;
    color: #064e3b !important;
    font-weight: 700;
    border: none;
  }
  .btn-wide:hover {
    background-color: #34d399 !important;
  }

  :deep(.input-clean) {
    background: #f3f4f6 !important;
    border: 1px solid transparent !important;
    border-radius: 12px !important;
    padding: 1.1rem 1.2rem !important;
    font-size: 1rem;
    color: #1f2937 !important;
    width: 100%;
    box-shadow: none !important;
  }

  :deep(.input-clean:enabled:focus) {
    background-color: #ffffff !important;
    border-color: #34d399 !important;
    box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.2) !important;
    outline: none !important;
  }
</style>
