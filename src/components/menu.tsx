import { ChartNoAxesColumn, Cog, FileText, Globe, LayoutDashboard, User2 } from "lucide-react";
import { MenuItem } from "./menu-item";
import { useLocation } from "react-router";

interface MenuProps {
    open: boolean
}

export function Menu({ open }: MenuProps) {
    const location = useLocation()

    return (
        <div className="space-y-2">
            <MenuItem icon={<LayoutDashboard size={20} />} title="Dashboard" state={location.pathname === '/dashboard' ? 'active' : 'default'} open={open} url="/dashboard" />
            <MenuItem icon={<User2 size={20} />} title="Clientes" state={location.pathname.startsWith('/clients') ? 'active' : 'default'} open={open} url="/clients" />
            <MenuItem icon={<Globe size={20} />} title="APIs" state={location.pathname.startsWith('/apis') ? 'active' : 'default'} open={open} url="/apis" />
            <MenuItem icon={<FileText size={20} />} title="Logs" state={location.pathname === '/logs' ? 'active' : 'default'} open={open} url="/logs" />
            <MenuItem icon={<ChartNoAxesColumn size={20} />} title="Relatórios" state={location.pathname === '/reports' ? 'active' : 'default'} open={open} url="/reports" />
            <MenuItem icon={<Cog size={20} />} title="Configurações" state={location.pathname === '/settings' ? 'active' : 'default'} open={open} url="/settings" />
        </div>
    )
}