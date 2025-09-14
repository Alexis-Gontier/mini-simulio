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

import {
    clientSchema,
    type ClientInput
} from "@/schemas/client-schema"

import {
    Send,
    Loader
} from "lucide-react"
import { useCreateClient } from "@/api/backend/clients/hook"

export function ClientForm() {

    const createClientMutation = useCreateClient()

    const form = useForm<ClientInput>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            fullName: "",
            email: "",
        },
    })

    function onSubmit(values: ClientInput) {
        createClientMutation.mutate(values, {
            onSuccess: (data) => {
                if (data.success) {
                    toast.success("Client créé avec succès")
                    form.reset()
                } else {
                    toast.error(data.message || "Une erreur est survenue")
                }
            },
            onError: () => {
                toast.error("Une erreur est survenue")
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
                    disabled={createClientMutation.isPending}
                >
                    {createClientMutation.isPending ? <Loader className="animate-spin" /> : <Send />}
                    Ajouter un client
                </Button>
            </form>
        </Form>
    )
}