import { DataTable, type DataTableColumn } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { InputPrimary } from "@/components/ui/input-primary";
import { TitlePage } from "@/components/ui/title-page";
import { CreateNewUserModal } from "@/components/user/create-new-user";
import { EditUserModal } from "@/components/user/edit-user-modal";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { Plus, Users } from "lucide-react";
import { useState } from "react";

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

interface Client {
    id: number
    name: string
    email: string
    role: 'super_admin' | 'admin' | 'member'
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
                    <Users className="size-4 text-primary-background" />
                </div>
                {value}
            </span>
        )
    },
    { header: "Email", accessor: "email" },
    { header: "Perfil", accessor: "role" },
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
    {
        header: "Criado Em", accessor: 'createdAt', render: (value) => (
            <span>{dayjs(value).format('DD/MM/YYYY')}</span>
        )
    },
];

const users: Client[] = [
    {
        id: 1,
        name: "Marcos Silveira",
        email: "marcos.silveira@example.com",
        role: "super_admin",
        status: "active",
        createdAt: "2024-01-10T14:22:00Z"
    },
    {
        id: 2,
        name: "Ana Bezerra",
        email: "ana.bezerra@example.com",
        role: "admin",
        status: "active",
        createdAt: "2024-02-03T09:41:00Z"
    },
    {
        id: 3,
        name: "Juliana Ramos",
        email: "juliana.ramos@example.com",
        role: "member",
        status: "inactive",
        createdAt: "2024-02-17T16:05:00Z"
    },
    {
        id: 4,
        name: "Carlos Monteiro",
        email: "carlos.monteiro@example.com",
        role: "admin",
        status: "active",
        createdAt: "2024-03-01T11:12:00Z"
    },
    {
        id: 5,
        name: "Patrícia Bernardes",
        email: "patricia.bernardes@example.com",
        role: "member",
        status: "active",
        createdAt: "2024-03-21T18:33:00Z"
    },
    {
        id: 6,
        name: "Eduardo Lopes",
        email: "eduardo.lopes@example.com",
        role: "super_admin",
        status: "active",
        createdAt: "2024-04-04T07:50:00Z"
    },
    {
        id: 7,
        name: "Fernanda Moura",
        email: "fernanda.moura@example.com",
        role: "member",
        status: "inactive",
        createdAt: "2024-04-18T13:29:00Z"
    },
    {
        id: 8,
        name: "Ricardo Sampaio",
        email: "ricardo.sampaio@example.com",
        role: "admin",
        status: "active",
        createdAt: "2024-05-02T10:14:00Z"
    },
    {
        id: 9,
        name: "Tatiane Duarte",
        email: "tatiane.duarte@example.com",
        role: "member",
        status: "inactive",
        createdAt: "2024-05-19T20:45:00Z"
    },
    {
        id: 10,
        name: "Leonardo Peixoto",
        email: "leonardo.peixoto@example.com",
        role: "admin",
        status: "active",
        createdAt: "2024-06-01T15:58:00Z"
    }
]

export function UsersPage() {
    const [openEditModal, setOpenEditModal] = useState(false)

    function handleSetOpenEditModal() {
        setOpenEditModal(!openEditModal)
    }

    return (
        <div className="p-6 space-y-6">
            <TitlePage title="Usuários" description="Gerencie os usuários">
                <CreateNewUserModal>
                    <Button className="bg-primary-background hover:bg-sky-600 text-white">
                        <Plus />
                        Adicionar Usuário
                    </Button>
                </CreateNewUserModal>
            </TitlePage>

            <InputPrimary placeholder="Buscar usuários..." />

            <DataTable columns={columns} data={users} hasPagination={true} component="users" haveAction={true} onOpenEditModal={handleSetOpenEditModal} />

            <EditUserModal openModal={openEditModal} onSetOpenEditModal={handleSetOpenEditModal} />
        </div>
    )
}