import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/shadcn-ui/form"
import { Input } from "@/components/shadcn-ui/input"

type PercentageInputProps = {
    label: string
    field: {
        name: string;
        value: number;
        onChange: (value: number) => void
    }
}

export function DefaultInput({ label, field }: PercentageInputProps) {
    return (
        <FormItem>
            <div className="items-center gap-2 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                <FormLabel
                    className="text-base font-semibold"
                    htmlFor={field.name}
                >
                    {label}
                </FormLabel>
                <FormControl>
                    <div className="flex-1 flex items-center gap-4">
                        <Input
                            type="number"
                            step="0.01"
                            min="0"
                            id={field.name}
                            {...field}
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            className="border-y-0 rounded-none shadow-none"
                        />
                        <span>%</span>
                    </div>
                </FormControl>
            </div>
            <FormMessage />
        </FormItem>
    )
}