import { ComboboxClients } from "@/components/client/combobox-clients";
import { Card } from "@/components/dashboards/card";
import { ChartLogByClient } from "@/components/dashboards/chart-log-by-client";
import { ChartLogVolume } from "@/components/dashboards/chart-log-volume";
import { ChartTopApis } from "@/components/dashboards/chart-top-apis";
import { LastsRequests } from "@/components/dashboards/lasts-requests";
import { Skeleton } from "@/components/ui/skeleton";
import { TitlePage } from "@/components/ui/title-page";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useMeContext } from "@/context/me-context";
import { useFetchDashboard } from "@/http/dashboard/use-dashboard";
import { FileText, Globe, Info, User } from "lucide-react";
import { useEffect, useState } from "react";

export function DashboardPage() {
    const { user } = useMeContext()

    const [client, setClient] = useState<number | null>(user && user.clientId)

    const { data: dashboard, isLoading, isError } = useFetchDashboard(client)

    function handleSetClient(clientId: string | undefined) {
        if (clientId) {
            setClient(Number(clientId))
        } else {
            setClient(null)
        }
    }

    useEffect(() => {
        setClient(user ? user.clientId : null)
    }, [user])

    if (isError) {
        return <div>Erro ao carregar o dashboard</div>
    }
    return (
        <div className="p-6 space-y-6 mb-4">
            <TitlePage title="Dashboard" description="Visão geral da sua plataforma de observabilidade">
                <div className="flex items-center justify-center">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info className="hover:text-primary-background size-5" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Caso não tiver nenhum cliente selecionado, os gráficos irão exibir os dados de todos os clientes.</p>
                        </TooltipContent>
                    </Tooltip>
                    <div className="flex p-2">
                        {user &&
                            <ComboboxClients
                                value={client !== null ? String(client) : undefined}
                                onValueChange={handleSetClient}
                                disable={client !== null && user.role === 'member'}
                            />
                        }
                    </div>
                </div>
            </TitlePage>

            {isLoading && (
                <div className="grid grid-cols-5 gap-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="animate-pulse h-24 bg-gray-200 dark:bg-slate-700 rounded-lg" />
                    ))}
                </div>
            )}

            {dashboard && (
                <div className="grid grid-cols-5 gap-4">
                    <Card title="Total de Clientes" value={dashboard.totalClients.toString()}>
                        <User />
                    </Card>
                    <Card title="Total de APIs" value={dashboard.totalApis.toString()}>
                        <Globe />
                    </Card>
                    <Card title="APIs Ativas" value={dashboard.totalApisActive.toString()}>
                        <Globe className="text-emerald-500 size-8" />
                    </Card>
                    <Card title="APIs Inativas" value={dashboard.totalApisInactive.toString()}>
                        <Globe className="text-red-500 size-8" />
                    </Card>
                    <Card title="Logs Hoje" value={dashboard.totalLogsToday.toString()}>
                        <FileText className="text-primary-background size-8" />
                    </Card>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                {isLoading && (
                    <div>
                        <Skeleton className="animate-pulse h-full bg-gray-200 dark:bg-slate-700 rounded-lg" />
                    </div>
                )}
                {dashboard && (
                    <ChartLogVolume
                        volumeLogsTodayData={dashboard.volumeLogsTodayData}
                    />
                )}
                <ChartLogByClient />
            </div>
            <div className="grid grid-cols-2 gap-4 h-80">
                <ChartTopApis />
                <LastsRequests />
            </div>
        </div>
    )
}