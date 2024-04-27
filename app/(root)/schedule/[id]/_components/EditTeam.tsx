"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Team } from "@prisma/client";
import { X } from "lucide-react";

interface EditTeamProps {
  team: string | undefined;
  isEditable: boolean;
  teams: Team[];
}

const FormSchema = z.object({
  teamId: z.string().optional()
});

const EditTeam = ({ team, isEditable, teams }: EditTeamProps) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      await axios.put(`/api/schedule/${id}`, {type:"", data:data});
      toast.success("you have updated task");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsEditing(false);
      router.refresh();
    }
  }
  return (
    <div>
      <div
        className={`${
          isEditing ? "hidden" : "flex flex-col sm:grid "
        } sm:grid-cols-3 items-center gap-4`}
      >
        <div className="flex flex-col text-xl text-center sm:text-left col-span-2">
          <h2 className="font-bold text-md">Team:</h2>
          <p>{team}</p>
        </div>
        <div className="flex w-full justify-center md:justify-end">
          <Button
            className={`w-[50%] sm:w-28 ${!isEditable && "hidden"}`}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`${
            isEditing ? "flex flex-col sm:flex-row" : "hidden"
          } items-center gap-4`}
        >
          <div className="flex items-center justify-center sm:justify-start gap-4 w-full">
            <FormField
              control={form.control}
              name="teamId"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl className="w-[200px] md:w-[300px] ">
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
            <Button disabled={loading} type="submit">
              Submit
            </Button>
          </div>
          <div className="flex justify-center md:justify-end">
            <X
              onClick={() => setIsEditing(false)}
              className="w-10 h-10 cursor-pointer"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditTeam;
