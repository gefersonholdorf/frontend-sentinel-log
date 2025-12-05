import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/context/theme-context";
import { useNavigate } from "react-router";

export function LoginPage() {
    const { theme } = useTheme()
    const navigate = useNavigate()
    return (
        <div className="h-screen w-full flex flex-col gap-2 items-center justify-center">
            <img width={150} src={`${theme === 'light' ? './logo-dark.png' : './logo-light.png'}`} />
            <h2 className="text-3xl font-bold">Bem-vindo ao seu Painel de Monitoramento e Logs</h2>
            <p className={`text-medium text-gray-400 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Entre no sistema e acompanhe em tempo real tudo o que acontece em sua aplicação.</p>
            <Tooltip>
                <TooltipTrigger>
                    <ThemeSwitcher />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Mudar para tema {theme === 'light' ? 'escuro' : 'claro'}</p>
                </TooltipContent>
            </Tooltip>
            <Card className={`
                        w-2/6 flex items-center justify-between gap-6 p-8 border rounded-lg shadow-primary transition-transform duration-300 hover:scale-[1.03]
                        ${theme === 'light' ? 'bg-gray-100/40 border-gray-200 text-gray-600' : 'bg-zinc-900 border-zinc-700 text-gray-300'}
                    `}>
                <div className="w-full">
                    <label>E-mail</label>
                    <Input className="w-full" />
                </div>
                <div className="w-full">
                    <label>Senha</label>
                    <Input />
                </div>

                <Button onClick={() => navigate('/dashboard')} className="bg-primary-background w-full text-zinc-100 font-bold cursor-pointer hover:bg-sky-600">Entrar</Button>
                <Button className="cursor-pointer" variant="link">Esqueceu sua senha?</Button>
            </Card>
        </div>
    )
}