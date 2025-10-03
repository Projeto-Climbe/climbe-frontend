<script setup lang="ts">
import { ref } from 'vue'
import ModalBase from '../ui/ModalBase.vue'

const props = defineProps<{ show: boolean; width?: number | string }>()
const emit = defineEmits<{ (e:'close'):void; (e:'save', payload:any):void }>()

const form = ref({ nomeFantasia:'', razaoSocial:'', cnpj:'', email:'', telefone:'' })
const error = ref('')

function onSave() {
  if (!form.value.nomeFantasia || !form.value.razaoSocial || !form.value.cnpj || !form.value.email || !form.value.telefone) {
    error.value = 'Preencha todos os campos para continuar'
    return
  }
  error.value = ''
  emit('save', { ...form.value })
}
</script>

<template>
  <ModalBase :show="props.show" :width="props.width ?? 420" @close="emit('close')">
    <div class="header">
      <h2>Cadastrar empresas</h2>
      <button class="close" @click="emit('close')">×</button>
    </div>

    <form class="form" @submit.prevent="onSave">
      <input v-model="form.nomeFantasia" class="field" placeholder="Nome Fantasia" />
      <input v-model="form.razaoSocial" class="field" placeholder="Razão Social" />
      <input v-model="form.cnpj"        class="field" placeholder="CNPJ" />
      <input v-model="form.email"       class="field" type="email" placeholder="Email" />
      <input v-model="form.telefone"    class="field" placeholder="Telefone" />

      <p v-if="error" class="text-danger small">{{ error }}</p>

      <div class="footer">
        <button type="submit" class="cta">Salvar empresa</button>
      </div>
    </form>
  </ModalBase>
</template>


<style scoped>
/* layout */
.header{
  display:flex; align-items:center; justify-content:space-between;
  margin-bottom:1.25rem;
}
.header h2{
  color:#0f766e; /* emerald-700 */
  font-weight:600; font-size:1.125rem;
}
.close{
  background:transparent; border:0; color:#0f766e;
  font-size:1.25rem; line-height:1; cursor:pointer;
}
.form{ display:flex; flex-direction:column; gap:0.75rem; }
.field{
  width:100%;
  border:1px solid #e5e7eb;            /* gray-200 */
  background:#f9fafb;                   /* gray-50 */
  border-radius:12px;
  padding:0.85rem 1rem;
  font-size:0.95rem; color:#374151;     /* gray-700 */
  outline:none;
}
.field:focus{
  border-color:#34d399;                 /* emerald-400 */
  box-shadow:0 0 0 3px rgba(52,211,153,.25);
}
.footer{ display:flex; justify-content:flex-end; padding-top:0.5rem; }
.cta{
  background:#a7f3d0;                   /* emerald-200 */
  color:#064e3b;                        /* emerald-900 */
  border:0; border-radius:999px;
  padding:0.6rem 1.1rem; font-weight:600; font-size:0.9rem;
  box-shadow:0 6px 16px rgba(16,185,129,.25);
  cursor:pointer; transition:background .15s ease;
}
.cta:hover{ background:#6ee7b7; }       /* emerald-300 */
</style>
