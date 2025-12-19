import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateClientRequest {
    name: string
    description: string
    isActive: boolean
}

interface CreateClientResponse {
    id: number
}

export function useCreateClient() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['create-client'],
        mutationFn: async (data: CreateClientRequest) => {
            const token = localStorage.getItem('token')

            const result = await fetch('http://localhost:3335/api/v1/clients', {
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
                throw new Error('Erro ao realizar o cadastro de um novo cliente, tente novamente!')
            }

            const response: CreateClientResponse = await result.json()

            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] })
            toast.success('Cliente cadastrado com sucesso!')
        },
        onError: () => {
            toast.error('Erro ao cadastrar novo cliente!')
        }
    })
}