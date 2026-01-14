import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { InputPrimary } from "@/components/ui/input-primary";
import { TitlePage } from "@/components/ui/title-page";
import { CreateNewUserModal } from "@/components/user/create-new-user";
import { EditUserModal } from "@/components/user/edit-user-modal";
import { useTheme } from "@/context/theme-context";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { Crown, Edit, EllipsisVertical, Mail, Plus, User2 } from "lucide-react";
import { useState } from "react";

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

export function UsersPage() {
    const [openEditModal, setOpenEditModal] = useState(false)
    const { theme } = useTheme()

    function handleSetOpenEditModal() {
        setOpenEditModal(!openEditModal)
    }

    return (
        <div className="p-6 space-y-6">
            <TitlePage title="Usuários" description="Gerencie os usuários">
                <CreateNewUserModal>
                    <Button className="bg-primary-background hover:bg-sky-600 text-white">
                        <Plus />
                        Convidar Usuário
                    </Button>
                </CreateNewUserModal>
            </TitlePage>

            <InputPrimary placeholder="Buscar usuários..." />

            <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                    <Card key={index} className={`border border-gray-500 p-4 rounded-lg rounded-b-none
                        ${theme === 'light' ? 'bg-zinc-100/30 border-gray-200 text-gray-600' : 'bg-zinc-900 border-zinc-700 text-gray-400'}
                        border-l-3 border-l-orange-500 w-full shadow transition-transform duration-300 hover:scale-[1.01]
                    `}
                    >
                        <CardContent className="space-y-3 group">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-sm overflow-hidden shrink-0">
                                        <img
                                            src="https://avatars.githubusercontent.com/u/68699314?v=4"
                                            className="w-full h-full object-cover"
                                            alt="User avatar"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[.9rem] font-semibold text-foreground">Geferson Holdorf</p>
                                        <div className="flex items-center gap-1">
                                            <Mail className="size-3" />
                                            <p className="text-[.8rem]">geferson@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <EllipsisVertical
                                            className="
                                                size-4
                                                cursor-pointer
                                                opacity-0
                                                pointer-events-none
                                                group-hover:opacity-100
                                                group-hover:pointer-events-auto
                                                transition-opacity
                                            "
                                        />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <Edit />
                                                Editar
                                            </DropdownMenuItem>
                                        </ DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="px-4 border rounded-sm inline-flex bg-background items-center justify-center gap-2">
                                    <Crown className="size-3 text-orange-500" />
                                    <span className={`text-[.7rem] text-orange-500`}>SUPER-ADMIN</span>
                                </div>
                                <div className="px-4 border rounded-sm inline-flex bg-background items-center justify-center gap-2">
                                    <User2 className="size-3" />
                                    <span className={`text-[.7rem]`}>SP Tecnologia</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <EditUserModal openModal={openEditModal} onSetOpenEditModal={handleSetOpenEditModal} />
        </div>
    )
}