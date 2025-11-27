import https from './https'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface RequestPasswordResetPayload {
  email: string
}

export interface ResetPasswordPayload {
  email: string
  temporaryPassword: string
  newPassword: string
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await https.post('/api/auth/login', payload)
    return response.data
  } catch (error: any) {
    if (error.message === 'Aguardando aprovação') {
      throw error
    }
    throw new Error('E-mail ou senha inválidos')
  }
}

export const requestPasswordReset = async (payload: RequestPasswordResetPayload) => {
  try {
    const response = await https.post('/user/request-password-reset', payload)
    return response.data
  } catch (error: any) {
    console.error('Falha ao solicitar redefinição de senha:', error)
    if (error.response) {
      throw new Error(
        `Erro ${error.response.status}: ${error.response.data.message || 'Falha ao solicitar redefinição de senha'}`,
      )
    } else if (error.request) {
      throw new Error('Servidor não respondeu. Tente novamente.')
    } else {
      throw new Error(error.message)
    }
  }
}

export const resetPassword = async (payload: ResetPasswordPayload) => {
  try {
    const response = await https.post('/user/reset-password', payload)
    return response.data
  } catch (error: any) {
    console.error('Falha ao redefinir senha:', error)
    if (error.response) {
      throw new Error(
        `Erro ${error.response.status}: ${error.response.data.message || 'Falha ao redefinir senha'}`,
      )
    } else if (error.request) {
      throw new Error('Servidor não respondeu. Tente novamente.')
    } else {
      throw new Error(error.message)
    }
  }
}
