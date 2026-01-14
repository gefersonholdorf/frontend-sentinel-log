import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

interface CompleteNewUserRequest {
    id: string
    name: string
    email: string
    cpf: string
    password: string
}

export function useCompleteNewUser() {
    return useMutation({
        mutationKey: ['complete-new-user'],
        mutationFn: async ({ id, ...data }: CompleteNewUserRequest) => {
            const result = await fetch(`http://localhost:3335/api/v1/users/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            if (result.status === 401) {
                window.location.href = "/login";
                toast.error('Sessão expirada, faça login novamente.')
                throw new Error("Não autorizado");
            }

            if (result.status !== 204) {
                throw new Error('Erro ao realizar o complemento do usuário, tente novamente!')
            }

            return
        },
        onSuccess: () => {
            toast.success('Usuário atualizado com sucesso! Faça seu login.')
        },
        onError: () => {
            toast.error('Erro ao atualizar usuário!')
        }
    })
}