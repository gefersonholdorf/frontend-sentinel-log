import { DataTable, type DataTableColumn } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { InputPrimary } from "@/components/ui/input-primary";
import { TitlePage } from "@/components/ui/title-page";
import { Globe, Plus, User } from "lucide-react";

interface Client {
    id: number
    name: string
    apis: number
    status: 'active' | 'inactive'
    createdAt: string
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
                {value}
            </span>
        )
    },
    {
        header: "APIs",
        accessor: 'apis',
        render: (value) => (
            <span className="flex gap-2 items-center">
                <Globe size={15} />
                {value}
            </span>
        )
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
    { header: "Criado Em", accessor: 'createdAt' },
];

const clients: Client[] = [
    { id: 1, name: "AlphaTech Solutions", apis: 5, createdAt: "02/12/2025", status: "active" },
    { id: 2, name: "BlueWave Corp", apis: 1, createdAt: "30/11/2025", status: "inactive" },
    { id: 3, name: "PrimeDigital Labs", apis: 3, createdAt: "28/11/2025", status: "active" },
    { id: 4, name: "NovaEdge Systems", apis: 8, createdAt: "15/11/2025", status: "active" },
    { id: 5, name: "SkyLink Innovations", apis: 2, createdAt: "22/10/2025", status: "inactive" },
    { id: 6, name: "IronCloud Tech", apis: 6, createdAt: "10/11/2025", status: "active" },
    { id: 7, name: "Orion DataWorks", apis: 4, createdAt: "01/12/2025", status: "active" },
    { id: 8, name: "SilverByte Software", apis: 7, createdAt: "05/12/2025", status: "active" },
    { id: 9, name: "CrystalCode Systems", apis: 2, createdAt: "26/11/2025", status: "inactive" },
    { id: 10, name: "QuantumFlow Digital", apis: 9, createdAt: "03/12/2025", status: "active" }
]

export function ClientsPage() {
    return (
        <div className="p-6 space-y-6">
            <TitlePage title="Clientes" description="Gerencie seus clientes e suas APIs">
                <Button className="bg-primary-background hover:bg-sky-600 text-white">
                    <Plus />
                    Adicionar Cliente
                </Button>
            </TitlePage>

            <InputPrimary placeholder="Buscar clientes..." />

            <DataTable columns={columns} data={clients} component="clients" haveAction={true} />
        </div>
    )
}