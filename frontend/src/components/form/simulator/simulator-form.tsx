import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form"
import { Input } from "@/components/shadcn-ui/input"
import { Button } from "@/components/shadcn-ui/button"

import { toast } from "sonner"

import { useTransition } from "react"
import { useNavigate } from "react-router-dom"

import {
    Send,
    Loader
} from "lucide-react"

import {
    calculerMensualite39Bis2AncienSchema,
    type CalculerMensualite39Bis2AncienInput
} from "@/schemas/simulator-schema"

export default function SimulatorForm() {

    const [isPending, startTransition] = useTransition()
    const navigate = useNavigate()

    const form = useForm<CalculerMensualite39Bis2AncienInput>({
        resolver: zodResolver(calculerMensualite39Bis2AncienSchema),
        defaultValues: {
            montantEmprunte: 0,
        },
    })

    function onSubmit(values: CalculerMensualite39Bis2AncienInput) {
        startTransition(async () => {
            toast.success("Form submitted successfully!")
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <FormField
                    control={form.control}
                    name="montantEmprunte"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Montant Emprunté</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Montant Emprunté"
                                    {...field}
                                    type="number"
                                    value={field.value || ''}
                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : 0)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                >
                    {isPending ? <Loader className="animate-spin" /> : <Send />}
                    Se connecter
                </Button>
            </form>
        </Form>
    )
}
