import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateApiRequest {
    id: number
    name: string
    description: string
    isActive: boolean
    urlCallbackStatus: string
}

export function useUpdateApi() {
    const queryApit = useQueryClient()
    return useMutation({
        mutationKey: ['update-api'],
        mutationFn: async (data: UpdateApiRequest) => {
            const token = localStorage.getItem('token')

            const result = await fetch(`http://localhost:3335/api/v1/apis/${data.id}`, {
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
                throw new Error('Erro ao realizar ao atualizar a API, tente novamente!')
            }
        },
        onSuccess: () => {
            queryApit.invalidateQueries({ queryKey: ['apis'] })
            toast.success('API atualizada com sucesso!')
        },
        onError: () => {
            toast.error('Erro ao atualizar a APU!')
        }
    })
}