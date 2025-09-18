import { simulatorApi } from "@/api/simulations/client"
import { isResponseError } from "up-fetch"
import { CalculerMensualite39Bis2AncienResponse } from "@/api/simulations/calcules/schema"
import { useAuthStore } from "@/stores/auth-store"

export async function calculerMensualite39Bis2Ancien(data: unknown) {
  const { token, isAuthenticated } = useAuthStore.getState()
  if (!isAuthenticated) {
    return {
      success: false,
      message: "User is not authenticated",
    }
  }
  if (!token) {
    return {
      success: false,
      message: "No auth token found in localStorage",
    }
  }
  try {
    const response = await simulatorApi("/api/calculate", {
      method: "POST",
      schema: CalculerMensualite39Bis2AncienResponse,
      body: JSON.stringify(data),
    })
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
      }
    }
    return {
      success: false,
      message: "Network error or unexpected response format",
    }
  }
}
