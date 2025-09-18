import { z } from "zod"

export const CalculerMensualite39Bis2AncienResponse = z.object({
  frais_agence: z.number(),
  frais_de_notaire: z.number(),
  garantie_bancaire: z.number(),
  mensualite: z.number(),
  prix_du_bien: z.number(),
  revenu_acquereur_minimum_mensuel: z.number(),
  total_a_financer: z.number(),
  travaux: z.number(),
})
