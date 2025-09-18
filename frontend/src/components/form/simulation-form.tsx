import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormField,
} from "@/components/shadcn-ui/form"
import { Button } from "@/components/shadcn-ui/button"

import { toast } from "sonner"

import { useTransition } from "react"

import {
    Send,
    Loader
} from "lucide-react"

import {
    calculerMensualite39Bis2AncienSchema,
    type CalculerMensualite39Bis2Ancien
} from "@/schemas/simulator-schema"
import { calculerMensualite39Bis2Ancien } from "@/api/simulations/calcules/service"
import { useSimulationStore } from "@/stores/simulations-store"
import { SliderInput } from "@/components/ui/slider-input"
import { DefaultInput } from "@/components/ui/default-input"

export default function SimulationForm() {

    const [isPending, startTransition] = useTransition()
    const {
        formData,
        setFormData,
        setResult,
        setCalculating,
        clearAll
    } = useSimulationStore()

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
            mois: formData?.mois ?? "07",
            annee: formData?.annee ?? "2025",
        },
    })

    function onSubmit(values: CalculerMensualite39Bis2Ancien) {
        console.log(values)
        startTransition(async () => {
            try {
                setCalculating(true)
                setFormData(values)

                const response = await calculerMensualite39Bis2Ancien(values)
                console.log("Response from API:", response)
                if (response.success && response.data) {
                    console.log("Setting result:", response.data)
                    setResult(response.data)
                } else {
                    throw new Error(response.message || "Erreur lors du calcul")
                }
                toast.success("Calcul de la mensualité réussi !")
            } catch (error) {
                console.error(error)
                toast.error("Une erreur est survenue lors du calcul de la mensualité.")
            } finally {
                setCalculating(false)
            }
        })
    }

    function clear() {
        clearAll()
        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Prix du bien (C2) */}
                <FormField
                    control={form.control}
                    name="C2"
                    render={({ field }) => <SliderInput label="Prix du bien" field={field} min={1} max={3000000} step={1} unit="€" />}
                />

                {/* TRAVAUX */}
                <FormField
                    control={form.control}
                    name="TRAVAUX"
                    render={({ field }) => <SliderInput label="Montant des travaux" field={field} min={0} max={1000000} step={1} unit="€" />}
                />

                {/* Frais d'agence */}
                <FormField
                    control={form.control}
                    name="fraisAgence"
                    render={({ field }) => <DefaultInput label="Frais d'agence" field={field} />}
                />

                {/* Durée du pret (N) */}
                <FormField
                    control={form.control}
                    name="N"
                    render={({ field }) => <SliderInput label="Durée du prêt" field={field} min={1} max={30} step={1} unit="ans" />}
                />

                {/* Apport */}
                <FormField
                    control={form.control}
                    name="apport"
                    render={({ field }) => <SliderInput label="Apport personnel" field={field} min={0} max={1000000} step={1} unit="€" />}
                />

                {/* Frais de notaire */}
                <FormField
                    control={form.control}
                    name="fraisNotaire"
                    render={({ field }) => <DefaultInput label="Frais de notaire" field={field} />}
                />

                {/* Taux d'intérêt (T) */}
                <FormField
                    control={form.control}
                    name="T"
                    render={({ field }) => <DefaultInput label="Taux d'intérêt" field={field} />}
                />

                {/* Assurance (ASSU) */}
                <FormField
                    control={form.control}
                    name="ASSU"
                    render={({ field }) => <DefaultInput label="Assurance" field={field} />}
                />

                {/* Revalorisation du bien */}
                <FormField
                    control={form.control}
                    name="revalorisationBien"
                    render={({ field }) => <DefaultInput label="Revalorisation du bien" field={field} />}
                />

                <div className="grid grid-cols-2 gap-2">
                    <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                        type="button"
                        onClick={clear}
                        disabled={isPending}
                    >
                        Clear
                    </Button>
                    <Button
                        type="submit"
                        className="w-full cursor-pointer"
                        disabled={isPending}
                    >
                        {isPending ? <Loader className="animate-spin" /> : <Send />}
                        Calculer
                    </Button>
                </div>
            </form>
        </Form>
    )
}