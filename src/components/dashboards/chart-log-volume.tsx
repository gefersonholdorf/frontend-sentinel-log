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
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useTheme } from "@/context/theme-context"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

const chartConfig = {
    quantity: {
        label: "Quantidade de Logs: ",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

interface ChartLogVolumeProps {
    volumeLogsTodayData: {
        hour: string
        quantity: number
    }[]
}

export function ChartLogVolume({ volumeLogsTodayData }: ChartLogVolumeProps) {
    const { theme } = useTheme()
    return (
        <Card className={`
                            shadow-primary transition-transform duration-300 hover:scale-[1.01]
                            ${theme === 'light' ? 'bg-zinc-100/30 border-gray-200' : 'bg-zinc-900 border-zinc-700'}
                        `}>
            <CardHeader>
                <CardTitle>Volume de Logs</CardTitle>
                <CardDescription>Últimas 24 horas</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-62 w-full">
                    <AreaChart
                        accessibilityLayer
                        data={volumeLogsTodayData}
                        margin={{
                            left: -20,
                            right: 12,
                        }}
                    >
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.45} />
                                <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="hour"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.substring(0, 2) + 'h'}
                            interval={1}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />

                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

                        <Area
                            type="natural"
                            dataKey="quantity"
                            stroke="var(--chart-2)"
                            strokeWidth={2}
                            fill="url(#areaGradient)"
                        />
                    </AreaChart>

                </ChartContainer>
            </CardContent>
        </Card>
    )
}
