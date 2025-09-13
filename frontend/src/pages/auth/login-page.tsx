import {
  Card,
  CardContent,
} from "@/components/shadcn-ui/card"
import { LoginForm } from "@/components/form/auth/login-form";

export default function LoginPage() {
  return (
    <Card className="w-full">
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}
