import { z } from 'zod';

const FIRSTNAME_MIN_LENGTH = 2;
const FIRSTNAME_MAX_LENGTH = 50;
const LASTNAME_MIN_LENGTH = 2;
const LASTNAME_MAX_LENGTH = 50;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 100;

const fullNameValidation = z.string()
  .min(FIRSTNAME_MIN_LENGTH)
  .max(FIRSTNAME_MAX_LENGTH)
  .refine((val) => {
    const [firstName, lastName] = val.split(" ");
    return (
      firstName.length >= FIRSTNAME_MIN_LENGTH &&
      firstName.length <= FIRSTNAME_MAX_LENGTH &&
      lastName.length >= LASTNAME_MIN_LENGTH &&
      lastName.length <= LASTNAME_MAX_LENGTH
    );
  }, {
    message: "Le nom complet doit contenir un prénom et un nom de famille valides."
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