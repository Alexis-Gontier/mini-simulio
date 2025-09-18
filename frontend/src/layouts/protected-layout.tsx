import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/stores/auth-store"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function ProtectedLayout() {
  const { isAuthenticated, isChecking, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return <Outlet />
}
