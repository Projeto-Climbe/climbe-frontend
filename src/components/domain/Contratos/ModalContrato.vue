<template>
  <DialogoFormulario
    v-model="visivel"
    titulo="Criar Contrato (a partir de Proposta)"
    rotulo-primario="Salvar Contrato"
    @primario="enviar"
  >
    <form class="grid gap-3 pt-2" @submit.prevent="enviar">
      
      <CampoFormulario rotulo="Proposta" :mensagem-erro="erroCampo('propostaId')">
        <Dropdown 
          v-bind="bind('propostaId')" 
          :options="propostasMock"
          optionLabel="nome"
          optionValue="id"
          placeholder="Selecione a proposta aceita"
        />
      </CampoFormulario>

      <div class="grid md:grid-cols-2 gap-3">
        <CampoFormulario rotulo="Data de Início" :mensagem-erro="erroCampo('data_inicio')">
          <Calendar v-bind="bind('data_inicio')" dateFormat="dd/mm/yy" />
        </CampoFormulario>
        
        <CampoFormulario rotulo="Data de Fim" :mensagem-erro="erroCampo('data_fim')">
          <Calendar v-bind="bind('data_fim')" dateFormat="dd/mm/yy" />
        </CampoFormulario>
      </div>

      <CampoFormulario rotulo="Status" :mensagem-erro="erroCampo('status')">
        <Dropdown 
          v-bind="bind('status')" 
          :options="statusOptions"
          placeholder="Selecione o status"
        />
      </CampoFormulario>

    </form>
  </DialogoFormulario>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import CampoFormulario from '../../core/CampoFormulario.vue'
import DialogoFormulario from '../../core/DialogFormulario.vue'
import { z } from 'zod'
import { useValidadorZod } from '../../../composables/userValidateZod' // Ajuste o caminho

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'enviar'])

const visivel = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

// --- Dados Mockados para os Formulários ---
const propostasMock = ref([
  { id: 101, nome: 'Proposta #101 (Tech Solutions)' },
  { id: 102, nome: 'Proposta #102 (Coffee House)' },
  { id: 103, nome: 'Proposta #103 (Alpha Logistics)' },
])

const statusOptions = ref(['Ativo', 'Pendente', 'Concluído'])
// --- Fim dos Dados Mockados ---

const esquema = z.object({
  propostaId: z.number().min(1, "Selecione uma proposta"),
  data_inicio: z.string().min(1, "Data de início é obrigatória"),
  data_fim: z.string().min(1, "Data de fim é obrigatória"),
  status: z.string().min(1, "Status é obrigatório"),
})

const { valores, validar, bind, erroCampo } = useValidadorZod(esquema, {
  propostaId: 0,
  data_inicio: '',
  data_fim: '',
  status: '',
})

async function enviar() {
  const ok = await validar()
  if (!ok) return
  emit('enviar', valores)
}
</script>