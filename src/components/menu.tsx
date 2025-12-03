import { ChartNoAxesColumn, Cog, FileText, Globe, LayoutDashboard, User2 } from "lucide-react";
import { MenuItem } from "./menu-item";

interface MenuProps {
    open: boolean
}

export function Menu({ open }: MenuProps) {
    return (
        <div className="space-y-2">
            <MenuItem icon={<LayoutDashboard size={20} />} title="Dashboard" state='active' open={open} />
            <MenuItem icon={<User2 size={20} />} title="Clientes" state='default' open={open} />
            <MenuItem icon={<Globe size={20} />} title="APIs" state='default' open={open} />
            <MenuItem icon={<FileText size={20} />} title="Logs" state='default' open={open} />
            <MenuItem icon={<ChartNoAxesColumn size={20} />} title="Relatórios" state='default' open={open} />
            <MenuItem icon={<Cog size={20} />} title="Configurações" state='default' open={open} />
        </div>
    )
}