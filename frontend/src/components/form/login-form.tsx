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
    loginSchema,
    type LoginData,
} from "@/schemas/auth-schema"
import { useNavigate } from "react-router-dom"

import {
    Send,
    Loader
} from "lucide-react"
import { signIn } from "@/api/backend/auth/service"

export function LoginForm() {

    const [isPending, startTransition] = useTransition()
    const navigate = useNavigate()

    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: LoginData) {
        startTransition(async () => {
            const { success, message } = await signIn(values)
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="password" {...field} />
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