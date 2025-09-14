import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card"
import SimulatorForm from "@/components/form/simulator/simulator-form"
import SimulationResults from "@/components/simulator/simulation-results"
import PageLayout from "@/layouts/page-layout"
import { Separator } from "@/components/shadcn-ui/separator"
import SaveSimulationButton from "@/components/simulator/save-simulation-button"

export default function SimulatorPage() {

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
            <SimulatorForm />
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
          <CardFooter>
            <SaveSimulationButton />
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  )
}
