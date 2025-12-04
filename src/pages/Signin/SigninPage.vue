<template>
  <div class="signin-shell">
    <!-- Logo Section -->
    <div class="signin-logo">
      <img src="/assets/images/climb_logo.svg" alt="Climbe" class="signin-logo__image" />
    </div>

    <div class="signin-card">

      <!-- Header Section -->
      <div class="signin-header">
        <h1 class="signin-title">Bem vindo<br />de volta!</h1>
        <p class="signin-subtitle">Por favor, insira suas credenciais</p>
      </div>

      <!-- Success Banner -->
      <div v-if="showSuccessMessage" class="success-banner">
        <i class="pi pi-check-circle"></i>
        <span>Conta Criada com sucesso! Aguarde seu cadastro ser aprovado.</span>
      </div>

      <!-- Error Banner -->
      <div v-if="errorMessage" class="error-banner">
        <i class="pi pi-exclamation-triangle"></i>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Form Section -->
      <form @submit.prevent="handleSignin" class="signin-form">
        <!-- Username Field -->
        <div class="form-field">
          <label for="username" class="form-label">Seu nome de usuário</label>
          <InputText
            id="username"
            v-model="username"
            placeholder="Digite seu nome de usuário"
            class="signin-input"
            autocomplete="username"
          />
        </div>

        <!-- Password Field -->
        <div class="form-field">
          <label for="password" class="form-label">Sua senha</label>
          <Password
            id="password"
            v-model="password"
            :feedback="false"
            toggleMask
            class="signin-input"
            inputClass="signin-password-input"
            autocomplete="current-password"
          />
        </div>

        <!-- Forgot Password Link -->
        <a href="#" @click.prevent="showPasswordResetModal = true" class="forgot-password-link">
          Esqueceu a senha?
        </a>

        <!-- Primary Button -->
        <Button
          type="submit"
          label="Entrar"
          class="signin-btn-primary"
          :loading="loading"
          :disabled="loading"
        />
      </form>

      <!-- Divider -->
      <div class="signin-divider">
        <span class="divider-line"></span>
        <span class="divider-text">ou</span>
        <span class="divider-line"></span>
      </div>

      <!-- Google Button -->
      <Button
        type="button"
        class="signin-btn-google"
        :loading="googleLoading"
        :disabled="loading || googleLoading"
        @click="handleGoogleSignin"
      >
        <template #icon>
          <svg
            width="18"
            height="18"
            viewBox="0 0 48 48"
            style="margin-right: 8px"
            aria-hidden="true"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Entrar com Google
        </template>
      </Button>

      <!-- Don't have account link -->
      <div class="signup-signin-link">
        <span class="link-text">Não tem uma conta?</span>
        <router-link to="/signup" class="link-action">Criar conta</router-link>
      </div>
    </div>

    <!-- Password Reset Modal -->
    <PasswordResetModal v-model="showPasswordResetModal" @success="handlePasswordResetSuccess" />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useToast } from 'primevue/usetoast'
  import PasswordResetModal from '@/components/core/PasswordResetModal.vue'
  import { getGoogleAuthUrl, login } from '@/services/authService'
  import https from '@/services/https'

  const router = useRouter()
  const route = useRoute()
  const toast = useToast()
  const showSuccessMessage = computed(() => route.query.registered === 'true')
  const username = ref('')
  const password = ref('')
  const showPasswordResetModal = ref(false)
  const loading = ref(false)
  const googleLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  const handleSignin = async () => {
    errorMessage.value = null

    if (!username.value || !password.value) {
      errorMessage.value = 'Preencha todos os campos'
      return
    }

    loading.value = true

    try {
      const { token } = await login({
        email: username.value,
        password: password.value,
      })

      localStorage.setItem('token', token)
      https.defaults.headers.common['Authorization'] = `Bearer ${token}`
      router.push('/dashboard')
    } catch (error: any) {
      errorMessage.value = error.message || 'Erro ao fazer login'
    } finally {
      loading.value = false
    }
  }

  const handleGoogleSignin = async () => {
    errorMessage.value = null
    googleLoading.value = true

    try {
      const authUrl = await getGoogleAuthUrl()
      window.location.href = authUrl
    } catch (error: any) {
      errorMessage.value = error.message || 'Não foi possível iniciar o login com Google'
      googleLoading.value = false
    }
  }

  const handlePasswordResetSuccess = () => {
    showPasswordResetModal.value = false
    toast.add({
      severity: 'success',
      summary: 'Senha redefinida',
      detail: 'Sua senha foi redefinida com sucesso. Faça login com a nova senha.',
      life: 5000,
    })
  }
