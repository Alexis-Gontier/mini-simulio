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
    signUpSchema,
    type SignUpInput,
} from "@/schemas/auth-schema"
import { signUp } from "@/api/backend/auth/service"
import { useNavigate } from "react-router-dom"

import {
    Send,
    Loader
} from "lucide-react"

export function SigninForm() {

    const [isPending, startTransition] = useTransition()
    const navigate = useNavigate()

    const form = useForm<SignUpInput>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    })

    function onSubmit(values: SignUpInput) {
        startTransition(async () => {
            const { success, message } = await signUp(values)
            if (success) {
                toast.success(message)
                form.reset()
                navigate("/dashboard")
            } else {
                toast.error(message)
                form.setValue("password", "")
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                                <Input placeholder="Prénom Nom" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="mot de passe" {...field} />
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
                    S'inscrire
                </Button>
            </form>
        </Form>
    )
}