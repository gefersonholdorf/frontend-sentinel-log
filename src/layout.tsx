import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";
import { useTheme } from "./context/theme-context";
import { Menu } from "./components/menu";
import { UserPanel } from "./components/user-panel";

export function Layout() {
    const [open, setOpen] = useState(false)
    const { theme } = useTheme()

    function handleSetOpen() {
        setOpen(!open)
    }

    return (
        <div className="w-full min-h-screen flex">
            <div
                className={`
                    border-r p-4 flex flex-col justify-between
                    ${open ? 'w-2/12 animate-width' : 'w-1/14 animate-width'}
                    ${theme === 'light'
                        ? 'border-r-gray-300 bg-gray-100'
                        : 'border-r-gray-800 bg-zinc-900'
                    } 
                `}
            >
                <div className="flex flex-col gap-6">
                    <div className="flex justify-center items-center">
                        {open && (
                            <div className="flex gap-2 items-center">
                                <h1 className="text-2xl font-bold">SentinelLog</h1>
                            </div>
                        )}

                        <div className="flex items-center gap-1">
                            <ThemeSwitcher />
                            <div
                                className="cursor-pointer hover:text-primary-background"
                                onClick={handleSetOpen}
                            >
                                {open ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
                            </div>
                        </div>
                    </div>
                    <div>
                        <Menu open={open} />
                    </div>
                </div>
                <div>
                    <UserPanel open={open} theme={theme} />
                </div>
            </div>
            <div className="p-4">
                <Outlet />
            </div>
        </div >
    )
}