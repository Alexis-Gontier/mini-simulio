import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card"
import SimulatorForm from "@/components/form/simulator/simulator-form"
import SimulationResults from "@/components/simulator/simulation-results"
import PageLayout from "@/layouts/page-layout"
import { Separator } from "@/components/shadcn-ui/separator"
import { useEffect, useState } from "react"

export default function SimulatorPage() {
  const [lastSimulation, setLastSimulation] = useState(null)

  useEffect(() => {
    const simulation = localStorage.getItem("lastSimulation")
    if (simulation) {
      setLastSimulation(JSON.parse(simulation))
    }

    // Écouter les changements dans localStorage
    const handleStorageChange = () => {
      const updatedSimulation = localStorage.getItem("lastSimulation")
      if (updatedSimulation) {
        setLastSimulation(JSON.parse(updatedSimulation))
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Écouter les changements internes (même onglet)
    const handleInternalUpdate = () => {
      const updatedSimulation = localStorage.getItem("lastSimulation")
      if (updatedSimulation) {
        setLastSimulation(JSON.parse(updatedSimulation))
      }
    }

    window.addEventListener('simulationUpdated', handleInternalUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('simulationUpdated', handleInternalUpdate)
    }
  }, [])

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
            <SimulationResults data={lastSimulation} />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
