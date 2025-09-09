import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "@/layouts/main-layout";
import DashboardLayout from "@/layouts/dashboard-layout";

// Pages
import HomePage from "@/pages/home-page";
import DashboardPage from "@/pages/dashboard-page";
import SimulatorPage from "@/pages/simulator-page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="test" element={<h1>Test</h1>} />
        </Route>

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="simulator" element={<SimulatorPage />} />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}
