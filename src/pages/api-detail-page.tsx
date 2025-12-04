import { Card } from "@/components/dashboards/card";
import { Card as CardComponent } from "@/components/ui/card"
import { ChartLogVolume } from "@/components/dashboards/chart-log-volume";
import { DataTable, type DataTableColumn } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-context";
import { ArrowLeft, Clock, Copy, Edit, Eye, FileText, Globe, Key } from "lucide-react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

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

    const handleCopy = () => {
        if (inputRef.current) {
            navigator.clipboard.writeText(inputRef.current.value)
        }
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
                <Button>
                    <Edit />
                    Editar
                </Button>
            </div>

            <CardComponent
                className={`
                    flex items-center justify-center gap-2 p-4 border rounded-lg shadow-primary transition-transform duration-300 hover:scale-[1.03]
                    ${theme === 'light' ? 'bg-gray-100/40 border-gray-200 text-gray-600' : 'bg-zinc-900 border-zinc-700 text-gray-300'}
                `}
            >
                <div className="flex w-full items-center justify-between gap-4">
                    <Key size={20} />
                    <Input ref={inputRef} disabled={true} value={'sk_live_fnt_8x7kJm9nPq2rT5vW'} />
                    <Button
                        onClick={handleCopy}
                    >
                        <Copy />Copiar
                    </Button>
                </div>
            </CardComponent>

            <div className="grid grid-cols-3 gap-4">
                <Card title="Total de Logs" value="350" className="text-xl">
                    <FileText />
                </Card>
                <Card title="Média por Hora" value="20">
                    <Clock className="text-purple-600" />
                </Card>
                <Card title="Média por Dia" value="5">
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

            <DataTable columns={columns} data={logs} component="apis" haveAction={false} />
        </div>
    )
}