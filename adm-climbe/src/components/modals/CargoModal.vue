<script setup lang="ts">
import { ref } from 'vue'
import ModalBase from '../ui/ModalBase.vue'

const props = defineProps<{ show:boolean; width?:number|string }>()
const emit = defineEmits<{ (e:'close'):void; (e:'back'):void; (e:'finish', payload:any):void }>()

const permissoesDisponiveis = ['Criar proposta','Validar documento','Aprovar contrato']
const form = ref({ nome:'', descricao:'', permissoes:[] as string[] })
const error = ref('')

function toggle(p:string){
  const i=form.value.permissoes.indexOf(p)
  i>=0 ? form.value.permissoes.splice(i,1) : form.value.permissoes.push(p)
}

function onFinish(){
  if (!form.value.nome || !form.value.descricao || form.value.permissoes.length===0) {
    error.value = 'Preencha todos os campos e selecione pelo menos uma permissão'
    return
  }
  error.value = ''
  emit('finish', { ...form.value })
}
</script>

<template>
  <ModalBase :show="props.show" :width="props.width ?? 560" @close="emit('close')">
    <div class="header">
      <h2>Definir cargo</h2>
      <button class="close" @click="emit('close')">×</button>
    </div>

    <form class="form" @submit.prevent="onFinish">
      <input v-model="form.nome" class="field" placeholder="Cargo" />
      <textarea v-model="form.descricao" class="field textarea" placeholder="Descrição do cargo" />

      <div class="group">
        <label class="label">Permissões</label>
        <div class="checks">
          <label v-for="p in permissoesDisponiveis" :key="p" class="check">
            <input type="checkbox" :checked="form.permissoes.includes(p)" @change="toggle(p)" />
            <span>{{ p }}</span>
          </label>
        </div>
      </div>

      <p v-if="error" class="text-danger small">{{ error }}</p>

      <div class="actions">
        <button type="button" class="ghost" @click="emit('back')">Voltar</button>
        <button type="submit" class="cta">Finalizar cadastro</button>
      </div>
    </form>
  </ModalBase>
</template>

<style scoped>
.header{ display:flex; align-items:center; justify-content:space-between; margin-bottom:1.25rem; }
.header h2{ color:#0f766e; font-weight:600; font-size:1.125rem; }
.close{ background:transparent; border:0; color:#0f766e; font-size:1.25rem; line-height:1; cursor:pointer; }

.form{ display:flex; flex-direction:column; gap:0.75rem; }
.field{
  width:100%; border:1px solid #e5e7eb; background:#f9fafb;
  border-radius:12px; padding:0.85rem 1rem; font-size:0.95rem; color:#374151; outline:none;
}
.field:focus{ border-color:#34d399; box-shadow:0 0 0 3px rgba(52,211,153,.25); }
.textarea{ min-height:92px; resize:vertical; }

.group{ margin-top:0.25rem; }
.label{ display:block; margin-bottom:0.35rem; font-weight:600; color:#374151; }
.checks{ display:flex; flex-direction:column; gap:0.5rem; }
.check{ display:flex; align-items:center; gap:0.5rem; color:#374151; }
.check input{
  width:18px; height:18px; border-radius:6px; accent-color:#10b981; /* emerald-500 */
}

.actions{ display:flex; justify-content:space-between; gap:0.75rem; padding-top:0.5rem; }
.ghost{
  background:#e5f9f1; color:#065f46; border:0; border-radius:999px; padding:0.6rem 1.1rem; font-weight:600; cursor:pointer;
}
.cta{
  background:#a7f3d0; color:#064e3b; border:0; border-radius:999px; padding:0.6rem 1.1rem; font-weight:600; cursor:pointer;
  box-shadow:0 6px 16px rgba(16,185,129,.25);
}
.cta:hover{ background:#6ee7b7; }
</style>
