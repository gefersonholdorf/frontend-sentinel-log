import { BrowserRouter, Routes, Route } from "react-router";
import { DashboardPage } from "./pages/dashboard-page";
import { Layout } from "./layout";
import { APIsPage } from "./pages/apis-page";
import { ClientsPage } from "./pages/clients-page";
import { LogsPage } from "./pages/logs-page";
import { ReportsPage } from "./pages/reports-page";
import { SettingsPage } from "./pages/settings-page";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<Home />} /> */}

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/apis" element={<APIsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/logs" element={<LogsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}
