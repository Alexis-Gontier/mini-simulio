import { z } from "zod"

export const calculerMensualite39Bis2AncienSchema = z.object({
    montantEmprunte: z.number().min(0, { message: "Le montant emprunté doit être positif." }),
})

export type CalculerMensualite39Bis2AncienInput = z.infer<typeof calculerMensualite39Bis2AncienSchema>