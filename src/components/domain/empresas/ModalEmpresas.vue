<template>
  <DialogoFormulario
    v-model="visivel"
    titulo="Cadastrar empresas"
    rotulo-primario="Salvar empresa"
    @primario="enviar"
  >
    <form class="grid gap-3 pt-2" @submit.prevent="enviar">
      <CampoFormulario rotulo="Nome Fantasia" :mensagem-erro="erroCampo('nomeFantasia')">
        <InputText v-bind="bind('nomeFantasia')" />
      </CampoFormulario>

      <CampoFormulario rotulo="Razão Social" :mensagem-erro="erroCampo('razaoSocial')">
        <InputText v-bind="bind('razaoSocial')" />
      </CampoFormulario>

      <div class="grid md:grid-cols-2 gap-3">
        <CampoFormulario rotulo="CNPJ" :mensagem-erro="erroCampo('cnpj')">
          <InputMask mask="99.999.999/9999-99" v-bind="bind('cnpj')" />
        </CampoFormulario>
        <CampoFormulario rotulo="Email" :mensagem-erro="erroCampo('email')">
          <InputText v-bind="bind('email')" />
        </CampoFormulario>
      </div>

      <CampoFormulario rotulo="Telefone" :mensagem-erro="erroCampo('telefone')">
        <InputMask mask="(99) 99999-9999" v-bind="bind('telefone')" />
      </CampoFormulario>
    </form>
  </DialogoFormulario>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import InputText from 'primevue/inputtext'
  import InputMask from 'primevue/inputmask'
  import CampoFormulario from '../../core/CampoFormulario.vue'
  import DialogoFormulario from '../../core/DialogFormulario.vue'
  import { z } from 'zod'
  import { useValidadorZod } from '../../../composables/userValidateZod'

  const props = defineProps<{ modelValue: boolean }>()
  const emit = defineEmits(['update:modelValue', 'enviar'])

  const visivel = computed({
    get: () => props.modelValue,
    set: (v: boolean) => emit('update:modelValue', v),
  })

  const esquema = z.object({
    nomeFantasia: z.string().min(2),
    razaoSocial: z.string().min(2),
    cnpj: z.string().min(18),
    email: z.string().email(),
    telefone: z.string().min(14),
  })

  const { valores, validar, bind, erroCampo } = useValidadorZod(esquema, {
    nomeFantasia: '',
    razaoSocial: '',
    cnpj: '',
    email: '',
    telefone: '',
  })

  async function enviar() {
    const ok = await validar()
    if (!ok) return
    emit('enviar', valores)
  }
</script>
