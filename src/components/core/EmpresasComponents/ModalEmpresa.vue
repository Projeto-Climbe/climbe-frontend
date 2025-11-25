<template>
  <DialogoFormulario
    v-model="visivel"
    titulo="Cadastrar empresas"
    rotulo-primario="Salvar empresa"
    largura="500px"
    @primario="enviar"
  >
    <form class="form-stack" @submit.prevent="enviar">

      <div class="campo-wrapper">
        <InputText
          v-bind="bind('nomeFantasia')"
          placeholder="Nome Fantasia"
          :class="{ 'p-invalid': erroCampo('nomeFantasia') }"
          class="input-clean"
        />
        <small v-if="erroCampo('nomeFantasia')" class="erro-texto">{{ erroCampo('nomeFantasia') }}</small>
      </div>

      <div class="campo-wrapper">
        <InputText
          v-bind="bind('razaoSocial')"
          placeholder="Razão Social"
          :class="{ 'p-invalid': erroCampo('razaoSocial') }"
          class="input-clean"
        />
        <small v-if="erroCampo('razaoSocial')" class="erro-texto">{{ erroCampo('razaoSocial') }}</small>
      </div>

      <div class="campo-wrapper">
        <InputText
          v-bind="bind('cnpj')"
          placeholder="CNPJ"
          :class="{ 'p-invalid': erroCampo('cnpj') }"
          class="input-clean"
        />
        <small v-if="erroCampo('cnpj')" class="erro-texto">{{ erroCampo('cnpj') }}</small>
      </div>

      <div class="campo-wrapper">
        <InputText
          v-bind="bind('email')"
          type="email"
          placeholder="Email"
          :class="{ 'p-invalid': erroCampo('email') }"
          class="input-clean"
        />
        <small v-if="erroCampo('email')" class="erro-texto">{{ erroCampo('email') }}</small>
      </div>

      <div class="campo-wrapper">
        <InputText
          v-bind="bind('telefone')"
          placeholder="Telefone"
          :class="{ 'p-invalid': erroCampo('telefone') }"
          class="input-clean"
        />
        <small v-if="erroCampo('telefone')" class="erro-texto">{{ erroCampo('telefone') }}</small>
      </div>

    </form>
  </DialogoFormulario>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import InputText from 'primevue/inputtext'
import { z } from 'zod'
import DialogoFormulario from '../DialogFormulario.vue'
import { useValidadorZod } from '@/composables/userValidateZod'

const props = defineProps<{ modelValue: boolean }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'enviar', payload: CompanyFormData): void
}>()

interface CompanyFormData {
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  email: string;
  telefone: string;
}

const valoresIniciais: CompanyFormData = {
  nomeFantasia: '',
  razaoSocial: '',
  cnpj: '',
  email: '',
  telefone: '',
}

const esquema = z.object({
  nomeFantasia: z.string().trim().min(1, 'Informe o nome fantasia'),
  razaoSocial: z.string().trim().min(1, 'Informe a razão social'),
  cnpj: z.string().trim().min(14, 'Informe o CNPJ'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().trim().min(1, 'Informe o telefone'),
})

const { valores, bind, validar, erroCampo } = useValidadorZod(esquema, valoresIniciais)

const visivel = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

watch(
  () => props.modelValue,
  (visivel) => {
    if (!visivel) {
      Object.assign(valores.value, valoresIniciais)
    }
  },
)

async function enviar() {
  const valido = await validar()
  if (!valido) return
  emit('enviar', { ...valores.value })
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
  gap: 0.25rem;
  width: 100%;
}

.erro-texto {
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 0.5rem;
}
</style>
