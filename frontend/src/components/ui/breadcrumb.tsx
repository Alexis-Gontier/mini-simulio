import { useLocation, Link } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn-ui/breadcrumb"

export default function SimpleBreadcrumb() {
  const location = useLocation()

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "")

  const dashboardIndex = pathSegments.findIndex(
    (segment) => segment === "dashboard"
  )

  if (dashboardIndex === -1) return null
  const breadcrumbSegments = pathSegments.slice(dashboardIndex)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbSegments.map((segment, index) => {
          const isLast = index === breadcrumbSegments.length - 1
          const href =
            "/" + pathSegments.slice(0, dashboardIndex + index + 1).join("/")

          const label = segment.charAt(0).toUpperCase() + segment.slice(1)

          return (
            <div key={index} className="flex items-center">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
