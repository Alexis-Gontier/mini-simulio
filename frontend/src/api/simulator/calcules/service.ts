import { simulatorApi } from "@/api/simulator/client";
import { isResponseError } from 'up-fetch'
import { tokenUtils } from "@/lib/token";
import { CalculerMensualite39Bis2AncienResponse } from "@/api/simulator/calcules/schema";

export async function calculerMensualite39Bis2Ancien(data: unknown) {
    const token = tokenUtils.get();
    if (!token) {
        return {
            success: false,
            message: "No auth token found in localStorage",
        };
    }
    try {
        const response = await simulatorApi('/api/calculate', {
            method: 'POST',
            schema: CalculerMensualite39Bis2AncienResponse,
            body: JSON.stringify(data),
        });
        return {
            success: true,
            message: "Calculation successful",
            data: response,
        }
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