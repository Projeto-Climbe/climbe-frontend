<template>
  <nav class="nav">
    <div class="logo">climb<span class="ponto">.</span></div>
    <ul class="menu">
      <li>
        <RouterLink :to="{ name: 'dashboard' }"
          ><i class="pi pi-home"></i><span>Visão geral</span></RouterLink
        >
      </li>
      <li>
        <RouterLink to="/contratos"
          ><i class="pi pi-file-edit"></i><span>Contratos</span
          ><span class="badge">3</span></RouterLink
        >
      </li>
      <li>
        <RouterLink :to="{ name: 'empresas' }"
          ><i class="pi pi-building"></i><span>Empresas</span></RouterLink
        >
      </li>
      <li>
        <RouterLink to="/lembretes"><i class="pi pi-bell"></i><span>Lembretes</span></RouterLink>
      </li>
      <li>
        <RouterLink to="/reunioes"><i class="pi pi-video"></i><span>Reuniões</span></RouterLink>
      </li>
      <li>
        <RouterLink to="/ajustes"><i class="pi pi-cog"></i><span>Ajustes</span></RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.logo {
  font-weight: 800;
  font-size: 1.4rem;
  color: #113c36;
  margin: 0.25rem 0.5rem 1rem;
}
.ponto {
  color: var(--mint-500);
}
.menu {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.menu a {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.75rem;
  border-radius: 12px;
  color: #0f2925;
  text-decoration: none;
}
.menu a.router-link-active {
  background: var(--mint-50);
}
.badge {
  margin-left: auto;
  background: #d1fae5;
  color: #065f46;
  border-radius: 999px;
  padding: 0.1rem 0.5rem;
  font-size: 0.75rem;
}
</style>
