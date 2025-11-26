<template>
  <div class="page-container">
    <div class="section-card">
      <div class="card-header">
        <div class="header-left">
          <h2 class="card-title">Lembretes</h2>
        </div>

        <div class="header-actions">
          <span class="badge-total mr-4">Total {{ lembretesMock.length }}</span>

          <Button
            label="Criar Lembrete"
            icon="pi pi-plus"
            class="btn-mint"
            @click="modais.lembrete = true"
          />
        </div>
      </div>

      <ul class="lista-lembretes">
        <li
          v-for="lembrete in lembretesMock"
          :key="lembrete.id"
          class="item-lembrete"
          :class="{ 'item-concluido': lembrete.concluido }"
        >
          <div class="info-lembrete">
            <Checkbox
              v-model="lembrete.concluido"
              :binary="true"
              :inputId="'check-' + lembrete.id"
            />

            <label :for="'check-' + lembrete.id" class="label-lembrete">
              <span class="titulo-lembrete">{{ lembrete.titulo }}</span>
              <span class="data-limite">Vence em: {{ lembrete.dataLimite }}</span>
            </label>
          </div>

          <div class="status-lembrete">
            <span class="badge-status" :class="lembrete.concluido ? 'bg-green' : 'bg-yellow'">
              {{ lembrete.concluido ? 'CONCLUÍDO' : 'PENDENTE' }}
            </span>
          </div>
        </li>

        <li v-if="lembretesMock.length === 0" class="item-vazio">Nenhum lembrete encontrado.</li>
      </ul>
    </div>

    <ModalLembrete v-model="modais.lembrete" @save="adicionarLembrete" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Button from 'primevue/button'
  import Checkbox from 'primevue/checkbox'
  import ModalLembrete from '@/components/core/LembretesComponents/ModalLembrete.vue'

  interface Lembrete {
    id: string
    titulo: string
    dataLimite: string
    concluido: boolean
  }

  const modais = ref({ lembrete: false })

  const lembretesMock = ref<Lembrete[]>([
    {
      id: '1',
      titulo: 'Ligar para Tech Solutions (Contrato)',
      dataLimite: '15/11/2025',
      concluido: false,
    },
    {
      id: '2',
      titulo: 'Enviar proposta para Coffee House',
      dataLimite: '16/11/2025',
      concluido: false,
    },
    {
      id: '3',
      titulo: 'Revisar documento de requisitos',
      dataLimite: '14/11/2025',
      concluido: true,
    },
    {
      id: '4',
      titulo: 'Agendar reunião com Alpha Logistics',
      dataLimite: '17/11/2025',
      concluido: false,
    },
  ])

  function adicionarLembrete(dados: any) {
    // Como usamos InputMask, a data já vem formatada ou vazia
    const dataFinal = dados.dataLimite ? dados.dataLimite : 'Sem data'

    lembretesMock.value.unshift({
      id: String(Math.random()),
      titulo: dados.titulo,
      dataLimite: dataFinal,
      concluido: false,
    })
  }
</script>

<style scoped>
  .page-container {
    width: 100%;
  }

  .section-card {
    background-color: #ffffff;
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.04);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #123b2d;
    margin: 0;
  }

  .badge-total {
    font-size: 0.85rem;
    color: #9ca3af;
    font-weight: 600;
  }

  .mr-4 {
    margin-right: 1rem;
  }

  .btn-mint {
    background-color: #6ee7b7 !important;
    border: none !important;
    color: #064e3b !important;
    font-weight: 700 !important;
    border-radius: 12px !important;
    padding: 0.75rem 1.5rem !important;
  }
  .btn-mint:hover {
    background-color: #34d399 !important;
  }

  .lista-lembretes {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .item-lembrete {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0; 
    border-bottom: 1px solid #f3f4f6;
    transition: opacity 0.2s;
  }
  .item-lembrete:last-child {
    border-bottom: none;
  }

  .item-concluido {
    opacity: 0.6;
  }

  .info-lembrete {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .label-lembrete {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .titulo-lembrete {
    font-weight: 600;
    color: #374151;
    font-size: 1rem;
  }

  .item-concluido .titulo-lembrete {
    text-decoration: line-through;
  }

  .data-limite {
    font-size: 0.8rem;
    color: #9ca3af;
  }

  .item-vazio {
    text-align: center;
    padding: 3rem;
    color: #9ca3af;
    font-style: italic;
  }

  .badge-status {
    min-width: 100px;
    text-align: center;
  }
</style>
