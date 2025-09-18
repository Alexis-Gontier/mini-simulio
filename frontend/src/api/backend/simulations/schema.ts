import { z } from "zod"

export const createSimulationSchemaRequest = z.object({
  name: z.string().min(1, "Le nom de la simulation est requis"),
  result: z.object({
    simulation: z.object({
      mensualite: z.number(),
      prix_du_bien: z.number(),
      frais_de_notaire: z.number(),
      garantie_bancaire: z.number(),
      travaux: z.number(),
      frais_agence: z.number(),
      total_a_financer: z.number(),
      revenu_acquereur_minimum_mensuel: z.number(),
    }),
    input: z.object({
      N: z.number(),
      C2: z.number(),
      T: z.number(),
      ASSU: z.number(),
      apport: z.number(),
      mois: z.string(),
      annee: z.string(),
      fraisAgence: z.number(),
      fraisNotaire: z.number(),
      TRAVAUX: z.number(),
      revalorisationBien: z.number(),
    }),
    savedAt: z.string(),
  }),
})

export const createSimulationSchemaResponse = z.object({
  message: z.string(),
  simulation: z.any(),
})

export const getSimulationsSchemaResponse = z.object({
  simulations: z.array(z.any()),
})
