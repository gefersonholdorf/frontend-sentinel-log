import { EditClientModal } from "@/components/client/edit-client-modal";
import { Card } from "@/components/dashboards/card";
import { ChartLogVolume } from "@/components/dashboards/chart-log-volume";
import { ChartLogsApi } from "@/components/dashboards/chart-logs-api";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetClientById } from "@/http/client/use-client-by-id";
import { ArrowLeft, Edit, Eye, FileText, Globe, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"
import type { Client } from "./clients-page";
import { useFetchApi } from "@/http/api/use-fetch-apis";
import { type Api } from "./apis-page";
import { useMeContext } from "@/context/me-context";

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

const columns: DataTableColumn<Api>[] = [
    {
        header: "Nome",
        accessor: "name",
        render: (value) => (
            <span className="flex gap-2 items-center font-medium">
                <div className="flex p-2 rounded-lg bg-primary-background/10">
                    <Globe className="size-4 text-primary-background" />
                </div>
                {value ? value.toString() : '---'}
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
                    {short ? short.toString() : '---'}
                </span>
            )
        }
    },
    {
        header: "Status",
        accessor: 'isActive',
        render: (value) => (
            <span
                className={`
                            px-2 py-1 rounded-lg text-xs font-semibold outline
                            ${value === true ? 'bg-emerald-200 text-emerald-600' : ''}
                        `}
            >
                {value === true ? "Ativo" : "Inativo"}
            </span>
        )
    }
];

export function ClientDetailPage() {
    const navigate = useNavigate()
    const [openEditModal, setOpenEditModal] = useState(false)
    const { id } = useParams()

    const { data, isLoading } = useGetClientById(Number(id), true)
    const { data: apis, isLoading: isLoadingApi } = useFetchApi({ page: 1, perPage: 3, clientId: Number(id) })

    const [selectedClient, setSelectedClient] = useState<Client | null>(null)

    const { user } = useMeContext()

    function handleSetOpenEditModal() {
        setOpenEditModal(!openEditModal)
    }

    useEffect(() => {
        if (data) {
            setSelectedClient({
                ...data.client
            })
        }
    }, [data])

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-4">
                    <ArrowLeft onClick={() => navigate('/clients')} className="size-5 cursor-pointer" />
                    <div className="bg-primary-background text-white p-3 rounded-lg">
                        <User />
                    </div>
                    {isLoading && (
                        <Skeleton className="animate-pulse w-80 h-20 bg-gray-200 dark:bg-slate-700 rounded-lg" />
                    )}
                    {data && (
                        <div>
                            <div className="flex items-center gap-4">
                                <h2 className="text-2xl font-bold">{data.client.name}</h2>
                                <div className={`px-3 rounded-lg ${data.client.isActive === true ? 'bg-emerald-200 text-emerald-600 border border-emerald-500' : 'bg-red-200 text-red-600 border border-red-500'}`}>
                                    <span className={`text-sm font-medium `}>{data.client.isActive === true ? 'Ativo' : 'Inativo'}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">{data.client.description}</p>
                        </div>
                    )}
                </div>
                {user && (
                    <Button
                        onClick={() => handleSetOpenEditModal()}
                        disabled={user.role === 'member'}
                    >
                        <Edit />
                        Editar
                    </Button>
                )}
            </div>

            {isLoading && (
                <div className="grid grid-cols-5 gap-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="animate-pulse h-24 bg-gray-200 dark:bg-slate-700 rounded-lg" />
                    ))}
                </div>
            )}

            {data && (
                <div className="grid grid-cols-5 gap-4">
                    <Card title="Criado em" value={dayjs(data.client.createdAt).format("DD/MM/YYYY")} className="text-xl">
                        <User />
                    </Card>
                    <Card title="Total de APIS" value={data.totalApis.toString()}>
                        <Globe />
                    </Card>
                    <Card title="APIS Ativas" value={data.totalApisActive.toString()}>
                        <Globe className="text-emerald-500 size-8" />
                    </Card>
                    <Card title="APIS Inativas" value={data.totalApisInactive.toString()}>
                        <Globe className="text-red-500 size-8" />
                    </Card>
                    <Card title="Total de Logs" value={data.totalLogs.toString()}>
                        <FileText />
                    </Card>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div className="h-full">
                    {isLoading ? (
                        <Skeleton className="w-full h-[350px] bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                    ) : (
                        data && (
                            <ChartLogVolume volumeLogsTodayData={data.volumeLogsTodayData} />
                        )
                    )}
                </div>

                <div className="h-full">
                    {isLoading ? (
                        <Skeleton className="w-full h-[350px] bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                    ) : (
                        data && (
                            <ChartLogsApi logsByApi={data.logsByApi} />
                        )
                    )}
                </div>
            </div>

            <div className="w-full">
                <div className="flex justify-between items-center gap-4">
                    <div className="flex flex-col justify-center items-start">
                        <h3 className="text-lg font-bold">APIs do Cliente</h3>
                        <span className="text-sm text-gray-500">Lista de APIs vinculadas</span>
                    </div>
                    {data && (
                        <Button
                            onClick={() => navigate(`/apis?page=1&&perPage=10&&clientId=${data.client.id}`)}
                        >
                            <Eye />Ver todas
                        </Button>
                    )}
                </div>
            </div>

            {isLoadingApi && <Skeleton className="w-full h-50 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />}

            {apis && (
                <DataTable
                    columns={columns}
                    data={apis.data}
                    paginationParams={{
                        page: 1,
                        perPage: 3,
                        onSetPage: () => { },
                        onSetPerPage: () => { },
                        totalPages: 1
                    }}
                    hasPagination={false}
                    component="apis"
                    haveAction={false}
                    onOpenEditModal={() => { }}
                />
            )}

            <EditClientModal toGoBack={true} openModal={openEditModal} onSetOpenEditModal={handleSetOpenEditModal} client={selectedClient} />
        </div>
    )
}