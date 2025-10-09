<template>
  <div class="card-soft cartao" role="button" tabindex="0" @click="ir" @keyup.enter="ir">
    <div class="topo">
      <h4 class="titulo">{{ titulo }}</h4>
      <i class="pi pi-angle-right icone-mudo"></i>
    </div>

    <div class="conteudo">
      <div class="metrica">
        <div class="valor">{{ valor }}</div>
        <div class="sub">{{ descricao }}</div>
      </div>
      <i v-if="icone" :class="['pi', icone, 'icone-grande']"></i>
    </div>

    <div v-if="selo" class="selo" :data-variante="selo.tipo || 'neutro'">
      <i v-if="selo.tipo === 'alerta'" class="pi pi-exclamation-triangle"></i>
      <i v-else-if="selo.tipo === 'sucesso'" class="pi pi-check-circle"></i>
      <i v-else-if="selo.tipo === 'info'" class="pi pi-info-circle"></i>
      <span>{{ selo.texto }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'

  type TipoSelo = 'neutro' | 'info' | 'sucesso' | 'alerta'

  const props = defineProps<{
    titulo: string
    valor: number | string
    descricao?: string
    icone?: string
    rota?: string
    selo?: { texto: string; tipo?: TipoSelo }
  }>()

  const router = useRouter()
  function ir() {
    if (props.rota) router.push(props.rota)
  }
</script>

<style scoped>
  .cartao {
    padding: 0.9rem 1rem 1.1rem;
    transition:
      transform 0.15s,
      box-shadow 0.15s;
    position: relative;
  }
  .cartao:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
  }
  .topo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.35rem;
  }
  .titulo {
    color: var(--teal-800);
    margin: 0;
    font-weight: 600;
  }
  .icone-mudo {
    color: #9ca3af;
  }
  .conteudo {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .metrica .valor {
    color: var(--ink-900);
    font-weight: 800;
    font-size: 2.25rem;
    line-height: 1;
  }
  .metrica .sub {
    color: var(--text-500);
    margin-top: 0.25rem;
  }
  .icone-grande {
    font-size: 3.2rem;
    opacity: 0.18;
    color: var(--ink-900);
  }
  .selo {
    position: absolute;
    left: 1rem;
    bottom: 0.8rem;
    display: inline-flex;
    gap: 0.35rem;
    border-radius: 999px;
    padding: 0.22rem 0.55rem;
    font-size: 0.8rem;
    background: #e5e7eb;
    color: #374151;
  }
  .selo[data-variante='info'] {
    background: #e0f2fe;
    color: #075985;
  }
  .selo[data-variante='sucesso'] {
    background: #d1fae5;
    color: #065f46;
  }
  .selo[data-variante='alerta'] {
    background: #fee2e2;
    color: #991b1b;
  }
</style>
