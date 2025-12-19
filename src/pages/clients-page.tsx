import { CreateNewClientModal } from "@/components/client/create-new-client-modal";
import { EditClientModal } from "@/components/client/edit-client-modal";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { InputPrimary } from "@/components/ui/input-primary";
import { Skeleton } from "@/components/ui/skeleton";
import { TitlePage } from "@/components/ui/title-page";
import { useTheme } from "@/context/theme-context";
import { useFetchClient } from "@/http/client/use-fetch-clients";
import { useDebounce } from "@/lib/use-debounce";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { Globe, Plus, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

export interface Client {
    id: number
    name: string,
    description: string,
    isActive: boolean,
    apis: number,
    createdAt: Date,
    updatedAt: Date
}

const columns: DataTableColumn<Client>[] = [
    { header: "ID", accessor: "id" },
    {
        header: "Nome",
        accessor: "name",
        render: (value) => (
            <span className="flex gap-2 items-center font-medium">
                <div className="flex p-2 rounded-lg bg-primary-background/10">
                    <User className="size-4 text-primary-background" />
                </div>
                {value.toString()}
            </span>
        )
    },
    {
        header: "APIs",
        accessor: 'apis',
        render: (value) => (
            <span className="flex gap-2 items-center">
                <Globe size={15} />
                {value.toString()}
            </span>
        )
    },
    {
        header: "isActive",
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
            <span>{dayjs(value.toString()).format('DD/MM/YYYY')}</span>
        )
    },
];

export function ClientSkeleton() {
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

export function ClientsPage() {
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openCreateModal, setOpenCreateModal] = useState(false)

    const [selectedClient, setSelectedClient] = useState<Client | null>(null)

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

    const { data: clients, isLoading } = useFetchClient({ page, perPage, filter })

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

    function handleOpenEditModal(client: Client) {
        setSelectedClient(client)
        setOpenEditModal(true)
    }

    function handleCloseEditModal() {
        setOpenEditModal(false)
        setSelectedClient(null)
    }

    function handleSetOpenCreateModal() {
        setOpenCreateModal((prev) => !prev)
    }

    return (
        <div className="p-6 space-y-6">
            <TitlePage title="Clientes" description="Gerencie seus clientes e suas APIs">
                <CreateNewClientModal
                    openModal={openCreateModal}
                    onSetOpenCreateModal={handleSetOpenCreateModal}
                >
                    <Button className="bg-primary-background hover:bg-sky-600 text-white">
                        <Plus />
                        Adicionar Cliente
                    </Button>
                </CreateNewClientModal>
            </TitlePage>

            <InputPrimary
                placeholder="Buscar clientes..."
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)} />

            {isLoading && <ClientSkeleton />}

            {clients && (
                <DataTable
                    columns={columns}
                    data={clients.data}
                    paginationParams={{
                        page,
                        perPage,
                        onSetPage: handleSetPage,
                        onSetPerPage: handleSetPerPage,
                        totalPages: clients.totalPages
                    }}
                    hasPagination
                    component="clients"
                    haveAction
                    onOpenEditModal={handleOpenEditModal}
                />
            )}

            <EditClientModal
                client={selectedClient} openModal={openEditModal} onSetOpenEditModal={handleCloseEditModal}
            />
        </div>
    )
}