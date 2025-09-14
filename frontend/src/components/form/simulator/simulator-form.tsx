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
import { calculerMensualite39Bis2Ancien } from "@/api/simulator/calcules/service"
import { SliderInput } from "@/components/ui/slider-input"
import { DefaultInput } from "@/components/ui/default-input"

export default function SimulatorForm() {

    const [isPending, startTransition] = useTransition()

    const form = useForm<CalculerMensualite39Bis2Ancien>({
        resolver: zodResolver(calculerMensualite39Bis2AncienSchema),
        defaultValues: {
            C2: 834000,
            TRAVAUX: 20000,
            fraisAgence: 3,
            N: 25,
            apport: 50000,
            fraisNotaire: 7.5,
            T: 3.5,
            ASSU: 0.32,
            revalorisationBien: 1,
            mois: "07",
            annee: "2025",
        },
    })

    function onSubmit(values: CalculerMensualite39Bis2Ancien) {
        console.log(values)
        startTransition(async () => {
            const { success, message, data } = await calculerMensualite39Bis2Ancien(values)
            if (success) {
                toast.success(message)
                console.log(data)
                localStorage.setItem("lastSimulation", JSON.stringify(data))
                // Déclencher un événement pour mettre à jour l'affichage
                window.dispatchEvent(new Event('simulationUpdated'))
            } else {
                toast.error(message)
            }
        })
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

                {/* Mois */}


                <div className="grid grid-cols-2 gap-2">
                    <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                        type="button"
                        onClick={() => form.reset()}
                    >
                        Clear
                    </Button>
                    <Button
                        type="submit"
                        className="w-full cursor-pointer"
                    >
                        {isPending ? <Loader className="animate-spin" /> : <Send />}
                        Calculer
                    </Button>
                </div>
            </form>
        </Form>
    )
}
