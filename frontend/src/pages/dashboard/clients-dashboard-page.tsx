import { ClientForm } from "@/components/form/client-form"
import ClientsTable from "@/components/table/clients-table"
import PageLayout from "@/layouts/page-layout"

export default function ClientsDashboardPage() {
  return (
    <PageLayout title="Clients" description="Gérez vos clients ici">
      <ClientForm />
      <ClientsTable />
    </PageLayout>
  )
}
