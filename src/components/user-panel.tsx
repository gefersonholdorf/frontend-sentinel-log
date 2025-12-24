import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { tv, type VariantProps } from "tailwind-variants";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useMeContext } from "@/context/me-context";

const variants = tv({
    base: 'flex w-full items-center gap-4 rounded-lg px-2 py-3 transition-all duration-300',
    variants: {
        theme: {
            light: 'bg-gray-200/30 hover:bg-gray-200 border border-gray-200 hover:border-gray-300',
            dark: 'bg-zinc-800/30 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-white'
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
    const navigate = useNavigate()
    const { user, isLoading } = useMeContext()
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
                        <span className="transition-all duration-700 truncate text-sm font-semibold">
                            {isLoading ? 'Carregando...' : user && user.name}
                        </span>
                        <span className="transition-all duration-700 truncate text-sm font-semibold"></span>
                        <span className={`transition-all duration-700 truncate text-[.8rem] ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} `}>geferson@gmail.com.br</span>
                    </div>
                    <Tooltip>
                        <TooltipTrigger>
                            <LogOut onClick={() => navigate('/login')} size={20} className="hover:text-red-500 cursor-pointer shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Sair do sistema</p>
                        </TooltipContent>
                    </Tooltip>
                </>
            )}
        </div>
    )
}
