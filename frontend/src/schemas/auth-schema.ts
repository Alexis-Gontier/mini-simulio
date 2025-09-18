import { z } from 'zod';

// Register schema
export const registerSchema = z.object({
    fullName: z
        .string()
        .min(2, {
            message: "Le nom complet doit contenir au moins 2 caractères."
        }),
    email: z
        .string()
        .min(1, {
            message: "L'email est requis."
        })
        .email({
            message: "L'email n'est pas valide."
        }),
    password: z
        .string()
        .min(6, {
            message: "Le mot de passe doit contenir au moins 6 caractères."
        }),
});

// Login schema
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: "L'email est requis."
        }).email({
            message: "L'email n'est pas valide."
        }),
    password: z
        .string()
        .min(1, {
            message: "Le mot de passe est requis."
        }),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;