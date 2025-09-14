import { Button } from '@/components/shadcn-ui/button'
import { Save } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSimulationStore } from '@/stores/simulation-store'

export default function SaveSimulationButton() {
    const hasSimulation = useSimulationStore((state) => state.hasSimulation())

    return (
        <Button
            className="w-full"
            asChild
            disabled={!hasSimulation}
        >
            <Link to="/dashboard/save">
                <Save />
                Enregister la simulation
            </Link>
        </Button>
    )
}
