import { Badge } from "@/components/shadcn-ui/badge"
import { useSimulationStore } from "@/stores/simulations-store"
import {
  Calculator,
  Home,
  FileText,
  Shield,
  Wrench,
  Building,
  Banknote,
  TrendingUp,
  Save
} from "lucide-react"
import { Button } from "../shadcn-ui/button"
import { Link } from "react-router-dom"

type SimulationResult = {
  mensualite?: number
  total_a_financer?: number
  revenu_acquereur_minimum_mensuel?: number
  prix_du_bien?: number
  frais_de_notaire?: number
  garantie_bancaire?: number
  travaux?: number
  frais_agence?: number
}

export default function SimulationResults() {
  const {
    result: simulationResult,
    isCalculating,
  } = useSimulationStore() as {
    result: SimulationResult
    isCalculating: boolean
  }

  if (isCalculating) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        <div className="text-center">
          <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50 animate-pulse" />
          <p>Calcul en cours...</p>
        </div>
      </div>
    )
  }

  if (!simulationResult) {
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

  // Les données d'entrée viennent de formData
  // Les résultats calculés viennent de simulationResult
  const resultItems = [
    {
      label: "Mensualité",
      value: formatCurrency(simulationResult.mensualite || 0),
      icon: Calculator,
      highlight: true,
      description: "Montant mensuel à rembourser"
    },
    {
      label: "Prix du bien",
      value: formatCurrency(simulationResult.prix_du_bien || 0),
      icon: Home,
      description: "Prix d'achat du bien immobilier"
    },
    {
      label: "Frais de notaire",
      value: formatCurrency(simulationResult.frais_de_notaire || 0),
      icon: FileText,
      description: "Frais de notaire calculés"
    },
    {
      label: "Garantie bancaire",
      value: formatCurrency(simulationResult.garantie_bancaire || 0),
      icon: Shield,
      description: "Garantie demandée par la banque"
    },
    {
      label: "Travaux",
      value: formatCurrency(simulationResult.travaux || 0),
      icon: Wrench,
      description: "Montant des travaux prévus"
    },
    {
      label: "Frais d'agence",
      value: formatCurrency(simulationResult.frais_agence || 0),
      icon: Building,
      description: "Frais d'agence immobilière"
    },
    {
      label: "Total à financer",
      value: formatCurrency(simulationResult.total_a_financer || 0),
      icon: Banknote,
      highlight: true,
      description: "Montant total du financement"
    },
    {
      label: "Revenu minimum requis",
      value: formatCurrency(simulationResult.revenu_acquereur_minimum_mensuel || 0),
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
        <Button
            className="w-full"
            asChild
        >
            <Link to="/dashboard/save">
                <Save />
                Enregister la simulation
            </Link>
        </Button>
    </div>
  )
}