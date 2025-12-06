import { ComboboxClients } from "@/components/client/combobox-clients";
import { LogItem } from "@/components/log/log-item";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { InputPrimary } from "@/components/ui/input-primary";
import { TitlePage } from "@/components/ui/title-page";
import { useTheme } from "@/context/theme-context";

export function LogsPage() {
    const { theme } = useTheme()
    return (
        <div className="p-6 space-y-6">
            <TitlePage title="Logs" description="Visualize e filtre todos os logs do sistema" />

            <Card className={`
                        flex items-center justify-between gap-2 p-4 border rounded-lg shadow-primary transition-transform duration-300 hover:scale-[1.01]
                        ${theme === 'light' ? 'bg-gray-100/40 border-gray-200 text-gray-600' : 'bg-zinc-900 border-zinc-700 text-gray-300'}
                    `}>
                <InputPrimary placeholder="Buscar logs..." />
                <ComboboxClients />
                <DatePicker title="Data Inicial" />
                <DatePicker title="Data Final" />
            </Card >

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
        </div >
    )
}