import PageLayout from '@/layouts/page-layout';
import ClientsTable from "@/components/clients/clients-table";
import { ClientForm } from '@/components/form/client/client-form';

export default function ClientPage() {
  return (
    <PageLayout
      title="Clients"
      description="Gestion des clients"
    >
      <ClientForm />
      <ClientsTable />
    </PageLayout>
  )
}
