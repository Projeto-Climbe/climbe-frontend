<template>
  <div class="contrato-form-container">
    
    <div class="page-header">
      <h1 class="page-title">Criar Novo Contrato</h1>
      <Button 
        label="Voltar para Contratos" 
        icon="pi pi-arrow-left" 
        class="btn-primaria" 
        @click="voltar" 
      />
    </div>

    <div class="card-soft mt-4">
      <form class="form-layout" @submit.prevent="enviar">
        
        <div class="form-field">
          <label for="proposta">Proposta</label>
          <Dropdown 
            id="proposta"
            v-bind="bind('propostaId')" 
            :options="propostasMock"
            optionLabel="nome"
            optionValue="id"
            placeholder="Selecione a proposta aceita"
            :invalid="!!erroCampo('propostaId')"
            class="w-full custom-input-style" 
          />
          <small v-if="erroCampo('propostaId')" class="p-error">{{ erroCampo('propostaId') }}</small>
        </div>

        <div class="form-grid">
          <div class="form-field">
            <label for="data_inicio">Data de Início</label>
            <Calendar 
              id="data_inicio"
              v-bind="bind('data_inicio')" 
              dateFormat="dd/mm/yy" 
              :invalid="!!erroCampo('data_inicio')"
              class="w-full custom-input-style" 
            />
            <small v-if="erroCampo('data_inicio')" class="p-error">{{ erroCampo('data_inicio') }}</small>
          </div>
          <div class="form-field">
            <label for="data_fim">Data de Fim</label>
            <Calendar 
              id="data_fim"
              v-bind="bind('data_fim')" 
              dateFormat="dd/mm/yy" 
              :invalid="!!erroCampo('data_fim')"
              class="w-full custom-input-style" 
            />
            <small v-if="erroCampo('data_fim')" class="p-error">{{ erroCampo('data_fim') }}</small>
          </div>
        </div>

        <div class="form-field">
          <label for="status">Status</label>
          <Dropdown 
            id="status"
            v-bind="bind('status')" 
            :options="statusOptions"
            placeholder="Selecione o status"
            :invalid="!!erroCampo('status')"
            class="w-full custom-input-style" 
          />
          <small v-if="erroCampo('status')" class="p-error">{{ erroCampo('status') }}</small>
        </div>

        <div class="form-actions">
          <Button label="Cancelar" text @click="voltar" /> 
          <Button label="Salvar Contrato" class="btn-primaria" type="submit" />
        </div>
      </form>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'
import { z } from 'zod'
import { useValidadorZod } from '@/composables/userValidateZod'

const router = useRouter() 

const propostasMock = ref([
  { id: 101, nome: 'Proposta #101 (Tech Solutions)' },
  { id: 102, nome: 'Proposta #102 (Coffee House)' },
  { id: 103, nome: 'Proposta #103 (Alpha Logistics)' },
])
const statusOptions = ref(['Ativo', 'Pendente', 'Concluído'])

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
  
  console.log('Salvando dados mockados:', valores)
  voltar()
}

function voltar() {
  router.push({ name: 'contratos' })
}
</script>

<style scoped>
.contrato-form-container {
  padding: 2rem; 
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.page-title {
  font-size: 1.8rem;
  color: #333;
  font-weight: 600;
}
.card-soft {
  padding: 2.5rem; 
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
.mt-4 {
  margin-top: 1rem;
}

.form-layout {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.form-field label {
  font-weight: 500;
  color: #495057;
}
.p-error {
  color: #e24c4c;
  font-size: 0.875rem;
}
.w-full {
  width: 100%;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-top: 1rem;
  margin-top: 1rem;
  border-top: 1px solid #dee2e6;
}
.btn-primaria {
  background-color: #34d399; 
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
}


.p-dropdown, .p-calendar .p-inputtext, .p-inputtext {
  border: 1px solid #ced4da; 
  border-radius: 6px;
  padding: 0.75rem; 
  background-color: #ffffff; 
  transition: border-color 0.2s, box-shadow 0.2s;
}

.p-dropdown.p-focus, .p-calendar.p-focus .p-inputtext, .p-inputtext:focus {
  border-color: #34d399;
  box-shadow: 0 0 0 0.2rem rgba(52, 211, 153, 0.25); 
  outline: 0 none; 
}

.p-dropdown.p-invalid, .p-calendar.p-invalid .p-inputtext, .p-inputtext.p-invalid {
  border-color: #e24c4c;
}

.p-dropdown {
  height: 2.8rem;
  display: flex; 
  align-items: center;
}
.p-calendar .p-inputtext {
  width: 100%; 
}
</style>