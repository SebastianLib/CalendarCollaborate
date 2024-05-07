"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import SelectPeople from "@/components/shared/SelectPeople";
import { User } from "@prisma/client";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CreateTeamSchema, CreateTeamSchemaType } from "@/schemas/createTeam";

const CreateTeamForm = ({ people }: { people: User[] }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<CreateTeamSchemaType>({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: {},
  });

  async function onSubmit(values: CreateTeamSchemaType) {
    console.log(values);

    try {
      setLoading(true);
      const newTeam = await axios.post("/api/teams/create", { ...values });

      toast.success("you have created a new task");
      router.refresh();
      router.push(`/teams/${newTeam.data.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold">Create Team</h2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter the task name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SelectPeople form={form} people={people} />
        <Button disabled={loading} type="submit" className="col-span-2">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateTeamForm;
