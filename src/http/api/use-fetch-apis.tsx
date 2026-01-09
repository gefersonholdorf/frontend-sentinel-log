import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface FetchApisResponse {
    data: {
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
    }[],
    page: number,
    perPage: number,
    totalPages: number
}

export interface Pagination {
    page: number
    perPage: number
    filter?: string
    clientId?: number
}

export function useFetchApi({ page, perPage, filter, clientId }: Pagination) {
    return useQuery({
        queryKey: ['apis', page, perPage, filter, clientId],
        queryFn: async () => {
            const token = localStorage.getItem('token')

            const params = new URLSearchParams({
                page: String(page),
                perPage: String(perPage),
                ...(filter ? { filter } : {}),
            })

            if(clientId) {
                params.set('clientId', clientId.toString())
            }

            const response = await fetch(`http://localhost:3335/api/v1/apis?${params.toString()}`, {
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
                throw new Error('Erro ao buscar apis')
            }

            const data: FetchApisResponse = await response.json()

            return data
        },
        placeholderData: keepPreviousData,
    })
}