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
const clients = [
    {
        value: "quantumsoft",
        label: "QuantumSoft Solutions"
    },
    {
        value: "nova-tech",
        label: "NovaTech Systems"
    },
    {
        value: "cyberwave",
        label: "CyberWave Technologies"
    },
    {
        value: "bluecore",
        label: "BlueCore Innovations"
    },
    {
        value: "vertex-digital",
        label: "Vertex Digital Labs"
    },
    {
        value: "skybridge",
        label: "SkyBridge Data Services"
    },
    {
        value: "primecode",
        label: "PrimeCode Technologies"
    },
    {
        value: "stellarworks",
        label: "StellarWorks IT"
    },
    {
        value: "neuronix",
        label: "Neuronix Software"
    },
    {
        value: "infraone",
        label: "InfraOne Cloud Solutions"
    }
]
export function ComboboxClients() {
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
                        ? clients.find((clients) => clients.value === value)?.label
                        : "Selecione um cliente..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-background">
                <Command>
                    <CommandInput placeholder="Selecione um cliente..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No clients found.</CommandEmpty>
                        <CommandGroup>
                            {clients.map((clients) => (
                                <CommandItem
                                    key={clients.value}
                                    value={clients.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {clients.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === clients.value ? "opacity-100" : "opacity-0"
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