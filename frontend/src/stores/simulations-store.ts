import { create } from "zustand"
import { persist } from "zustand/middleware"
import { calculerMensualite39Bis2AncienSchema } from "@/schemas/simulator-schema"
import { z } from "zod"

function createFormStore<T, R = unknown>(
  schema: z.ZodSchema<T>,
  storeName: string
) {
  interface FormStore {
    formData: T | null
    result: R | null
    isCalculating: boolean
    setFormData: (data: T) => void
    setResult: (result: R) => void
    clearFormData: () => void
    clearResult: () => void
    clearAll: () => void
    clearStorage: () => void
    setCalculating: (calculating: boolean) => void
  }

  return create<FormStore>()(
    persist(
      (set, _get, api) => ({
        formData: null,
        result: null,
        isCalculating: false,
        setFormData: (data: T) => {
          const validatedData = schema.parse(data)
          set({ formData: validatedData })
        },
        setResult: (result: R) => set({ result }),
        clearFormData: () => set({ formData: null }),
        clearResult: () => set({ result: null }),
        clearAll: () => set({ formData: null, result: null, isCalculating: false }),
        clearStorage: () => api.persist.clearStorage(),
        setCalculating: (calculating: boolean) => set({ isCalculating: calculating }),
      }),
      {
        name: storeName,
        partialize: (state) => ({
          formData: state.formData,
          result: state.result,
        })
      }
    )
  )
}

export const useSimulationStore = createFormStore(calculerMensualite39Bis2AncienSchema, 'simulation-form-storage')