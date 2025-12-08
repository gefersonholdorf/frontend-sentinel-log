import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useTheme } from "@/context/theme-context"
import type { Log } from "@/pages/logs-page"
import { ChartLine, Globe, User } from "lucide-react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

interface LogItemProps {
    log: Log
}

export function LogItem({ log }: LogItemProps) {
    const { theme } = useTheme()
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full shadow transition-transform duration-300 hover:scale-[1.01]"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger className={`border border-gray-500 p-4 rounded-lg rounded-b-none
                        ${theme === 'light' ? 'bg-gray-100/40 border-gray-200 text-gray-600' : 'bg-zinc-900 border-zinc-700 text-gray-400'}
                        border-l-3 border-l-primary-background
                    `}>
                    <div className="w-full flex flex-col gap-2">
                        <div className="flex items-center gap-4 justify-between">
                            <span className={`text-sm truncate font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{log.message}</span>
                            <span className="text-[.7rem]">{dayjs(log.createdAt).format('DD/MM/YYYY HH:mm')}</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="px-3 py-1 rounded-lg border flex items-center justify-center gap-1">
                                <Globe size={15} />
                                <span className="text-[.7rem]">{log.api}</span>
                            </div>
                            <div className="px-3 py-1 rounded-lg border flex items-center justify-center gap-1">
                                <User size={15} />
                                <span className="text-[.7rem]">{log.client}</span>
                            </div>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className={`border space-y-2 border-gray-500 border-t-0 p-4 rounded-b-lg
                    ${theme === 'light' ? 'bg-gray-100/40 border-gray-200 text-gray-600' : 'bg-zinc-900 border-zinc-700 text-gray-300'}`}>
                    <div className="flex gap-2 items-center">
                        <ChartLine size={15} className="text-primary-background" />
                        <span className="text-[.8rem]">Dados Completos</span>
                    </div>
                    <div
                        className={`
        bg-background p-3 rounded-lg border text-[.8rem]
        ${theme === 'light'
                                ? 'border-gray-200 text-gray-600'
                                : 'border-zinc-700 text-gray-500'}
    `}
                    >
                        <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                            <div className="flex flex-col">
                                <span className="font-normal">Origem:</span>
                                <span className={`font-semibold ${theme === 'dark' && 'text-gray-300'}`}>{log.origin}</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="font-normal">Componente:</span>
                                <span className={`font-semibold ${theme === 'dark' && 'text-gray-300'}`}>{log.component}</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="font-normal">Usuário:</span>
                                <span className={`font-semibold ${theme === 'dark' && 'text-gray-300'}`}>{log.user}</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="font-normal">Ação:</span>
                                <span className={`font-semibold ${theme === 'dark' && 'text-gray-300'}`}>{log.action}</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="font-normal">Id do Registro Afetado:</span>
                                <span className={`font-semibold ${theme === 'dark' && 'text-gray-300'}`}>{log.idRegisterAffected}</span>
                            </div>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion >
    )
}