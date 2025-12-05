"use client"

import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useTheme } from "@/context/theme-context"

export const description = "A pie chart with a label"

export function ChartLogsApi() {
    const { theme } = useTheme()

    const paletteLight = ["#166534", "#15803D", "#22C55E", "#4ADE80", "#A7F3D0"]
    const paletteDark = ["#4ADE80", "#22C55E", "#16A34A", "#15803D", "#14532D"]

    const palette = theme === "light" ? paletteLight : paletteDark

    const chartData = [
        { apis: "Payments API", quantity: 275, fill: palette[0] },
        { apis: "Auth Service", quantity: 200, fill: palette[1] },
        { apis: "Catalog API", quantity: 187, fill: palette[2] },
        { apis: "Orders API", quantity: 173, fill: palette[3] },
        { apis: "Patient Records", quantity: 90, fill: palette[4] },
    ]

    const chartConfig = {
        quantity: {
            label: "Quantidade de Logs: ",
        },
    } satisfies ChartConfig
    return (
        <Card className={`
                            shadow-primary transition-transform duration-300 hover:scale-[1.01]
                            ${theme === 'light' ? 'bg-gray-100/40 border-gray-200' : 'bg-zinc-900 border-zinc-700'}
                        `}
        >
            <CardHeader className="items-center pb-0">
                <CardTitle>Logs por API</CardTitle>
                <CardDescription>Distribuição</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 h-55 w-full">
                <ChartContainer
                    config={chartConfig}
                    className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="quantity" label nameKey="apis" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
