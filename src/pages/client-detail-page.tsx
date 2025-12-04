import { Card } from "@/components/dashboards/card";
import { ChartLogVolume } from "@/components/dashboards/chart-log-volume";
import { ChartLogsApi } from "@/components/dashboards/chart-logs-api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, FileText, Globe, User } from "lucide-react";

export function ClientDetailPage() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-4">
                    <ArrowLeft className="size-5 cursor-pointer" />
                    <div className="bg-primary-background text-white p-3 rounded-lg">
                        <User />
                    </div>
                    <div>
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold">HealthTech SA</h2>
                            <div className="px-3 rounded-lg bg-emerald-200 border border-emerald-800">
                                <span className="text-sm font-medium text-emerald-800">Ativo</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">Sistema de gestão hospitalar</p>
                    </div>
                </div>
                <Button className="bg-primary-background hover:bg-sky-600 text-white">
                    <Edit />
                    Editar
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Card title="Criado em" value="03/12/2025" className="text-xl">
                    <User />
                </Card>
                <Card title="Total de APIS" value="5">
                    <Globe />
                </Card>
                <Card title="Total de Logs" value="670">
                    <FileText />
                </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <ChartLogVolume />
                <ChartLogsApi />
            </div>
        </div>
    )
}