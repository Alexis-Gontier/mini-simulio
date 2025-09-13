import { backendApi } from "@/api/backend/client";
import { isResponseError } from 'up-fetch'
import {
    userLoginResponseSchema,
    userRegistrationResponseSchema
} from "@/api/backend/auth/schema";
import { loginSchema } from "@/schemas/auth-schema";

export async function signIn(data: unknown) {

    const parsedData = loginSchema.safeParse(data);
    if (!parsedData.success) {
        return {
            success: false,
            message: "Invalid data",
        }
    }

    try {
        const response = await backendApi('/api/auth/login', {
            method: 'POST',
            schema: userLoginResponseSchema,
            body: parsedData.data,
        });

        return {
            success: true,
            message: response.message,
            data: response.user,
            token: response.token,
        };

    } catch (error) {
        if (isResponseError(error)) {
            return {
                success: false,
                message: error.message,
            };
        }

        return {
            success: false,
            message: "Network error or unexpected response format",
        };
    }
}

export async function signUp(data: unknown) {

    const parsedData = loginSchema.safeParse(data);
    if (!parsedData.success) {
        return {
            success: false,
            message: "Invalid data",
        }
    }

    try {
        const response = await backendApi('/api/auth/register', {
            method: 'POST',
            schema: userRegistrationResponseSchema,
            body: parsedData.data,
        });

        return {
            success: true,
            message: response.message,
            data: response.user,
            token: response.token,
        };

    } catch (error) {
        if (isResponseError(error)) {
            return {
                success: false,
                message: error.message,
            };
        }

        return {
            success: false,
            message: "Network error or unexpected response format",
        };
    }
}
