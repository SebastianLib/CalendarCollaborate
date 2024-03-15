import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./ScheduleForm";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Textarea } from "@/components/ui/textarea";

const FormDescriptionTeam = ({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) => {
  return (

      <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
          <Textarea
              placeholder="Add some informations about this product"
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    )
  }

export default FormDescriptionTeam