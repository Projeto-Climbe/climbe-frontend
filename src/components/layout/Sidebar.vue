<template>
  <nav class="sb">
    <div class="sb-panel">
      <!-- logo -->
      <div class="sb-logo">
        <div class="logo">climb<span class="ponto">.</span></div>
        <small class="logo-sub">Investimentos Independentes</small>
      </div>

      <!-- menu -->
      <ul class="menu">
        <li>
          <RouterLink :to="{ name: 'dashboard' }" class="item">
            <i class="pi pi-home"></i><span>Visão geral</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/contratos" class="item">
            <i class="pi pi-file-edit"></i><span>Contratos</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'empresas' }" class="item">
            <i class="pi pi-building"></i><span>Empresas</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/lembretes" class="item">
            <i class="pi pi-bell"></i><span>Lembretes</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/reunioes" class="item">
            <i class="pi pi-video"></i><span>Reuniões</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/ajustes" class="item">
            <i class="pi pi-cog"></i><span>Ajustes</span>
          </RouterLink>
        </li>
      </ul>

      <!-- usuário (opcional) -->
      <div class="sb-user">
        <div class="avatar">L</div>
        <div class="info">
          <div class="name">Luiz Gustavo</div>
          <div class="muted">email@exemplo.com</div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* shell da sidebar */
.sb{
  width: 260px;
  padding: 16px;
  background: var(--cl-bg, #f3f8f5);
  min-height: 100vh;
  position: sticky;
  top: 0;
}

/* painel interno */
.sb-panel{
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 12px 36px rgba(24,39,33,.10);
  padding: 18px 14px;
  height: calc(100vh - 32px);
  display: flex;
  flex-direction: column;
}

/* logo */
.sb-logo{ padding: 8px 10px 14px; border-bottom: 1px solid #eef3f0; margin-bottom: 10px; }
.logo{ font-weight: 800; font-size: 1.35rem; color: #113c36; letter-spacing: .2px; }
.ponto{ color: var(--mint-500, #34c6a1); }
.logo-sub{ color:#98a7a2; font-size: .72rem; }

/* menu */
.menu{ list-style: none; padding: 8px 4px; margin: 0; display: flex; flex-direction: column; gap: 6px; }
.item{
  display: flex; align-items: center; gap: .6rem;
  padding: .6rem .75rem;
  border-radius: 14px;
  color: #0f2925; text-decoration: none; font-weight: 600;
  position: relative;
}
.item i{ font-size: 1.05rem; color:#2f5f54; opacity:.9; }
.item:hover{ background: #f1f7f4; }

/* estado ativo como “pill” verdinha (RouterLink injeta .router-link-active) */
.item.router-link-active{
  background: #e6f5ef;
  color: #176a59;
}
.item.router-link-active i{ color:#176a59; }

/* badge */
.badge{
  margin-left: auto;
  background: #edf3f1;
  color: #2a3a36;
  border-radius: 999px;
  padding: .12rem .5rem;
  font-size: .75rem; font-weight: 700;
}
.badge.danger{ background:#ffe4e4; color:#bb4545 }

/* usuário */
.sb-user{
  margin-top: auto;
  background: #f6fbf8;
  border: 1px solid #ecf3f0;
  border-radius: 16px;
  padding: 10px;
  display: flex; align-items: center; gap: 10px;
}
.avatar{
  width: 42px; height: 42px; border-radius: 50%;
  background: #e1f5ee; color:#0f6e5b; display:grid; place-items:center; font-weight: 800;
}
.info .name{ font-weight: 700; color:#1f2d2a; line-height:1 }
.info .muted{ color:#7e8d88; font-size: .78rem }
</style>
