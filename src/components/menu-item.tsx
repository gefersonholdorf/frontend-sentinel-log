import { useTheme } from "@/context/theme-context"
import type { VariantProps } from "class-variance-authority"
import { type ReactNode } from "react"
import { tv } from "tailwind-variants"

const menuItemStyles = tv({
    base: `flex items-center justify-start gap-2 cursor-pointer rounded-sm px-2 py-3 transition-all duration-300`,
    variants: {
        state: {
            active: '',
            default: ''
        },
        theme: {
            light: '',
            dark: ''
        },
        open: {
            true: '',
            false: 'justify-center'
        }
    },
    compoundVariants: [
        {
            state: "active",
            theme: "light",
            class: 'bg-gradient-to-r from-primary-background/10 to-gray-200/20 text-primary-background font-bold border-l-3 border-l-primary-background'
        },
        {
            state: "active",
            theme: "dark",
            class: 'bg-gradient-to-r from-gray-600/20 to-gray-800/20 text-primary-background font-bold border-l-3 border-l-primary-background'
        },
        {
            state: "default",
            theme: "dark",
            class: 'text-gray-400 hover:bg-zinc-800 hover:text-primary-background'
        },
        {
            state: "default",
            theme: "light",
            class: 'text-gray-700 hover:bg-gray-200 hover:text-primary-background'
        },

    ]
})

type StateVariant = VariantProps<typeof menuItemStyles>

interface MenuItemProps extends StateVariant {
    title: string
    icon: ReactNode
    open: boolean
}

export function MenuItem({ title, icon, open, state, ...props }: MenuItemProps) {
    const { theme } = useTheme()
    return (
        <div
            className={menuItemStyles({ state, theme, open })}
            {...props}
        >
            {icon}
            {open && <p className="text-sm">{title}</p>}
        </div>
    )
}