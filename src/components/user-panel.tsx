import { LogOut } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

const variants = tv({
    base: 'flex w-full items-center gap-2 rounded-sm px-2 py-3 transition-all duration-300',
    variants: {
        theme: {
            light: 'bg-gray-200',
            dark: 'bg-zinc-800 text-white'
        },
        open: {
            true: '',
            false: ''
        }
    },
    compoundVariants: [
        {
            theme: 'light',
            open: true,
            class: 'justify-between'
        },
        {
            theme: 'light',
            open: false,
            class: 'justify-center'
        },
        {
            theme: 'dark',
            open: true,
            class: 'justify-between'
        },
        {
            theme: 'dark',
            open: false,
            class: 'justify-center'
        }
    ]
})

type Variants = VariantProps<typeof variants>

interface UserPanelProps extends Variants {
    open: boolean
}

export function UserPanel({ open, theme }: UserPanelProps) {
    return (
        <div className={variants({ theme, open })}>
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                <img
                    src="https://avatars.githubusercontent.com/u/68699314?v=4"
                    className="w-full h-full object-cover"
                    alt="User avatar"
                />
            </div>

            {open && (
                <>
                    <div className="flex flex-col flex-1 min-w-0">
                        <span className="truncate text-sm font-semibold">GefersonHoldorf Holdorf</span>
                        <span className="truncate text-[.8rem] text-gray-500">geferson@gmail.com.br</span>
                    </div>
                    <LogOut size={20} className="hover:text-red-500 cursor-pointer shrink-0" />
                </>
            )}
        </div>
    )
}
