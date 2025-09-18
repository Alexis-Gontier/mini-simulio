import { useState } from "react"
import PageLayout from "@/layouts/page-layout"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card"
import { Badge } from "@/components/shadcn-ui/badge"
import { Button } from "@/components/shadcn-ui/button"
import { Separator } from "@/components/shadcn-ui/separator"
import {
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Server,
  Zap,
  Globe,
  Database,
  Monitor,
} from "lucide-react"
import { ENV } from "@/utils/env"
import { backendApi } from "@/api/backend/client"
import { simulatorApi } from "@/api/simulations/client"
import { isResponseError } from "up-fetch"

type ApiStatus = "idle" | "loading" | "success" | "error"

interface ServiceStatus {
  name: string
  url: string
  status: ApiStatus
  responseTime?: number
  error?: string
  data?: any
  icon: any
}

export default function ApiTestPage() {
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: "Backend API",
      url: `${ENV.BACKEND_URL}/`,
      status: "idle",
      icon: Database,
    },
    {
      name: "Simulator API",
      url: `${ENV.SIMULATOR_URL}/`,
      status: "idle",
      icon: Zap,
    },
  ])

  const [isTestingAll, setIsTestingAll] = useState(false)

  const testBackendApi = async (): Promise<{
    success: boolean
    responseTime: number
    error?: string
    data?: any
  }> => {
    const startTime = Date.now()
    try {
      // Test endpoint racine
      const response = await backendApi("/", {
        method: "GET",
        timeout: 5000,
      })
      const responseTime = Date.now() - startTime

      // Vérifier que la réponse contient {"hello":"world"}
      if (
        response &&
        typeof response === "object" &&
        "hello" in response &&
        (response as any).hello === "world"
      ) {
        return { success: true, responseTime, data: response }
      } else {
        return {
          success: false,
          responseTime,
          error: "Invalid response format",
          data: response,
        }
      }
    } catch (error) {
      const responseTime = Date.now() - startTime
      if (isResponseError(error)) {
        return { success: false, responseTime, error: error.message }
      }
      return { success: false, responseTime, error: "Network error" }
    }
  }

  const testSimulatorApi = async (): Promise<{
    success: boolean
    responseTime: number
    error?: string
    data?: any
  }> => {
    const startTime = Date.now()
    try {
      // Test endpoint racine
      const response = await simulatorApi("/", {
        method: "GET",
        timeout: 5000,
      })
      const responseTime = Date.now() - startTime

      // Vérifier que la réponse contient {"hello":"world"}
      if (
        response &&
        typeof response === "object" &&
        "hello" in response &&
        (response as any).hello === "world"
      ) {
        return { success: true, responseTime, data: response }
      } else {
        return {
          success: false,
          responseTime,
          error: "Invalid response format",
          data: response,
        }
      }
    } catch (error) {
      const responseTime = Date.now() - startTime
      if (isResponseError(error)) {
        return { success: false, responseTime, error: error.message }
      }
      return { success: false, responseTime, error: "Network error" }
    }
  }

  const testService = async (serviceIndex: number) => {
    setServices((prev) =>
      prev.map((service, index) =>
        index === serviceIndex
          ? {
              ...service,
              status: "loading" as ApiStatus,
              error: undefined,
              responseTime: undefined,
              data: undefined,
            }
          : service
      )
    )

    let result: {
      success: boolean
      responseTime: number
      error?: string
      data?: any
    }

    if (serviceIndex === 0) {
      result = await testBackendApi()
    } else {
      result = await testSimulatorApi()
    }

    setServices((prev) =>
      prev.map((service, index) =>
        index === serviceIndex
          ? {
              ...service,
              status: result.success ? "success" : "error",
              responseTime: result.responseTime,
              error: result.error,
              data: result.data,
            }
          : service
      )
    )
  }

  const testAllServices = async () => {
    setIsTestingAll(true)

    const promises = services.map((_, index) => testService(index))
    await Promise.all(promises)

    setIsTestingAll(false)
  }

  const getStatusIcon = (status: ApiStatus) => {
    switch (status) {
      case "loading":
        return <Clock className="w-4 h-4 animate-pulse text-yellow-500" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Server className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: ApiStatus) => {
    switch (status) {
      case "loading":
        return (
          <Badge
            variant="outline"
            className="text-yellow-600 border-yellow-300"
          >
            Test en cours
          </Badge>
        )
      case "success":
        return (
          <Badge variant="outline" className="text-green-600 border-green-300">
            En ligne
          </Badge>
        )
      case "error":
        return <Badge variant="destructive">Hors ligne</Badge>
      default:
        return <Badge variant="secondary">Non testé</Badge>
    }
  }

  const getEnvironmentBadge = () => {
    switch (ENV.NODE_ENV) {
      case "production":
        return <Badge variant="destructive">Production</Badge>
      case "development":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-300">
            Développement
          </Badge>
        )
      case "test":
        return (
          <Badge
            variant="outline"
            className="text-yellow-600 border-yellow-300"
          >
            Test
          </Badge>
        )
      default:
        return <Badge variant="secondary">{ENV.NODE_ENV}</Badge>
    }
  }

  return (
    <PageLayout
      title="Test des APIs"
      description="Vérifiez le statut des services et l'environnement d'exécution"
      className="max-w-4xl mx-auto"
    >
      <div className="space-y-6">
        {/* Informations d'environnement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Environnement
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Mode</p>
                {getEnvironmentBadge()}
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Frontend URL</p>
                <p className="text-sm font-mono">{ENV.FRONTEND_URL}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Backend URL</p>
                <p className="text-sm font-mono">{ENV.BACKEND_URL}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Simulator URL</p>
                <p className="text-sm font-mono">{ENV.SIMULATOR_URL}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test des services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                État des Services
              </div>
              <Button
                onClick={testAllServices}
                disabled={isTestingAll}
                variant="outline"
                size="sm"
              >
                {isTestingAll ? (
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Tester tout
              </Button>
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Test :</strong> Appel de la route <code>/</code> qui
                doit retourner <code>{JSON.stringify({ hello: "world" })}</code>
              </p>
            </div>
            <div className="space-y-4">
              {services.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <div
                    key={service.name}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{service.name}</span>
                          {getStatusIcon(service.status)}
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">
                          {service.url}
                        </p>
                        {service.error && (
                          <p className="text-sm text-red-600 mt-1">
                            {service.error}
                          </p>
                        )}
                        {service.data && service.status === "success" && (
                          <p className="text-sm text-green-600 mt-1 font-mono">
                            ✓ Réponse: {JSON.stringify(service.data)}
                          </p>
                        )}
                        {service.data && service.status === "error" && (
                          <p className="text-sm text-orange-600 mt-1 font-mono">
                            Réponse reçue: {JSON.stringify(service.data)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {service.responseTime && (
                        <span className="text-sm text-muted-foreground">
                          {service.responseTime}ms
                        </span>
                      )}
                      {getStatusBadge(service.status)}
                      <Button
                        onClick={() => testService(index)}
                        disabled={service.status === "loading"}
                        variant="outline"
                        size="sm"
                      >
                        {service.status === "loading" ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          "Tester"
                        )}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Informations supplémentaires */}
        <Card>
          <CardHeader>
            <CardTitle>Informations de Debug</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Variables d'environnement
                </p>
                <pre className="text-xs bg-muted p-3 rounded font-mono overflow-x-auto">
                  {JSON.stringify(
                    {
                      NODE_ENV: ENV.NODE_ENV,
                      FRONTEND_URL: ENV.FRONTEND_URL,
                      BACKEND_URL: ENV.BACKEND_URL,
                      SIMULATOR_URL: ENV.SIMULATOR_URL,
                      timestamp: new Date().toISOString(),
                      userAgent: navigator.userAgent,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
