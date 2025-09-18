import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '@/api/backend/clients/hook';
import { useCreateSimulation } from '@/api/backend/simulations/hook';
import { useSimulationStore } from '@/stores/simulations-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import { Badge } from '@/components/shadcn-ui/badge';
import { Alert, AlertDescription } from '@/components/shadcn-ui/alert';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import { Save, ArrowLeft, User, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function SaveDashboardPage() {
    const navigate = useNavigate();
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const [simulationName, setSimulationName] = useState('');

    const { data: clientsData, isLoading: clientsLoading, isError: clientsError } = useClients();
    const createSimulationMutation = useCreateSimulation();

    const { result: currentSimulation, formData: simulationInput } = useSimulationStore();

    const handleSaveSimulation = async () => {
        if (!selectedClientId || !simulationName.trim() || !currentSimulation || !simulationInput) {
            toast.error('Veuillez sélectionner un client et saisir un nom pour la simulation');
            return;
        }

        const simulationData = {
            name: simulationName.trim(),
            result: {
                simulation: currentSimulation,
                input: simulationInput,
                savedAt: new Date().toISOString(),
            }
        };

        try {
            const result = await createSimulationMutation.mutateAsync({
                clientId: selectedClientId,
                data: simulationData
            });

            if (result.success) {
                toast.success('Simulation sauvegardée avec succès !');
                navigate('/dashboard/clients');
            } else {
                toast.error(result.message || 'Erreur lors de la sauvegarde');
            }
        } catch (error) {
            console.error('Error saving simulation:', error);
            toast.error('Erreur lors de la sauvegarde');
        }
    };

    if (!currentSimulation) {
        return (
            <div className="container mx-auto p-6 max-w-4xl">
                <Alert variant="destructive">
                    <AlertDescription>
                        Aucune simulation à sauvegarder. Veuillez d'abord effectuer une simulation.
                    </AlertDescription>
                </Alert>
                <Button
                    onClick={() => navigate('/dashboard/simulations')}
                    className="mt-4"
                    variant="outline"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour au simulateur
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl space-y-6">
            <div className="flex items-center gap-4">
                <Button
                    onClick={() => navigate('/dashboard/simulations')}
                    variant="outline"
                    size="sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <h1 className="text-2xl font-bold">Sauvegarder la simulation</h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Résumé de la simulation */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Save className="w-5 h-5" />
                            Résumé de la simulation
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-muted-foreground">Mensualité:</span>
                                <div className="font-semibold">{currentSimulation.mensualite.toLocaleString('fr-FR')} €</div>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Prix du bien:</span>
                                <div className="font-semibold">{currentSimulation.prix_du_bien.toLocaleString('fr-FR')} €</div>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Total à financer:</span>
                                <div className="font-semibold">{currentSimulation.total_a_financer.toLocaleString('fr-FR')} €</div>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Revenu minimum:</span>
                                <div className="font-semibold">{currentSimulation.revenu_acquereur_minimum_mensuel.toLocaleString('fr-FR')} €</div>
                            </div>
                        </div>
                        <Badge variant="secondary" className="w-fit">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date().toLocaleDateString('fr-FR')}
                        </Badge>
                    </CardContent>
                </Card>

                {/* Formulaire de sauvegarde */}
                <Card>
                    <CardHeader>
                        <CardTitle>Détails de sauvegarde</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="simulationName">Nom de la simulation</Label>
                            <Input
                                id="simulationName"
                                value={simulationName}
                                onChange={(e) => setSimulationName(e.target.value)}
                                placeholder="Ex: Simulation Maison Paris"
                                className="mt-1"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sélection du client */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Sélectionner un client
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {clientsLoading && (
                        <div className="space-y-2">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-16 w-full" />
                            ))}
                        </div>
                    )}

                    {clientsError && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                Erreur lors du chargement des clients.
                            </AlertDescription>
                        </Alert>
                    )}

                    {clientsData?.clients && (
                        <div className="grid gap-2">
                            {clientsData.clients.map((client) => (
                                <div
                                    key={client.id}
                                    onClick={() => setSelectedClientId(client.id)}
                                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                                        selectedClientId === client.id
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:bg-muted/50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">{client.fullName}</div>
                                            <div className="text-sm text-muted-foreground">{client.email}</div>
                                        </div>
                                        {selectedClientId === client.id && (
                                            <Badge>Sélectionné</Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {clientsData?.clients?.length === 0 && (
                        <Alert>
                            <AlertDescription>
                                Aucun client trouvé. Vous devez d'abord créer un client.
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {/* Bouton de sauvegarde */}
            <div className="flex justify-end">
                <Button
                    onClick={handleSaveSimulation}
                    disabled={!selectedClientId || !simulationName.trim() || createSimulationMutation.isPending}
                    size="lg"
                >
                    {createSimulationMutation.isPending ? (
                        'Sauvegarde en cours...'
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Sauvegarder la simulation
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}