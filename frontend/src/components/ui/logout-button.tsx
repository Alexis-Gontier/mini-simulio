import { logOut } from "@/api/backend/auth/service"
import { Button } from "@/components/shadcn-ui/button"
import { LogOut, Loader } from "lucide-react"
import { toast } from "sonner"
import { useTransition } from "react"
import { useNavigate } from "react-router-dom"

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition()
  const navigate = useNavigate()

  async function handleLogout() {
    startTransition(async () => {
      const { success, message } = await logOut()
      if (success) {
        toast.success(message)
        navigate("/auth/login")
      } else {
        toast.error(message)
      }
    })
  }

  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      className="cursor-pointer"
    >
      {isPending ? <Loader className="animate-spin" /> : <LogOut />}
      Logout
    </Button>
  )
}
