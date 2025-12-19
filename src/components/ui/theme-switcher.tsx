import { useTheme } from "@/context/theme-context";
import { Button } from "./button";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme()
    return (
        <Button
            type="button"
            className={`
                cursor-pointer bg-transparent hover:bg-transparent hover:text-primary-background
                ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}
                `}
            onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={60} /> : <Sun />}
        </Button>
    )
}