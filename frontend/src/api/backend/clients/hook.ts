import {
    useQuery,
    useMutation
} from "@tanstack/react-query";
import {
    getClient,
    createClient
} from '@/api/backend/clients/service'

export function useClients() {
    return useQuery({
        queryKey: ['clients'],
        queryFn: () => getClient(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useCreateClient() {
    return useMutation({
        mutationKey: ['createClient'],
        mutationFn: (data: unknown) => createClient(data),
    });
}