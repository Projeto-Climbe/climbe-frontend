<template>
  <div class="cartao" role="button" tabindex="0" @click="ir" @keyup.enter="ir">
    <!-- faixa de título -->
    <div class="faixa">
      <h4 class="titulo">{{ titulo }}</h4>
      <span class="faixa-arrow">
        <i class="pi pi-angle-right"></i>
      </span>
    </div>

    <!-- conteúdo -->
    <div class="conteudo">
      <div class="metrica">
        <div class="valor">{{ valor }}</div>
        <div class="sub" v-if="descricao">{{ descricao }}</div>

        <div v-if="selo" class="selo" :data-variante="selo.tipo || 'neutro'">
          <span class="bol"></span>
          <span>{{ selo.texto }}</span>
        </div>
      </div>

      <!-- ícone grande (ghost) -->
      <img v-if="iconeUrl" :src="iconeUrl" alt="" class="ghost" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

/** SVGs do Figma */
import IconContratos    from '@/assets/icons/document-attachment.svg'
import IconReunioesTop  from '@/assets/icons/camera-tripod.svg'
import IconDocumentos   from '@/assets/icons/file-01.svg'
import IconPropostas    from '@/assets/icons/purse.svg'
import IconReunioesMini from '@/assets/icons/camera-video.svg'

type TipoSelo = 'neutro' | 'info' | 'sucesso' | 'alerta'

const props = defineProps<{
  titulo: string
  valor: number | string
  descricao?: string
  icone?: string
  rota?: string
  selo?: { texto: string; tipo?: TipoSelo }
}>()

const iconeUrl = computed(() => {
  const i = (props.icone || '').toLowerCase()
  if (i.includes('file-edit'))   return IconContratos
  if (i.endsWith(' file') || i.includes(' pi-file ') || i.endsWith('pi-file')) return IconDocumentos
  if (i.includes('video'))       return IconReunioesTop
  if (i.includes('wallet'))      return IconPropostas
  if (i.includes('calendar'))    return IconReunioesMini
  return undefined
})

const router = useRouter()
function ir() { if (props.rota) router.push(props.rota) }
</script>

<style scoped>
/* cartão base */
.cartao{
  position: relative;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 12px 36px rgba(24,39,33,.10);
  padding: 18px 18px 20px;
}

/* faixa superior */
.faixa{
  display:flex; align-items:center; justify-content:space-between;
  background:#f3f9f6; /* tom esverdeado claro */
  border-radius: 14px;
  padding: 10px 14px;
  margin-bottom: 14px;
}
.titulo{
  margin: 0;
  font-weight: 800;
  color:#1f8a74;
  letter-spacing:.2px;
}
.faixa-arrow{
  width:28px;height:28px;border-radius:999px;
  background:#e9f6f1; display:grid;place-items:center;color:#1f8a74;
}

/* conteúdo */
.conteudo{ display:flex; align-items:center; justify-content:space-between; min-height:90px; }
.metrica .valor{ font-size:40px; line-height:1; font-weight:800; color:#1e2b27; }
.metrica .sub{ color:#6a7b75; margin-top:6px; }

/* selo (pill) */
.selo{
  display:inline-flex; align-items:center; gap:6px;
  margin-top:10px;
  border-radius:999px; padding:6px 10px; font-weight:700; font-size:12px;
  background:#eef3f0; color:#48635b;
}
.selo[data-variante='info']    { background:#e7f0ff; color:#4173c8; }
.selo[data-variante='sucesso'] { background:#dff6ea; color:#2c8f73; }
.selo[data-variante='alerta']  { background:#ffe4e4; color:#d05a5a; }
.selo .bol{ width:14px;height:14px;border-radius:4px; background:currentColor; opacity:.18; }

/* ícone ghost */
.ghost{
  width:84px; height:84px; object-fit:contain; opacity:.16;
  margin-right:6px;
}
</style>
