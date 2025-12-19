import { useTheme } from "@/context/theme-context";
import { Edit, EllipsisVertical, Eye, IterationCw, RotateCcw, X } from "lucide-react";
import { useNavigate } from "react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Pagination } from "./pagination";
import type { Client } from "@/pages/clients-page";

interface WithId {
    id: string | number;
}

export interface DataTableColumn<T> {
    header: string;
    accessor: keyof T;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataTableProps<T extends WithId> {
    columns: DataTableColumn<T>[];
    data: T[];
    paginationParams: {
        page: number
        perPage: number
        totalPages: number
        onSetPage: (newPage: number) => void
        onSetPerPage: (newPerPage: number) => void
    }
    component: string
    haveAction: boolean
    onOpenEditModal: (client: Client) => void
    onOpenRenewTokenModal?: () => void
    hasPagination: boolean
}

export function DataTable<T extends WithId>({ columns, data, paginationParams, component, haveAction, onOpenEditModal, onOpenRenewTokenModal, hasPagination }: DataTableProps<T>) {
    const { theme } = useTheme()
    const navigate = useNavigate()

    return (
        <>
            <table className={`
                            w-full outline rounded-lg shadow-primary
                            ${theme === 'light' ? 'bg-gray-100/60 outline-gray-200' : 'bg-zinc-900 outline-zinc-700'}
                        `}>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={String(col.accessor)} className="p-2 text-left text-[.9rem] font-medium">
                                {col.header}
                            </th>
                        ))}
                        {haveAction && (
                            <th className="p-2 text-left text-[.9rem] font-medium">
                                Ações
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} className={`${theme === 'light' ? 'border-t border-gray-200 hover:bg-gray-200/30' : 'border-t border-zinc-700 hover:bg-zinc-800/30'}`}>
                            {columns.map((col) => {
                                const value = row[col.accessor];
                                return (
                                    <td key={String(col.accessor)} className={`p-2 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                                        {col.render
                                            ? col.render(value, row)
                                            : String(value)}
                                    </td>
                                );
                            })}
                            {haveAction && (
                                <td className={`p-2 text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                                    <div className="p-2 rounded-lg hover:text-primary-background">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="p-1 rounded hover:text-primary-background"
                                                >
                                                    <EllipsisVertical className="size-4" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start">
                                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem
                                                        onClick={() => navigate(`/${component}/${row.id}`)}>
                                                        <Eye />
                                                        Visualizar
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => onOpenEditModal(row as unknown as Client)}>
                                                        <Edit />
                                                        Editar
                                                    </DropdownMenuItem>
                                                    {component === 'apis' && (
                                                        <>
                                                            <DropdownMenuItem
                                                                onClick={() => onOpenRenewTokenModal && onOpenRenewTokenModal()}>
                                                                <RotateCcw />
                                                                Renovar Token
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => onOpenEditModal(row as unknown as Client)}>
                                                                <IterationCw className="text-red-500" />
                                                                Revogar Token
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                    <DropdownMenuItem>
                                                        <X className="text-red-500" />
                                                        Inativar
                                                    </DropdownMenuItem>
                                                </ DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
                {hasPagination && (
                    <tfoot>
                        <tr>
                            <td colSpan={columns.length + (haveAction ? 1 : 0)}>
                                <Pagination paginationParams={paginationParams} />
                            </td>
                        </tr>
                    </tfoot>
                )}
            </table >

        </>
    );
}
