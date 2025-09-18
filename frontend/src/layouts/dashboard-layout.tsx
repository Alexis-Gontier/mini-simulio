import {
  SidebarInset,
  SidebarProvider,
  //   SidebarTrigger,
} from "@/components/shadcn-ui/sidebar"
import DashboardHeader from "@/components/ui/dashboard-header"
import { AppSidebar } from "@/components/ui/dashboard-sidebar"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex flex-col w-full h-full p-4 md:p-8 space-y-4 md:space-y-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
