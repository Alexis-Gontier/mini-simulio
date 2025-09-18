import { z } from 'zod'

// Schéma de validation pour les variables d'environnement
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),
  BACKEND_URL: z.string().url().default('http://localhost:3000'),
  SIMULATOR_URL: z.string().url().default('http://localhost:5000'),
})

// Validation et export
export const ENV = envSchema.parse({
  NODE_ENV: import.meta.env.MODE || 'development',
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
  SIMULATOR_URL: import.meta.env.VITE_SIMULATOR_URL || 'http://localhost:5000',
})