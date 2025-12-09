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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface EditUserModalProps {
    openModal: boolean
    onSetOpenEditModal: () => void
}

export function EditUserModal({ openModal, onSetOpenEditModal }: EditUserModalProps) {
    return (
        <Dialog open={openModal} onOpenChange={onSetOpenEditModal}>
            <form>
                <DialogContent className="p-8">
                    <DialogHeader>
                        <DialogTitle>Editar Usuário</DialogTitle>
                        <DialogDescription>
                            Editar dados do usuário
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 space-y-3">
                        <div className="grid gap-3">
                            <Label>Nome</Label>
                            <Input placeholder="Nome do usuário..." />
                        </div>
                        <div className="flex gap-4 items-center justify-center">
                            <div className="w-full grid gap-3">
                                <Label>Email</Label>
                                <Input placeholder="Email do usuário..." />
                            </div>
                            <div className="w-full grid gap-3">
                                <Label>Senha</Label>
                                <Input type="password" placeholder="Senha do usuário..." />
                            </div>
                        </div>
                        <div className="flex gap-4 items-center justify-center">
                            <div className="w-full grid gap-3">
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
                            <div className="w-full grid gap-3">
                                <Label>Cliente</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione um cliente..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Clientes</SelectLabel>
                                            <SelectItem value="0">Todos</SelectItem>
                                            <SelectItem value="1">HealthTech SA</SelectItem>
                                            <SelectItem value="2">LogiTrans</SelectItem>
                                            <SelectItem value="3">EduPlatform</SelectItem>
                                            <SelectItem value="4">TechCorp Brasil</SelectItem>
                                            <SelectItem value="5">Fintech Solutions</SelectItem>
                                            <SelectItem value="6">E-commerce Plus</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="w-full grid gap-3">
                            <div className="grid gap-3">
                                <Label>Perfil</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione um cliente..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Perfil</SelectLabel>
                                            <SelectItem value="super-admin">SUPER ADMIN</SelectItem>
                                            <SelectItem value="admin">ADMIN</SelectItem>
                                            <SelectItem value="member">MEMBRO</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
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
