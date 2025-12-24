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
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"

import type { Api } from "@/pages/apis-page"
import { DatePicker } from "../ui/date-picker"
import { useRenewTokenApi } from "@/http/api/use-renew-token-api"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

interface RenewTokenModalProps {
    openModal: boolean
    onSetOpenRenewTokenModal: () => void
    api: Api | null
}

const renewTokenApiSchema = z.object({
    expiresIn: z.date()
})

type RenewTokenApiSchema = z.infer<typeof renewTokenApiSchema>

export function RenewTokenModal({ openModal, onSetOpenRenewTokenModal, api }: RenewTokenModalProps) {
    const { handleSubmit, control, formState: { errors } } = useForm<RenewTokenApiSchema>({
        resolver: zodResolver(renewTokenApiSchema),
        defaultValues: {
            expiresIn: new Date(),
        }
    })

    const { mutateAsync: renewToken, isPending } = useRenewTokenApi()

    async function handleRenewTokenSubmit(data: RenewTokenApiSchema) {
        if (!api) return

        await renewToken({
            ...data,
            id: api.id
        })

        onSetOpenRenewTokenModal()
    }

    return (
        <Dialog open={openModal} onOpenChange={onSetOpenRenewTokenModal}>
            <DialogContent className="p-8">
                <form onSubmit={handleSubmit(handleRenewTokenSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Renovar Token</DialogTitle>
                        <DialogDescription>
                            Renove o token da API
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <div className="grid gap-3 mt-6">
                            <Label>Informe a data de expiração do token</Label>
                            <Controller
                                name="expiresIn"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker value={field.value}
                                        onValueChange={field.onChange} title={"Informe a data"} />
                                )}
                            />
                            {errors.expiresIn && <p className="text-[.8rem] text-red-500">{errors.expiresIn.message}</p>}
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button disabled={isPending} variant="outline"><X />Cancelar</Button>
                        </DialogClose>
                        <Button disabled={isPending} className="bg-primary-background hover:bg-sky-600 text-white" type="submit"><Plus />Confirmar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
