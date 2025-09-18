import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { RegisterForm } from "@/components/form/register-form";
import { Separator } from "@/components/shadcn-ui/separator";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription>Veuillez remplir les informations ci-dessous pour créer un compte.</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Vous avez déjà un compte ? <Link to="/auth/login" className="text-primary hover:underline">Connectez-vous</Link>
        </p>
      </CardFooter>
    </Card>
  )
}
