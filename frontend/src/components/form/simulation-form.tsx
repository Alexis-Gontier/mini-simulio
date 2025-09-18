import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel
} from "@/components/shadcn-ui/form"
import { Button } from "@/components/shadcn-ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select"

// import { toast } from "sonner"

import { useDebounce } from "@/hooks/use-debounce"
import { Eraser } from "lucide-react"

import {
  calculerMensualite39Bis2AncienSchema,
  type CalculerMensualite39Bis2Ancien,
} from "@/schemas/simulator-schema"
import { calculerMensualite39Bis2Ancien } from "@/api/simulations/calcules/service"
import { useSimulationStore } from "@/stores/simulations-store"
import { SliderInput } from "@/components/ui/slider-input"
import { DefaultInput } from "@/components/ui/default-input"

const MOIS = [
  { value: "01", label: "Janvier" },
  { value: "02", label: "Février" },
  { value: "03", label: "Mars" },
  { value: "04", label: "Avril" },
  { value: "05", label: "Mai" },
  { value: "06", label: "Juin" },
  { value: "07", label: "Juillet" },
  { value: "08", label: "Août" },
  { value: "09", label: "Septembre" },
  { value: "10", label: "Octobre" },
  { value: "11", label: "Novembre" },
  { value: "12", label: "Décembre" },
]

const ANNEES = Array.from({ length: 11 }, (_, i) => {
  const year = (2020 + i).toString()
  return { value: year, label: year }
})

export default function SimulationForm() {
  const { formData, setFormData, setResult, setCalculating, clearAll } = useSimulationStore()

  // Date du jour
  const today = new Date()
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0')
  const currentYear = today.getFullYear().toString()

  const form = useForm<CalculerMensualite39Bis2Ancien>({
    resolver: zodResolver(calculerMensualite39Bis2AncienSchema),
    defaultValues: {
      C2: formData?.C2 ?? 0,
      TRAVAUX: formData?.TRAVAUX ?? 0,
      fraisAgence: formData?.fraisAgence ?? 0,
      N: formData?.N ?? 0,
      apport: formData?.apport ?? 0,
      fraisNotaire: formData?.fraisNotaire ?? 0,
      T: formData?.T ?? 0,
      ASSU: formData?.ASSU ?? 0,
      revalorisationBien: formData?.revalorisationBien ?? 0,
      mois: formData?.mois ?? currentMonth,
      annee: formData?.annee ?? currentYear,
    },
  })

  const calculateSimulation = async (values: CalculerMensualite39Bis2Ancien) => {
    try {
      setCalculating(true)
      setFormData(values)

      const response = await calculerMensualite39Bis2Ancien(values)
      if (response.success && response.data) {
        setResult(response.data)
      } else {
        console.error("Erreur lors du calcul:", response.message)
      }
    } catch (error) {
      console.error("Erreur lors du calcul:", error)
    } finally {
      setCalculating(false)
    }
  }

  const debouncedCalculate = useDebounce(calculateSimulation, 1000)

  // Observer les changements de formulaire pour déclencher le calcul automatique
  useEffect(() => {
    const subscription = form.watch((values) => {
      const isValid = form.formState.isValid
      if (isValid && values) {
        debouncedCalculate(values as CalculerMensualite39Bis2Ancien)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, debouncedCalculate])

  function clear() {
    clearAll()
    form.reset({
      C2: 0,
      TRAVAUX: 0,
      fraisAgence: 0,
      N: 0,
      apport: 0,
      fraisNotaire: 0,
      T: 0,
      ASSU: 0,
      revalorisationBien: 0,
      mois: currentMonth,
      annee: currentYear,
    })
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        {/* Prix du bien (C2) */}
        <FormField
          control={form.control}
          name="C2"
          render={({ field }) => (
            <SliderInput
              label="Prix du bien"
              field={field}
              min={1}
              max={3000000}
              step={1}
              unit="€"
            />
          )}
        />

        {/* TRAVAUX */}
        <FormField
          control={form.control}
          name="TRAVAUX"
          render={({ field }) => (
            <SliderInput
              label="Montant des travaux"
              field={field}
              min={0}
              max={1000000}
              step={1}
              unit="€"
            />
          )}
        />

        {/* Frais d'agence */}
        <FormField
          control={form.control}
          name="fraisAgence"
          render={({ field }) => (
            <DefaultInput label="Frais d'agence" field={field} />
          )}
        />

        {/* Durée du pret (N) */}
        <FormField
          control={form.control}
          name="N"
          render={({ field }) => (
            <SliderInput
              label="Durée du prêt"
              field={field}
              min={1}
              max={30}
              step={1}
              unit="ans"
            />
          )}
        />

        {/* Apport */}
        <FormField
          control={form.control}
          name="apport"
          render={({ field }) => (
            <SliderInput
              label="Apport personnel"
              field={field}
              min={0}
              max={1000000}
              step={1}
              unit="€"
            />
          )}
        />

        {/* Frais de notaire */}
        <FormField
          control={form.control}
          name="fraisNotaire"
          render={({ field }) => (
            <DefaultInput label="Frais de notaire" field={field} />
          )}
        />

        {/* Taux d'intérêt (T) */}
        <FormField
          control={form.control}
          name="T"
          render={({ field }) => (
            <DefaultInput label="Taux d'intérêt" field={field} />
          )}
        />

        {/* Assurance (ASSU) */}
        <FormField
          control={form.control}
          name="ASSU"
          render={({ field }) => (
            <DefaultInput label="Assurance" field={field} />
          )}
        />

        {/* Revalorisation du bien */}
        <FormField
          control={form.control}
          name="revalorisationBien"
          render={({ field }) => (
            <DefaultInput label="Revalorisation du bien" field={field} />
          )}
        />

        {/* Mois et Année */}
        <div className="grid grid-cols-2 gap-4">
          {/* Mois */}
          <FormField
            control={form.control}
            name="mois"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mois</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner un mois" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOIS.map((mois) => (
                        <SelectItem key={mois.value} value={mois.value}>
                          {mois.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Année */}
          <FormField
            control={form.control}
            name="annee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Année</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner une année" />
                    </SelectTrigger>
                    <SelectContent>
                      {ANNEES.map((annee) => (
                        <SelectItem key={annee.value} value={annee.value}>
                          {annee.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            type="button"
            onClick={clear}
            className="w-full cursor-pointer"
          >
            <Eraser />
            Clear
          </Button>
        </div>
      </div>
    </Form>
  )
}