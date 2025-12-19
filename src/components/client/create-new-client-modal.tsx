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
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller } from "react-hook-form"
import { useCreateClient } from "@/http/client/use-create-client"

interface CreateNewClientModalProps {
    children: React.ReactNode
    openModal: boolean
    onSetOpenCreateModal: () => void
}

const createClientSchema = z.object({
    name: z.string().min(3, "O nome do cliente deve ter pelo menos 3 caracteres"),
    description: z.string().min(3, "A descrição do cliente deve ter pelo menos 3 caracteres"),
    isActive: z.enum(['active', 'inactive'])
})

type CreateClientFormData = z.infer<typeof createClientSchema>

export function CreateNewClientModal({ children, openModal, onSetOpenCreateModal }: CreateNewClientModalProps) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<CreateClientFormData>({
        resolver: zodResolver(createClientSchema),
        defaultValues: {
            name: '',
            description: '',
            isActive: 'active'
        }
    })

    const { mutateAsync: createClient, isPending } = useCreateClient()

    async function handleCreateClientSubmit(data: CreateClientFormData) {
        await createClient({
            ...data,
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
                <form onSubmit={handleSubmit(handleCreateClientSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Novo Cliente</DialogTitle>
                        <DialogDescription>
                            Adicionar novo cliente
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 space-y-3 mt-6">
                        <div className="grid gap-3">
                            <Label>Nome</Label>
                            <Input
                                placeholder="Nome do cliente..."
                                {...register('name')}
                            />
                            {errors.name && <p className="text-[.8rem] text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label>Descrição</Label>
                            <Textarea
                                placeholder="Descrição opcional..."
                                {...register('description')}
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
                            {errors.isActive && <p className="text-[.8rem] text-red-500">{errors.isActive.message}</p>}
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
