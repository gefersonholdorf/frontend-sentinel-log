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
import { useCreateApi } from "@/http/api/use-create-api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { ComboboxClients } from "../client/combobox-clients"

interface CreateNewApiModalProps {
    children: React.ReactNode
    openModal: boolean
    onSetOpenCreateModal: () => void
}

const createApiSchema = z.object({
    name: z.string().min(3, "O nome da API deve ter pelo menos 3 caracteres"),
    description: z.string().min(3, "A descrição da API deve ter pelo menos 3 caracteres"),
    isActive: z.enum(['active', 'inactive']),
    urlCallbackStatus: z.url("Deve ser uma URL válida"),
    clientId: z.string().min(1, "Selecione um cliente")
})

type CreateApiFormData = z.infer<typeof createApiSchema>

export function CreateNewAPIModal({ children, openModal, onSetOpenCreateModal }: CreateNewApiModalProps) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<CreateApiFormData>({
        resolver: zodResolver(createApiSchema),
        defaultValues: {
            name: '',
            description: '',
            isActive: 'active',
            urlCallbackStatus: ''
        }
    })

    const { mutateAsync: createApi, isPending } = useCreateApi()

    async function handleCreateApiSubmit(data: CreateApiFormData) {
        await createApi({
            ...data,
            clientId: Number(data.clientId),
            isActive: data.isActive === 'active' ? true : false
        })
        onSetOpenCreateModal()
    }

    return (
        <Dialog open={openModal} onOpenChange={onSetOpenCreateModal}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="p-8">
                <form onSubmit={handleSubmit(handleCreateApiSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Nova API</DialogTitle>
                        <DialogDescription>
                            Adicionar nova API
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
                        <Button disabled={isPending} className="bg-primary-background hover:bg-sky-600 text-white" type="submit"><Plus />Criar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
