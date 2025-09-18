import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {
    getClient,
    getClientById,
    createClient
} from '@/api/backend/clients/service';

export function useClients() {
    return useQuery({
        queryKey: ['clients'],
        queryFn: () => getClient(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useClient(clientId: number) {
    return useQuery({
        queryKey: ['client', clientId],
        queryFn: () => getClientById(clientId),
        enabled: !!clientId && clientId > 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useCreateClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createClient'],
        mutationFn: (data: unknown) => createClient(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
        },
    });
}