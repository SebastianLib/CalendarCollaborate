"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Team } from "@prisma/client";
import { CreateTeamSchema, CreateTeamSchemaType } from "@/schemas/createTeam";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ChangeTeamName = ({ team }: { team: Team }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter()

  const form = useForm<CreateTeamSchemaType>({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: {
      name: team.name,
    },
  });
  
  async function onSubmit(data: CreateTeamSchemaType) {
    setIsLoading(true);
    try {
      await axios.put(`/api/teams/${team.id}`, {
        data
      });
    } catch (error) {
      console.error(error);
    } finally {
      toast.success("You have successfully changed team name")
      setIsLoading(false);
      setIsEditing(false);
      router.refresh();
    }
  }

  return (
    <div>
      <Button
        className="text-md max-w-[200px] w-full"
        onClick={() => setIsEditing((prev) => !prev)}
      >
        {isEditing ? "Close" : "Change Team Name"}
      </Button>

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-4 mt-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team name:</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button onClick={()=>onSubmit(form.getValues())} type="submit" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChangeTeamName;