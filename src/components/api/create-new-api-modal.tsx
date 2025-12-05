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
import { Copy, Key, Plus, X } from "lucide-react"
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
import { useRef } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export function CreateNewAPIModal({ children }: { children: React.ReactNode }) {
    const token = crypto.randomUUID()
    const short = token.length > 10 ? token.slice(0, 15) + "..." : token;

    const inputRef = useRef<HTMLInputElement>(null);

    const handleCopy = () => {
        if (inputRef.current) {
            navigator.clipboard.writeText(`${token}`).then(() => console.log('OK')).catch(() => console.log('Erro'))
        }
    }
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="p-8">
                    <DialogHeader>
                        <DialogTitle>Nova API</DialogTitle>
                        <DialogDescription>
                            Adicionar nova API
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
                        <div className="grid gap-3">
                            <Label>Token de Acesso</Label>
                            <div className="flex items-center gap-2">
                                <Key className="size-4" />
                                <Input ref={inputRef} disabled value={short.toString()} />
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            type="button"
                                            onClick={handleCopy}
                                        >
                                            <Copy />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Copiar token</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button variant="outline"><X />Cancelar</Button>
                        </DialogClose>
                        <Button className="bg-primary-background hover:bg-sky-600 text-white" type="submit"><Plus />Criar</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
