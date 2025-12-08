import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
const apis = [
    {
        value: "auth-service",
        label: "Auth Service"
    },
    {
        value: "billing-api",
        label: "Billing API"
    },
    {
        value: "notification-center",
        label: "Notification Center"
    },
    {
        value: "inventory-service",
        label: "Inventory Service"
    },
    {
        value: "order-gateway",
        label: "Order Gateway"
    },
    {
        value: "user-profile",
        label: "User Profile API"
    },
    {
        value: "payment-processor",
        label: "Payment Processor"
    },
    {
        value: "analytics-engine",
        label: "Analytics Engine"
    },
    {
        value: "reporting-api",
        label: "Reporting API"
    },
    {
        value: "shipment-service",
        label: "Shipment Service"
    }
];
export function ComboboxApis() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-background hover:bg-background text-gray-500 hover:text-gray-500 dark:bg-background dark:hover:bg-background dark:text-gray-400"
                >
                    {value
                        ? apis.find((apis) => apis.value === value)?.label
                        : "Selecione uma api..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Selecione uma api..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No apis found.</CommandEmpty>
                        <CommandGroup>
                            {apis.map((apis) => (
                                <CommandItem
                                    key={apis.value}
                                    value={apis.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {apis.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === apis.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}