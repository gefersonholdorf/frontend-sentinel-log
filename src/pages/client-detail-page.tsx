import { EditClientModal } from "@/components/client/edit-client-modal";
import { Card } from "@/components/dashboards/card";
import { ChartLogVolume } from "@/components/dashboards/chart-log-volume";
import { ChartLogsApi } from "@/components/dashboards/chart-logs-api";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useGetClientById } from "@/http/client/use-client-by-id";
import { ArrowLeft, Edit, Eye, FileText, Globe, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface Api {
    id: number
    name: string
    status: 'active' | 'inactive'
    logs: number
    token: string
    tokenExpiration: string
}

const columns: DataTableColumn<Api>[] = [
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
    { header: "Expira Em", accessor: 'tokenExpiration' },
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
];

const apis: Api[] = [
    {
        id: 1,
        name: "Auth Service",
        status: "active",
        logs: 1523,
        token: "TK-4f82a9c3ba",
        tokenExpiration: "03/12/2025",
    },
    {
        id: 2,
        name: "Orders API",
        status: "inactive",
        logs: 987,
        token: "TK-83bd17f94c",
        tokenExpiration: "03/12/2025",
    },
    {
        id: 3,
        name: "Payments Gateway",
        status: "active",
        logs: 2310,
        token: "TK-f182c493aa",
        tokenExpiration: "03/12/2025",
    }
];

export function ClientDetailPage() {
    const navigate = useNavigate()
    const [openEditModal, setOpenEditModal] = useState(false)

    const { data } = useGetClientById(3)

    function handleSetOpenEditModal() {
        setOpenEditModal(!openEditModal)
    }
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-4">
                    <ArrowLeft onClick={() => navigate('/clients')} className="size-5 cursor-pointer" />
                    <div className="bg-primary-background text-white p-3 rounded-lg">
                        <User />
                    </div>
                    <div>
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold">HealthTech SA</h2>
                            <div className="px-3 rounded-lg bg-emerald-200 border border-emerald-800">
                                <span className="text-sm font-medium text-emerald-800">Ativo</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">Sistema de gestão hospitalar</p>
                    </div>
                </div>
                <Button
                    onClick={() => handleSetOpenEditModal()}>
                    <Edit />
                    Editar
                </Button>
            </div>

            <div className="grid grid-cols-5 gap-4">
                <Card title="Criado em" value="03/12/2025" className="text-xl">
                    <User />
                </Card>
                <Card title="Total de APIS" value="5">
                    <Globe />
                </Card>
                <Card title="APIS Ativas" value="5">
                    <Globe className="text-emerald-500 size-8" />
                </Card>
                <Card title="APIS Inativas" value="5">
                    <Globe className="text-red-500 size-8" />
                </Card>
                <Card title="Total de Logs" value="670">
                    <FileText />
                </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <ChartLogVolume />
                <ChartLogsApi />
            </div>

            <div className="w-full">
                <div className="flex justify-between items-center gap-4">
                    <div className="flex flex-col justify-center items-start">
                        <h3 className="text-lg font-bold">APIs do Cliente</h3>
                        <span className="text-sm text-gray-500">Lista de APIs vinculadas</span>
                    </div>
                    <Button
                        onClick={() => navigate('/apis')}
                    >
                        <Eye />Ver todas
                    </Button>
                </div>
            </div>

            <DataTable columns={columns} data={apis} component="apis" haveAction={false} onOpenEditModal={() => console.log()} hasPagination={false} />

            <EditClientModal openModal={openEditModal} onSetOpenEditModal={handleSetOpenEditModal} />
        </div>
    )
}