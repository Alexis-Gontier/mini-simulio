import { backendApi } from "@/api/backend/client";
import { isResponseError } from 'up-fetch';
import { createSimulationSchemaResponse, getSimulationsSchemaResponse } from "./schema";
import { useAuthStore } from "@/stores/auth-store";

export async function createSimulation(clientId: number, data: unknown) {

    const { token, isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
        return {
            success: false,
            message: "User is not authenticated",
        };
    }
    if (!token) {
        return {
            success: false,
            message: "No auth token found in localStorage",
        };
    }

    try {
        const response = await backendApi(`/api/clients/${clientId}/simulations`, {
            method: 'POST',
            schema: createSimulationSchemaResponse,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return {
            success: true,
            data: response,
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

export async function getSimulations(clientId: number) {
    const { token, isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
        return {
            success: false,
            message: "User is not authenticated",
        };
    }
    if (!token) {
        return {
            success: false,
            message: "No auth token found in localStorage",
        };
    }

    try {
        return await backendApi(`/api/clients/${clientId}/simulations`, {
            method: 'GET',
            schema: getSimulationsSchemaResponse,
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