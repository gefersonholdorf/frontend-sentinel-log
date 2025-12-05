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

export function CreateNewClientModal({ children }: { children: React.ReactNode }) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="p-8">
                    <DialogHeader>
                        <DialogTitle>Novo Cliente</DialogTitle>
                        <DialogDescription>
                            Adicionar novo cliente
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
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
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline"><X />Cancelar</Button>
                        </DialogClose>
                        <Button type="submit"><Plus />Criar</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
