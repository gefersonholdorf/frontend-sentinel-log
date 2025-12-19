import { Cog, FileText, Globe, LayoutDashboard, User2, Users } from "lucide-react";
import { useLocation } from "react-router";
import { MenuItem } from "./menu-item";

interface MenuProps {
    open: boolean
}

export function Menu({ open }: MenuProps) {
    const location = useLocation()

    return (
        <div className="space-y-2">
            <MenuItem icon={<LayoutDashboard size={20} />} title="Dashboard" state={location.pathname === '/dashboard' ? 'active' : 'default'} open={open} url="/dashboard" />
            <MenuItem icon={<User2 size={20} />} title="Clientes" state={location.pathname.startsWith('/clients') ? 'active' : 'default'} open={open} url="/clients?page=1&perPage=10" />
            <MenuItem icon={<Globe size={20} />} title="APIs" state={location.pathname.startsWith('/apis') ? 'active' : 'default'} open={open} url="/apis" />
            <MenuItem icon={<FileText size={20} />} title="Logs" state={location.pathname === '/logs' ? 'active' : 'default'} open={open} url="/logs" />
            <MenuItem icon={<Users size={20} />} title="Usuários" state={location.pathname === '/users' ? 'active' : 'default'} open={open} url="/users" />
            <MenuItem icon={<Cog size={20} />} title="Configurações" state={location.pathname === '/settings' ? 'active' : 'default'} open={open} url="/settings" />
        </div>
    )
}