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

import {
    clientSchema,
    type ClientInput
} from "@/schemas/client-schema"

import {
    Send,
    Loader
} from "lucide-react"
import { createClient } from "@/api/backend/clients/service"

export function ClientForm() {

    const [isPending, startTransition] = useTransition()

    const form = useForm<ClientInput>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            fullName: "",
            email: "",
        },
    })

    function onSubmit(values: ClientInput) {
        startTransition(async () => {
            const { success, message } = await createClient(values)
            if (success) {
                toast.success("Client créé avec succès")
            } else {
                toast.error(message || "Une erreur est survenue")
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                                <Input placeholder="Nom complet" {...field} />
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
                    Ajouter un client
                </Button>
            </form>
        </Form>
    )
}