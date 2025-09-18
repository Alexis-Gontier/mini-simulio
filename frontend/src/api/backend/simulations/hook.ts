import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createSimulation, getSimulations } from "./service"

export function useCreateSimulation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["createSimulation"],
    mutationFn: ({ clientId, data }: { clientId: number; data: any }) =>
      createSimulation(clientId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["simulations", variables.clientId],
      })
    },
  })
}

export function useSimulations(clientId: number) {
  return useQuery({
    queryKey: ["simulations", clientId],
    queryFn: () => getSimulations(clientId),
    enabled: !!clientId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
