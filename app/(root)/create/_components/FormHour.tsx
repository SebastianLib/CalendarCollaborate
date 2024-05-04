import { UseFormReturn } from "react-hook-form";
import { renderHours } from "@/utils/renderHours";
import { z } from "zod";
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
import { CreateTaskSchema } from "@/schemas/createTask";

const FormStartedHour = ({
  form,
  type,
}: {
  form: UseFormReturn<z.infer<typeof CreateTaskSchema>>;
  type: "startingHour" | "endingHour";
}) => {
  const hours = renderHours().flat();

  return (
    <FormField
      control={form.control}
      name={type}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{type === "startingHour" ? "Starting hour" : "Ending Hour"}</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`select ${type === "startingHour" ? "starting" : "ending"} time`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {hours.map((hour, index) => (
                <SelectItem key={index} value={hour.toString()}>
                  {hour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage/>
        </FormItem>
      )}
    />
  );
};

export default FormStartedHour;
