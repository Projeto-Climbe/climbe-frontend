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
import { useValidadorZod } from '../../../composables/userValidateZod'

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

<style scoped>
/* ======== DIALOGO PRINCIPAL ======== */
.p-dialog {
  background: rgba(210, 255, 234, 0.95) !important; /* verde claro semiopaco */
  border-radius: 1rem !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
  padding: 1.5rem !important;
  width: 480px !important;
  max-width: 95vw;
  animation: zoomIn 0.25s ease;
  backdrop-filter: blur(6px); /* leve desfoque dentro do modal */
}

/* ======== FUNDO DESFOCADO ======== */
.p-dialog-mask {
  background-color: rgba(0, 64, 43, 0.4) !important; /* verde escuro translúcido */
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  transition: all 0.3s ease-in-out;
}

/* ======== CABEÇALHO ======== */
.p-dialog-header {
  background-color: var(--mint-200);
  border-bottom: 1px solid var(--mint-400);
  color: var(--teal-900);
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
  border-radius: 1rem 1rem 0 0;
}

/* ======== BOTÃO FECHAR ======== */
.p-dialog-header-icons .p-dialog-header-close:nth-child(2) {
  display: none !important;
}

.p-dialog-header-close {
  color: var(--teal-900);
  font-size: 1.2rem;
  opacity: 0.85;
  transition: transform 0.2s ease, opacity 0.2s;
}

.p-dialog-header-close:hover {
  opacity: 1;
  transform: scale(1.15);
}

/* ======== FORMULÁRIO ======== */
form {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

/* Campos de entrada */
.p-inputtext,
.p-password-input,
.p-inputmask {
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--mint-400);
  border-radius: 8px;
  background-color: #ffffff;
  color: var(--teal-900);
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.p-inputtext:focus,
.p-password-input:focus,
.p-inputmask:focus {
  border-color: var(--mint-600);
  box-shadow: 0 0 0 2px rgba(87, 198, 170, 0.25);
  outline: none;
}

/* ======== RODAPÉ ======== */
.p-dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  border-top: 1px solid var(--mint-300);
  padding-top: 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0 0 1rem 1rem;
}

.p-button {
  border-radius: var(--radius-button);
}

/* ======== ANIMAÇÃO ======== */
@keyframes zoomIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

