<script setup lang="ts">
import { ref } from 'vue'
import CadastroWizard from '../components/modals/CadastroWizard.vue'
const showWizard = ref(false)
</script>

<template>
  <div class="bg-white rounded-3 shadow-sm p-3">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h5 class="mb-0 fw-semibold">Empresas</h5>
      <button class="btn btn-success rounded-pill px-3 py-2" @click="showWizard = true">
        Adicionar nova empresa
      </button>
    </div>
    <!-- ... tabela ... -->
  </div>

  <CadastroWizard v-model="showWizard"/>
</template>
