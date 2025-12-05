import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function LogItem() {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger className="border border-gray-500 p-4 rounded-lg rounded-b-none">
                    <div>
                        Teste
                    </div>
                </AccordionTrigger>
                <AccordionContent className="border border-gray-500 border-t-0 p-4 rounded-b-lg transition-all duration-700">
                    <p>
                        Our flagship product combines cutting-edge technology with sleek
                        design. Built with premium materials, it offers unparalleled
                        performance and reliability.
                    </p>
                    <p>
                        Key features include advanced processing capabilities, and an
                        intuitive user interface designed for both beginners and experts.
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}