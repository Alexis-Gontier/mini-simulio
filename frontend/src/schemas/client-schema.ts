import { z } from "zod";

export const clientSchema = z.object({
    fullName: z
        .string()
        .min(1, "Le nom complet est requis"),
    email: z
        .string()
        .email("Adresse e-mail invalide"),
});

export type ClientInput = z.infer<typeof clientSchema>;