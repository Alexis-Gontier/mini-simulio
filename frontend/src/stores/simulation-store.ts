import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SimulationData {
  mensualite: number
  prix_du_bien: number
  frais_de_notaire: number
  garantie_bancaire: number
  travaux: number
  frais_agence: number
  total_a_financer: number
  revenu_acquereur_minimum_mensuel: number
}

interface SimulationInput {
  N: number
  C2: number
  T: number
  ASSU: number
  apport: number
  mois: string
  annee: string
  fraisAgence: number
  fraisNotaire: number
  TRAVAUX: number
  revalorisationBien: number
}

interface SimulationStore {
  // State
  currentSimulation: SimulationData | null
  simulationInput: SimulationInput | null
  isLoading: boolean
  error: string | null

  // Actions
  saveSimulation: (data: SimulationData, input: SimulationInput) => void
  clearSimulation: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed values
  hasSimulation: () => boolean
  getFormattedResults: () => {
    tauxEndettement: number
    coutTotalCredit: number
  } | null
}

export const useSimulationStore = create<SimulationStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentSimulation: null,
      simulationInput: null,
      isLoading: false,
      error: null,

      // Actions
      saveSimulation: (data: SimulationData, input: SimulationInput) => {
        set({
          currentSimulation: data,
          simulationInput: input,
          error: null,
          isLoading: false
        })
      },

      clearSimulation: () => {
        set({
          currentSimulation: null,
          simulationInput: null,
          error: null,
          isLoading: false
        })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      setError: (error: string | null) => {
        set({ error, isLoading: false })
      },

      // Computed values
      hasSimulation: () => {
        return get().currentSimulation !== null
      },

      getFormattedResults: () => {
        const state = get()
        const simulation = state.currentSimulation

        if (!simulation) return null

        const tauxEndettement = (simulation.mensualite / simulation.revenu_acquereur_minimum_mensuel) * 100
        const coutTotalCredit = (simulation.mensualite * 12 * 25) - simulation.total_a_financer

        return {
          tauxEndettement: Number(tauxEndettement.toFixed(1)),
          coutTotalCredit: Number(coutTotalCredit.toFixed(0))
        }
      }
    }),
    {
      name: 'simulation-store',
      storage: createJSONStorage(() => localStorage),
      // Ne persister que les données utiles
      partialize: (state) => ({
        currentSimulation: state.currentSimulation,
        simulationInput: state.simulationInput
      }),
      // Migration pour compatibilité avec anciennes données
      migrate: (persistedState: any, version) => {
        // Si on trouve l'ancien format "lastSimulation"
        if (typeof persistedState === 'object' && !persistedState.currentSimulation) {
          const oldData = localStorage.getItem('lastSimulation')
          if (oldData) {
            try {
              const parsed = JSON.parse(oldData)
              return {
                currentSimulation: parsed,
                simulationInput: null
              }
            } catch {
              return persistedState
            }
          }
        }
        return persistedState
      }
    }
  )
)