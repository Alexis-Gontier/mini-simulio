import { z } from 'zod';

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 100;

const fullNameValidation = z.string()
  .min(NAME_MIN_LENGTH, {
    message: `Le nom complet doit contenir au moins ${NAME_MIN_LENGTH} caractères.`
  })
  .max(NAME_MAX_LENGTH, {
    message: `Le nom complet ne doit pas dépasser ${NAME_MAX_LENGTH} caractères.`
  });

const emailValidation = z
  .string()
  .email({
    message: "Veuillez entrer une adresse email valide."
  });

const passwordValidation = z
    .string()
    .min(PASSWORD_MIN_LENGTH, {
        message: `Le mot de passe doit contenir au moins ${PASSWORD_MIN_LENGTH} caractères.`
    })
    .max(PASSWORD_MAX_LENGTH, {
        message: `Le mot de passe ne doit pas dépasser ${PASSWORD_MAX_LENGTH} caractères.`
    });

// Sign-up schema
export const signUpSchema = z.object({
    fullName: fullNameValidation,
    email: emailValidation,
    password: passwordValidation,
});

// Sign-in schema
export const loginSchema = z.object({
    email: emailValidation,
    password: z.string().min(1, {
        message: "Le mot de passe est requis."
    }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;