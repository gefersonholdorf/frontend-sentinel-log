"use client"
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
import { Bar, BarChart, XAxis, YAxis } from "recharts"
export const description = "A horizontal bar chart"
const chartData = [
    { api: "AuthService", quantity: 510 },
    { api: "UserGateway", quantity: 438 },
    { api: "PaymentCore", quantity: 327 },
    { api: "NotificationHub", quantity: 221 },
    { api: "LogCollector", quantity: 154 },
    { api: "AnalyticsEngine", quantity: 89 },
]
const chartConfig = {
    quantity: {
        label: "Quantidade de Logs: ",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig
export function ChartTopApis() {
    const { theme } = useTheme()
    return (
        <Card
            className={`
                        shadow-primary transition-transform duration-300 hover:scale-[1.01]
                        ${theme === 'light' ? 'bg-gray-100/40 border-gray-200' : 'bg-zinc-900 border-zinc-700'}
                    `}
        >
            <CardHeader>
                <CardTitle>Top 6 APIS</CardTitle>
                <CardDescription>Por volume de logs</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-55 w-full">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"

                    >
                        <XAxis type="number" dataKey="quantity" hide />
                        <YAxis
                            dataKey="api"
                            type="category"
                            tickLine={false}
                            tickMargin={0}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 20)}
                            width={120}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="quantity" fill="var(--color-quantity)" radius={5} fillOpacity={0.6} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}