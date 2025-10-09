<template>
  <div>
    <CabecalhoSecao titulo="Pessoas" subtitulo="Pendentes de autorização">
      <template #acoes>
        <Button
          label="Adicionar usuário"
          class="btn-primaria rounded-2xl"
          @click="modais.usuario = true"
        />
      </template>
    </CabecalhoSecao>

    <TabelaDados
      :valor="pessoas"
      :carregando="carregando.pessoas"
      :colunas="colunasPessoas"
      @aprovar="aprovar"
      @rejeitar="rejeitar"
    />

    <div class="linha-topo">
      <CabecalhoSecao :titulo="'Empresas'" :subtitulo="`Total ${empresas.length}`" />
      <Button
        label="Adicionar nova empresa"
        class="btn-primaria rounded-2xl"
        @click="modais.empresa = true"
      />
    </div>

    <TabelaDados :valor="empresas" :carregando="carregando.empresas" :colunas="colunasEmpresas" />

    <div class="mt">
      <PainelPermissoes :funcoes="funcoes" @adicionar="modais.cargo = true" />
    </div>

    <ModalEmpresa v-model="modais.empresa" @enviar="criarEmpresa" />
    <ModalUsuario
      v-model="modais.usuario"
      @enviar="criarUsuario"
      @voltar="modais.usuario = false"
    />
    <ModalCargo v-model="modais.cargo" @enviar="criarCargo" @voltar="modais.cargo = false" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Button from 'primevue/button'

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

<style scoped>
  .linha-topo {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .mt {
    margin-top: 1.5rem;
  }
</style>
