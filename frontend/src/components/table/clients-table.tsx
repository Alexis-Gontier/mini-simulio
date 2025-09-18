import { useClients } from '@/api/backend/clients/hook';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/shadcn-ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn-ui/card";
import { Badge } from "@/components/shadcn-ui/badge";
import { Skeleton } from "@/components/shadcn-ui/skeleton";
import { Alert, AlertDescription } from "@/components/shadcn-ui/alert";
import { Eye } from 'lucide-react';
import { Button } from '../shadcn-ui/button';

export default function ClientsTable() {
    const { data, isLoading, isError } = useClients();

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Clients</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (isError) {
        return (
            <Alert variant="destructive">
                <AlertDescription>
                    Erreur lors du chargement des clients.
                </AlertDescription>
            </Alert>
        );
    }

    if (!data || !('clients' in data)) {
        return (
            <Alert variant="destructive">
                <AlertDescription>
                    Format de données inattendu.
                </AlertDescription>
            </Alert>
        );
    }

    if (!data.clients.length) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Clients</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-8">
                        Aucun client trouvé.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Clients
                    <Badge variant="secondary">{data.clients.length}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nom complet</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Date de création</TableHead>
                            <TableHead>Dernière modification</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.clients.map((client) => (
                            <TableRow key={client.id} className="hover:bg-muted/50">
                                <TableCell className="font-mono">
                                    {client.id}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {client.fullName}
                                </TableCell>
                                <TableCell>{client.email}</TableCell>
                                <TableCell className="text-muted-foreground">
                                    {new Date(client.createdAt).toLocaleDateString('fr-FR')}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {new Date(client.updatedAt).toLocaleDateString('fr-FR')}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        asChild
                                    >
                                        <Link
                                            to={`/dashboard/clients/${client.id}`}
                                        >
                                            <Eye />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}