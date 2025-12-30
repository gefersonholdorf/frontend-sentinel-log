import { TitlePage } from "@/components/ui/title-page";
import { Button } from "@/components/ui/button";
import { CircleAlert, CircleCheck, CircleX, Globe, Plus } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { InputPrimary } from "@/components/ui/input-primary";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CreateNewAPIModal } from "@/components/api/create-new-api-modal";
import { useEffect, useState } from "react";
import { EditAPIModal } from "@/components/api/edit-api-modal";
import { RenewTokenModal } from "@/components/api/renew-token-modal";
import { useFetchApi } from "@/http/api/use-fetch-apis";
import { useTheme } from "@/context/theme-context";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@/lib/use-debounce";
import { RevokeTokenApiModal } from "@/components/api/revoke-token-api-modal";
import { useMeContext } from "@/context/me-context";

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

export interface Api {
    id: number
    name: string
    description: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    clientId: number
    clientName: string
    token: string | null
    expiresIn: Date
    urlCallbackStatus: string
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
                {value ? value.toString() : '---'}
            </span>
        )
    },
    {
        header: "Cliente",
        accessor: 'clientName',
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
        header: "Expira Em",
        accessor: 'expiresIn',
        render: (value) => {
            const daysRemaining = dayjs(value ? value.toString() : '---').diff(dayjs(), 'day')

            return (
                <div>
                    {daysRemaining <= 1 && (
                        <span className="flex gap-2 items-center">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <CircleX className="text-red-500" size={15} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Token expirado</p>
                                </TooltipContent>
                            </Tooltip>
                            {dayjs(value ? value.toString() : '---').format('DD/MM/YYYY')}
                        </span>
                    )}
                    {(daysRemaining <= 15 && daysRemaining > 1) && (
                        <span className="flex gap-2 items-center">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <CircleAlert className="text-amber-500" size={15} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Token expira em breve</p>
                                </TooltipContent>
                            </Tooltip>
                            {dayjs(value ? value.toString() : '---').format('DD/MM/YYYY')}
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
                            {dayjs(value ? value.toString() : '---').format('DD/MM/YYYY')}
                        </span>
                    )}
                </div>
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
    },
    {
        header: "Criado Em",
        accessor: 'createdAt',
        render: (value) => (
            <span>{dayjs(value ? value.toString() : '---').format('DD/MM/YYYY')}</span>
        )
    },
];

export function ApiSkeleton() {
    const { theme } = useTheme()

    return (
        <table className={`
                            w-full outline rounded-lg shadow-primary
                            ${theme === 'light' ? 'bg-gray-100/60 outline-gray-200' : 'bg-zinc-900 outline-zinc-700'}
                        `}>

            <tbody>
                {Array.from({ length: 12 }).map((_, index) => (
                    <tr key={index}>
                        <td colSpan={columns.length} className="p-2">
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export function APIsPage() {
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openRenewTokenModal, setOpenRenewTokenModal] = useState(false)
    const [openRevokeTokenModal, setOpenRevokeTokenModal] = useState(false)

    const { user } = useMeContext()

    const [selectedApi, setSelectedApi] = useState<Api | null>(null)

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page") ?? 1);
    const perPage = Number(searchParams.get("perPage") ?? 10);
    const filter = searchParams.get("filter") ?? undefined;

    const [filterInput, setFilterInput] = useState(
        searchParams.get("filter") ?? ""
    );

    const debouncedFilter = useDebounce(filterInput, 700);

    useEffect(() => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);

            const currentFilter = params.get("filter") ?? "";

            if (currentFilter === debouncedFilter) {
                return params;
            }

            if (debouncedFilter) {
                params.set("filter", debouncedFilter);
            } else {
                params.delete("filter");
            }

            params.set("page", "1");

            return params;
        });
    }, [debouncedFilter, setSearchParams]);

    const { data: apis, isLoading } = useFetchApi({ page, perPage, filter })

    function handleSetPage(newPage: number) {
        setSearchParams({
            page: String(newPage),
            perPage: String(perPage),
            ...(filter ? { filter } : {}),
        });
    }

    function handleSetPerPage(newPerPage: number) {
        setSearchParams({
            page: String(1),
            perPage: String(newPerPage),
            ...(filter ? { filter } : {}),
        });
    }

    function handleOpenEditModal(api: Api) {
        setSelectedApi(api)
        setOpenEditModal(true)
    }

    function handleOpenRenewModal(api: Api) {
        setSelectedApi(api)
        setOpenRenewTokenModal(true)
    }

    function handleCloseEditModal() {
        setOpenEditModal(false)
        setSelectedApi(null)
    }

    function handleCloseRenewtModal() {
        setOpenRenewTokenModal(false)
        setSelectedApi(null)
    }

    function handleSetOpenCreateModal() {
        setOpenCreateModal((prev) => !prev)
    }

    function handleOpenRevokeModal(api: Api) {
        setSelectedApi(api)
        setOpenRevokeTokenModal(true)
    }

    function handleCloseRevokeModal() {
        setSelectedApi(null)
        setOpenRevokeTokenModal(false)
    }

    return (
        <div className="p-6 space-y-6">
            <TitlePage title="APIs" description="Gerencie suas APIs e tokens de acesso">
                <CreateNewAPIModal
                    openModal={openCreateModal}
                    onSetOpenCreateModal={handleSetOpenCreateModal}
                >
                    {user && (
                        <Button disabled={user.role == 'member'} className="bg-primary-background hover:bg-sky-600 text-white">
                            <Plus />
                            Adicionar API
                        </Button>
                    )}
                </CreateNewAPIModal>
            </TitlePage>

            <InputPrimary
                placeholder="Buscar APIs..."
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
            />

            {isLoading && <ApiSkeleton />}

            {apis && (
                <DataTable
                    columns={columns}
                    data={apis.data}
                    paginationParams={{
                        page,
                        perPage,
                        onSetPage: handleSetPage,
                        onSetPerPage: handleSetPerPage,
                        totalPages: apis.totalPages
                    }}
                    hasPagination
                    component="apis"
                    haveAction
                    onOpenEditModal={handleOpenEditModal}
                    onOpenRenewTokenModal={handleOpenRenewModal}
                    onOpenRevokeTokenModal={handleOpenRevokeModal}
                />
            )}

            <EditAPIModal
                api={selectedApi} openModal={openEditModal} onSetOpenEditModal={handleCloseEditModal}
            />
            <RenewTokenModal
                api={selectedApi} openModal={openRenewTokenModal} onSetOpenRenewTokenModal={handleCloseRenewtModal}
            />

            <RevokeTokenApiModal
                api={selectedApi} openModal={openRevokeTokenModal} onSetOpenRevokeTokenModal={handleCloseRevokeModal}
            />
        </div>
    )
}