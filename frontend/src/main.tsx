import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@/styles/index.css"
import App from "@/App"

import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "@/components/shadcn-ui/sonner"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App />
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
