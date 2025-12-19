import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateClientRequest {
    id: number
    name: string
    description: string
    isActive: boolean
}

export function useUpdateClient() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['update-client'],
        mutationFn: async (data: UpdateClientRequest) => {
            const token = localStorage.getItem('token')

            const result = await fetch(`http://localhost:3335/api/v1/clients/${data.id}`, {
                method: 'PUT',
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
                throw new Error('Erro ao realizar o cadastro de um novo cliente, tente novamente!')
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] })
            toast.success('Cliente atualizado com sucesso!')
        },
        onError: () => {
            toast.error('Erro ao atualizar cliente!')
        }
    })
}