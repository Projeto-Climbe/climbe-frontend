<script setup lang="ts">
defineOptions({ name: 'AppSidebar' })
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = (name: string) => computed(() => route.name === name)
</script>

<template>
  <aside class="sb">
    <div class="sb-panel">
      <!-- topo: logo -->
      <div class="sb-logo">
        <div class="logo-mark">climb<span class="dot">.</span></div>
        <small class="logo-sub">Investimentos Independentes</small>
      </div>

      <!-- menu -->
      <nav class="sb-menu">
        <router-link
          class="sb-item"
          :class="{ active: isActive('dashboard').value }"
          :to="{ name: 'dashboard' }"
        >
          <i class="bi bi-speedometer2"></i>
          <span>Visão geral</span>
        </router-link>

        <router-link
          class="sb-item"
          :class="{ active: isActive('contratos').value }"
          :to="{ name: 'contratos' }"
        >
          <i class="bi bi-file-text"></i>
          <span>Contratos</span>
          <span class="sb-badge danger">3</span>
        </router-link>

        <router-link
          class="sb-item"
          :class="{ active: isActive('empresas').value }"
          :to="{ name: 'empresas' }"
        >
          <i class="bi bi-buildings"></i>
          <span>Empresas</span>
        </router-link>

        <router-link
          class="sb-item"
          :class="{ active: isActive('lembretes').value }"
          :to="{ name: 'lembretes' }"
        >
          <i class="bi bi-bell"></i>
          <span>Lembretes</span>
        </router-link>

        <router-link
          class="sb-item"
          :class="{ active: isActive('reunioes').value }"
          :to="{ name: 'reunioes' }"
        >
          <i class="bi bi-camera-video"></i>
          <span>Reuniões</span>
        </router-link>

        <router-link
          class="sb-item"
          :class="{ active: isActive('ajustes').value }"
          :to="{ name: 'ajustes' }"
        >
          <i class="bi bi-gear"></i>
          <span>Ajustes</span>
        </router-link>
      </nav>

      <!-- rodapé: usuário -->
      <div class="sb-user">
        <div class="avatar">U</div>
        <div class="info">
          <div class="name">Luiz Gustavo</div>
          <div class="muted">email@exemplo.com</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* largura fixa, fundo esverdeado */
.sb{
  width: 260px;
  padding: 16px;
  background: var(--cl-bg);
  min-height: 100vh;
  position: sticky;
  top: 0;
}

/* painel interno branco arredondado com sombra suave */
.sb-panel{
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(23,39,33,.08);
  padding: 18px 14px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 32px);
}

/* logo */
.sb-logo{
  padding: 8px 10px 16px;
  border-bottom: 1px solid #eef3f0;
  margin-bottom: 12px;
}
.logo-mark{
  font-weight: 800;
  font-size: 22px;
  letter-spacing: .3px;
  color: #195e50;
}
.logo-mark .dot{ color:#34c6a1 }
.logo-sub{
  color:#98a7a2;
  font-size: 11px;
}

/* menu */
.sb-menu{
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 4px;
  overflow: auto;
}

/* item base */
.sb-item{
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 14px;
  color: #2a3a36;
  text-decoration: none;
  font-weight: 600;
  position: relative;
}
.sb-item i{ font-size: 18px; color:#2f5f54; opacity:.85 }
.sb-item:hover{
  background: #f1f7f4;
}

/* ativo com “pill” verdinha */
.sb-item.active{
  background: #e6f5ef;
  color: #176a59;
}
.sb-item.active i{ color:#176a59 }

/* badge de contratos */
.sb-badge{
  margin-left: auto;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  background: #edf3f1;
  color: #2a3a36;
}
.sb-badge.danger{ background:#ffe4e4; color:#bb4545 }

/* usuário no rodapé */
.sb-user{
  margin-top: auto;
  background: #f6fbf8;
  border: 1px solid #ecf3f0;
  border-radius: 16px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.avatar{
  width: 44px; height: 44px; border-radius: 50%;
  background: #e1f5ee; color:#0f6e5b; display:grid; place-items:center;
  font-weight: 800;
}
.info .name{ font-weight: 700; color:#1f2d2a; line-height:1 }
.info .muted{ color:#7e8d88; font-size: 12px }
</style>
