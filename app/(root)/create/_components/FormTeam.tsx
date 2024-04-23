import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./ScheduleForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Team, User } from "@prisma/client";

interface FormTeamProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  teams: Team[]
}

const FormTeam = ({ form, teams }: FormTeamProps) => {
  return (
    <FormField
      control={form.control}
      name="team"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Select team</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="select team" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {teams.map((team, index) => (
                <SelectItem key={index} value={team.id}>
                  <div className="flex items-center gap-2">
                    <p>{team.name}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default FormTeam;
