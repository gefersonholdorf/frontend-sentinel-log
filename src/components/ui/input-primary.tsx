import type { ComponentProps } from "react";
import { Input } from "./input";
import { Search } from "lucide-react";
import { useTheme } from "@/context/theme-context";

interface InputPrimaryProps extends ComponentProps<'input'> { }

export function InputPrimary({ ...props }: InputPrimaryProps) {
    const { theme } = useTheme()
    return (
        <div className={`flex items-center gap-2 rounded-md border px-4 shadow-sm bg-background]
            ${theme === 'light' ? 'bg-background outline-gray-200' : 'bg-background border-zinc-700'}
        `}>
            <Search className={`h-4 w-4 text-muted-foreground ${theme === 'light' ? 'bg-zinc-100/30 outline-gray-200' : 'border-zinc-700 bg-zinc-900'}`} />
            <Input
                className={`flex-1 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0`}
                {...props}
            />
        </div>
    )
}