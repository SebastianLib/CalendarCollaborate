import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { CreateTaskSchema } from "@/schemas/createTask";

const FormName = ({ form }: { form: UseFormReturn<z.infer<typeof CreateTaskSchema>> }) => {
  return (
    <FormField
    control={form.control}
    name="name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>name</FormLabel>
        <FormControl>
          <Input
            className=""
            placeholder="Enter the task name"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default FormName