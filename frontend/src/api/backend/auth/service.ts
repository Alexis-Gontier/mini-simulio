import { backendApi } from "@/api/backend/client";
import { isResponseError } from 'up-fetch'
import {
    userLoginResponseSchema,
    userLogoutResponseSchema,
    userRegistrationResponseSchema
} from "@/api/backend/auth/schema";
import { loginSchema } from "@/schemas/auth-schema";
import { tokenUtils } from "@/lib/token";

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

        tokenUtils.set(response.token.value);

        return {
            success: true,
            message: response.message,
            data: response.user,
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

        tokenUtils.set(response.token.value);

        return {
            success: true,
            message: response.message,
            data: response.user,
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

export async function logOut() {

    const token = tokenUtils.get();
    if (!token) {
        return {
            success: false,
            message: "No auth token found in localStorage",
        };
    }

    try {
        const response = await backendApi('/api/auth/logout', {
            method: 'POST',
            schema: userLogoutResponseSchema,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        localStorage.removeItem('authToken');

        return {
            success: true,
            message: response.message,
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