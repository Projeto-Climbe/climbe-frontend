<template>
  <div class="agenda-card">
    <!-- faixa de título -->
    <div class="faixa">
      <h4 class="titulo">Agenda</h4>
      <span class="faixa-arrow"><i class="pi pi-angle-right"></i></span>
    </div>

    <!-- cabeçalho pequeno -->
    <div class="cab">
      <span class="rotulo">{{ rotuloData }}</span>
      <small class="muted">{{ cabecalhoDireita }}</small>
    </div>

    <!-- lista -->
    <ul class="lista">
      <li v-for="(it, i) in itens" :key="i" class="linha">
        <div class="esq">
          <span class="cam"><i class="pi pi-video"></i></span>
          <div class="txts">
            <div class="nome">{{ it.titulo }}</div>
            <a
              v-if="it.link"
              :href="it.link"
              target="_blank"
              rel="noopener"
              class="link muted"
            >
              {{ (it.link || '').replace(/^https?:\/\//, '') }}
            </a>
          </div>
        </div>

        <div class="dir">
          <div class="hora">{{ it.inicio }}</div>
          <small class="muted">{{ it.fim }}</small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  rotuloData: string
  cabecalhoDireita?: string
  itens: Array<{ titulo: string; link?: string; inicio: string; fim: string }>
}>()
</script>

<style scoped>
/* cartão base */
.agenda-card{
  background:#fff;
  border-radius:24px;
  box-shadow:0 12px 36px rgba(24,39,33,.10);
  padding:18px;
}

/* faixa superior (verde clarinho) */
.faixa{
  display:flex; align-items:center; justify-content:space-between;
  background:#f3f9f6;
  border-radius:14px;
  padding:10px 14px;
  margin-bottom:12px;
}
.titulo{ margin:0; color:#1f8a74; font-weight:800; letter-spacing:.2px }
.faixa-arrow{
  width:28px;height:28px;border-radius:999px;
  background:#e9f6f1; display:grid; place-items:center; color:#1f8a74
}

/* cabeçalho pequeno (Hoje | data) */
.cab{
  display:flex; align-items:center; justify-content:space-between;
  padding:0 4px 6px; margin-bottom:2px;
}
.rotulo{ font-weight:700; color:#0e2622 }
.muted{ color:#7a8b86 }

/* lista */
.lista{
  list-style:none; padding:0; margin:0;
  display:flex; flex-direction:column; gap:10px;
}
.linha{
  background:#f7faf9;
  border:1px solid #edf3f1;
  border-radius:16px;
  padding:10px 12px;
  display:flex; align-items:center; justify-content:space-between;
}
.esq{ display:flex; align-items:center; gap:10px }
.cam{ color:#8ba59c }
.nome{ font-weight:700; color:#1e2b27 }
.link{ text-decoration:none; font-size:.86rem }
.dir{ text-align:right; min-width:76px }
.hora{ font-weight:700; color:#1e2b27 }
</style>
