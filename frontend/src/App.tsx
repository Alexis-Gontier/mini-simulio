import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MainLayout } from "@/layouts/main-layout";
import { DashboardLayout } from "@/layouts/dashboard-layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route index element={<h1>Home</h1>} />
          <Route path="test" element={<h1>Test</h1>} />
        </Route>

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<h1>Dashboard Home</h1>} />
          <Route path="simulator" element={<h1>Simulator</h1>} />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}
