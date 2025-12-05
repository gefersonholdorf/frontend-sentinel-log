import { LogItem } from "@/components/log/log-item";
import { InputPrimary } from "@/components/ui/input-primary";
import { TitlePage } from "@/components/ui/title-page";

export function LogsPage() {
    return (
        <div className="p-6 space-y-6">
            <TitlePage title="Logs" description="Visualize e filtre todos os logs do sistema" />

            <InputPrimary placeholder="Buscar logs..." />

            <div className="grid grid-cols-2 gap-4">
                <LogItem />
                <LogItem />
                <LogItem />
                <LogItem />
                <LogItem />
                <LogItem />
                <LogItem />
                <LogItem />
                <LogItem />
                <LogItem />
            </div>
        </div>
    )
}