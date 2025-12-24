import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface RevokeTokenApiRequest {
    id: number
}

export function useRevokeTokenApi() {
    const queryApi = useQueryClient()
    return useMutation({
        mutationKey: ['revoke-token-api'],
        mutationFn: async (data: RevokeTokenApiRequest) => {
            const token = localStorage.getItem('token')

            const result = await fetch(`http://localhost:3335/api/v1/apis/${data.id}/revoke`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })

            if (result.status === 401) {
                window.location.href = "/login";
                toast.error('Sessão expirada, faça login novamente.')
                throw new Error("Não autorizado");
            }

            if (result.status !== 204) {
                throw new Error('Erro ao realizar revogação do token da API, tente novamente!')
            }
        },
        onSuccess: () => {
            queryApi.invalidateQueries({ queryKey: ['apis'] })
            toast.success('Token da API revogado com sucesso!')
        },
        onError: () => {
            toast.error('Erro ao revogar token da API!')
        }
    })
}