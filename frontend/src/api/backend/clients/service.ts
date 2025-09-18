import { backendApi } from "@/api/backend/client";
import { isResponseError } from 'up-fetch'
import { useAuthStore } from "@/stores/auth-store";

import {
    getClientsSchemaResponse,
    createClientSchemaResponse
} from "@/api/backend/clients/schema";

export async function getClient() {
    const { isAuthenticated, token } = useAuthStore.getState();
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

export async function getClientById(clientId: number) {
    const { isAuthenticated, token } = useAuthStore.getState();
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
        // Pour l'instant, on récupère tous les clients et on filtre
        // TODO: Implémenter l'endpoint /api/clients/:id côté backend
        const response = await backendApi('/api/clients', {
            method: 'GET',
            schema: getClientsSchemaResponse,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.clients) {
            const client = response.clients.find((c: any) => c.id === clientId);
            if (client) {
                return {
                    success: true,
                    client: client
                };
            } else {
                return {
                    success: false,
                    message: "Client not found",
                };
            }
        }

        return {
            success: false,
            message: "No clients data received",
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

export async function createClient(data: unknown) {
    const { isAuthenticated, token } = useAuthStore.getState();
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