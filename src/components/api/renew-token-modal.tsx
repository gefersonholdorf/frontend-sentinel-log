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
import { Copy, Key, Plus, RefreshCcw, X } from "lucide-react"

import { useRef, useState } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface RenewTokenModalProps {
    openModal: boolean
    onSetOpenRenewTokenModal: () => void
}

export function RenewTokenModal({ openModal, onSetOpenRenewTokenModal }: RenewTokenModalProps) {
    const [token, setToken] = useState(crypto.randomUUID())

    const short = token.length > 10 ? token.slice(0, 15) + "..." : token;

    const inputRef = useRef<HTMLInputElement>(null);

    const generateNewToken = () => {
        setToken(crypto.randomUUID())
    }

    const handleCopy = () => {
        if (inputRef.current) {
            navigator.clipboard.writeText(`${token}`).then(() => console.log('OK')).catch(() => console.log('Erro'))
        }
    }
    return (
        <Dialog open={openModal} onOpenChange={onSetOpenRenewTokenModal}>
            <form>
                <DialogContent className="p-8">
                    <DialogHeader>
                        <DialogTitle>Renovar Token</DialogTitle>
                        <DialogDescription>
                            Renove o token da API com duração de 3 meses
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <div className="grid gap-3 mt-6">
                            <Label>Token de Acesso</Label>
                            <div className="flex items-center gap-2">
                                <Key className="size-4" />
                                <Input ref={inputRef} disabled value={short.toString()} />
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            type="button"
                                            onClick={generateNewToken}
                                        >
                                            <RefreshCcw />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Gerar novo token</p>
                                    </TooltipContent>
                                </Tooltip>
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
                        <Button className="bg-primary-background hover:bg-sky-600 text-white" type="submit"><Plus />Confirmar</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
