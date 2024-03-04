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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import SelectPeople from "./SelectPeople";
import { User } from "@prisma/client";

export const formSchema = z.object({
  name: z.string().min(2).max(50),
});

const CreateTeamForm = ({people}:{people:User[]}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
        },
      });

      async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        
      }

  return (
    <div >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
            <h2>Create Team</h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
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
        <SelectPeople people={people}/>
          <Button
            disabled={loading}
            type="submit"
            className="col-span-2"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateTeamForm;
