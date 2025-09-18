import { Button } from "@/components/shadcn-ui/button"
import { SidebarTrigger } from "@/components/shadcn-ui/sidebar"
import Breadcrumb from "@/components/ui/breadcrumb"
import { Separator } from "@/components/shadcn-ui/separator"

export default function DashboardHeader() {
  return (
    <header className="sticky z-50 top-0 left-0 h-16 w-full bg-sidebar flex shrink-0 justify-between items-center gap-8 border-b px-8">
      <div className="h-full flex items-center gap-8">
        <div className="h-full flex items-center gap-8">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer md:hidden"
            asChild
          >
            <SidebarTrigger />
          </Button>
          <Breadcrumb />
          <Separator orientation="vertical" />
        </div>
      </div>
    </header>
  )
}
