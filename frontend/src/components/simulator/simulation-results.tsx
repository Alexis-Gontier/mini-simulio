import { Badge } from "@/components/shadcn-ui/badge"
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

interface SimulationData {
  mensualite: number
  prix_du_bien: number
  frais_de_notaire: number
  garantie_bancaire: number
  travaux: number
  frais_agence: number
  total_a_financer: number
  revenu_acquereur_minimum_mensuel: number
}

interface SimulationResultsProps {
  data: SimulationData | null
}

export default function SimulationResults({ data }: SimulationResultsProps) {
  if (!data) {
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
      value: formatCurrency(data.mensualite),
      icon: Calculator,
      highlight: true,
      description: "Montant mensuel à rembourser"
    },
    {
      label: "Prix du bien",
      value: formatCurrency(data.prix_du_bien),
      icon: Home,
      description: "Prix d'achat du bien immobilier"
    },
    {
      label: "Frais de notaire",
      value: formatCurrency(data.frais_de_notaire),
      icon: FileText,
      description: "Frais de notaire calculés"
    },
    {
      label: "Garantie bancaire",
      value: formatCurrency(data.garantie_bancaire),
      icon: Shield,
      description: "Garantie demandée par la banque"
    },
    {
      label: "Travaux",
      value: formatCurrency(data.travaux),
      icon: Wrench,
      description: "Montant des travaux prévus"
    },
    {
      label: "Frais d'agence",
      value: formatCurrency(data.frais_agence),
      icon: Building,
      description: "Frais d'agence immobilière"
    },
    {
      label: "Total à financer",
      value: formatCurrency(data.total_a_financer),
      icon: Banknote,
      highlight: true,
      description: "Montant total du financement"
    },
    {
      label: "Revenu minimum requis",
      value: formatCurrency(data.revenu_acquereur_minimum_mensuel),
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