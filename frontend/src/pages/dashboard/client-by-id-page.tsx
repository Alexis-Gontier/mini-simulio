import { useParams, Link, useNavigate } from "react-router-dom";
import { useClient } from '@/api/backend/clients/hook';
import { useSimulations } from '@/api/backend/simulations/hook';
import PageLayout from '@/layouts/page-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Button } from '@/components/shadcn-ui/button';
import { Alert, AlertDescription } from '@/components/shadcn-ui/alert';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import { Separator } from '@/components/shadcn-ui/separator';
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Calculator,
  Plus,
  FileText
} from 'lucide-react';

export default function ClientByIdPage() {
    const { clientId } = useParams<{ clientId: string }>();
    const navigate = useNavigate();
    const clientIdNumber = clientId ? parseInt(clientId, 10) : 0;

    const { data: clientData, isLoading: clientLoading, isError: clientError } = useClient(clientIdNumber);
    const { data: simulationsData, isLoading: simulationsLoading, isError: simulationsError } = useSimulations(clientIdNumber);

    if (clientLoading) {
        return (
            <PageLayout
                title="Chargement..."
                description="Récupération des informations du client"
                className="max-w-6xl mx-auto"
            >
                <div className="space-y-6">
                    <Skeleton className="h-32 w-full" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-64 w-full" />
                    </div>
                </div>
            </PageLayout>
        );
    }

    if (clientError || !clientData?.success) {
        return (
            <PageLayout
                title="Erreur"
                description="Impossible de charger les informations du client"
                className="max-w-6xl mx-auto"
            >
                <div className="space-y-4">
                    <Button
                        onClick={() => navigate('/dashboard/clients')}
                        variant="outline"
                        className="mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour aux clients
                    </Button>
                    <Alert variant="destructive">
                        <AlertDescription>
                            {clientData?.message || "Client introuvable ou erreur lors du chargement."}
                        </AlertDescription>
                    </Alert>
                </div>
            </PageLayout>
        );
    }

    const client = clientData.client;
    const simulations = simulationsData && 'simulations' in simulationsData ? simulationsData.simulations : [];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <PageLayout
            title={client?.fullName || 'Client'}
            description="Détails du client et ses simulations"
            className="max-w-6xl mx-auto"
        >
            <div className="space-y-6">
                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <Button
                        onClick={() => navigate('/dashboard/clients')}
                        variant="outline"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour aux clients
                    </Button>
                    <Button asChild>
                        <Link to="/dashboard/simulations">
                            <Plus />
                            Nouvelle simulation
                        </Link>
                    </Button>
                </div>

                {/* Informations du client */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Informations du client
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <User className="w-4 h-4" />
                                    <span className="text-sm">Nom complet</span>
                                </div>
                                <p className="font-semibold">{client?.fullName}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm">Email</span>
                                </div>
                                <p className="font-semibold">{client?.email}</p>
                            </div>

                            {client?.createdAt && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm">Client depuis</span>
                                    </div>
                                    <p className="font-semibold">{formatDate(client.createdAt)}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Simulations */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calculator className="w-5 h-5" />
                                Simulations ({simulations.length})
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        {simulationsLoading ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <Skeleton key={i} className="h-20 w-full" />
                                ))}
                            </div>
                        ) : simulationsError ? (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    Erreur lors du chargement des simulations.
                                </AlertDescription>
                            </Alert>
                        ) : simulations.length > 0 ? (
                            <div className="space-y-4">
                                {simulations.map((simulation: any, index: number) => (
                                    <div
                                        key={simulation.id || index}
                                        className="flex items-center justify-between p-4 rounded-lg border bg-card"
                                    >
                                        <div className="flex items-center gap-4">
                                            <FileText className="w-8 h-8 text-muted-foreground" />
                                            <div>
                                                <h3 className="font-semibold">
                                                    {simulation.name || `Simulation ${index + 1}`}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    {simulation.result?.simulation?.mensualite && (
                                                        <span>
                                                            Mensualité: {formatCurrency(simulation.result.simulation.mensualite)}
                                                        </span>
                                                    )}
                                                    {simulation.result?.simulation?.total_a_financer && (
                                                        <span>
                                                            Total: {formatCurrency(simulation.result.simulation.total_a_financer)}
                                                        </span>
                                                    )}
                                                    {simulation.result?.savedAt && (
                                                        <span>
                                                            {formatDate(simulation.result.savedAt)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Calculator className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Aucune simulation</h3>
                                <p className="text-muted-foreground mb-4">
                                    Ce client n'a pas encore de simulations sauvegardées.
                                </p>
                                <Button asChild>
                                    <Link to="/dashboard/simulations">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Créer une simulation
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </PageLayout>
    );
}