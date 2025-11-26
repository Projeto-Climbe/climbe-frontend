<template>
  <DialogoFormulario
    v-model="visivel"
    titulo="Adicionar novo relatório"
    rotulo-primario="Salvar relatório"
    largura="500px"
    @primario="enviar"
  >
    <form class="form-stack" @submit.prevent="enviar">
      <div class="campo-wrapper">
        <InputText v-model="form.nomeFantasia" placeholder="Nome fantasia" class="input-clean" />
      </div>

      <div class="campo-wrapper">
        <InputText v-model="form.email" placeholder="Email" type="email" class="input-clean" />
      </div>

      <div class="campo-wrapper">
        <InputText v-model="form.cnpj" placeholder="CNPJ" class="input-clean" />
      </div>

      <div class="campo-wrapper">
        <InputText v-model="form.telefone" placeholder="Telefone" class="input-clean" />
      </div>
    </form>
  </DialogoFormulario>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import InputText from 'primevue/inputtext'
  import DialogoFormulario from '@/components/core/DialogFormulario.vue'

  const props = defineProps<{ modelValue: boolean }>()
  const emit = defineEmits(['update:modelValue', 'enviar'])

  const visivel = computed({
    get: () => props.modelValue,
    set: (v: boolean) => emit('update:modelValue', v),
  })

  // Estado local do formulário
  const form = ref({
    nomeFantasia: '',
    email: '',
    cnpj: '',
    telefone: '',
  })

  // Limpa o formulário sempre que o modal abre
  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        form.value = { nomeFantasia: '', email: '', cnpj: '', telefone: '' }
      }
    },
  )

  function enviar() {
    // Validação simples
    if (!form.value.nomeFantasia) return

    emit('enviar', { ...form.value })
    visivel.value = false
  }
</script>

<style scoped>
  .form-stack {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 0.5rem 0;
  }

  .campo-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  /* Reutiliza os estilos globais do theme.css */
  :deep(.input-clean) {
    background: #f3f4f6 !important;
    border: 1px solid transparent !important;
    border-radius: 12px !important;
    padding: 1.1rem 1.2rem !important;
    font-size: 0.95rem;
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
