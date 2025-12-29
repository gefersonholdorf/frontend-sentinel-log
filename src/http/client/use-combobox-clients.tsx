import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface ComboboxClientsResponse {
    data: {
        value: number,
        label: string
    }[],
}

export function useComboboxClients() {
    return useQuery({
        queryKey: ['combobox-clients'],
        queryFn: async () => {
            const token = localStorage.getItem('token')

            const response = await fetch(`http://localhost:3335/api/v1/clients/combobox`, {
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

            const data: ComboboxClientsResponse = await response.json()

            return data
        },
        placeholderData: keepPreviousData,
    })
}