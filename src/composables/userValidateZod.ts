import { ref } from 'vue'
import type { ZodSchema } from 'zod'

export function useValidateZod<T extends Record<string, any>>(schema: ZodSchema<T>, initial: T) {
  const valores = ref<T>({ ...(initial as T) })
  const erros = ref<Partial<Record<keyof T, string[]>>>({})

  async function validar() {
    erros.value = {}
    const parsed = schema.safeParse(valores.value)
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const chave = issue.path[0] as keyof T
        const lista = erros.value[chave] ?? []
        erros.value[chave] = [...lista, issue.message]
      }
      return false
    }
    return true
  }

  function bind<K extends keyof T>(chave: K) {
    return {
      modelValue: valores.value[chave],
      'onUpdate:modelValue': (v: T[K]) => {
        valores.value[chave] = v
      },
    }
  }

  function erroCampo<K extends keyof T>(chave: K) {
    const msgs = erros.value[chave]
    return msgs?.[0]
  }

  return { valores, erros, validar, bind, erroCampo }
}

/** Alias em português para compatibilidade com imports existentes */
export const useValidadorZod = useValidateZod
