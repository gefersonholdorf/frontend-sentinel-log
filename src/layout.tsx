import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { ChevronsLeft, ChevronsRight, Code } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";
import { useTheme } from "./context/theme-context";
import { Menu } from "./components/menu";
import { UserPanel } from "./components/user-panel";
import { Separator } from "./components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function Layout() {
    const [open, setOpen] = useState(true)
    const { theme } = useTheme()

    function handleSetOpen() {
        setOpen(!open)
    }

    return (
        <div className="w-full min-h-screen flex">
            <div
                className={`
                    border-r p-4 flex flex-col justify-between shadow-primary max-h-screen sticky top-0
                    ${open ? 'w-2/12 animate-width' : 'w-1/14 animate-width'}
                    ${theme === 'light'
                        ? 'border-r-gray-200 bg-gray-100/60'
                        : 'border-r-gray-800 bg-zinc-900'
                    } 
                `}
            >
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        {open && (
                            <div className="flex gap-2 items-center">
                                <h1 className="text-2xl font-bold">SentinelLog</h1>
                            </div>
                        )}

                        <div className="flex items-center justify-center gap-1">
                            <Tooltip>
                                <TooltipTrigger>
                                    <ThemeSwitcher />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Mudar para tema {theme === 'light' ? 'escuro' : 'claro'}</p>
                                </TooltipContent>
                            </Tooltip>
                            <div
                                className="cursor-pointer hover:text-primary-background"
                                onClick={handleSetOpen}
                            >
                                {open ? (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ChevronsLeft size={20} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Recolher menu</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ) : (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ChevronsRight size={20} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Abrir menu</p>
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                            </div>
                        </div>
                    </div>
                    <Separator className="h-3" />
                    <div>
                        <Menu open={open} />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Separator className="h-3" />
                    <UserPanel open={open} theme={theme} />
                    {open && (
                        <>
                            <Separator className="h-3" />
                            <footer className="truncate flex items-center justify-center gap-2 text-center text-xs opacity-70">
                                <Code size={20} />
                                Desenvolvido por Geferson Holdorf
                            </footer>
                        </>
                    )}
                </div>
            </div>
            <div className="w-full">
                <Outlet />
            </div>
        </div >
    )
}