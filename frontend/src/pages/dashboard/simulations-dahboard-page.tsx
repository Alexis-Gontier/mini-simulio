import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card"
import SimulationForm from "@/components/form/simulation-form"
import PageLayout from "@/layouts/page-layout"
import { Separator } from "@/components/shadcn-ui/separator"
import SimulationResults from "@/components/simulation/simulation-results"

export default function SimulationsDashboardPage() {
  return (
    <PageLayout
      title="Simulateur"
      description="Lancer la simulation !"
      className="max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-2 gap-4">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-xl">
              Achat en résidence principale dans l'ancien
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent>
            <SimulationForm />
          </CardContent>
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-xl">
              Résultats de la simulation
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent>
            <SimulationResults />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
