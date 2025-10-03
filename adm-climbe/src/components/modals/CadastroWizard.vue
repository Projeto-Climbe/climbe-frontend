<script setup lang="ts">
import { ref, watch } from 'vue'
import EmpresaModal from './EmpresaModal.vue'
import UsuarioModal from './UsuarioModal.vue'
import CargoModal   from './CargoModal.vue'

type Step = 'empresa' | 'usuario' | 'cargo' | null

// v-model para abrir/fechar o wizard de fora (quando tiver Dashboard)
const props = withDefaults(defineProps<{
  modelValue?: boolean   // controla abrir/fechar
}>(), {
  modelValue: true       // por enquanto: abre sozinho enquanto não há dashboard
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

const step = ref<Step>(props.modelValue ? 'empresa' : null)

// sincroniza quando o pai (no futuro) mudar o v-model
watch(() => props.modelValue, (v) => {
  step.value = v ? 'empresa' : null
})

// fechar tudo
function closeAll () {
  step.value = null
  emit('update:modelValue', false)
}

// transições
function onSaveEmpresa(_payload: any) { step.value = 'usuario' }
function onBackUsuario()              { step.value = 'empresa' }
function onSaveUsuario(_payload: any) { step.value = 'cargo' }
function onBackCargo()                { step.value = 'usuario' }
function onFinishCargo(_payload: any) { closeAll() }
</script>

<template>
  <!-- Empresa -->
  <EmpresaModal
    :show="step === 'empresa'"
    :width="420"
    @close="closeAll"
    @save="onSaveEmpresa"
  />

  <!-- Usuário -->
  <UsuarioModal
    :show="step === 'usuario'"
    :width="560"
    @close="closeAll"
    @back="onBackUsuario"
    @save="onSaveUsuario"
  />

  <!-- Cargo -->
  <CargoModal
    :show="step === 'cargo'"
    :width="560"
    @close="closeAll"
    @back="onBackCargo"
    @finish="onFinishCargo"
  />
</template>
