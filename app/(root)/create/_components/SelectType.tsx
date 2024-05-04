import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateTaskSchema } from "@/schemas/createTask";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface FormTeamProps {
    form: UseFormReturn<z.infer<typeof CreateTaskSchema>>;
  }

const SelectType = ({ form}: FormTeamProps) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>For who do you want assign the task?</FormLabel>
          <Select onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">
                <div className="flex items-center gap-2">
                  <p>Individual (You can only assign task to yourself)</p>
                </div>
              </SelectItem>
              <SelectItem value="teams">
                <div className="flex items-center gap-2">
                  <p>team</p>
                </div>
              </SelectItem>
              <SelectItem value="followers">
                <div className="flex items-center gap-2">
                  <p>for people I follow</p>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage/>
        </FormItem>
      )}
    />
  );
};

export default SelectType;
