import { useParams } from "react-router-dom";
import { useSimulations } from '@/api/backend/simulations/hook';
import { Alert, AlertDescription } from '@/components/shadcn-ui/alert';

export default function ClientByIdPage() {
    const { clientId } = useParams<{ clientId: string }>();
    const clientIdNumber = clientId ? parseInt(clientId, 10) : 0;

    const { data: simulationsData, isLoading, isError } = useSimulations(clientIdNumber);

    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }

    if (isError) {
        return (
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Client ID: {clientId}</h1>
                <Alert variant="destructive">
                    <AlertDescription>
                        Erreur lors du chargement des simulations.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Client ID: {clientId}</h1>
                {simulationsData?.simulations && simulationsData.simulations.length > 0 ? (
                    <pre>
                        {JSON.stringify(simulationsData.simulations, null, 2)}
                    </pre>
                ) : (
                    <p className="text-muted-foreground">Aucune simulation trouvée pour ce client.</p>
                )}
        </div>
    );
}
