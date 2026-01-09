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

interface ChartLogsApiProps {
    logsByApi: {
        apis: string
        quantity: number
    }[]
}

export function ChartLogsApi({ logsByApi }: ChartLogsApiProps) {
    const { theme } = useTheme()

    const paletteBlueLight = [
        "#EFF6FF", // 1
        "#DBEAFE", // 2
        "#BFDBFE", // 3
        "#93C5FD", // 4
        "#60A5FA", // 5
        "#3B82F6", // 6
        "#2563EB", // 7
        "#1D4ED8", // 8
        "#1E40AF", // 9
        "#1E3A8A", // 10
        "#172554", // 11
        "#0F172A", // 12
        "#0B1220", // 13
        "#0A2540", // 14
        "#0A3A6E", // 15
        "#0B4A8B", // 16
        "#0C5FB3", // 17
        "#0D6EFD", // 18
        "#1E88E5", // 19
        "#42A5F5"  // 20
    ]
    const paletteBlueDark = [
        "#93C5FD", // 1
        "#60A5FA", // 2
        "#3B82F6", // 3
        "#2563EB", // 4
        "#1D4ED8", // 5
        "#1E40AF", // 6
        "#1E3A8A", // 7
        "#172554", // 8
        "#0F172A", // 9
        "#0B1220", // 10
        "#0A2540", // 11
        "#0A3A6E", // 12
        "#0B4A8B", // 13
        "#0C5FB3", // 14
        "#0D6EFD", // 15
        "#1E88E5", // 16
        "#42A5F5", // 17
        "#64B5F6", // 18
        "#90CAF9", // 19
        "#BBDEFB"  // 20
    ]

    const palette = theme === "light" ? paletteBlueLight : paletteBlueDark

    const chartData = logsByApi.map((api, index) => {
        return {
            apis: api.apis,
            quantity: api.quantity,
            fill: palette[index]
        }
    })

    const chartConfig = {
        quantity: {
            label: "Quantidade de Logs: ",
        },
    } satisfies ChartConfig
    return (
        <Card className={`
                            shadow-primary transition-transform duration-300 hover:scale-[1.01]
                            ${theme === 'light' ? 'bg-zinc-100/30 border-gray-200' : 'bg-zinc-900 border-zinc-700'}
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
