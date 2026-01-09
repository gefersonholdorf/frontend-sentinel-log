import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"
import { Textarea } from "../ui/textarea"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { Client } from "@/pages/clients-page"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useUpdateClient } from "@/http/client/use-update-client-by-id"
import { useGetClientById } from "@/http/client/use-client-by-id"

interface EditClientModalProps {
    openModal: boolean
    onSetOpenEditModal: () => void
    client: Client | null
    toGoBack?: boolean
}

const updateClientSchema = z.object({
    name: z.string().min(3, "O nome do cliente deve ter pelo menos 3 caracteres"),
    description: z.string().min(3, "A descrição do cliente deve ter pelo menos 3 caracteres"),
    isActive: z.enum(['active', 'inactive'])
})

type UpdateClientFormData = z.infer<typeof updateClientSchema>

export function EditClientModal({ openModal, onSetOpenEditModal, client, toGoBack = false }: EditClientModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm<UpdateClientFormData>({
        resolver: zodResolver(updateClientSchema),
        defaultValues: {
            name: '',
            description: '',
            isActive: undefined
        }
    })

    const { mutateAsync: updateClient, isPending } = useUpdateClient()

    const { refetch } = useGetClientById(client?.id, toGoBack)

    useEffect(() => {
        if (!client) return

        reset({
            name: client.name,
            description: client.description,
            isActive: client.isActive === true ? 'active' : 'inactive'
        })
    }, [client, reset])

    async function handleUpdateClientSubmit(data: UpdateClientFormData) {
        if (!client) {
            return
        }
        await updateClient({
            ...data,
            id: client.id,
            isActive: data.isActive === 'active' ? true : false
        })

        onSetOpenEditModal()

        if (toGoBack) {
            await refetch()
        }
    }

    return (
        <Dialog open={openModal && !!client} onOpenChange={onSetOpenEditModal}>
            <DialogContent className="p-8">
                <form onSubmit={handleSubmit(handleUpdateClientSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Editar Cliente</DialogTitle>
                        <DialogDescription>
                            Editar dados do cliente
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 space-y-3 mt-6">
                        <div className="grid gap-3">
                            <Label>Nome</Label>
                            <Input
                                {...register('name')}
                                placeholder="Nome do cliente..."
                            />
                            {errors.name && <p className="text-[.8rem] text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label>Descrição</Label>
                            <Textarea
                                {...register('description')}
                                placeholder="Descrição opcional..."
                            />
                            {errors.description && <p className="text-[.8rem] text-red-500">{errors.description.message}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label>Status</Label>
                            <Controller
                                name="isActive"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione um status..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Status</SelectLabel>
                                                <SelectItem value="active">Ativo</SelectItem>
                                                <SelectItem value="inactive">Inativo</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button disabled={isPending} variant="outline"><X />Cancelar</Button>
                        </DialogClose>
                        <Button disabled={isPending} className="bg-primary-background hover:bg-sky-600 text-white" type="submit"><Plus />Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
