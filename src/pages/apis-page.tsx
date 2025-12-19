import { TitlePage } from "@/components/ui/title-page";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX, Globe, Plus } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { InputPrimary } from "@/components/ui/input-primary";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CreateNewAPIModal } from "@/components/api/create-new-api-modal";
import { useState } from "react";
import { EditAPIModal } from "@/components/api/edit-api-modal";
import { RenewTokenModal } from "@/components/api/renew-token-modal";

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

interface Api {
    id: number
    name: string
    client: string
    status: 'active' | 'inactive'
    logs: number
    token: string
    tokenExpiration: Date
    createdAt: Date
}

const columns: DataTableColumn<Api>[] = [
    { header: "ID", accessor: "id" },
    {
        header: "Nome",
        accessor: "name",
        render: (value) => (
            <span className="flex gap-2 items-center font-medium">
                <div className="flex p-2 rounded-lg bg-primary-background/10">
                    <Globe className="size-4 text-primary-background" />
                </div>
                {value.toString()}
            </span>
        )
    },
    {
        header: "Cliente",
        accessor: 'client',
    },
    {
        header: "Token",
        accessor: 'token',
        render: (value) => {
            const short = String(value).length > 10 ? String(value).slice(0, 8) + "..." : value;
            return (
                <span className="p-2 bg-primary-background/5 rounded-sm truncate">
                    {short.toString()}
                </span>
            )
        }
    },
    {
        header: "Expira Em",
        accessor: 'tokenExpiration',
        render: (value) => {
            const daysRemaining = dayjs(value).diff(dayjs(), 'day')

            return (
                <div>
                    {daysRemaining <= 3 && (
                        <span className="flex gap-2 items-center">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <CircleX className="text-red-500" size={15} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Token expirado</p>
                                </TooltipContent>
                            </Tooltip>
                            {dayjs(value).format('DD/MM/YYYY')}
                        </span>
                    )}
                    {(daysRemaining <= 15 && daysRemaining > 3) && (
                        <span className="flex gap-2 items-center">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <CircleX className="text-amber-500" size={15} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Token expira em breve</p>
                                </TooltipContent>
                            </Tooltip>
                            {dayjs(value).format('DD/MM/YYYY')}
                        </span>
                    )}
                    {daysRemaining > 15 && (
                        <span className="flex gap-2 items-center">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <CircleCheck className="text-emerald-500" size={15} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Token válido</p>
                                </TooltipContent>
                            </Tooltip>
                            {dayjs(value).format('DD/MM/YYYY')}
                        </span>
                    )}
                </div>
            )
        }
    },
    {
        header: "Status",
        accessor: 'status',
        render: (value) => (
            <span
                className={`
                            px-2 py-1 rounded-lg text-xs font-semibold outline
                            ${value === 'active' ? 'bg-emerald-200 text-emerald-600' : ''}
                        `}
            >
                {value === 'active' ? "Ativo" : "Inativo"}
            </span>
        )
    },
    { header: "Logs", accessor: 'logs' },
    {
        header: "Criado Em",
        accessor: 'createdAt',
        render: (value) => (
            <span>{dayjs(value).format('DD/MM/YYYY')}</span>
        )
    },
];

const apis: Api[] = [
    {
        id: 1,
        name: "Auth Service",
        client: "Empresa Alpha",
        status: "active",
        logs: 1523,
        token: "TK-4f82a9c3ba",
        tokenExpiration: new Date("2025-12-03"),
        createdAt: new Date("2025-12-03"),
    },
    {
        id: 2,
        name: "Orders API",
        client: "Tech Solutions",
        status: "inactive",
        logs: 987,
        token: "TK-83bd17f94c",
        tokenExpiration: new Date("2025-12-03"),
        createdAt: new Date("2025-11-26"),
    },
    {
        id: 3,
        name: "Payments Gateway",
        client: "Super Devs",
        status: "active",
        logs: 2310,
        token: "TK-f182c493aa",
        tokenExpiration: new Date("2025-12-03"),
        createdAt: new Date("2025-12-01"),
    },
    {
        id: 4,
        name: "Notifications",
        client: "Empresa XPTO",
        status: "active",
        logs: 411,
        token: "TK-91ac3bb4d2",
        tokenExpiration: new Date("2025-12-03"),
        createdAt: new Date("2025-12-22"),
    },
    {
        id: 5,
        name: "User Manager",
        client: "Mega Corp",
        status: "inactive",
        logs: 73,
        token: "TK-cc9e31b772",
        tokenExpiration: new Date("2025-12-03"),
        createdAt: new Date("2025-12-30"),
    },
    {
        id: 6,
        name: "Products Catalog",
        client: "Varejo Brasil",
        status: "active",
        logs: 1897,
        token: "TK-a3910ee93b",
        tokenExpiration: new Date("2025-12-03"),
        createdAt: new Date("2025-12-05"),
    },
    {
        id: 7,
        name: "Analytics Engine",
        client: "Empresa Alpha",
        status: "active",
        logs: 3421,
        token: "TK-9912aa7e51",
        tokenExpiration: new Date("2025-12-09"),
        createdAt: new Date("2025-11-28"),
    },
    {
        id: 8,
        name: "Shipping Controller",
        client: "LogExpress",
        status: "inactive",
        logs: 245,
        token: "TK-7af39d4aac",
        tokenExpiration: new Date("2025-12-15"),
        createdAt: new Date("2025-08-20"),
    },
    {
        id: 9,
        name: "Marketing API",
        client: "Super Devs",
        status: "active",
        logs: 1004,
        token: "TK-dfa991a0e5",
        tokenExpiration: new Date("2025-12-22"),
        createdAt: new Date("2025-11-17"),
    },
    {
        id: 10,
        name: "Billing System",
        client: "Mega Corp",
        status: "active",
        logs: 2756,
        token: "TK-4fe81cd294",
        tokenExpiration: new Date("2025-12-03"),
        createdAt: new Date("2025-09-09"),
    },
];

export function APIsPage() {
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openRenewTokenModal, setOpenRenewTokenModal] = useState(false)

    function handleSetOpenEditModal() {
        setOpenEditModal(!openEditModal)
    }

    function handleSetOpenRenewTokenModal() {
        setOpenRenewTokenModal(!openRenewTokenModal)
    }

    return (
        <div className="p-6 space-y-6">
            <TitlePage title="APIs" description="Gerencie suas APIs e tokens de acesso">
                <CreateNewAPIModal>
                    <Button className="bg-primary-background hover:bg-sky-600 text-white">
                        <Plus />
                        Adicionar API
                    </Button>
                </CreateNewAPIModal>
            </TitlePage>

            <InputPrimary placeholder="Buscar APIs..." />

            <DataTable paginationParams={{ page: 1 }} columns={columns} data={apis} hasPagination={true} component="apis" haveAction={true} onOpenEditModal={handleSetOpenEditModal} onOpenRenewTokenModal={handleSetOpenRenewTokenModal} />

            <EditAPIModal openModal={openEditModal} onSetOpenEditModal={handleSetOpenEditModal} />
            <RenewTokenModal openModal={openRenewTokenModal} onSetOpenRenewTokenModal={handleSetOpenRenewTokenModal} />
        </div>
    )
}