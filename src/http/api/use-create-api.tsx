import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateApiRequest {
    name: string
    description: string
    isActive: boolean
    urlCallbackStatus: string
    clientId: number
}

interface CreateApiResponse {
    id: number
}

export function useCreateApi() {
    const queryApi = useQueryClient()
    return useMutation({
        mutationKey: ['create-api'],
        mutationFn: async (data: CreateApiRequest) => {
            const token = localStorage.getItem('token')

            const result = await fetch('http://localhost:3335/api/v1/apis', {
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

            if (result.status !== 201) {
                throw new Error('Erro ao realizar o cadastro de uma nova Api, tente novamente!')
            }

            const response: CreateApiResponse = await result.json()

            return response
        },
        onSuccess: () => {
            queryApi.invalidateQueries({ queryKey: ['apis'] })
            toast.success('Api cadastrada com sucesso!')
        },
        onError: () => {
            toast.error('Erro ao cadastrar nova Api!')
        }
    })
}