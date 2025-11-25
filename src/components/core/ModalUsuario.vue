<template>
  <DialogoFormulario v-model="visivel" titulo="Cadastrar usuário" largura="600px">
    <div class="form-grid-user">
      <div class="grid-row">
        <InputText placeholder="Nome" class="input-clean" />
        <InputText placeholder="Email" class="input-clean" />
      </div>

      <div class="grid-row">
        <InputText placeholder="CPF" class="input-clean" />
        <InputText placeholder="Senha" type="password" class="input-clean" />
      </div>
    </div>

    <template #footer-actions>
      <Button label="Voltar" class="btn-soft-green" @click="visivel = false" />
      <Button label="Salvar usuário" class="btn-primaria" @click="salvar" />
    </template>
  </DialogoFormulario>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import DialogoFormulario from './DialogFormulario.vue'
  import InputText from 'primevue/inputtext'
  import Button from 'primevue/button'

  const props = defineProps<{ modelValue: boolean }>()
  const emit = defineEmits(['update:modelValue'])

  const visivel = computed({
    get: () => props.modelValue,
    set: (v: boolean) => emit('update:modelValue', v),
  })

  function salvar() {
    visivel.value = false
    // Lógica de salvar aqui
  }
</script>

<style scoped>
  .form-grid-user {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0;
  }

  .grid-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .input-clean {
    background-color: #eff3f4 !important;
    border: none !important;
    border-radius: 12px !important;
    padding: 1rem 1.2rem !important;
    color: #123b2d !important;
  }
</style>
