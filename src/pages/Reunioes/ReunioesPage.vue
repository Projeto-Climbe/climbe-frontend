<template>
  <div class="page-container">

    <div class="calendar-card">
      <div class="calendar-header">
        <h2 class="calendar-title">{{ tituloMesAno }}</h2>

        <div class="calendar-nav">
          <button class="btn-nav" @click="mudarMes(-1)">Anterior</button>
          <button class="btn-nav" @click="mudarMes(1)">Próximo</button>
        </div>
      </div>

      <div class="calendar-grid">
        <div v-for="semana in diasSemana" :key="semana" class="weekday">
          {{ semana }}
        </div>

        <div
          v-for="(dia, index) in diasDoGrid"
          :key="index"
          class="day-cell"
          :class="{
            'day-empty': !dia.data,
            'day-today': dia.isHoje
          }"
        >
          <span v-if="dia.data" class="day-number">{{ dia.numeroDia }}</span>

          <div v-if="dia.eventos.length > 0" class="events-container">
            <div
              v-for="evento in dia.eventos"
              :key="evento.id"
              class="event-pill"
            >
              <span class="event-title">{{ evento.titulo }}</span>
              <span class="event-time">{{ evento.hora }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

const dataReferencia = ref(new Date(2025, 9, 1))

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const tituloMesAno = computed(() => {
  return dataReferencia.value.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    .replace(/^\w/, (c) => c.toUpperCase())
})

function mudarMes(direcao: number) {
  const novaData = new Date(dataReferencia.value)
  novaData.setMonth(novaData.getMonth() + direcao)
  dataReferencia.value = novaData
}

interface DiaCalendario {
  data: Date | null;
  numeroDia: number | null;
  isHoje: boolean;
  eventos: any[];
}

const diasDoGrid = ref<DiaCalendario[]>([])

function gerarGrid() {
  const ano = dataReferencia.value.getFullYear()
  const mes = dataReferencia.value.getMonth()

  const diaSemanaInicio = new Date(ano, mes, 1).getDay()

  const totalDiasNoMes = new Date(ano, mes + 1, 0).getDate()

  const listaDias: DiaCalendario[] = []

  for (let i = 0; i < diaSemanaInicio; i++) {
    listaDias.push({ data: null, numeroDia: null, isHoje: false, eventos: [] })
  }

  for (let i = 1; i <= totalDiasNoMes; i++) {
    const dataAtual = new Date(ano, mes, i)

    const eventosDoDia = eventosCarregados.value.filter(e => {
      const dataEvento = new Date(e.dataIso)
      return dataEvento.getDate() === i &&
             dataEvento.getMonth() === mes &&
             dataEvento.getFullYear() === ano
    })

    listaDias.push({
      data: dataAtual,
      numeroDia: i,
      isHoje: isMesmoDia(new Date(), dataAtual),
      eventos: eventosDoDia
    })
  }

  const totalCelulas = listaDias.length
  const celulasRestantes = 35 - totalCelulas

  if (celulasRestantes > 0) {
     for (let i = 0; i < celulasRestantes; i++) {
       listaDias.push({ data: null, numeroDia: null, isHoje: false, eventos: [] })
     }
  }

  diasDoGrid.value = listaDias
}

function isMesmoDia(d1: Date, d2: Date) {
  return d1.getDate() === d2.getDate() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getFullYear() === d2.getFullYear()
}

const eventosCarregados = ref<any[]>([])

async function buscarEventos() {
  // AQUI VOCÊS FAZEM A INTEGRAÇÃO COM O GOOGLE TO CANSADA:
  // const start = new Date(dataReferencia.value.getFullYear(), dataReferencia.value.getMonth(), 1)
  // const end = new Date(dataReferencia.value.getFullYear(), dataReferencia.value.getMonth() + 1, 0)
  // const response = await googleApi.listEvents(start, end) ...

  // POR ENQUANTO MOCK DEEM UM JEITO NISSO:
  eventosCarregados.value = [
    { id: 1, titulo: 'Revisão de Contrato', hora: '10:00', dataIso: '2025-10-05T10:00:00' },
    { id: 2, titulo: 'Apresentação', hora: '14:00', dataIso: '2025-10-12T14:00:00' },
    { id: 3, titulo: 'Alinhamento', hora: '09:00', dataIso: '2025-10-20T09:00:00' },
    // Teste para ver se funciona em outro mês
    { id: 4, titulo: 'Natal', hora: '00:00', dataIso: '2025-12-25T00:00:00' }
  ]

  gerarGrid()
}

watch(dataReferencia, () => {
  gerarGrid()
})

onMounted(() => {
  buscarEventos()
})
</script>

<style scoped>
.page-container {
  width: 100%;
}

.calendar-card {
  background-color: #ffffff;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.04);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.calendar-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #123b2d;
  margin: 0;
  text-transform: capitalize; 
}

.btn-nav {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  margin-left: 0.8rem;
  transition: all 0.2s;
}

.btn-nav:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
}

.weekday {
  text-align: center;
  font-weight: 600;
  color: #123b2d;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.day-cell {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  min-height: 120px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #ffffff;
  transition: border-color 0.2s;
  position: relative;
}

.day-cell:hover {
  border-color: #34d399;
}

.day-empty {
  border: none;
  background-color: transparent;
  pointer-events: none;
}

.day-today {
  border: 1.5px solid #123b2d;
}

.day-number {
  font-weight: 600;
  color: #374151;
  font-size: 1rem;
}

.events-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: auto;
}

.event-pill {
  background-color: #d1fae5;
  border-radius: 6px;
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.event-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #064e3b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-time {
  font-size: 0.7rem;
  color: #047857;
  font-weight: 500;
}
</style>
