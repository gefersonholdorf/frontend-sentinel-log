import { BrowserRouter, Routes, Route } from "react-router";
import { DashboardPage } from "./pages/dashboard-page";
import { Layout } from "./layout";
import { APIsPage } from "./pages/apis-page";
import { ClientsPage } from "./pages/clients-page";
import { LogsPage } from "./pages/logs-page";
import { UsersPage } from "./pages/users-page";
import { SettingsPage } from "./pages/settings-page";
import { ClientDetailPage } from "./pages/client-detail-page";
import { ApiDetailPage } from "./pages/api-detail-page";
import { LoginPage } from "./pages/login";
import HomePage from "./pages/home-page";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "@/components/ui/sonner"
import { MeProvider } from "./context/me-context";

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>

        <Routes>
          <Route element={<MeProvider>
            <Layout />
          </MeProvider>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/apis" element={<APIsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            <Route path="/clients/:id" element={<ClientDetailPage />} />
            <Route path="/apis/:id" element={<ApiDetailPage />} />
          </Route>
        </Routes>
        <Toaster position="top-center" expand={true} richColors />
      </BrowserRouter >
    </QueryClientProvider >
  )
}
