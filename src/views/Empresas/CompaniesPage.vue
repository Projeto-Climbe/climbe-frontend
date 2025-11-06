<script setup lang="ts">
  import { ref } from 'vue'

  import CabecalhoSecao from '../../components/core/SectionHeader.vue'
  import TabelaDados from '../../components/core/TabelaDeDados.vue'
  import PainelPermissoes from '../../components/domain/cargos/PainelPermissoes.vue'
  import ModalEmpresa from '../../components/domain/empresas/ModalEmpresas.vue'
  import ModalUsuario from '../../components/domain/usuarios/ModalUsuario.vue'
  import ModalCargo from '../../components/domain/cargos/ModalCargos.vue'

  const carregando = ref({ pessoas: false, empresas: false })
  const modais = ref({ empresa: false, usuario: false, cargo: false })

  const pessoas = ref([{ nome: 'Jubileu do creio', email: 'omg...@gmail.com', status: 'Pendente' }])
  const empresas = ref([
    {
      nomeFantasia: 'Tech Solutions',
      email: 'contato@tech...',
      cnpj: '12.345.678/0001-99',
      telefone: '(11) 98765-4321',
    },
  ])
  const funcoes = ref([
    { id: '1', nome: 'Analista', permissoes: ['Criar proposta', 'Validar documento'] },
  ])

  const colunasPessoas = [
    { campo: 'nome', titulo: 'Nome' },
    { campo: 'email', titulo: 'Email' },
    { campo: 'status', titulo: 'Status', tipo: 'status' },
    { titulo: '', tipo: 'pendentesAcoes' },
  ]
  const colunasEmpresas = [
    { campo: 'nomeFantasia', titulo: 'Nome fantasia' },
    { campo: 'email', titulo: 'Email' },
    { campo: 'cnpj', titulo: 'Cnpj' },
    { campo: 'telefone', titulo: 'Telefone' },
  ]

  function aprovar(_row: any) {}
  function rejeitar(_row: any) {}
  function criarEmpresa(_payload: any) {
    modais.value.empresa = false
  }
  function criarUsuario(_payload: any) {
    modais.value.usuario = false
  }
  function criarCargo(_payload: any) {
    modais.value.cargo = false
  }
</script>

<template>
  <div class="emp-shell">
    <div class="emp-grid">
      <!-- Coluna ESQUERDA -->
      <div class="emp-left">
        <!-- PESSOAS -->
        <section class="cl-card emp-card">
          <div class="emp-header">
            <CabecalhoSecao titulo="Pessoas" subtitulo="Pendentes de autorização" />
            <div class="emp-total">Total <strong>{{ pessoas.length }}</strong></div>
            <Button label="Adicionar usuário" class="btn-add" @click="modais.usuario = true" />
          </div>

          <!-- usa sua TabelaDeDados -->
          <div class="emp-table">
            <TabelaDeDados
              variante="contratos"
              compact
              :valor="pessoas"
              :carregando="carregando.pessoas"
              :colunas="colunasPessoas"
              @aprovar="aprovar"
              @rejeitar="rejeitar"
            />
          </div>
        </section>

        <!-- EMPRESAS -->
        <section class="cl-card emp-card">
          <div class="emp-header">
            <CabecalhoSecao :titulo="'Empresas'" :subtitulo="`Total ${empresas.length}`" />
            <div class="emp-total">Total <strong>{{ empresas.length }}</strong></div>
            <Button label="Adicionar nova empresa" class="btn-add" @click="modais.empresa = true" />
          </div>

          <div class="emp-table">
            <TabelaDeDados
              variante="contratos"
              :valor="empresas"
              :carregando="carregando.empresas"
              :colunas="colunasEmpresas"
            />
          </div>
        </section>
      </div>

      <!-- Coluna DIREITA (Permissões) -->
      <aside class="emp-right">
        <section class="cl-card emp-card sticky">
          <div class="emp-title mb-2">Permissões</div>
          <Button label="Adicionar nova permissão" class="btn-add w-100 mb-3" @click="modais.cargo = true" />

          <div class="perm-list">
            <div class="perm-item">Nome</div>
            <div class="perm-item">Pode criar usuários</div>
            <div class="perm-item">Pode criar usuários</div>
            <div class="perm-item">Pode criar usuários</div>
          </div>
        </section>
      </aside>
    </div>

    <!-- modais já existentes -->
    <ModalEmpresa v-model="modais.empresa" @enviar="criarEmpresa" />
    <ModalUsuario
      v-model="modais.usuario"
      @enviar="criarUsuario"
      @voltar="modais.usuario = false"
    />
    <ModalCargo v-model="modais.cargo" @enviar="criarCargo" @voltar="modais.cargo = false" />
  </div>
</template>

<style scoped>
/* ----- container central ----- */
.emp-shell{
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  padding:16px 20px;
  display:flex;
  flex-direction:column;
  gap:26px;
}

.emp-left{
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* grid 2 colunas: esquerda conteúdo / direita permissões */
.emp-grid{
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

/* cards */
.emp-card{
  border-radius: 24px;
  padding: 18px 20px;
  box-shadow: 0 12px 36px rgba(24,39,33,.10);
}

/* cabeçalho dentro do card (SectionHeader + ações à direita) */
.emp-header{
  display: grid;
  grid-template-columns: 1fr auto auto; 
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}
.emp-title{ color: var(--cl-accent); font-weight: 800; font-size: 20px; }
.emp-total{ color: #9aa8a3; font-weight: 600; }

/* botão */
.btn-add{
  background: #b7f6e4;
  color: #0f6e5b;
  border: none;
  border-radius: 999px;
  padding: 8px 14px;
  font-weight: 700;
  transition: transform .05s ease, filter .15s ease;
  box-shadow: 0 14px 28px rgba(31,138,116,.15);
}
.btn-add:hover{ filter: brightness(0.98); }
.btn-add:active{ transform: translateY(1px); }

/* envelope da tabela — usa TabelaDeDados com variante "contratos" */
.emp-table{
  border-radius: 18px;
  overflow: hidden;
}

.sticky{ position: sticky; top: 16px; }

/* lista de permissões */
.perm-list{
  background: #f7faf9;
  border: 1px solid #edf3f1;
  border-radius: 16px;
  overflow: hidden;
}
.perm-item{
  padding: 14px 14px;
  border-bottom: 1px solid #eaf0ed;
  color: #2a3a36;
  font-weight: 600;
}
.perm-item:last-child{ border-bottom: 0; }

/* utilitários */
.mb-2{ margin-bottom: .5rem; }
.mb-3{ margin-bottom: 1rem; }
.w-100{ width: 100%; }

/* responsivo */
@media (max-width: 992px){
  .emp-grid{ grid-template-columns: 1fr; }
  .sticky{ position: static; }
}
</style>
