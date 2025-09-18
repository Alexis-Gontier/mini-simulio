import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card"
import { LoginForm } from "@/components/form/login-form"
import { Separator } from "@/components/shadcn-ui/separator"
import { Link } from "react-router-dom"

export default function LoginPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Se connecter</CardTitle>
        <CardDescription>
          Veuillez entrer vos identifiants pour vous connecter.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link to="/auth/register" className="text-primary hover:underline">
            Créer un compte
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
