import { ComboboxClients } from "@/components/client/combobox-clients";
import { LogItem } from "@/components/log/log-item";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePickerHour } from "@/components/ui/date-picker-hour";
import { InputPrimary } from "@/components/ui/input-primary";
import { TitlePage } from "@/components/ui/title-page";
import { useTheme } from "@/context/theme-context";
import { useFetchLogs } from "@/http/logs/use-fetch-logs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import z from "zod";

export interface Log {
    id: string
    message: string
    component: string
    action: string
    date: Date
    apiName: string
    clientName: string
    ip: string
    user: string
    affectedRecordID: string
}

const filteringLogsSchema = z.object({
    filter: z.string().optional(),
    clientId: z.string().min(1, "Selecione um cliente").optional(),
    apiId: z.string().min(1, "Selecione uma API").optional(),
    dateFrom: z.date().optional(),
    dateTo: z.date().optional(),
})

type FilteringLogsSchema = z.infer<typeof filteringLogsSchema>

export function LogsPage() {
    const { theme } = useTheme()

    const [searchParams, setSearchParams] = useSearchParams();

    const [appliedFilter, setAppliedFilter] = useState<string | undefined>(
        searchParams.get("filter") ?? undefined
    )

    const [clientId, setClientId] = useState<string | undefined>(
        searchParams.get("clientId") ?? undefined
    )

    const [apiId, setApiId] = useState<string | undefined>(
        searchParams.get("apiId") ?? undefined
    )

    const [dateFrom, setDateFrom] = useState<Date | undefined>(
        searchParams.get("dateFrom")
            ? new Date(searchParams.get("dateFrom")!)
            : undefined
    )

    const [dateTo, setDateTo] = useState<Date | undefined>(
        searchParams.get("dateTo")
            ? new Date(searchParams.get("dateTo")!)
            : undefined
    )

    const { handleSubmit, register, control } = useForm<FilteringLogsSchema>({
        resolver: zodResolver(filteringLogsSchema),
        defaultValues: {
            filter: appliedFilter
        }
    })

    const loadMoreRef = useRef<HTMLDivElement>(null)
    const observerRef = useRef<IntersectionObserver>(null)

    const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchLogs({
        filter: appliedFilter,
        clientId: clientId ? Number(clientId) : undefined,
        apiId: apiId ? Number(apiId) : undefined,
        dateFrom,
        dateTo
    })

    const logs = data.pages.flatMap(page => page.data)

    function onFilteringSubmit(data: FilteringLogsSchema) {
        setAppliedFilter(data.filter)
        setClientId(data.clientId)
        setApiId(data.apiId)
        setDateFrom(data.dateFrom)
        setDateTo(data.dateTo)

        const params: Record<string, string> = {}

        if (data.filter) params.filter = data.filter
        if (data.clientId) params.clientId = data.clientId
        if (data.apiId) params.apiId = data.apiId
        if (data.dateFrom) params.dateFrom = data.dateFrom.toISOString()
        if (data.dateTo) params.dateTo = data.dateTo.toISOString()

        setSearchParams(params)
    }

    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect()
        }

        observerRef.current = new IntersectionObserver(entries => {
            const entry = entries[0]

            if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage()
            }
        }, {
            threshold: 0.1
        })

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current)
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    return (
        <div className="p-6 space-y-6">
            <TitlePage title="Logs" description="Visualize e filtre todos os logs do sistema" />

            <Card className={`
                        border rounded-lg shadow-primary transition-transform duration-300 hover:scale-[1.01]
                        ${theme === 'light' ? 'bg-zinc-100/30 border-gray-200 text-gray-600' : 'bg-zinc-900 border-zinc-700 text-gray-300'}
                    `}>
                <form onSubmit={handleSubmit(onFilteringSubmit)} className="grid grid-cols-3 gap-4 items-center justify-between p-4">
                    <InputPrimary
                        placeholder="Buscar logs..."
                        {...register('filter')}
                    />

                    <div className="w-full grid gap-3">
                        <Controller
                            name="clientId"
                            control={control}
                            render={({ field }) => (
                                <ComboboxClients
                                    value={field.value}
                                    onValueChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                    <div className="w-full grid gap-3">
                        <Controller
                            name="apiId"
                            control={control}
                            render={({ field }) => (
                                <ComboboxClients
                                    value={field.value}
                                    onValueChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                    <div className="w-full grid gap-3">
                        <Controller
                            name="dateFrom"
                            control={control}
                            render={({ field }) => (
                                <DatePickerHour
                                    title="Data Inicial"
                                    value={field.value}
                                    onValueChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                    <div className="w-full grid gap-3">
                        <Controller
                            name="dateTo"
                            control={control}
                            render={({ field }) => (
                                <DatePickerHour
                                    title="Data Final"
                                    value={field.value}
                                    onValueChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                    <Button
                        className="bg-primary-background/90 hover:bg-sky-600 text-white"
                        type="submit"
                    >
                        <Search />
                        Filtrar
                    </Button>
                </form>
            </Card >

            <div className="grid grid-cols-2 gap-4">
                {logs.map(log => (
                    <LogItem key={log.id} log={log} />
                ))}
            </div>

            {hasNextPage ? (
                <div className="p-2" ref={loadMoreRef}>
                    {isFetchingNextPage && (
                        <div className="flex items-center justify-center p-2">
                            <Loader2 className="size-5 animate-spin" />
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center p-2">
                    <span className="text-sm">Todos os resultados foram carregados.</span>
                </div>
            )}
        </div >
    )
}