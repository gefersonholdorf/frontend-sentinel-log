import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/context/theme-context";
import { useLogin } from "@/http/auth/use-login";
import { useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

export const loginFormSchema = z.object({
    email: z.email('Informe seu e-mail'),
    password: z.string().min(1, 'Informe sua senha')
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>

export function LoginPage() {
    const { theme } = useTheme()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const { mutateAsync: login, isPending } = useLogin()

    async function handleLoginSubmit(data: LoginFormSchema) {
        await login(data)
    }

    return (
        <form
            onSubmit={handleSubmit(handleLoginSubmit)}
            className="
                h-screen w-full flex flex-col gap-2 items-center justify-center
                bg-linear-to-br from-slate-100 via-zinc-200 to-slate-100
                dark:bg-linear-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
                transition-all duration-500
            "
        >
            <img width={150} src={`${theme === 'light' ? './logo-dark.png' : './logo-light.png'}`} />
            <h2 className="text-3xl font-bold text-gray-700 dark:text-zinc-200">Bem-vindo ao seu Painel de Monitoramento e Logs</h2>
            <p className={`text-medium text-gray-400 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Entre no sistema e acompanhe em tempo real tudo o que acontece em sua aplicação.</p>
            <Tooltip>
                <TooltipTrigger asChild>
                    <ThemeSwitcher />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Mudar para tema {theme === 'light' ? 'escuro' : 'claro'}</p>
                </TooltipContent>
            </Tooltip>
            <Card className={`
                        w-5/6 lg:w-2/6 flex items-center justify-between gap-6 p-8 border rounded-lg shadow-primary transition-transform duration-300 hover:scale-[1.03]
                        ${theme === 'light' ? 'bg-zinc-100/60 border-gray-200 text-gray-600' : 'bg-zinc-900/80 border-zinc-700 text-gray-300'}
                    `}>
                <div className="w-full">
                    <label>E-mail</label>
                    <Input {...register('email')} type="email" className="w-full bg-gray-100/70 border" />
                    {errors.email && <p className="text-[.8rem] text-red-500">{errors.email.message}</p>}
                </div>
                <div className="w-full">
                    <label>Senha</label>
                    <Input {...register('password')} type="password" className="bg-gray-100/70 border" />
                    {errors.password && <p className="text-[.8rem] text-red-500">{errors.password.message}</p>}
                </div>

                <Button disabled={isPending} type="submit" className="bg-primary-background w-full text-zinc-100 font-bold cursor-pointer hover:bg-sky-600">Entrar</Button>
                <Button className="cursor-pointer" variant="link">Esqueceu sua senha?</Button>
            </Card>
        </form>
    )
}