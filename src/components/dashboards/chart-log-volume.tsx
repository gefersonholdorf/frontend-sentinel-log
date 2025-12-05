import { CartesianGrid, XAxis, YAxis, Area, AreaChart } from "recharts"
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

const chartData = [
    { hour: "00:00", quantity: 186 },
    { hour: "01:00", quantity: 152 },
    { hour: "02:00", quantity: 98 },
    { hour: "03:00", quantity: 75 },
    { hour: "04:00", quantity: 63 },
    { hour: "05:00", quantity: 82 },
    { hour: "06:00", quantity: 120 },
    { hour: "07:00", quantity: 168 },
    { hour: "08:00", quantity: 214 },
    { hour: "09:00", quantity: 305 },
    { hour: "10:00", quantity: 284 },
    { hour: "11:00", quantity: 237 },
    { hour: "12:00", quantity: 265 },
    { hour: "13:00", quantity: 229 },
    { hour: "14:00", quantity: 198 },
    { hour: "15:00", quantity: 176 },
    { hour: "16:00", quantity: 209 },
    { hour: "17:00", quantity: 231 },
    { hour: "18:00", quantity: 214 },
    { hour: "19:00", quantity: 190 },
    { hour: "20:00", quantity: 158 },
    { hour: "21:00", quantity: 143 },
    { hour: "22:00", quantity: 112 },
    { hour: "23:00", quantity: 96 },
]

const chartConfig = {
    quantity: {
        label: "Quantidade de Logs: ",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ChartLogVolume() {
    const { theme } = useTheme()
    return (
        <Card className={`
                            shadow-primary transition-transform duration-300 hover:scale-[1.01]
                            ${theme === 'light' ? 'bg-gray-100/40 border-gray-200' : 'bg-zinc-900 border-zinc-700'}
                        `}>
            <CardHeader>
                <CardTitle>Volume de Logs</CardTitle>
                <CardDescription>Últimas 24 horas</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-55 w-full">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
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
