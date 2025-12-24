import { useQuery } from "@tanstack/react-query";

export interface MeResponse {
    user: {
        id: number,
        name: string,
        email: string,
        role: 'super_admin' | 'admin' | 'member',
        isActive: boolean,
        clientId: number | null,
        createdAt: Date,
        updatedAt: Date
    }
}

export function useMe() {
    const token = localStorage.getItem('token')
    return useQuery({
        queryKey: ['me'],
        queryFn: async () => {

            const response = await fetch('http://localhost:3335/api/v1/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const result: MeResponse = await response.json()

            return result
        }
    })
}