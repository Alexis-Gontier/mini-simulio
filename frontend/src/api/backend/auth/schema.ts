import { z } from "zod";

export const userRegistrationResponseSchema = z.object({
    message: z.string(),
    user: z.object({
        id: z.number(),
        email: z.string().email(),
        fullName: z.string(),
    }),
    token: z.object({
        type: z.literal("bearer"),
        value: z.string(),
    }),
});

export const userLoginResponseSchema = z.object({
    message: z.string(),
    user: z.object({
        id: z.number(),
        email: z.string().email(),
        fullName: z.string(),
    }),
    token: z.object({
        type: z.literal("bearer"),
        value: z.string(),
    }),
});