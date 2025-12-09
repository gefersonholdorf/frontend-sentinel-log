import { ComboboxApis } from "@/components/api/combobox-apis";
import { ComboboxClients } from "@/components/client/combobox-clients";
import { LogItem } from "@/components/log/log-item";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { InputPrimary } from "@/components/ui/input-primary";
import { TitlePage } from "@/components/ui/title-page";
import { useTheme } from "@/context/theme-context";
import { Search } from "lucide-react";

export interface Log {
    id: number
    message: string
    component: string
    action: string
    createdAt: Date
    api: string
    client: string
    origin: string
    user: string
    idRegisterAffected: string
}

const logs: Log[] = [
    {
        id: 1,
        message: "Novo cliente cadastrado com sucesso.",
        component: "Cliente",
        action: "Criar",
        createdAt: new Date("2025-12-08T11:45:00Z"),
        api: "Faturamento",
        client: "Alpha Sistemas",
        origin: "192.168.0.15",
        user: "Geferson Alves",
        idRegisterAffected: "2048"
    },
    {
        id: 2,
        message: "Informações do cliente atualizadas.",
        component: "Cliente",
        action: "Atualizar",
        createdAt: new Date("2025-12-08T11:48:12Z"),
        api: "Faturamento",
        client: "Alpha Sistemas",
        origin: "192.168.0.22",
        user: "Marcos Silva",
        idRegisterAffected: "2048"
    },
    {
        id: 3,
        message: "Pedido criado com sucesso.",
        component: "Pedido",
        action: "Criar",
        createdAt: new Date("2025-12-08T11:53:02Z"),
        api: "Pedidos",
        client: "Alpha Sistemas",
        origin: "192.168.0.33",
        user: "Ana Pereira",
        idRegisterAffected: "8891"
    },
    {
        id: 4,
        message: "Pagamento registrado.",
        component: "Financeiro",
        action: "Registrar",
        createdAt: new Date("2025-12-08T12:01:55Z"),
        api: "Financeiro",
        client: "Alpha Sistemas",
        origin: "192.168.0.40",
        user: "Geferson Alves",
        idRegisterAffected: "5532"
    },
    {
        id: 5,
        message: "Erro ao calcular impostos.",
        component: "Fiscal",
        action: "Calcular",
        createdAt: new Date("2025-12-08T12:05:11Z"),
        api: "Fiscal",
        client: "Alpha Sistemas",
        origin: "192.168.0.12",
        user: "Carla Souza",
        idRegisterAffected: "7783"
    },
    {
        id: 6,
        message: "Produto adicionado ao estoque.",
        component: "Estoque",
        action: "Adicionar",
        createdAt: new Date("2025-12-08T12:10:48Z"),
        api: "Estoque",
        client: "Alpha Sistemas",
        origin: "192.168.0.19",
        user: "João Mendes",
        idRegisterAffected: "9012"
    },
    {
        id: 7,
        message: "Produto removido do estoque.",
        component: "Estoque",
        action: "Remover",
        createdAt: new Date("2025-12-08T12:14:20Z"),
        api: "Estoque",
        client: "Alpha Sistemas",
        origin: "192.168.0.19",
        user: "João Mendes",
        idRegisterAffected: "9012"
    },
    {
        id: 8,
        message: "Configuração do sistema atualizada.",
        component: "Sistema",
        action: "Atualizar",
        createdAt: new Date("2025-12-08T12:16:57Z"),
        api: "Core",
        client: "Alpha Sistemas",
        origin: "192.168.0.10",
        user: "Geferson Alves",
        idRegisterAffected: "SYS-01"
    },
    {
        id: 9,
        message: "Tentativa de login mal sucedida.",
        component: "Autenticação",
        action: "Login",
        createdAt: new Date("2025-12-08T12:18:41Z"),
        api: "Auth",
        client: "Alpha Sistemas",
        origin: "192.168.0.55",
        user: "Usuário Desconhecido",
        idRegisterAffected: "-"
    },
    {
        id: 10,
        message: "Usuário autenticado com sucesso.",
        component: "Autenticação",
        action: "Login",
        createdAt: new Date("2025-12-08T12:19:01Z"),
        api: "Auth",
        client: "Alpha Sistemas",
        origin: "192.168.0.25",
        user: "Marcos Silva",
        idRegisterAffected: "USR-552"
    },
    {
        id: 11,
        message: "Backup diário concluído.",
        component: "Backup",
        action: "Executar",
        createdAt: new Date("2025-12-08T12:25:40Z"),
        api: "Backup",
        client: "Alpha Sistemas",
        origin: "192.168.0.5",
        user: "Sistema",
        idRegisterAffected: "BKP-20251208"
    },
    {
        id: 12,
        message: "Envio de e-mail concluído.",
        component: "Notificação",
        action: "Enviar",
        createdAt: new Date("2025-12-08T12:28:00Z"),
        api: "Notificações",
        client: "Alpha Sistemas",
        origin: "192.168.0.77",
        user: "Ana Pereira",
        idRegisterAffected: "EMAIL-4421"
    },
    {
        id: 13,
        message: "Relatório financeiro gerado.",
        component: "Financeiro",
        action: "Gerar",
        createdAt: new Date("2025-12-08T12:30:12Z"),
        api: "Financeiro",
        client: "Alpha Sistemas",
        origin: "192.168.0.40",
        user: "Carla Souza",
        idRegisterAffected: "REL-8821"
    },
    {
        id: 14,
        message: "Desconto aplicado ao pedido.",
        component: "Pedido",
        action: "Atualizar",
        createdAt: new Date("2025-12-08T12:33:44Z"),
        api: "Pedidos",
        client: "Alpha Sistemas",
        origin: "192.168.0.33",
        user: "Ana Pereira",
        idRegisterAffected: "8891"
    },
    {
        id: 15,
        message: "Fornecedor cadastrado.",
        component: "Fornecedor",
        action: "Criar",
        createdAt: new Date("2025-12-08T12:35:28Z"),
        api: "Compras",
        client: "Alpha Sistemas",
        origin: "192.168.0.60",
        user: "João Mendes",
        idRegisterAffected: "FNC-221"
    }
];

export function LogsPage() {
    const { theme } = useTheme()
    return (
        <div className="p-6 space-y-6">
            <TitlePage title="Logs" description="Visualize e filtre todos os logs do sistema" />

            <Card className={`
                        grid grid-cols-3 gap-4 items-center justify-between p-4 border rounded-lg shadow-primary transition-transform duration-300 hover:scale-[1.01]
                        ${theme === 'light' ? 'bg-gray-100/40 border-gray-200 text-gray-600' : 'bg-zinc-900 border-zinc-700 text-gray-300'}
                    `}>
                <InputPrimary placeholder="Buscar logs..." />
                <ComboboxClients />
                <ComboboxApis />
                <DatePicker title="Data Inicial" />
                <DatePicker title="Data Final" />
                <Button className="bg-primary-background/70 hover:bg-sky-600 text-white"><Search />Filtrar</Button>
            </Card >

            <div className="grid grid-cols-2 gap-4">
                {logs.map((item) => (
                    <LogItem key={item.id} log={item} />
                ))}
            </div>
        </div >
    )
}