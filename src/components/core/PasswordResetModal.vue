<template>
  <DialogFormulario v-model="visivel" titulo="Recuperar Senha" largura="500px">
    <!-- Step Indicator -->
    <div class="step-indicator">Passo {{ currentStep }} de 2</div>
    <div class="step-progress">
      <div class="step-progress-bar" :class="{ 'step-2': currentStep === 2 }"></div>
    </div>

    <!-- Error Banner -->
    <div v-if="errorMessage" class="error-banner">
      <i class="pi pi-exclamation-triangle"></i>
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Step 1: Email -->
    <div v-if="currentStep === 1" class="form-stack">
      <CampoFormulario rotulo="E-mail" :mensagem-erro="erroStep1('email')">
        <InputText
          v-bind="bindStep1('email')"
          type="email"
          placeholder="seu@email.com"
          autocomplete="email"
        />
      </CampoFormulario>
    </div>

    <!-- Step 2: Passwords -->
    <div v-else class="form-stack">
      <CampoFormulario
        rotulo="Senha temporária (recebida no e-mail)"
        :mensagem-erro="erroStep2('temporaryPassword')"
      >
        <Password
          v-bind="bindStep2('temporaryPassword')"
          :feedback="false"
          toggleMask
          placeholder="Digite a senha temporária"
        />
      </CampoFormulario>

      <CampoFormulario rotulo="Nova senha" :mensagem-erro="erroStep2('newPassword')">
        <Password
          v-bind="bindStep2('newPassword')"
          :feedback="false"
          toggleMask
          placeholder="Digite sua nova senha"
        />
      </CampoFormulario>
    </div>

    <!-- Footer Buttons -->
    <template #footer-actions>
      <template v-if="currentStep === 1">
        <Button label="Cancelar" class="btn-soft-green" @click="visivel = false" />
        <Button
          label="Continuar"
          class="btn-primaria"
          :loading="loading"
          @click="handleStep1Submit"
        />
      </template>
      <template v-else>
        <Button label="Voltar" class="btn-soft-green" @click="backToStep1" />
        <Button
          label="Redefinir Senha"
          class="btn-primaria"
          :loading="loading"
          @click="handleStep2Submit"
        />
      </template>
    </template>
  </DialogFormulario>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { z } from 'zod'
  import { useValidateZod } from '@/composables/userValidateZod'
  import { requestPasswordReset, resetPassword } from '@/services/authService'
  import DialogFormulario from './DialogFormulario.vue'
  import CampoFormulario from './CampoFormulario.vue'

  const props = defineProps<{
    modelValue: boolean
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    success: []
  }>()

  const visivel = computed({
    get: () => props.modelValue,
    set: (v: boolean) => emit('update:modelValue', v),
  })

  const currentStep = ref<1 | 2>(1)
  const loading = ref(false)
  const errorMessage = ref<string | null>(null)

  // Step 1 validation
  const step1Schema = z.object({
    email: z.string().email('E-mail inválido'),
  })

  const {
    valores: step1Values,
    bind: bindStep1,
    validar: validarStep1,
    erroCampo: erroStep1,
  } = useValidateZod(step1Schema, { email: '' })

  // Step 2 validation
  const step2Schema = z.object({
    temporaryPassword: z.string().min(1, 'Informe a senha temporária'),
    newPassword: z.string().min(1, 'Informe a nova senha'),
  })

  const {
    valores: step2Values,
    bind: bindStep2,
    validar: validarStep2,
    erroCampo: erroStep2,
  } = useValidateZod(step2Schema, { temporaryPassword: '', newPassword: '' })

  async function handleStep1Submit() {
    const valido = await validarStep1()
    if (!valido) return

    loading.value = true
    errorMessage.value = null

    try {
      await requestPasswordReset({ email: step1Values.value.email })
      currentStep.value = 2
    } catch (error: any) {
      errorMessage.value = error.message
    } finally {
      loading.value = false
    }
  }

  async function handleStep2Submit() {
    const valido = await validarStep2()
    if (!valido) return

    loading.value = true
    errorMessage.value = null

    try {
      await resetPassword({
        email: step1Values.value.email,
        temporaryPassword: step2Values.value.temporaryPassword,
        newPassword: step2Values.value.newPassword,
      })

      emit('success')
      resetModal()
    } catch (error: any) {
      errorMessage.value = error.message
    } finally {
      loading.value = false
    }
  }

  function backToStep1() {
    currentStep.value = 1
    step2Values.value = { temporaryPassword: '', newPassword: '' }
    errorMessage.value = null
  }

  function resetModal() {
    currentStep.value = 1
    step1Values.value = { email: '' }
    step2Values.value = { temporaryPassword: '', newPassword: '' }
    errorMessage.value = null
  }

  // Reset modal when closed
  watch(
    () => props.modelValue,
    (visible) => {
      if (!visible) {
        setTimeout(() => resetModal(), 300)
      }
    },
  )
</script>

<style scoped>
  .step-indicator {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: var(--climb-muted);
    font-weight: 600;
  }

  .step-progress {
    width: 100%;
    height: 4px;
    background-color: #e5e7eb;
    border-radius: 2px;
    margin-bottom: 1.5rem;
  }

  .step-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #6ee7b7 0%, #34d399 100%);
    transition: width 0.3s ease;
    width: 50%;
  }

  .step-progress-bar.step-2 {
    width: 100%;
  }

  .error-banner {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background-color: #fee2e2;
    color: #991b1b;
    border-radius: 12px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .error-banner i {
    font-size: 1.1rem;
  }

  .form-stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
