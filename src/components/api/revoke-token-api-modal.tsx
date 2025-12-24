import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRevokeTokenApi } from "@/http/api/use-revoke-token-api"
import type { Api } from "@/pages/apis-page"
import { Button } from "../ui/button"
import { IterationCw, X } from "lucide-react"

interface RevokeTokenApiModalProps {
    openModal: boolean
    onSetOpenRevokeTokenModal: () => void
    api: Api | null
}

export function RevokeTokenApiModal({ api, openModal, onSetOpenRevokeTokenModal }: RevokeTokenApiModalProps) {
    const { mutateAsync: revokeToken, isPending } = useRevokeTokenApi()

    async function handleRevokeToken() {
        if (!api) return
        await revokeToken({
            id: api.id
        })
        onSetOpenRevokeTokenModal()
    }

    return (
        <AlertDialog open={openModal} onOpenChange={onSetOpenRevokeTokenModal}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deseja revokar o token da API?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação revogará imediatamente o token da API.
                        Todas as integrações que utilizam este token deixarão de funcionar até que um novo token seja gerado.
                        Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}><X />Cancelar</AlertDialogCancel>
                    <Button type="submit" variant="destructive" disabled={isPending} onClick={() => handleRevokeToken()}><IterationCw />Revogar</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}