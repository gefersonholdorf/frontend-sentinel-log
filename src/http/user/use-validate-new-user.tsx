import { useQuery } from "@tanstack/react-query"

interface ValidateNewUserResponse {
    user: {
        id: number
        email: string
        name: string
        clientId: number | null
        role: 'super_admin' | 'admin' | 'member'
    }
}

export function useValidateNewUser(token?: string) {
    return useQuery({
        queryKey: ['validate-new-user', token],
        queryFn: async () => {
            const result = await fetch(`http://localhost:3335/api/v1/onboarding/validate-token?token=${token}`)

            if (result.status !== 200) {
                throw new Error('Erro ao realizar validação do novo usuário, tente novamente!')
            }

            const response: ValidateNewUserResponse = await result.json()

            return response
        },
        enabled: !!token,
        retry: false
    })
}