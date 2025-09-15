import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/shadcn-ui/card"
import { LoginForm } from "@/components/form/auth/login-form";
import { Link } from "lucide-react";

export default function LoginPage() {
  return (
    <Card className="w-full">
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <Link href="/auth/register">
          Pas encore de compte ? Inscrivez-vous
        </Link>
      </CardFooter>
    </Card>
  )
}
