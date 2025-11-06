<template>
  <DialogoFormulario
    v-model="visivel"
    titulo="Cadastrar usuário"
    rotulo-primario="Salvar usuário"
    :mostrar-voltar="true"
    @primario="enviar"
    @voltar="$emit('voltar')"
  >
    <form class="grid md:grid-cols-2 gap-3 pt-2" @submit.prevent="enviar">
      <CampoFormulario rotulo="Nome" :mensagem-erro="erroCampo('nome')">
        <InputText v-bind="bind('nome')" />
      </CampoFormulario>

      <CampoFormulario rotulo="Email" :mensagem-erro="erroCampo('email')">
        <InputText v-bind="bind('email')" />
      </CampoFormulario>

      <CampoFormulario rotulo="CPF" :mensagem-erro="erroCampo('cpf')">
        <InputMask mask="999.999.999-99" v-bind="bind('cpf')" />
      </CampoFormulario>

      <CampoFormulario rotulo="Senha" :mensagem-erro="erroCampo('senha')">
        <Password v-bind="bind('senha')" toggle-mask />
      </CampoFormulario>
    </form>
  </DialogoFormulario>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import InputText from 'primevue/inputtext'
  import InputMask from 'primevue/inputmask'
  import Password from 'primevue/password'
  import CampoFormulario from '../../core/CampoFormulario.vue'
  import DialogoFormulario from '../../core/DialogFormulario.vue'
  import { z } from 'zod'
  import { useValidadorZod } from '../../composables/userValidateZod'

  const props = defineProps<{ modelValue: boolean }>()
  const emit = defineEmits(['update:modelValue', 'enviar', 'voltar'])

  const visivel = computed({
    get: () => props.modelValue,
    set: (v: boolean) => emit('update:modelValue', v),
  })

  const esquema = z.object({
    nome: z.string().min(2),
    email: z.string().email(),
    cpf: z.string().min(14),
    senha: z.string().min(6),
  })

  const { valores, validar, bind, erroCampo } = useValidadorZod(esquema, {
    nome: '',
    email: '',
    cpf: '',
    senha: '',
  })

  async function enviar() {
    const ok = await validar()
    if (!ok) return
    emit('enviar', valores)
  }
</script>
