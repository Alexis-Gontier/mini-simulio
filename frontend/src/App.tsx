import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "@/layouts/main-layout";
import DashboardLayout from "@/layouts/dashboard-layout";
import AuthLayout from "@/layouts/auth-layout";

// Pages
import HomePage from "@/pages/home-page";
import DashboardPage from "@/pages/dashboard/dashboard-page";
import SimulatorPage from "@/pages/dashboard/simulator-page";
import LoginPage from "@/pages/auth/login-page";
import RegisterPage from "@/pages/auth/register-page";
import ProtectedLayout from "@/layouts/protected-layout";
import ApiPage from "@/pages/dashboard/api-page";
import ClientPage from "@/pages/dashboard/client-page";
import ClientByIdPage from "@/pages/dashboard/client-by-id-page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="test" element={<h1>Test</h1>} />
        </Route>

        <Route path="dashboard" element={<ProtectedLayout />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="simulator" element={<SimulatorPage />} />
            <Route path="clients" element={<ClientPage />} />
            <Route path="clients/:id" element={<ClientByIdPage />} />
            <Route path="api" element={<ApiPage />} />
            <Route path="*" element={<div>404</div>} />
          </Route>
        </Route>

        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  )
}
