import { z } from "zod";

export const clientSchema = z.object({
    fullName: z
        .string()
        .min(1, { message: "Le nom complet est requis." }),
    email: z
        .string().min(1, { message: "L'email est requis." })
        .email({ message: "L'email n'est pas valide." }),
});

export type ClientInput = z.infer<typeof clientSchema>;