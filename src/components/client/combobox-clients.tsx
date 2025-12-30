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
import { useComboboxClients } from "@/http/client/use-combobox-clients"

interface ComboboxClientsProps {
    value?: string
    onValueChange: (value?: string) => void
    disable?: boolean
}

export function ComboboxClients({ value, onValueChange, disable = false }: ComboboxClientsProps) {
    const [open, setOpen] = React.useState(false)
    const { data: clients } = useComboboxClients()

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    disabled={disable}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-background hover:bg-background text-gray-500 hover:text-gray-500 dark:bg-background dark:hover:bg-background dark:text-gray-400"
                >
                    {value
                        ? clients && clients.data.find((clients) => String(clients.value) === value)?.label
                        : "Selecione um cliente..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-background">
                <Command>
                    <CommandInput placeholder="Selecione um cliente..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>Nenhum cliente encontrado...</CommandEmpty>
                        <CommandGroup>
                            {clients && clients.data.map((clients) => (
                                <CommandItem
                                    key={clients.value}
                                    value={`${clients.value} ${clients.label}`}
                                    onSelect={() => {
                                        if (value === String(clients.value)) {
                                            onValueChange(undefined)
                                        } else {
                                            onValueChange(String(clients.value))
                                        }
                                        setOpen(false)
                                    }}
                                >
                                    {clients.label}
                                    <Check
                                        className={cn(
                                            "ml-auto transition-opacity",
                                            value === String(clients.value) ? "opacity-100" : "opacity-0"
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