import https from './https'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface SignupPayload {
  fullName: string
  email: string
  password: string
  cpf: string
  phone: string
}

export interface SignupResponse {
  message?: string
}

export interface RequestPasswordResetPayload {
  email: string
}

export interface ResetPasswordPayload {
  email: string
  temporaryPassword: string
  newPassword: string
}

export interface GoogleCallbackResponse {
  success: boolean
  pending: boolean
  token?: string
  user?: string
  profile?: {
    id: number
    fullName: string
    email: string
    profilePicture: string
    state: string
  }
  message?: string
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await https.post('/auth/login', payload)
    return response.data
  } catch (error: any) {
    if (error.message === 'Aguardando aprovação') {
      throw error
    }
    throw new Error('E-mail ou senha inválidos')
  }
}

export const signup = async (payload: SignupPayload): Promise<SignupResponse> => {
  try {
    const response = await https.post('/auth/signup', payload)
    return response.data
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    }
    throw new Error('Erro ao criar conta. Tente novamente.')
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

export const getGoogleAuthUrl = async (state?: string): Promise<string> => {
  const fallbackUrl = `${https.defaults.baseURL}auth/google${
    state ? `?state=${encodeURIComponent(state)}` : ''
  }`

  try {
    const response = await https.get('/auth/google', {
      params: state ? { state } : undefined,
    })

    if (response.data?.url) {
      return response.data.url
    }

    return fallbackUrl
  } catch (error) {
    console.warn('Falha ao obter URL do Google, usando fallback.', error)
    return fallbackUrl
  }
}

export const completeGoogleSignin = async (
  code: string,
  state?: string,
): Promise<GoogleCallbackResponse> => {
  const response = await https.get('/auth/google/callback', {
    params: {
      code,
      state,
    },
  })

  return response.data
}
