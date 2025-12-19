import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface FetchClientsResponse {
    data: {
        id: number
        name: string,
        description: string,
        isActive: boolean,
        apis: number,
        createdAt: Date,
        updatedAt: Date
    }[],
    page: number,
    perPage: number,
    totalPages: number
}

export interface Pagination {
    page: number
    perPage: number
    filter?: string
}

export function useFetchClient({ page, perPage, filter }: Pagination) {
    return useQuery({
        queryKey: ['clients', page, perPage, filter],
        queryFn: async () => {
            const token = localStorage.getItem('token')

            const params = new URLSearchParams({
                page: String(page),
                perPage: String(perPage),
                ...(filter ? { filter } : {}),
            })

            const response = await fetch(`http://localhost:3335/api/v1/clients?${params.toString()}`, {
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

            const data: FetchClientsResponse = await response.json()

            return data
        },
        placeholderData: keepPreviousData,
    })
}