import LogoutButton from "@/components/ui/logout-button";
import PageLayout from "@/layouts/page-layout";
import { useAuthStore } from "@/stores/auth-store";

export default function HomeDashboardPage() {
  const { user } = useAuthStore();

  return (
    <PageLayout
      title={`Bonjour, ${user?.fullName}`}
      description="Bienvenue sur votre tableau de bord"
    >
      <LogoutButton />
    </PageLayout>
  )
}
