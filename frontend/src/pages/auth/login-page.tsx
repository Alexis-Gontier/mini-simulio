import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/shadcn-ui/card"
import { LoginForm } from "@/components/form/auth/login-form";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <Card className="w-full">
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <Link to="/auth/register">
          Pas encore de compte ? Inscrivez-vous
        </Link>
      </CardFooter>
    </Card>
  )
}
