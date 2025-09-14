import { Badge } from "@/components/shadcn-ui/badge"
import { useSimulationStore } from "@/stores/simulation-store"
import {
  Calculator,
  Home,
  FileText,
  Shield,
  Wrench,
  Building,
  Banknote,
  TrendingUp
} from "lucide-react"

export default function SimulationResults() {
  const { currentSimulation, isLoading, error } = useSimulationStore()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        <div className="text-center">
          <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50 animate-pulse" />
          <p>Calcul en cours...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48 text-destructive">
        <div className="text-center">
          <p>Erreur : {error}</p>
        </div>
      </div>
    )
  }

  if (!currentSimulation) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        <div className="text-center">
          <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Aucune simulation effectuée.</p>
          <p className="text-sm">Remplissez le formulaire pour voir les résultats.</p>
        </div>
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const resultItems = [
    {
      label: "Mensualité",
      value: formatCurrency(currentSimulation.mensualite),
      icon: Calculator,
      highlight: true,
      description: "Montant mensuel à rembourser"
    },
    {
      label: "Prix du bien",
      value: formatCurrency(currentSimulation.prix_du_bien),
      icon: Home,
      description: "Prix d'achat du bien immobilier"
    },
    {
      label: "Frais de notaire",
      value: formatCurrency(currentSimulation.frais_de_notaire),
      icon: FileText,
      description: "Frais de notaire calculés"
    },
    {
      label: "Garantie bancaire",
      value: formatCurrency(currentSimulation.garantie_bancaire),
      icon: Shield,
      description: "Garantie demandée par la banque"
    },
    {
      label: "Travaux",
      value: formatCurrency(currentSimulation.travaux),
      icon: Wrench,
      description: "Montant des travaux prévus"
    },
    {
      label: "Frais d'agence",
      value: formatCurrency(currentSimulation.frais_agence),
      icon: Building,
      description: "Frais d'agence immobilière"
    },
    {
      label: "Total à financer",
      value: formatCurrency(currentSimulation.total_a_financer),
      icon: Banknote,
      highlight: true,
      description: "Montant total du financement"
    },
    {
      label: "Revenu minimum requis",
      value: formatCurrency(currentSimulation.revenu_acquereur_minimum_mensuel),
      icon: TrendingUp,
      highlight: true,
      description: "Revenu mensuel minimum nécessaire"
    }
  ]

  return (
    <div className="space-y-4">
      {/* Résultats principaux */}
      <div className="grid gap-4">
        {resultItems.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                item.highlight
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-muted/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${
                  item.highlight ? 'text-primary' : 'text-muted-foreground'
                }`} />
                <div>
                  <p className={`font-medium ${
                    item.highlight ? 'text-primary' : ''
                  }`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
              <Badge
                variant={item.highlight ? "default" : "secondary"}
                className={`font-mono ${
                  item.highlight ? 'text-base px-3 py-1' : ''
                }`}
              >
                {item.value}
              </Badge>
            </div>
          )
        })}
      </div>
    </div>
  )
}