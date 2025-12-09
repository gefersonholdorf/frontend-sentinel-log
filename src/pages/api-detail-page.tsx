import { Card } from "@/components/dashboards/card";
import { Card as CardComponent } from "@/components/ui/card"
import { ChartLogVolume } from "@/components/dashboards/chart-log-volume";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-context";
import { ArrowLeft, Book, Calendar, CircleCheck, CircleX, Clock, Copy, Edit, Eye, FileText, Globe, IterationCcw, Key, Link, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { EditAPIModal } from "@/components/api/edit-api-modal";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { RenewTokenModal } from "@/components/api/renew-token-modal";

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

interface Log {
    id: number
    message: string
    createdAt: string
}

const columns: DataTableColumn<Log>[] = [
    {
        header: "Mensagem",
        accessor: "message"
    },
    {
        header: "Data/Hora",
        accessor: 'createdAt',
        render: (value) => (
            <span>{dayjs(value).format('DD/MM/YYYY HH:MM:ss')}</span>
        )
    }
];

const logs: Log[] = [
    {
        id: 1,
        message: "User login successful",
        createdAt: "2025-12-04T16:45:00Z"
    },
    {
        id: 2,
        message: "Payment processed: $250",
        createdAt: "2025-12-04T16:50:12Z"
    },
    {
        id: 3,
        message: "API request to /orders returned 200",
        createdAt: "2025-12-04T16:52:35Z"
    },
    {
        id: 4,
        message: "New user registered: john.doe@example.com",
        createdAt: "2025-12-04T16:55:47Z"
    },
    {
        id: 5,
        message: "Database backup completed successfully",
        createdAt: "2025-12-04T17:00:05Z"
    }
]

export function ApiDetailPage() {
    const navigate = useNavigate()
    const { theme } = useTheme()
    const inputRef = useRef<HTMLInputElement>(null);

    const daysRemaining = dayjs(new Date()).diff(dayjs(), 'day')

    const short = String('sk_live_fnt_8x7kJm9nPq2rT5vW').length > 10 ? String('sk_live_fnt_8x7kJm9nPq2rT5vW').slice(0, 15) + "..." : 'sk_live_fnt_8x7kJm9nPq2rT5vW';

    const handleCopy = () => {
        if (inputRef.current) {
            navigator.clipboard.writeText('sk_live_fnt_8x7kJm9nPq2rT5vW')
        }
    }

    const [openEditModal, setOpenEditModal] = useState(false)
    const [openRenewModal, setOpenRenewModal] = useState(false)

    function handleSetOpenEditModal() {
        setOpenEditModal(!openEditModal)
    }

    function handleSetOpenRenewModal() {
        setOpenRenewModal(!openRenewModal)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-4">
                    <ArrowLeft onClick={() => navigate('/apis')} className="size-5 cursor-pointer" />
                    <div className="bg-primary-background text-white p-3 rounded-lg">
                        <Globe />
                    </div>
                    <div>
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold">Orders API</h2>
                            <div className="px-3 rounded-lg bg-emerald-200 border border-emerald-800">
                                <span className="text-sm font-medium text-emerald-800">Ativo</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">Cliente: E-commerce Plus</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="link"
                        onClick={() => navigate('#')}
                        className="px-6 py-2transition"
                    >
                        <Book />Documentação
                    </Button>
                    <Button
                        onClick={handleSetOpenEditModal}>
                        <Edit />
                        Editar
                    </Button>
                    <Button
                        className="bg-primary-background hover:bg-sky-600 text-white"
                        onClick={handleSetOpenRenewModal}>
                        <RotateCcw />
                        Renovar Token
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleSetOpenEditModal}
                    >
                        <IterationCcw />
                        Revogar Token
                    </Button>
                </div>
            </div>

            <CardComponent
                className={`
                    flex items-center justify-center gap-3 p-4 border rounded-lg shadow-primary transition-transform duration-300 hover:scale-[1.01]
                    ${theme === 'light' ? 'bg-gray-100/40 border-gray-200 text-gray-600' : 'bg-zinc-900 border-zinc-700 text-gray-300'}
                `}
            >
                <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex items-center gap-2 w-50">
                        <Link className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} size={15} />
                        <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>URL para envio</span>
                    </div>
                    <Input ref={inputRef} disabled={true} value={'POST http://localhost:6333/api/v1/logs'} />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleCopy}
                            >
                                <Copy />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Copiar</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex items-center gap-2 w-50">
                        <Key className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} size={15} />
                        <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Token para uso</span>
                    </div>
                    <Input ref={inputRef} disabled={true} value={short.toString()} />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleCopy}
                            >
                                <Copy />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Copiar</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className="flex w-full items-center justify-start gap-4 mt-2">
                    <div className="flex items-center gap-2 w-42">
                        <Calendar className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} size={15} />
                        <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Data de Expiração</span>
                    </div>
                    <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
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
                                {dayjs(new Date()).format('DD/MM/YYYY HH:MM:ss')}
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
                                {dayjs(new Date()).format('DD/MM/YYYY HH:MM:ss')}
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
                                {dayjs(new Date()).format('DD/MM/YYYY HH:MM:ss')}
                            </span>
                        )}
                    </div>
                    <div></div>
                </div>
            </CardComponent>

            <div className="grid grid-cols-3 gap-4">
                <Card title="Total de Logs" value="350" className="text-xl">
                    <FileText />
                </Card>
                <Card title="Média de Logs por Hora" value="20">
                    <Clock className="text-purple-600" />
                </Card>
                <Card title="Média de Logs por Dia" value="5">
                    <Clock className="text-primary-background" />
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <ChartLogVolume />
            </div>

            <div className="w-full">
                <div className="flex justify-between items-center gap-4">
                    <div className="flex flex-col justify-center items-start">
                        <h3 className="text-lg font-bold">Últimos Logs</h3>
                        <span className="text-sm text-gray-500">Últimos 5 registros</span>
                    </div>
                    <Button
                        onClick={() => navigate('/logs')}
                    >
                        <Eye />Ver todas
                    </Button>
                </div>
            </div>

            <DataTable columns={columns} data={logs} component="apis" haveAction={false} onOpenEditModal={() => console.log()} hasPagination={false} />

            <EditAPIModal openModal={openEditModal} onSetOpenEditModal={handleSetOpenEditModal} />
            <RenewTokenModal openModal={openRenewModal} onSetOpenRenewTokenModal={handleSetOpenRenewModal} />
        </div>
    )
}