import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { useUpdateApi } from "@/http/api/use-update-api"
import { useEffect } from "react"
import type { Api } from "@/pages/apis-page"

interface UpdateApiModalProps {
    openModal: boolean
    onSetOpenEditModal: () => void
    api: Api | null
}

const updateApiSchema = z.object({
    name: z.string().min(3, "O nome da API deve ter pelo menos 3 caracteres"),
    description: z.string().min(3, "A descrição da API deve ter pelo menos 3 caracteres"),
    isActive: z.enum(['active', 'inactive']),
    urlCallbackStatus: z.url("Deve ser uma URL válida"),
})

type UpdateApiFormData = z.infer<typeof updateApiSchema>

export function EditAPIModal({ openModal, onSetOpenEditModal, api }: UpdateApiModalProps) {
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<UpdateApiFormData>({
        resolver: zodResolver(updateApiSchema),
        defaultValues: {
            name: '',
            description: '',
            isActive: 'active',
            urlCallbackStatus: ''
        }
    })

    const { mutateAsync: updateApi, isPending } = useUpdateApi()

    useEffect(() => {
        if (!api) return

        reset({
            name: api.name,
            description: api.description,
            isActive: api.isActive === true ? 'active' : 'inactive',
            urlCallbackStatus: api.urlCallbackStatus
        })
    }, [api, reset])

    async function handleupdateApiSubmit(data: UpdateApiFormData) {
        if (!api) {
            return
        }

        await updateApi({
            ...data,
            id: api.id,
            isActive: data.isActive === 'active' ? true : false
        })

        onSetOpenEditModal()
    }

    return (
        <Dialog open={openModal} onOpenChange={onSetOpenEditModal}>
            <DialogContent className="p-8">
                <form onSubmit={handleSubmit(handleupdateApiSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Editar API</DialogTitle>
                        <DialogDescription>
                            Editar dados da API
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 space-y-3 mt-6">
                        <div className="grid gap-3">
                            <Label>Nome</Label>
                            <Input placeholder="Nome da API..." {...register('name')} />
                            {errors.name && <p className="text-[.8rem] text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label>Descrição</Label>
                            <Textarea placeholder="Descrição opcional..." {...register('description')} />
                            {errors.description && <p className="text-[.8rem] text-red-500">{errors.description.message}</p>}
                        </div>
                        <div className="flex gap-4 items-center justify-center">
                            <div className="w-full grid gap-3">
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
                                {errors.isActive && <p className="text-[.8rem] text-red-500">{errors.isActive.message}</p>}
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label>URL Callback Status</Label>
                            <Input type="url" placeholder="Informe a URL de callback de status..." {...register('urlCallbackStatus')} />
                            {errors.urlCallbackStatus && <p className="text-[.8rem] text-red-500">{errors.urlCallbackStatus.message}</p>}
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
        </Dialog >
    )
}
