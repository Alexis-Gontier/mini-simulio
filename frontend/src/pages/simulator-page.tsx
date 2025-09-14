import {
  Card,
  CardContent,
} from "@/components/shadcn-ui/card"
import SimulatorForm from "@/components/form/simulator/simulator-form"
import PageLayout from "@/layouts/page-layout"

export default function SimulatorPage() {
  return (
    <PageLayout
      title="Simulateur"
      description="Lancer la simulation !"
    >
      <Card>
        <CardContent>
          <SimulatorForm />
        </CardContent>
      </Card>
    </PageLayout>
  )
}
