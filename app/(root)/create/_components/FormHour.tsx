import { UseFormReturn } from "react-hook-form";
import { formSchema } from "./ScheduleForm";
import { getAllHours } from "@/actions/getHours";
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

const FormStartedHour = ({
  form,
  type,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  type: "start" | "end";
}) => {
  const hours = getAllHours();

  return (
    <FormField
      control={form.control}
      name={type}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{type === "start" ? "Starting hour" : "Ending Hour"}</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`select ${type === "start" ? "starting" : "ending"} time`} />
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
        </FormItem>
      )}
    />
  );
};

export default FormStartedHour;
