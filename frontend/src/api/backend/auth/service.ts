import { backendApi } from "@/api/backend/client";
import { isResponseError } from 'up-fetch'
import {
    userLoginResponseSchema,
    userLogoutResponseSchema,
    userRegistrationResponseSchema,
    userMeResponseSchema
} from "@/api/backend/auth/schema";
import { loginSchema, registerSchema } from "@/schemas/auth-schema";
import { useAuthStore } from "@/stores/auth-store";

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

        useAuthStore.getState().login(response.token.value);

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

    const parsedData = registerSchema.safeParse(data);
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

        useAuthStore.getState().login(response.token.value);

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

    const token = useAuthStore.getState().token;
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

        useAuthStore.getState().logout();

        return {
            success: true,
            message: response.message,
        };

    } catch (error) {
        if (isResponseError(error)) {
            useAuthStore.getState().logout();
            return {
                success: false,
                message: error.message,
            };
        }
        useAuthStore.getState().logout();

        return {
            success: false,
            message: "Network error or unexpected response format",
        };
    }
}

export async function me() {
    const token = useAuthStore.getState().token;
    if (!token) {
        return {
            success: false,
            message: "No auth token found",
        };
    }

    try {
        const response = await backendApi('/api/auth/me', {
            method: 'GET',
            schema: userMeResponseSchema,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
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