import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface FetchDashboardResponse {
    totalClients: number,
    totalApis: number,
    totalApisActive: number,
    totalApisInactive: number,
    totalLogsToday: number,
    volumeLogsTodayData: {
        hour: string
        quantity: number
    }[]
}

export function useFetchDashboard(clientId: number | null) {
    return useQuery({
        queryKey: ['dashboard', clientId],
        queryFn: async () => {
            const token = localStorage.getItem('token')

            const url = new URL('http://localhost:3335/api/v1/dashboard')

            if (clientId) {
                url.searchParams.append('clientId', clientId.toString())
            }

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.status === 401) {
                window.location.href = "/login";
                toast.error('Sessão expirada, faça login novamente.')
                throw new Error("Não autorizado");
            }

            if (!response.ok) {
                throw new Error('Erro ao buscar dashboard')
            }

            const data: FetchDashboardResponse = await response.json()

            return data
        },
    })
}