import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { useTheme } from "@/context/theme-context";

export interface PaginationProps {
    paginationParams: {
        page: number
        perPage: number
        totalPages: number
        onSetPage: (newPage: number) => void
        onSetPerPage: (newPerPage: number) => void
    }
}

export function Pagination({ paginationParams }: PaginationProps) {
    const { theme } = useTheme()
    return (
        <div className="w-full border-t flex items-center justify-between gap-4 p-5">
            <div className="flex gap-2 items-center">
                <span className={`font-medium text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Itens por página</span>
                <Select defaultValue="10" onValueChange={(value) => paginationParams.onSetPerPage(Number(value))}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Quantidade de Itens</SelectLabel>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex gap-4 items-center">
                <span className={`font-medium text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Página <span className={`font-medium text-sm ${theme === 'light' ? 'text-gray-800 font-bold' : 'text-gray-100 font-bold'}`}>{paginationParams.page}</span> de <span className={`font-medium text-sm ${theme === 'light' ? 'text-gray-800 font-bold' : 'text-gray-100 font-bold'}`}>{paginationParams.totalPages}</span></span>
                <div className="flex items-center">
                    <Button
                        variant="outline"
                        className="rounded-r-none rounded-l-lg"
                        disabled={paginationParams.page <= 1}
                        onClick={() => paginationParams.onSetPage(paginationParams.page - 1)}
                    >
                        <ArrowLeft className="mr-2" />
                        Anterior
                    </Button>

                    <Button
                        variant="outline"
                        className="rounded-l-none rounded-r-lg"
                        disabled={paginationParams.page >= paginationParams.totalPages}
                        onClick={() => paginationParams.onSetPage(paginationParams.page + 1)}
                    >
                        Próximo
                        <ArrowRight className="ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}