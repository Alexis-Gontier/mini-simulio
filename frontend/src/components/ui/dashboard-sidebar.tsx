import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    // SidebarFooter,
    // useSidebar,
} from "@/components/shadcn-ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../shadcn-ui/button"

import {
    HomeIcon,
    Calculator,
    Users,
    Server,
} from "lucide-react"

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
            href: "/simulator",
            label: "Simulateurs",
            icon: Calculator,
        },
        {
            href: "/clients",
            label: "Clients",
            icon: Users,
        },
        {
            href: "/api",
            label: "API",
            icon: Server,
        },
    ]

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="p-0">
                <Link to="/dashboard" className="h-16 border-b flex items-center justify-center">
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
                            const isActive = pathname === fullPath

                            return (
                                <Button
                                    key={item.href}
                                    className="w-full"
                                    variant={isActive ? "outline" : "ghost"}
                                    size="lg"
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
        </Sidebar>
    )
}