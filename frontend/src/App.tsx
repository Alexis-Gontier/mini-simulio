import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// ==============================
// Layouts
// ==============================
import DashboardLayout from "@/layouts/dashboard-layout";
import AuthLayout from "@/layouts/auth-layout";
import ProtectedLayout from "@/layouts/protected-layout";

// ==============================
// Pages
// ==============================

// Dashboard routes
import HomeDashboardPage from "@/pages/dashboard/home-dashboard-page";

// Authenticated routes
import LoginPage from "@/pages/auth/login-page";
import RegisterPage from "@/pages/auth/register-page";
import SimulationsDashboardPage from "@/pages/dashboard/simulations-dahboard-page";
import ClientsDashboardPage from "@/pages/dashboard/clients-dashboard-page";
import SaveDashboardPage from "@/pages/dashboard/save-dashboard-page";
import ClientByIdPage from "@/pages/dashboard/client-by-id-page";
import ApiTestPage from "@/pages/dashboard/api-test-page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route>
          <Route index element={<Navigate to="/dashboard" replace />} />
        </Route>

        <Route path="dashboard" element={<ProtectedLayout />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<HomeDashboardPage />} />
            <Route path="simulations" element={<SimulationsDashboardPage />} />
            <Route path="clients" element={<ClientsDashboardPage />} />
            <Route path="clients/:clientId" element={<ClientByIdPage />} />
            <Route path="save" element={<SaveDashboardPage />} />
            <Route path="api-test" element={<ApiTestPage />} />
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