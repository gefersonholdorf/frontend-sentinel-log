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

interface EditClientModalProps {
    openModal: boolean
    onSetOpenEditModal: () => void
}

export function EditClientModal({ openModal, onSetOpenEditModal }: EditClientModalProps) {
    return (
        <Dialog open={openModal} onOpenChange={onSetOpenEditModal}>
            <form>
                <DialogContent className="p-8">
                    <DialogHeader>
                        <DialogTitle>Editar Cliente</DialogTitle>
                        <DialogDescription>
                            Editar dados do cliente
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 space-y-3">
                        <div className="grid gap-3">
                            <Label>Nome</Label>
                            <Input placeholder="Nome do cliente..." />
                        </div>
                        <div className="grid gap-3">
                            <Label>Descrição</Label>
                            <Textarea placeholder="Descrição opcional..." />
                        </div>
                        <div className="grid gap-3">
                            <Label>Status</Label>
                            <Select defaultValue={'active'}>
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
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button variant="outline"><X />Cancelar</Button>
                        </DialogClose>
                        <Button className="bg-primary-background hover:bg-sky-600 text-white" type="submit"><Plus />Salvar</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
