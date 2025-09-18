import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/shadcn-ui/form"
import { Slider } from "@/components/shadcn-ui/slider"
import { Input } from "@/components/shadcn-ui/input"

type SliderInputProps = {
  label: string
  field: {
    name: string;
    value: number;
    onChange: (value: number) => void;
  }
  min: number
  max: number
  step: number
  unit: string
}

export function SliderInput({ label, field, min, max, step, unit }: SliderInputProps) {
    return (
        <FormItem className="px-1">
            <FormLabel
                className="text-base font-semibold"
                htmlFor={field.name}
            >
                {label}
            </FormLabel>
            <FormControl>
                <div className="flex items-center gap-4">
                    <Slider
                        min={min}
                        max={max}
                        step={step}
                        value={[field.value ?? 0]}
                        onValueChange={(val) => field.onChange(val[0])}
                    />
                    <Input
                        type="number"
                        step={step}
                        id={field.name}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                    <span>{unit}</span>
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}