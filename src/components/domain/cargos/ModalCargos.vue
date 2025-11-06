<template>
  <DialogoFormulario
    v-model="visivel"
    titulo="Definir cargo"
    rotulo-primario="Finalizar cadastro"
    :mostrar-voltar="true"
    @primario="enviar"
    @voltar="$emit('voltar')"
  >
    <form class="grid gap-3 pt-2" @submit.prevent="enviar">
      <CampoFormulario rotulo="Cargo" :mensagem-erro="erroCampo('nome')">
        <InputText v-bind="bind('nome')" />
      </CampoFormulario>

      <CampoFormulario rotulo="Descrição do cargo">
        <Textarea v-bind="bind('descricao')" auto-resize rows="3" />
      </CampoFormulario>

      <div>
        <h4 class="titulo">Permissões</h4>
        <div class="grid gap-2">
          <div class="linha" v-for="p in permissoesDisponiveis" :key="p.chave">
            <Checkbox :inputId="p.chave" v-model="valores.permissoes" :value="p.chave" />
            <label :for="p.chave">{{ p.rotulo }}</label>
          </div>
        </div>
      </div>
    </form>
  </DialogoFormulario>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import InputText from 'primevue/inputtext'
  import Textarea from 'primevue/textarea'
  import Checkbox from 'primevue/checkbox'
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

  const permissoesDisponiveis = [
    { chave: 'criar_proposta', rotulo: 'Criar proposta' },
    { chave: 'validar_documento', rotulo: 'Validar documento' },
    { chave: 'aprovar_contrato', rotulo: 'Aprovar contrato' },
  ]

  const esquema = z.object({
    nome: z.string().min(2),
    descricao: z.string().optional(),
    permissoes: z.array(z.string()).default([]),
  })

  const { valores, validar, bind, erroCampo } = useValidadorZod(esquema, {
    nome: '',
    descricao: '',
    permissoes: [],
  })

  async function enviar() {
    const ok = await validar()
    if (!ok) return
    emit('enviar', valores)
  }
</script>

<style scoped>
  .titulo {
    color: var(--teal-800);
    margin: 0 0 0.5rem;
  }
  .linha {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
