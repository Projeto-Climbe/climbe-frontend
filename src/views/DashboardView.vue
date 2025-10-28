<script setup lang="ts">
import { ref, computed } from 'vue'
import IconContratos from '../components/icons/document-attachment.svg'
import IconReunioes from '../components/icons/camera-tripod.svg'
import IconDocumentos from '../components/icons/file-01.svg'
import IconPropostas from '../components/icons/purse.svg'

const contratosAtivos = ref(12), contratosVencendo = ref(3)
const reunioesHoje = ref(3), reunioesSemana = ref(7)
const docsPendentes = ref(3), docsTotal = ref(25)
const propostasPendentes = ref(5), propostasAprovadas = ref(8)

type AgendaItem = { titulo: string; hora: string; secundario: string }
const agendaHoje = ref<AgendaItem[]>([
  { titulo: 'Daily Mobile', hora: '10:00', secundario: 'meet.google.com' },
  { titulo: 'Daily Mobile', hora: '10:00', secundario: 'meet.google.com' },
  { titulo: 'Daily Mobile', hora: '10:00', secundario: 'meet.google.com' },
  { titulo: 'Daily Mobile', hora: '10:00', secundario: 'meet.google.com' },
])
const hojeFmt = computed(() => {
  const d = new Date()
  return d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'short' })
})
</script>

<template>
  <div class="cl-shell">
    <div class="d-flex align-items-center gap-2 mb-4">
      <h2 class="fw-bold mb-0" style="color:var(--cl-ink)">Olá, Luiz!</h2>
      <span class="cl-muted">Aqui está o resumo de hoje.</span>
    </div>

    <div class="row g-3 g-md-4">
      <div class="col-12 col-lg-7">
        <div class="cl-card cl-card-pad d-flex align-items-center justify-content-between">
          <div>
            <div class="cl-section-title mb-2">Contratos</div>
            <div class="d-flex align-items-baseline gap-2">
              <div class="fw-bold" style="font-size:40px;color:var(--cl-ink)">{{ contratosAtivos }}</div>
              <span class="cl-muted">ativos</span>
            </div>
            <span class="cl-pill red mt-2"><i class="bi bi-exclamation-triangle"></i>{{ contratosVencendo }}
              Vencendo</span>
          </div>
          <img :src="IconContratos" alt="" class="cl-ghost-icon" />
        </div>
      </div>

      <div class="col-12 col-lg-5">
        <div class="cl-card cl-card-pad d-flex align-items-center justify-content-between">
          <div>
            <div class="cl-section-title mb-2">Reuniões</div>
            <div class="d-flex align-items-baseline gap-2">
              <div class="fw-bold" style="font-size:40px;color:var(--cl-ink)">{{ reunioesHoje }}</div>
              <span class="cl-muted">Hoje</span>
            </div>
            <span class="cl-pill blue mt-2"><i class="bi bi-calendar-week"></i>{{ reunioesSemana }} Esta semana</span>
          </div>
          <img :src="IconReunioes" alt="" class="cl-ghost-icon" />
        </div>
      </div>

      <div class="col-12 col-xl-7">
        <div class="cl-card cl-card-pad d-flex align-items-center justify-content-between">
          <div>
            <div class="cl-section-title mb-2">Documentos</div>
            <div class="d-flex align-items-baseline gap-2">
              <div class="fw-bold" style="font-size:40px;color:var(--cl-ink)">{{ docsPendentes }}</div>
              <span class="cl-muted">Pendentes de Validação</span>
            </div>
            <span class="cl-pill blue mt-2"><i class="bi bi-inboxes"></i>{{ docsTotal }} Total</span>
          </div>
          <img :src="IconDocumentos" alt="" class="cl-ghost-icon" />
        </div>
      </div>

      <div class="col-12 col-xl-5">
        <div class="cl-card cl-card-pad">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <div class="cl-section-title mb-0">Agenda</div>
            <small class="cl-muted text-capitalize">{{ hojeFmt }}</small>
          </div>
          <ul class="list-unstyled mb-0">
            <li v-for="(a, i) in agendaHoje" :key="i"
              class="d-flex align-items-center justify-content-between rounded-4 px-3 py-2 mb-2"
              style="background:#f7faf9;border:1px solid #edf3f1;">
              <div>
                <div class="fw-semibold" style="color:var(--cl-ink)">{{ a.titulo }}</div>
                <small class="cl-muted d-flex align-items-center gap-1">
                  <i class="bi bi-camera-video"></i><span>{{ a.secundario }}</span>
                </small>
              </div>
              <div class="text-end" style="min-width:64px;">
                <div class="fw-semibold" style="color:var(--cl-ink)">{{ a.hora }}</div>
                <small class="cl-muted">10:30</small>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-12 col-xl-7">
        <div class="cl-card cl-card-pad d-flex align-items-center justify-content-between">
          <div>
            <div class="cl-section-title mb-2">Propostas</div>
            <div class="d-flex align-items-baseline gap-2">
              <div class="fw-bold" style="font-size:40px;color:var(--cl-ink)">{{ propostasPendentes }}</div>
              <span class="cl-muted">Pendentes</span>
            </div>
            <span class="cl-pill green mt-2"><i class="bi bi-check2-circle"></i>{{ propostasAprovadas }}
              Aprovadas</span>
          </div>
          <img :src="IconPropostas" alt="" class="cl-ghost-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cl-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
}
</style>
