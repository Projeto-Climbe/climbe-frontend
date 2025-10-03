<script setup lang="ts">
import { ref } from 'vue'
import ModalBase from '../ui/ModalBase.vue'

const props = defineProps<{ show: boolean; width?: number|string }>()
const emit = defineEmits<{ (e:'close'):void; (e:'back'):void; (e:'save', payload:any):void }>()

const form = ref({ nome:'', email:'', cpf:'', senha:'' })
const error = ref('')

function onSave() {
  if (!form.value.nome || !form.value.email || !form.value.cpf || !form.value.senha) {
    error.value = 'Preencha todos os campos para continuar'
    return
  }
  error.value = ''
  emit('save', { ...form.value })
}
</script>

<template>
  <ModalBase :show="props.show" :width="props.width ?? 560" @close="emit('close')">
    <div class="header">
      <h2>Cadastrar usuário</h2>
      <button class="close" @click="emit('close')">×</button>
    </div>

    <form class="grid" @submit.prevent="onSave">
      <input v-model="form.nome"  class="field" placeholder="Nome" />
      <input v-model="form.email" class="field" type="email" placeholder="Email" />
      <input v-model="form.cpf"   class="field" placeholder="CPF" />
      <input v-model="form.senha" class="field" type="password" placeholder="Senha" />

      <p v-if="error" class="text-danger small">{{ error }}</p>

      <div class="actions">
        <button type="button" class="ghost" @click="emit('back')">Voltar</button>
        <button type="submit" class="cta">Salvar usuário</button>
      </div>
    </form>
  </ModalBase>
</template>

<style scoped>
.header{ display:flex; align-items:center; justify-content:space-between; margin-bottom:1.25rem; }
.header h2{ color:#0f766e; font-weight:600; font-size:1.125rem; }
.close{ background:transparent; border:0; color:#0f766e; font-size:1.25rem; line-height:1; cursor:pointer; }

.grid{ display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; }
.grid .field:nth-child(1), .grid .field:nth-child(2){ grid-column:span 1; }
.grid .field:nth-child(3), .grid .field:nth-child(4){ grid-column:span 1; }
@media (max-width:640px){ .grid{ grid-template-columns:1fr; } }

.field{
  width:100%; border:1px solid #e5e7eb; background:#f9fafb;
  border-radius:12px; padding:0.85rem 1rem; font-size:0.95rem; color:#374151;
  outline:none;
}
.field:focus{ border-color:#34d399; box-shadow:0 0 0 3px rgba(52,211,153,.25); }

.actions{
  grid-column:1 / -1; display:flex; justify-content:space-between; gap:0.75rem; padding-top:0.5rem;
}
.ghost{
  background:#e5f9f1; color:#065f46; border:0; border-radius:999px; padding:0.6rem 1.1rem; font-weight:600; cursor:pointer;
}
.cta{
  background:#a7f3d0; color:#064e3b; border:0; border-radius:999px; padding:0.6rem 1.1rem; font-weight:600; cursor:pointer;
  box-shadow:0 6px 16px rgba(16,185,129,.25);
}
.cta:hover{ background:#6ee7b7; }
</style>
