import { Card } from "@/components/dashboards/card";
import { ChartLogByClient } from "@/components/dashboards/chart-log-by-client";
import { ChartLogVolume } from "@/components/dashboards/chart-log-volume";
import { ChartTopApis } from "@/components/dashboards/chart-top-apis";
import { LastsRequests } from "@/components/dashboards/lasts-requests";
import { TitlePage } from "@/components/ui/title-page";
import { FileText, Globe, User } from "lucide-react";

export function DashboardPage() {
    return (
        <div className="p-6 space-y-6 mb-4">
            <TitlePage title="Dashboard" description="Visão geral da sua plataforma de observabilidade" />

            <div className="grid grid-cols-5 gap-4">
                <Card title="Total de Clientes" value="6">
                    <User />
                </Card>
                <Card title="Total de APIs" value="8">
                    <Globe />
                </Card>
                <Card title="APIs Ativas" value="6">
                    <Globe className="text-emerald-500 size-8" />
                </Card>
                <Card title="APIs Inativas" value="2">
                    <Globe className="text-red-500 size-8" />
                </Card>
                <Card title="Logs Hoje" value="82">
                    <FileText className="text-primary-background size-8" />
                </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <ChartLogVolume />
                <ChartLogByClient />
            </div>
            <div className="grid grid-cols-2 gap-4 h-80">
                <ChartTopApis />
                <LastsRequests />
            </div>
        </div>
    )
}