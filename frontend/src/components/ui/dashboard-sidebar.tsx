import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarMenuButton,
  // useSidebar,
} from "@/components/shadcn-ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/shadcn-ui/button"

import {
  HomeIcon,
  Calculator,
  Users,
  ChevronsUpDown,
  LogOut,
  Moon,
  Sun,
  Server,
} from "lucide-react"
import { useAuthStore } from "@/stores/auth-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //   DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu"
import { Skeleton } from "@/components/shadcn-ui/skeleton"
import { useTheme } from "@/providers/theme-provider"

export function AppSidebar() {
  const location = useLocation()
  const pathname = location.pathname

  const LINKITEMS = [
    {
      href: "",
      label: "Accueil",
      icon: HomeIcon,
    },
    {
      href: "/simulations",
      label: "Simulations",
      icon: Calculator,
    },
    {
      href: "/clients",
      label: "Clients",
      icon: Users,
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-0">
        <Link
          to="/dashboard"
          className="h-16 border-b flex items-center justify-center"
        >
          <h1 className="flex justify-center items-center gap-3">
            <span className="text-3xl font-semibold text-foreground">
              simul<span className="text-green-800">io</span>.
            </span>
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-4">
          <nav className="space-y-1">
            {LINKITEMS.map((item) => {
              const fullPath = `/dashboard${item.href}`
              // Normalise les chemins pour la comparaison
              const normalizedPathname = pathname.replace(/\/$/, "") || "/"
              const normalizedFullPath = fullPath.replace(/\/$/, "") || "/"
              const isActive = normalizedPathname === normalizedFullPath

              return (
                <Button
                  key={item.href}
                  variant={isActive ? "outline" : "ghost"}
                  size="lg"
                  className="w-full font-semibold"
                  asChild
                >
                  <Link to={fullPath} className="flex justify-start">
                    <item.icon className="size-4" />
                    {item.label}
                  </Link>
                </Button>
              )
            })}
          </nav>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserAccountDropdown />
      </SidebarFooter>
    </Sidebar>
  )
}

function UserAccountDropdown() {
  const { user, logout } = useAuthStore()
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light")
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="py-6 cursor-pointer" variant="outline">
          <Skeleton className="aspect-square w-10" />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {user ? `${user.fullName}` : "Non connecté"}
            </span>
            <span className="truncate text-xs">
              {user ? `${user.email}` : "email@exemple.com"}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        sideOffset={4}
      >
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to="/dashboard/profile">
            <Users />
            Mon profil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to="/dashboard/api-test">
            <Server />
            Test des APIs
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={toggleTheme}>
          {theme === "light" ? (
            <Moon className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
          Thème
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          variant="destructive"
          className="cursor-pointer"
        >
          <LogOut />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
