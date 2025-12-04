"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useTheme } from "@/context/theme-context"
import * as React from "react"
import { Cell, Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorDataItem } from "recharts/types/polar/Pie"

// --------------------
//  Dados reais do gráfico
// --------------------
const logsData = [
    { client: "AlphaTech Solutions", logs: 186, color: "var(--chart-1)" },
    { client: "BlueWave Corp", logs: 305, color: "var(--chart-2)" },
    { client: "PrimeDigital Labs", logs: 237, color: "var(--chart-3)" },
    { client: "NovaEdge Systems", logs: 173, color: "var(--chart-4)" },
    { client: "SkyLink Innovations", logs: 209, color: "var(--chart-5)" },
]

// --------------------
//  Configuração do Chart
// --------------------
const chartConfig = {
    logs: {
        label: "Logs",
    },
} satisfies ChartConfig

export function ChartLogByClient() {
    const id = "pie-interactive"

    const [activeClient, setActiveClient] = React.useState(logsData[0].client)

    const activeIndex = logsData.findIndex(
        (item) => item.client === activeClient
    )

    const { theme } = useTheme()

    return (
        <Card
            data-chart={id}
            className={`
                shadow-primary transition-transform duration-300 hover:scale-[1.01]
                ${theme === "light"
                    ? "bg-gray-100/40 border-gray-200"
                    : "bg-zinc-900 border-zinc-700"}
            `}
        >
            <ChartStyle id={id} config={chartConfig} />

            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>Logs por Clientes</CardTitle>
                    <CardDescription>Últimas 24 horas</CardDescription>
                </div>

                {/* SELECT */}
                <Select value={activeClient} onValueChange={setActiveClient}>
                    <SelectTrigger
                        className="mr-auto h-7 w-auto rounded-lg pl-2.5"
                        aria-label="Selecione um cliente"
                    >
                        <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent align="end" className="rounded-xl">
                        {logsData.map((item) => (
                            <SelectItem
                                key={item.client}
                                value={item.client}
                                className="rounded-lg [&_span]:flex"
                            >
                                <div className="flex items-center gap-2 text-xs">
                                    <span
                                        className="h-3 w-3 rounded-sm"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    {item.client}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>

            {/* GRÁFICO */}
            <CardContent className="flex justify-center pb-0">
                <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="mx-auto aspect-square h-50 w-full"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        <Pie
                            data={logsData}
                            dataKey="logs"
                            nameKey="client"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                                <g>
                                    <Sector {...props} outerRadius={outerRadius + 10} />
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 25}
                                        innerRadius={outerRadius + 12}
                                    />
                                </g>
                            )}
                        >
                            {/* Cores aplicadas corretamente */}
                            {logsData.map((item, index) => (
                                <Cell key={index} fill={item.color} />
                            ))}

                            {/* LABEL CENTRAL */}
                            <Label
                                content={({ viewBox }) => {
                                    if (!viewBox || !("cx" in viewBox)) return null

                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan className="fill-foreground text-3xl font-bold">
                                                {logsData[activeIndex].logs}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-muted-foreground text-sm"
                                            >
                                                Logs
                                            </tspan>
                                        </text>
                                    )
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card >
    )
}
