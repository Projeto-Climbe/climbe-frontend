<template>
  <div class="callback-shell">
    <div class="callback-card">
      <h1 class="callback-title">Entrando com Google</h1>
      <p class="callback-message">{{ statusMessage }}</p>

      <div class="callback-body">
        <div v-if="loading" class="spinner" aria-label="Carregando autenticação"></div>

        <div v-else-if="isPending || isError" class="callback-actions">
          <Button label="Voltar para login" class="signin-btn-primary" @click="goToSignin" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { completeGoogleSignin } from '@/services/authService'
import https from '@/services/https'

const router = useRouter()
const route = useRoute()

const loading = ref(true)
const isPending = ref(false)
const isError = ref(false)
const statusMessage = ref('Estamos validando seu login com o Google...')

const handleCallback = async () => {
  const code = route.query.code as string | undefined
  const state = route.query.state as string | undefined

  if (!code) {
    isError.value = true
    statusMessage.value = 'Código de autorização não informado.'
    loading.value = false
    return
  }

  try {
    const response = await completeGoogleSignin(code, state)

    if (response.pending) {
      isPending.value = true
      statusMessage.value =
        response.message || 'Seu acesso via Google está aguardando aprovação do administrador.'
      return
    }

    if (response.success && response.token) {
      localStorage.setItem('token', response.token)
      https.defaults.headers.common['Authorization'] = `Bearer ${response.token}`
      statusMessage.value = 'Autenticação concluída. Redirecionando...'
      await router.replace('/dashboard')
      return
    }

    isError.value = true
    statusMessage.value = response.message || 'Não foi possível concluir o login com Google.'
  } catch (error: any) {
    const response = error?.response

    if (response?.status === 403 && response.data?.pending) {
      isPending.value = true
      statusMessage.value =
        response.data?.message ||
        'Seu acesso via Google está aguardando aprovação do administrador.'
      return
    }

    isError.value = true
    statusMessage.value =
      response?.data?.error ||
      response?.data?.message ||
      error?.message ||
      'Erro inesperado ao validar seu login com o Google.'
  } finally {
    loading.value = false
  }
}

const goToSignin = () => {
  router.replace('/signin')
}

onMounted(handleCallback)
</script>

<style scoped>
.callback-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--climb-signin-bg);
  padding: 2rem;
}

.callback-card {
  background: var(--climb-signin-card-bg);
  border: 2px solid var(--climb-signin-card-border);
  border-radius: 32px;
  padding: 32px;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 4px 16px rgba(222, 228, 224, 0.25);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.callback-title {
  font-family: 'Roboto', sans-serif;
  font-size: var(--climb-headline-large);
  font-weight: 500;
  margin: 0;
  color: #171d1b;
}

.callback-message {
  margin: 0;
  color: #6f7976;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
}

.callback-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.callback-actions {
  display: flex;
  justify-content: flex-end;
}

.spinner {
  width: 48px;
  height: 48px;
  margin-top: 8px;
  border: 4px solid #bfc9c4;
  border-top-color: var(--climb-green-700);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  align-self: center;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .callback-shell {
    padding: 1.25rem;
  }

  .callback-card {
    padding: 24px;
    border-radius: 24px;
  }
}
</style>
