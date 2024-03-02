import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { formSchema } from "./ScheduleForm"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { colors } from "@/lib/utils";

const FormColor = ({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) => {
  return (
    <FormField
      control={form.control}
      name="color"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Select color</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="select color"/>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {colors.map((color, index) => (
                <SelectItem key={index} value={color} >
                  <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{background: color}}/> <p>{color}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}

export default FormColor