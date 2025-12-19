import { useQuery } from "@tanstack/react-query";

export interface FetchDashboardResponse {
    totalClients: number,
    totalApis: number,
    totalApisActive: number,
    totalApisInactive: number,
    totalLogsToday: number
}

export function useFetchDashboard() {
    return useQuery({
        queryKey: ['Dashboard'],
        queryFn: async () => {
            const token = localStorage.getItem('token')

            const response = await fetch('http://localhost:3335/api/v1/dashboard', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error('Erro ao buscar dashboard')
            }

            const data: FetchDashboardResponse = await response.json()

            return data
        },
    })
}