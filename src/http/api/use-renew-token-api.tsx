import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface RenewTokenApiRequest {
    id: number
    expiresIn: Date
}

export function useRenewTokenApi() {
    const queryApit = useQueryClient()
    return useMutation({
        mutationKey: ['renew-token-api'],
        mutationFn: async (data: RenewTokenApiRequest) => {
            const token = localStorage.getItem('token')

            const result = await fetch(`http://localhost:3335/api/v1/apis/${data.id}/renew`, {
                method: 'POST',
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
                throw new Error('Erro ao realizar renovação do token da API, tente novamente!')
            }
        },
        onSuccess: () => {
            queryApit.invalidateQueries({ queryKey: ['apis'] })
            toast.success('Token da API renovado com sucesso!')
        },
        onError: () => {
            toast.error('Erro ao renovar token da API!')
        }
    })
}