import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

interface InviteNewUserRequest {
    name: string
    email: string
    clientId: number | null
    role: 'super_admin' | 'admin' | 'member'
}

interface InviteNewUserResponse {
    url: string
}

export function useInviteNewUser() {
    return useMutation({
        mutationKey: ['invite-new-user'],
        mutationFn: async (data: InviteNewUserRequest) => {
            const token = localStorage.getItem('token')

            const result = await fetch('http://localhost:3335/api/v1/users', {
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

            if (result.status !== 200) {
                throw new Error('Erro ao realizar o convite para o novo usuário, tente novamente!')
            }

            const response: InviteNewUserResponse = await result.json()

            return response
        },
        onSuccess: () => {
            toast.success('Usuário cadastrado com sucesso!')
        },
        onError: () => {
            toast.error('Erro ao cadastrar novo usuário!')
        }
    })
}