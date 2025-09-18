import { Link, Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <div className="min-h-screen max-w-sm mx-auto flex flex-col items-center justify-center gap-4">
      <h1 className="flex justify-center items-center gap-3">
        <span className="text-3xl font-semibold text-foreground">
          simul<span className="text-green-800">io</span>.
        </span>
      </h1>
      <Outlet />
      <p className="text-xs text-center text-muted-foreground px-4">
        En cliquant sur continuer, vous acceptez nos{" "}
        <Link to="#" className="text-primary hover:underline">
          Conditions d'utilisation
        </Link>{" "}
        et notre{" "}
        <Link to="#" className="text-primary hover:underline">
          Politique de confidentialité
        </Link>
        .
      </p>
    </div>
  )
}
