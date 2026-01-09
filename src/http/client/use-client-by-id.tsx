import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface GetClientByIdResponse {
    client: {
        id: number
        name: string,
        description: string,
        isActive: boolean,
        createdAt: Date,
        updatedAt: Date,
        apis: {
            id: number
            name: string
            description: string
            isActive: boolean
            createdAt: Date
            updatedAt: Date
            clientId: number
            clientName: string
            token: string | null
            expiresIn: Date
            urlCallbackStatus: string
        }[]
    }
    totalApis: number
    totalApisActive: number
    totalApisInactive: number
    totalLogs: number
    volumeLogsTodayData: {
        hour: string
        quantity: number
    }[],
    logsByApi: {
        apis: string,
        quantity: number
    }[]
}

export function useGetClientById(clientId: number | undefined, enabled: boolean) {
    return useQuery({
        queryKey: ['client', clientId],
        queryFn: async () => {
            const token = localStorage.getItem('token')

            if (!clientId) {
                return
            }

            const response = await fetch(`http://localhost:3335/api/v1/clients/${clientId}`, {
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
                throw new Error('Erro ao buscar clientes')
            }

            const data: GetClientByIdResponse = await response.json()

            return data
        },
        enabled,
        placeholderData: keepPreviousData,
    })
}