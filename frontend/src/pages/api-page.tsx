import PageLayout from "@/layouts/page-layout"
import { ENV } from "@/lib/env"

export default function ApiPage() {


    return (
        <PageLayout
            title="Configuration API"
            description="Variables d'environnement et configurations"
        >
            <div className="p-4 border rounded-lg space-y-2">
                <h2 className="text-xl font-semibold">Environnement</h2>
                <p className="font-mono">
                    NODE_ENV = <span>{ENV.NODE_ENV || 'undefined'}</span>
                </p>
            </div>

            {/* Simulateur */}
            <div className="p-4 border rounded-lg space-y-2">
                <h2 className="text-xl font-semibold">Simulateur</h2>
                <p className="font-mono">
                    SIMULATOR_URL = <span>{ENV.SIMULATOR_URL || 'undefined'}</span>
                </p>
            </div>

            {/* API Backend */}
            <div className="p-4 border rounded-lg space-y-2">
                <h2 className="text-xl font-semibold">API Backend</h2>
                <p className="font-mono">
                    BACKEND_API_URL = <span>{ENV.BACKEND_URL || 'undefined'}</span>
                </p>
            </div>

        </PageLayout>
    )
}