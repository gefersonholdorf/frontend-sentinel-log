import { TitlePage } from "@/components/ui/title-page";
import { Button } from "@/components/ui/button";
import { Globe, Plus } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/data-table";

interface Api {
    id: number
    name: string
    client: string
    status: 'active' | 'inactive'
    logs: number
    token: string
    createdAt: string
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
                {value}
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
                    {short}
                </span>
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
    { header: "Criado Em", accessor: 'createdAt' },
];

const apis: Api[] = [
    {
        id: 1,
        name: "Auth Service",
        client: "Empresa Alpha",
        status: "active",
        logs: 1523,
        token: "TK-4f82a9c3ba",
        createdAt: "03/12/2025",
    },
    {
        id: 2,
        name: "Orders API",
        client: "Tech Solutions",
        status: "inactive",
        logs: 987,
        token: "TK-83bd17f94c",
        createdAt: "26/11/2025",
    },
    {
        id: 3,
        name: "Payments Gateway",
        client: "Super Devs",
        status: "active",
        logs: 2310,
        token: "TK-f182c493aa",
        createdAt: "01/12/2025",
    },
    {
        id: 4,
        name: "Notifications",
        client: "Empresa XPTO",
        status: "active",
        logs: 411,
        token: "TK-91ac3bb4d2",
        createdAt: "22/10/2025",
    },
    {
        id: 5,
        name: "User Manager",
        client: "Mega Corp",
        status: "inactive",
        logs: 73,
        token: "TK-cc9e31b772",
        createdAt: "15/09/2025",
    },
    {
        id: 6,
        name: "Products Catalog",
        client: "Varejo Brasil",
        status: "active",
        logs: 1897,
        token: "TK-a3910ee93b",
        createdAt: "05/12/2025",
    },
    {
        id: 7,
        name: "Analytics Engine",
        client: "Empresa Alpha",
        status: "active",
        logs: 3421,
        token: "TK-9912aa7e51",
        createdAt: "28/11/2025",
    },
    {
        id: 8,
        name: "Shipping Controller",
        client: "LogExpress",
        status: "inactive",
        logs: 245,
        token: "TK-7af39d4aac",
        createdAt: "20/08/2025",
    },
    {
        id: 9,
        name: "Marketing API",
        client: "Super Devs",
        status: "active",
        logs: 1004,
        token: "TK-dfa991a0e5",
        createdAt: "17/11/2025",
    },
    {
        id: 10,
        name: "Billing System",
        client: "Mega Corp",
        status: "active",
        logs: 2756,
        token: "TK-4fe81cd294",
        createdAt: "09/09/2025",
    },
];

export function APIsPage() {
    return (
        <div className="p-6 space-y-6">
            <TitlePage title="APIs" description="Gerencie suas APIs e tokens de acesso">
                <Button className="bg-primary-background hover:bg-sky-600 text-white">
                    <Plus />
                    Adicionar API
                </Button>
            </TitlePage>

            <DataTable columns={columns} data={apis} />
        </div>
    )
}