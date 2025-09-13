import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import App from './App.tsx'

import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "@/components/shadcn-ui/sonner"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
)
