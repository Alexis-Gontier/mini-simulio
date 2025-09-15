import { SignupForm } from "@/components/form/auth/signin-form"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/shadcn-ui/card"
import { Link } from "react-router-dom"


export default function RegisterPage() {
  return (
    <Card className="w-full">
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter>
        <Link to="/auth/login">
          Déjà un compte ? Connectez-vous
        </Link>
      </CardFooter>
    </Card>
  )
}
