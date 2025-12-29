import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    title: string
    value?: Date
    onValueChange: (date?: Date) => void
}

export function DatePicker({ title, value, onValueChange }: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!value}
                    className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal bg-background hover:bg-background text-gray-500 hover:text-gray-500 dark:bg-background dark:hover:bg-background dark:text-gray-400"
                >
                    <CalendarIcon />
                    {value
                        ? format(value, "dd/MM/yyyy", { locale: ptBR })
                        : <span>{title}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onValueChange}
                    locale={ptBR}
                />
            </PopoverContent>
        </Popover>
    )
}
