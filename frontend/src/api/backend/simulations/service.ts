import { backendApi } from "@/api/backend/client";
import { isResponseError } from 'up-fetch';
import { tokenUtils } from "@/lib/token";
import { createSimulationSchemaResponse, getSimulationsSchemaResponse } from "./schema";

export async function createSimulation(clientId: number, data: any) {
    const token = tokenUtils.get();
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
    const token = tokenUtils.get();
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