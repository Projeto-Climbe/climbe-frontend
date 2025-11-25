<template>
  <DialogoFormulario v-model="visivel" titulo="Definir cargo" largura="500px">
    <div class="form-stack">
      <InputText v-model="form.cargo" placeholder="Cargo" class="input-full" />

      <Textarea
        v-model="form.descricao"
        placeholder="Descrição do cargo"
        rows="3"
        class="input-full textarea-resize-none"
      />

      <div class="permissoes-section">
        <h4 class="permissoes-titulo">Permissões</h4>

        <div class="checkbox-list">
          <div class="checkbox-item">
            <Checkbox v-model="form.permissoes" inputId="perm1" name="perm" value="proposta" />
            <label for="perm1">Criar proposta</label>
          </div>

          <div class="checkbox-item">
            <Checkbox v-model="form.permissoes" inputId="perm2" name="perm" value="documento" />
            <label for="perm2">Validar documento</label>
          </div>

          <div class="checkbox-item">
            <Checkbox v-model="form.permissoes" inputId="perm3" name="perm" value="contrato" />
            <label for="perm3">Aprovar contrato</label>
          </div>
        </div>
      </div>
    </div>

    <template #footer-actions>
      <Button label="Voltar" class="btn-soft-green" @click="visivel = false" />
      <Button label="Finalizar cadastro" class="btn-primaria" @click="salvar" />
    </template>
  </DialogoFormulario>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import DialogoFormulario from '../DialogFormulario.vue'
  import InputText from 'primevue/inputtext'
  import Textarea from 'primevue/textarea'
  import Checkbox from 'primevue/checkbox'
  import Button from 'primevue/button'

  const props = defineProps<{ modelValue: boolean }>()
  const emit = defineEmits(['update:modelValue', 'save'])

  const visivel = computed({
    get: () => props.modelValue,
    set: (v: boolean) => emit('update:modelValue', v),
  })

  const form = ref({
    cargo: '',
    descricao: '',
    permissoes: [],
  })

  function salvar() {
    emit('save', form.value)
    visivel.value = false
  }
</script>

<style scoped>
  .form-stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 0.5rem;
  }

  .input-full {
    width: 100%;
    background-color: #eff3f4 !important;
    border: none !important;
    border-radius: 12px !important;
    padding: 1rem 1.2rem !important;
    font-size: 0.95rem;
    color: #123b2d;
  }

  .permissoes-section {
    margin-top: 0.5rem;
  }

  .permissoes-titulo {
    color: #123b2d;
    font-weight: 700;
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }

  .checkbox-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .checkbox-item label {
    color: #123b2d;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .textarea-resize-none {
    resize: none;
  }
</style>
