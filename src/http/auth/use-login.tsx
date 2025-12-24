import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface LoginRequest {
    email: string
    password: string
}

interface LoginResponse {
    token: string
}

export function useLogin() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (data: LoginRequest) => {
            const result = await fetch('http://localhost:3335/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (result.status !== 200) {
                throw new Error('Erro ao realizar login, verifique suas credenciais!')
            }

            const response: LoginResponse = await result.json()

            return response
        },
        onSuccess: async (data) => {
            await localStorage.setItem('token', data.token)

            toast.success('Login realizado com sucesso!')

            await queryClient.refetchQueries({ queryKey: ['me'] })

            navigate('/dashboard')
        },
        onError: () => {
            toast.error('Erro ao realizar login, verifique suas credenciais!')
        }
    })
}