</script>

<style scoped>
  .signin-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    justify-content: center;
    background: var(--climb-signin-bg);
    padding: 2rem;
  }

  .signin-card {
    background: var(--climb-signin-card-bg);
    border: 2px solid var(--climb-signin-card-border);
    border-radius: 32px;
    padding: 32px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 4px 16px rgba(222, 228, 224, 0.25);
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  /* Logo Section */
  .signin-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .signin-logo__image {
    /* width: 204px; */
  }

  .signin-logo__text {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #171d1b;
    text-align: center;
  }

  /* Header Section */
  .signin-header {
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 8px;
    text-align: left;
  }

  .signin-title {
    font-family: 'Roboto', sans-serif;
    font-size: var(--climb-headline-large);
    font-weight: 500;
    line-height: 40px;
    color: #171d1b;
    margin: 0;
  }

  .signin-subtitle {
    font-family: 'Roboto', sans-serif;
    font-size: var(--climb-label-large);
    font-weight: 500;
    line-height: 20px;
    color: #6f7976;
    margin: 0;
  }

  /* Form Section */
  .signin-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-label {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #171d1b;
    line-height: 21px;
  }

  /* Input Styling */
  .signin-input :deep(.p-inputtext),
  .signin-input :deep(.p-password-input) {
    border-radius: 12px !important;
    border: none !important;
    padding: 12px 16px !important;
    font-family: 'Inter', sans-serif !important;
    font-size: 16px !important;
    color: #171d1b !important;
    width: 100%;
    box-shadow: none !important;
  }

  .signin-input :deep(.p-inputtext::placeholder),
  .signin-input :deep(.p-password-input::placeholder) {
    /* color: #6f7976 !important; */
  }

  .signin-input :deep(.p-inputtext:focus),
  .signin-input :deep(.p-password-input:focus) {
    outline: none !important;
    border: none !important;
    box-shadow: 0 0 0 2px rgba(160, 242, 222, 0.4) !important;
  }

  /* Password component wrapper */
  .signin-input :deep(.p-password) {
    width: 100%;
    position: relative;
  }

  .signin-input :deep(.p-password-toggle-icon) {
    color: #6f7976;
    width: 1rem;
    height: 1rem;
  }

  .signin-input :deep(.p-password .p-icon-field-right) {
    position: absolute;
    top: 50%;
    right: 0.75rem;
    margin-top: -0.5rem;
  }

  .signin-input :deep(.p-password .p-input-icon) {
    position: absolute;
    top: 50%;
    right: 1rem;
    margin-top: -0.5rem;
    color: #6f7976;
    cursor: pointer;
  }

  /* Divider */
  .signin-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
  }

  .divider-line {
    flex: 1;
    height: 2px;
    background: #bfc9c4;
    opacity: 0.5;
    border-radius: 30px;
  }

  .divider-text {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #6f7976;
  }

  /* Success Banner */
  .success-banner {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background-color: #d1fae5;
    color: #065f46;
    border-radius: 12px;
    font-size: 0.9rem;
  }

  .success-banner i {
    font-size: 1.1rem;
  }

  /* Error Banner */
  .error-banner {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background-color: #fee2e2;
    color: #991b1b;
    border-radius: 12px;
    font-size: 0.9rem;
  }

  .error-banner i {
    font-size: 1.1rem;
  }

  /* Signup/Signin Link */
  .signup-signin-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--climb-signin-card-border);
  }

  .link-text {
    font-size: 0.9rem;
    color: var(--climb-outline);
  }

  .link-action {
    font-size: 0.9rem;
    color: var(--climb-green-700);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;
  }

  .link-action:hover {
    color: var(--climb-green-500);
    text-decoration: underline;
  }

  /* Forgot Password Link */
  .forgot-password-link {
    color: var(--climb-green-700);
    font-size: 0.9rem;
    text-decoration: none;
    align-self: flex-end;
    transition: color 0.2s;
  }

  .forgot-password-link:hover {
    color: var(--climb-green-500);
    text-decoration: underline;
  }

  /* Responsive */
  @media (max-width: 640px) {
    .signin-shell {
      padding: 1rem;
    }

    .signin-card {
      padding: 24px;
      border-radius: 24px;
      gap: 24px;
    }

    .signin-title {
      font-size: 28px;
      line-height: 36px;
    }
  }
</style>
