import { useClients } from '@/api/backend/clients/hook';

export default function ClientsTable() {

    const { data, isLoading, isError } = useClients();

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading clients.</p>}
            {data && (
                <pre>
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    )
}
