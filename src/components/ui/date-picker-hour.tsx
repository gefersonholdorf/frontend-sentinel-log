import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerHourProps {
    title: string
    value?: Date
    onValueChange: (date?: Date) => void
}

export function DatePickerHour({ title, value, onValueChange }: DatePickerHourProps) {

    function handleDateChange(date?: Date) {
        if (!date) return onValueChange(undefined)

        if (value) {
            date.setHours(
                value.getHours(),
                value.getMinutes(),
                value.getSeconds()
            )
        }

        onValueChange(date)
    }

    function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!value) return

        const [hours, minutes, seconds = "0"] = e.target.value.split(":")

        const newDate = new Date(value)
        newDate.setHours(
            Number(hours),
            Number(minutes),
            Number(seconds)
        )

        onValueChange(newDate)
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full justify-between font-normal"
                    >
                        {value
                            ? value.toLocaleDateString()
                            : title}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value}
                        captionLayout="dropdown"
                        onSelect={handleDateChange}
                    />
                </PopoverContent>
            </Popover>

            <Input
                type="time"
                step="1"
                value={
                    value
                        ? value.toTimeString().slice(0, 8)
                        : "00:00:00"
                }
                onChange={handleTimeChange}
                className="w-full bg-background"
            />
        </div>
    )
}
