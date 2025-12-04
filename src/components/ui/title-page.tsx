import type { ReactNode } from "react"

interface TitlePageProps {
    title: string
    description: string
    children?: ReactNode
}

export function TitlePage({ title, description, children }: TitlePageProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            {children}
        </div>
    )
}