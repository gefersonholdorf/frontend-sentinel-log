import { useTheme } from "@/context/theme-context"

interface CardProps {
    title: string
    value: string
    children: React.ReactNode
    className?: string
}

export function Card({ title, value, children, className }: CardProps) {
    const { theme } = useTheme()
    return (
        <div className={`
                        flex items-center justify-between gap-2 p-4 border rounded-lg shadow-primary transition-transform duration-300 hover:scale-[1.03]
                        ${theme === 'light' ? 'bg-zinc-100/30 border-gray-200 text-gray-600' : 'bg-zinc-900 border-zinc-700 text-gray-300'}
                    `}>
            <div className="flex flex-col items-start justify-center gap-2">
                <span className="font-medium text-sm">{title}</span>
                <span className={`font-semibold text-3xl ${className}`}>{value}</span>
            </div>
            {children}
        </div>
    )
}