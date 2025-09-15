import {
  Card,
  CardContent,
} from "@/components/shadcn-ui/card"
import { SigninForm } from "@/components/form/auth/signin-form";

export default function SigninPage() {
  return (
    <Card className="w-full">
      <CardContent>
        <SigninForm />
      </CardContent>
    </Card>
  )
}