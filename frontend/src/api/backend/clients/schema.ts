import { z } from "zod"

export const getClientsSchemaResponse = z.object({
  clients: z.array(
    z.object({
      id: z.number(),
      fullName: z.string(),
      email: z.string().email(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),
})

export const createClientSchemaResponse = z.object({
  message: z.string(),
  client: z.object({
    id: z.number(),
    fullName: z.string(),
    email: z.string().email(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
})
