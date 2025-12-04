<template>
  <div class="signin-shell">
    <!-- Logo Section -->
    <div class="signin-logo">
      <img src="/assets/images/climb_logo.svg" alt="Climbe" class="signin-logo__image" />
    </div>

    <div class="signin-card">
      <!-- Header Section -->
      <div class="signin-header">
        <h1 class="signin-title">Criar conta</h1>
        <p class="signin-subtitle">Preencha os dados para começar</p>
      </div>

      <!-- Error Banner -->
      <div v-if="errorMessage" class="error-banner">
        <i class="pi pi-exclamation-triangle"></i>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Form Section -->
      <form @submit.prevent="handleSignup" class="signin-form">
        <!-- Full Name Field -->
        <div class="form-field">
          <label for="fullName" class="form-label">Nome completo</label>
          <InputText
            id="fullName"
            v-bind="bind('fullName')"
            placeholder="Digite seu nome completo"
            class="signin-input"
            :class="{ 'p-invalid': erroCampo('fullName') }"
            autocomplete="name"
          />
          <small v-if="erroCampo('fullName')" class="erro">
            {{ erroCampo('fullName') }}
          </small>
        </div>

        <!-- Email Field -->
        <div class="form-field">
          <label for="email" class="form-label">E-mail</label>
          <InputText
            id="email"
            v-bind="bind('email')"
            type="email"
            placeholder="seu@email.com"
            class="signin-input"
            :class="{ 'p-invalid': erroCampo('email') }"
            autocomplete="email"
          />
          <small v-if="erroCampo('email')" class="erro">
            {{ erroCampo('email') }}
          </small>
        </div>

        <!-- Password Field -->
        <div class="form-field">
          <label for="password" class="form-label">Senha</label>
          <Password
            id="password"
            v-bind="bind('password')"
            :feedback="false"
            toggleMask
            class="signin-input"
            inputClass="signin-password-input"
            :class="{ 'p-invalid': erroCampo('password') }"
            autocomplete="new-password"
          />
          <small v-if="erroCampo('password')" class="erro">
            {{ erroCampo('password') }}
          </small>
        </div>

        <!-- CPF Field -->
        <div class="form-field">
          <label for="cpf" class="form-label">CPF</label>
          <InputText
            id="cpf"
            v-bind="bind('cpf')"
            v-maska
            data-maska="###.###.###-##"
            placeholder="000.000.000-00"
            class="signin-input"
            :class="{ 'p-invalid': erroCampo('cpf') }"
            autocomplete="off"
          />
          <small v-if="erroCampo('cpf')" class="erro">
            {{ erroCampo('cpf') }}
          </small>
        </div>

        <!-- Phone Field -->
        <div class="form-field">
          <label for="phone" class="form-label">Telefone</label>
          <InputText
            id="phone"
            v-bind="bind('phone')"
            v-maska
            data-maska="['(##) ####-####', '(##) #####-####']"
            placeholder="(11) 99999-9999"
            class="signin-input"
            :class="{ 'p-invalid': erroCampo('phone') }"
            autocomplete="tel"
          />
          <small v-if="erroCampo('phone')" class="erro">
            {{ erroCampo('phone') }}
          </small>
        </div>

        <!-- Submit Button -->
        <Button
          type="submit"
          label="Criar conta"
          class="signin-btn-primary"
          :loading="loading"
          :disabled="loading"
        />
      </form>

      <!-- Already have account link -->
      <div class="signup-signin-link">
        <span class="link-text">Já tem uma conta?</span>
        <router-link to="/signin" class="link-action">Fazer login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'
import { useValidateZod } from '@/composables/userValidateZod'
import { signup } from '@/services/authService'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref<string | null>(null)

// Zod validation schema
const signupSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),

  email: z.string().email('E-mail inválido'),

  password: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Deve conter letra maiúscula')
    .regex(/[a-z]/, 'Deve conter letra minúscula')
    .regex(/[0-9]/, 'Deve conter número'),

  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato: 000.000.000-00'),

  phone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Formato: (11) 99999-9999'),
})

const { valores, bind, validar, erroCampo } = useValidateZod(signupSchema, {
  fullName: '',
  email: '',
  password: '',
  cpf: '',
  phone: '',
})

const handleSignup = async () => {
  errorMessage.value = null

  const valido = await validar()
  if (!valido) {
    errorMessage.value = 'Preencha todos os campos corretamente'
    return
  }

  loading.value = true

  try {
    // Clean formatting before API call
    const cleanCpf = valores.value.cpf.replace(/\D/g, '')
    const cleanPhone = valores.value.phone.replace(/\D/g, '')

    await signup({
      fullName: valores.value.fullName,
      email: valores.value.email,
      password: valores.value.password,
      cpf: cleanCpf,
      phone: cleanPhone,
    })

    // Redirect to signin with success state
    router.push({
      name: 'signin',
      query: { registered: 'true' },
    })
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Reuse styles from SigninPage */
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

/* Validation Error Message */
.erro {
  color: #b91c1c;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.p-invalid :deep(.p-inputtext),
.p-invalid :deep(.p-password-input) {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2) !important;
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
