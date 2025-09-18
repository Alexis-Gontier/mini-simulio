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

export const userLogoutResponseSchema = z.object({
    message: z.literal("Logout successful"),
});

export const userMeResponseSchema = z.object({
    user: z.object({
        id: z.number(),
        email: z.string().email(),
        fullName: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
    }),
});