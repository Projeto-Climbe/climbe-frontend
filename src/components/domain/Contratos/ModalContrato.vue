<template>
  <DialogoFormulario
    v-model="visivel"
    titulo="Criar Contrato (a partir de Proposta)"
    rotulo-primario="Salvar Contrato"
    largura="500px"
    @primario="enviar"
  >
    <form class="form-stack" @submit.prevent="enviar">

      <div class="field-group">
        <label class="field-label">Proposta</label>
        <Dropdown
          v-bind="bind('propostaId')"
          :options="propostasMock"
          optionLabel="nome"
          optionValue="id"
          placeholder="Selecione a proposta aceita"
          class="input-clean-dropdown"
          appendTo="body"
        />
        <small v-if="erroCampo('propostaId')" class="error-text">{{ erroCampo('propostaId') }}</small>
      </div>

      <div class="field-group">
        <label class="field-label">Data de Início</label>
        <Calendar
          v-bind="bind('data_inicio')"
          dateFormat="dd/mm/yy"
          placeholder="dd/mm/aaaa"
          class="input-clean-calendar"
          :manualInput="false"
          showIcon
          appendTo="body"
        />
        <small v-if="erroCampo('data_inicio')" class="error-text">{{ erroCampo('data_inicio') }}</small>
      </div>

      <div class="field-group">
        <label class="field-label">Data de Fim</label>
        <Calendar
          v-bind="bind('data_fim')"
          dateFormat="dd/mm/yy"
          placeholder="dd/mm/aaaa"
          class="input-clean-calendar"
          :manualInput="false"
          showIcon
          appendTo="body"
        />
        <small v-if="erroCampo('data_fim')" class="error-text">{{ erroCampo('data_fim') }}</small>
      </div>

      <div class="field-group">
        <label class="field-label">Status</label>
        <Dropdown
          v-bind="bind('status')"
          :options="statusOptions"
          placeholder="Selecione o status"
          class="input-clean-dropdown"
          appendTo="body"
        />
        <small v-if="erroCampo('status')" class="error-text">{{ erroCampo('status') }}</small>
      </div>

    </form>
  </DialogoFormulario>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import DialogoFormulario from '../../core/DialogFormulario.vue'
import { z } from 'zod'
import { useValidadorZod } from '@/composables/userValidateZod'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'enviar'])

const visivel = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

// Aqui eu adicionei dados mock para as propostas para melhor visualização de front-end
const propostasMock = ref([
  { id: 101, nome: 'Proposta #101 (Tech Solutions)' },
  { id: 102, nome: 'Proposta #102 (Coffee House)' },
  { id: 103, nome: 'Proposta #103 (Alpha Logistics)' },
])

const statusOptions = ref(['Ativo', 'Pendente', 'Concluído'])

const esquema = z.object({
  propostaId: z.number({ message: 'Selecione uma proposta' }).min(1, 'Selecione uma proposta'),
  data_inicio: z.date({ message: 'Data de início é obrigatória' }),
  data_fim: z.date({ message: 'Data de fim é obrigatória' }),
  status: z.string().min(1, 'Status é obrigatório'),
})

const { valores, validar, bind, erroCampo } = useValidadorZod(esquema, {
  propostaId: undefined,
  data_inicio: undefined,
  data_fim: undefined,
  status: '',
} as any)

async function enviar() {
  const ok = await validar()
  if (!ok) return
  emit('enviar', valores.value)
}
</script>

<style scoped>
.form-stack {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0.5rem 0;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-label {
  color: #123b2d;
  font-weight: 700;
  font-size: 0.95rem;
  margin-left: 0.25rem;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
  margin-left: 0.25rem;
}

:deep(.input-clean-dropdown) {
  background: #eff3f4;
  border: none;
  border-radius: 12px;
  width: 100%;
  padding: 0.3rem 0.5rem;
  box-shadow: none !important;
  display: flex;
  align-items: center;
}

:deep(.input-clean-dropdown .p-dropdown-label) {
  background: transparent;
  color: #123b2d;
  font-weight: 500;
  padding: 0.5rem 0.5rem;
}

:deep(.input-clean-dropdown:not(.p-disabled):hover) {
  background: #e5e7eb;
}

:deep(.input-clean-dropdown.p-focus) {
  box-shadow: 0 0 0 2px #34d399 !important;
  background: #ffffff;
}

:deep(.input-clean-calendar) {
  width: 100%;
}

:deep(.input-clean-calendar .p-inputtext) {
  background: #eff3f4;
  border: none;
  border-radius: 12px;
  padding: 1rem 1.2rem;
  font-size: 0.95rem;
  color: #123b2d;
  width: 100%;
  box-shadow: none !important;
}

:deep(.input-clean-calendar .p-inputtext:enabled:focus) {
  background: #ffffff;
  box-shadow: 0 0 0 2px #34d399 !important;
}

:deep(.input-clean-calendar .p-button) {
    background: transparent;
    border: none;
    color: #123b2d;
}
</style>
