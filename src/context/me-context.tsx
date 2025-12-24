import { useMe } from "@/http/auth/use-me";
import { createContext, useContext, type ReactNode } from "react";

interface User {
    id: number,
    name: string,
    email: string,
    role: 'super_admin' | 'admin' | 'member',
    isActive: boolean,
    clientId: number | null,
    createdAt: Date,
    updatedAt: Date
}

interface MeContextType {
    user: User | null;
    isLoading: boolean;
}

const MeContext = createContext<MeContextType | undefined>(undefined)

export function MeProvider({ children }: { children: ReactNode }) {
    const { data, isLoading } = useMe();

    return (
        <MeContext.Provider value={{
            user: data?.user ?? null,
            isLoading,
        }}
        >
            {children}
        </MeContext.Provider>
    )
}

export function useMeContext() {
    const ctx = useContext(MeContext)
    if (!ctx) throw new Error("useMe must be used within a MeProvider")
    return ctx
}