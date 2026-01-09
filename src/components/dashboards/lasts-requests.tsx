import { useTheme } from "@/context/theme-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

interface LastLog {
    id: number
    client: string
    api: string
    message: string
    date: Date
}

const lastLogs: LastLog[] = [
    {
        id: 1,
        client: "AlphaSystems",
        api: "AuthService",
        message: "Token inválido recebido.",
        date: new Date("2025-12-04 10:12:45")
    },
    {
        id: 2,
        client: "BetaTech",
        api: "UserGateway",
        message: "Usuário criado com sucesso.",
        date: new Date("2025-12-04 10:15:18")
    },
    {
        id: 3,
        client: "CloudWorks",
        api: "PaymentCore",
        message: "Pagamento processado.",
        date: new Date("2025-12-04 10:17:02")
    },
    {
        id: 4,
        client: "DataLink",
        api: "NotificationHub",
        message: "Notificação enviada ao dispositivo.",
        date: new Date("2025-12-04 10:18:31")
    },
    {
        id: 5,
        client: "PrimeSoft",
        api: "LogCollector",
        message: "Log recebido e registrado.",
        date: new Date("2025-12-04 10:20:11")
    },
    {
        id: 6,
        client: "NetFusion",
        api: "AnalyticsEngine",
        message: "Evento analisado com sucesso.",
        date: new Date("2025-12-04 10:21:49")
    },
    {
        id: 7,
        client: "AlphaSystems",
        api: "AuthService",
        message: "Sessão expirada.",
        date: new Date("2025-12-04 10:23:10")
    },
    {
        id: 8,
        client: "CloudWorks",
        api: "PaymentCore",
        message: "Erro ao validar cartão.",
        date: new Date("2025-12-04 10:25:44")
    },
    {
        id: 9,
        client: "BetaTech",
        api: "UserGateway",
        message: "Requisição com campos ausentes.",
        date: new Date("2025-12-04 10:27:12")
    },
    {
        id: 10,
        client: "PrimeSoft",
        api: "LogCollector",
        message: "Fila de logs processada.",
        date: new Date("2025-12-04 10:29:03")
    }
]

export function LastsRequests() {
    const { theme } = useTheme()

    return (
        <Card
            className={`
                        shadow-primary transition-transform duration-300 hover:scale-[1.01] overflow-y-auto scrollbar-hide h-full
                        ${theme === 'light' ? 'bg-zinc-100/30 border-gray-200' : 'bg-zinc-900 border-zinc-700'}
                    `}>
            <CardHeader>
                <CardTitle>Últimos Logs</CardTitle>
                <CardDescription>Timeline de eventos</CardDescription>
            </CardHeader>
            <CardContent>
                {lastLogs.map((item) => (
                    <div key={item.id} className="flex gap-2 h-18">
                        <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-primary-background" />
                            <Separator
                                orientation="vertical"
                                className="flex-1 border-gray-500 border-[1.5px]"
                            />
                        </div>
                        <div className="flex flex-col mt-2">
                            <span className={`text-[.8rem] ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>{dayjs(item.date).fromNow().toString()}</span>
                            <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{item.message}</span>
                            <div className="flex gap-2 justify-start items-center">
                                <span className={`text-[.8rem] ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>{item.api} •</span>
                                <span className={`text-[.8rem] ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>{item.client}</span>
                            </div>
                        </div>

                    </div>
                ))}
            </CardContent>
        </Card>
    )
}