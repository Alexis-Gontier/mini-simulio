import { backendApi } from "@/api/backend/client";
import { isResponseError } from 'up-fetch'
import { tokenUtils } from "@/lib/token";

import {
    getClientsSchemaResponse,
    createClientSchemaResponse
} from "@/api/backend/clients/schema";

export async function getClient() {
    const token = tokenUtils.get();
    if (!token) {
        return {
            success: false,
            message: "No auth token found in localStorage",
        };
    }

    try {
        return await backendApi('/api/clients', {
            method: 'GET',
            schema: getClientsSchemaResponse,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
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

export async function createClient(data: unknown) {
    const token = tokenUtils.get();
    if (!token) {
        return {
            success: false,
            message: "No auth token found in localStorage",
        };
    }

    try {
        const response = await backendApi('/api/clients', {
            method: 'POST',
            schema: createClientSchemaResponse,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
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