import { Button } from '@/components/shadcn-ui/button'
import { Save } from 'lucide-react'

export default function SaveSimulationButton() {
    return (
        <Button
            className="w-full"
        >
            <Save />
            Enregister la simulation
        </Button>
    )
}
