import LogoutButton from "@/components/ui/logout-button";
import PageLayout from "@/layouts/page-layout";

export default function DashboardPage() {

  return (
    <PageLayout
      title="Dashboard"
      description="Bienvenue sur le tableau de bord"
    >
      <LogoutButton />
    </PageLayout>
  )
}
