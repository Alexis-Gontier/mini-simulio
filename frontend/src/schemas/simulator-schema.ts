import { z } from "zod"

export const calculerMensualite39Bis2AncienSchema = z.object({
    N: z
        .number()
        .min(1, { message: "La durée doit être d'au moins 1 année." }),
    C2: z
        .number()
        .min(1, { message: "Le prix du bien doit être supérieur à 0." }),
    T: z
        .number()
        .min(0.01, { message: "Le taux doit être supérieur à 0." })
        .max(100, { message: "Le taux doit être inférieur à 100%." }),
    ASSU: z
        .number()
        .min(0, { message: "L'assurance doit être positive." }),
    apport: z
        .number()
        .min(0, { message: "L'apport doit être positif." }),
    mois: z
        .string()
        .regex(/^(0[1-9]|1[0-2])$/, { message: "Le mois doit être au format MM (01-12)." }),
    annee: z
        .string()
        .regex(/^\d{4}$/, { message: "L'année doit être au format YYYY." }),
    fraisAgence: z
        .number()
        .min(0, { message: "Les frais d'agence doivent être positifs." }),
    fraisNotaire: z
        .number()
        .min(0, { message: "Les frais de notaire doivent être positifs." }),
    TRAVAUX: z
        .number()
        .min(0, { message: "Les travaux doivent être positifs." }),
    revalorisationBien: z
        .number()
        .min(0, { message: "La revalorisation doit être positive." }),
})

export type CalculerMensualite39Bis2Ancien = z.infer<typeof calculerMensualite39Bis2AncienSchema>