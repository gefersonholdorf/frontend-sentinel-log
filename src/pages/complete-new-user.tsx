import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/context/theme-context";
import { useForm } from "react-hook-form"
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useValidateNewUser } from "@/http/user/use-validate-new-user";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompleteNewUser } from "@/http/user/use-complete-new-user";

export const CompleteNewUserFormSchema = z.object({
    name: z.string().min(1, 'Informe seu nome'),
    email: z.email('Informe seu e-mail'),
    cpf: z.string().min(1, 'Informe seu CPF'),
    password: z.string().min(1, 'Informe sua senha')
})

export type CompleteNewUserFormSchema = z.infer<typeof CompleteNewUserFormSchema>

export function CompleteNewUserPage() {
    const { theme } = useTheme()

    const [searchParams] = useSearchParams()
    const token = searchParams.get('token') ?? undefined

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CompleteNewUserFormSchema>({
        resolver: zodResolver(CompleteNewUserFormSchema),
        defaultValues: {
            name: '',
            email: '',
            cpf: '',
            password: ''
        }
    })

    const { isPending, isError, data, refetch } = useValidateNewUser(token)
    const { mutateAsync: completeUser, isPending: isPendingComplete } = useCompleteNewUser()

    useEffect(() => {
        refetch()
    }, [token])

    useEffect(() => {
        if (data) {
            reset({
                name: data.user.name ?? '',
                email: data.user.email ?? '',
                cpf: '',
                password: ''
            })
        }
    }, [data, reset])

    const navigate = useNavigate()

    async function handleCompleteNewUserSubmit(formData: CompleteNewUserFormSchema) {
        if (!data?.user?.id) return

        await completeUser({
            id: String(data.user.id),
            ...formData
        })

        navigate('/login')
    }

    return (
        <form
            onSubmit={handleSubmit(handleCompleteNewUserSubmit)}
            className="
                h-screen w-full flex flex-col gap-2 items-center justify-center
                bg-linear-to-br from-slate-100 via-zinc-200 to-slate-100
                dark:bg-linear-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
                transition-all duration-500
            "
        >
            {data && (
                <>
                    <h2 className="text-3xl font-bold text-gray-700 dark:text-zinc-200">Completar Cadastro de Usuário</h2>
                    <p className={`text-medium text-gray-400 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Finalize seu cadastro e clique em Finalizar Cadastro, você será redirecionado para a tela de login.</p>
                </>
            )}
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
                    `}
            >
                {isPending && (
                    <Skeleton className="h-35 animate-pulse" />
                )}
                {isError && (
                    <div className="w-full flex flex-col items-center gap-4 text-center">
                        <h3 className="text-lg font-semibold text-red-600">
                            Link inválido ou expirado
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            O link utilizado para finalizar o seu cadastro não é mais válido.
                            Isso pode acontecer caso o prazo tenha expirado ou o link já tenha sido utilizado.
                        </p>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Solicite um novo convite ou entre em contato com o suporte.
                        </p>
                    </div>
                )}
                {data && (
                    <>
                        <div className="w-full">
                            <label>Nome</label>
                            <Input {...register('name')} className="w-full bg-gray-100/70 border" />
                            {errors.name && <p className="text-[.8rem] text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="w-full">
                            <label>E-mail</label>
                            <Input {...register('email')} type="email" className="w-full bg-gray-100/70 border" />
                            {errors.email && <p className="text-[.8rem] text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className="w-full">
                            <label>CPF</label>
                            <Input {...register('cpf')} className="w-full bg-gray-100/70 border" />
                            {errors.cpf && <p className="text-[.8rem] text-red-500">{errors.cpf.message}</p>}
                        </div>
                        <div className="w-full">
                            <label>Senha</label>
                            <Input {...register('password')} type="password" className="bg-gray-100/70 border" />
                            {errors.password && <p className="text-[.8rem] text-red-500">{errors.password.message}</p>}
                        </div>

                        <Button disabled={isPendingComplete} type="submit" className="bg-primary-background w-full text-zinc-100 font-bold cursor-pointer hover:bg-sky-600">Finalizar Cadastro</Button>
                    </>
                )}
            </Card>
        </form>
    )
}