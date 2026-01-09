import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, X } from "lucide-react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ComboboxClients } from "../client/combobox-clients"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useInviteNewUser } from "@/http/user/use-invite-new-user"

export const inviteNewUserSchema = z.object({
    name: z.string().min(3, 'O nome é obrigatório.'),
    email: z.email('O email é obrigatório.'),
    clientId: z.string().min(1, "Selecione um cliente").optional(),
    role: z.enum(['super_admin', 'admin', 'member'], 'Selecione um perfil.')
})

export type InviteNewUserSchema = z.infer<typeof inviteNewUserSchema>

export function CreateNewUserModal({ children }: { children: React.ReactNode }) {
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<InviteNewUserSchema>({
        resolver: zodResolver(inviteNewUserSchema),
        defaultValues: {
            name: '',
            email: '',
            clientId: undefined,
            role: undefined
        }
    })

    useEffect(() => {
        reset()
    }, [])

    const { mutateAsync: inviteNewUser, isPending } = useInviteNewUser()

    const [copyUrl, setCopyUrl] = useState(false)
    const [url, setUrl] = useState<string | undefined>(undefined)
    const [copied, setCopied] = useState(false)

    function handleSetCopyUrl() {
        setCopyUrl(false)
        reset()
    }

    async function handleCopyUrl() {
        if (!url) return

        await navigator.clipboard.writeText(url)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    async function handleInviteNewUserSubmit(data: InviteNewUserSchema) {
        const { url: newUrl } = await inviteNewUser({
            ...data,
            clientId: data.clientId ? Number(data.clientId) : null
        })

        setUrl(newUrl)
        setCopyUrl(true)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="p-8">
                <form onSubmit={handleSubmit(handleInviteNewUserSubmit)} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Convidar Novo Usuário</DialogTitle>
                        <DialogDescription>
                            Convidar novo usuário, caso o usuário for um super-admin, não é necessário selecionar um cliente.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 space-y-3">
                        <div className="grid gap-3">
                            <Label>Nome</Label>
                            <Input
                                placeholder="Nome do usuário..."
                                {...register('name')}
                            />
                            {errors.name && <p className="text-[.8rem] text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="flex gap-4 items-center justify-center">
                            <div className="w-full grid gap-3">
                                <Label>Email</Label>
                                <Input
                                    placeholder="Email do usuário..."
                                    {...register('email')}
                                />
                                {errors.email && <p className="text-[.8rem] text-red-500">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-4 items-center justify-center">
                            <div className="w-full grid gap-3">
                                <Label>Cliente</Label>
                                <Controller
                                    name="clientId"
                                    control={control}
                                    render={({ field }) => (
                                        <ComboboxClients
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        />
                                    )}
                                />
                                {errors.clientId && <p className="text-[.8rem] text-red-500">{errors.clientId.message}</p>}
                            </div>
                            <div className="w-full grid gap-3">
                                <div className="grid gap-3">
                                    <Label>Perfil</Label>
                                    <Controller
                                        name="role"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione um cliente..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Perfil</SelectLabel>
                                                        <SelectItem value="super_admin">SUPER ADMIN</SelectItem>
                                                        <SelectItem value="admin">ADMIN</SelectItem>
                                                        <SelectItem value="member">MEMBRO</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.role && <p className="text-[.8rem] text-red-500">{errors.role.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {copyUrl && url && (
                        <Alert className="flex flex-col gap-3">
                            <AlertTitle className="text-sm font-medium break-all">
                                {url}
                            </AlertTitle>

                            <AlertDescription className="flex items-center justify-between gap-4">
                                <span>
                                    Envie essa URL para o usuário concluir o cadastro.
                                </span>

                                <Button
                                    size="sm"
                                    type="button"
                                    variant="outline"
                                    disabled={copied}
                                    onClick={handleCopyUrl}
                                >
                                    {copied ? "Copiado!" : "Copiar"}
                                </Button>
                            </AlertDescription>
                        </Alert>
                    )}
                    <DialogFooter className="mt-6">
                        {!copyUrl && (
                            <>
                                <DialogClose asChild>
                                    <Button disabled={isPending} variant="outline"><X />Cancelar</Button>
                                </DialogClose>
                                <Button disabled={isPending} className="bg-primary-background hover:bg-sky-600 text-white" type="submit"><Link />Gerar URL</Button>
                            </>
                        )}
                        {copyUrl && (
                            <DialogClose asChild>
                                <Button onClick={handleSetCopyUrl} variant="outline"><X />Fechar</Button>
                            </DialogClose>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
