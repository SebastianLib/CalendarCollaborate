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
import { FormCalendar } from "./FormCalendar";
import FormStartedHour from "./FormHour";
import axios from "axios";
import { shortcutMonths } from "@/lib/utils";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FormColor from "./FormColor";
import { getInfo } from "@/actions/getInfo";
import { Team, User } from "@prisma/client";
import FormTeam from "./FormTeam";

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  date: z.date({
    required_error: "A date is required.",
  }),
  start: z.string().min(2),
  end: z.string().min(2),
  color: z.string().min(2),
  team: z.string().optional(),
});

interface ScheduleFormProps {
  teams: Team[];
}

const ScheduleForm = ({teams }: ScheduleFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "blue",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    const { name, date, start, end, color, team } = { ...values };

    const currentDate = String(date);
    const stringMonth = currentDate.split(" ")[1];
    const day = parseInt(currentDate.split(" ")[2]);
    const year = parseInt(currentDate.split(" ")[3]);
    const month = shortcutMonths.findIndex(
      (month: string) => month === stringMonth
    );

    const { totalStarting, totalEnding, width } = getInfo(start, end);

    if (totalStarting >= totalEnding) {
      return setError(
        "The end time cannot be less than or equal to the start time"
      );
    }

    try {
      setLoading(true);
      await axios.post("/api/create", {
        name,
        startingHour: start,
        endingHour: end,
        totalStarting,
        totalEnding,
        width,
        day,
        month,
        year,
        color,
        date,
        team
      });
      toast.success("you have created a new task");
      router.push("/schedule")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10">
      <div className="w-full container mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
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
              <FormCalendar form={form} />
              <FormStartedHour type={"start"} form={form} />
              <FormStartedHour type={"end"} form={form} />
              <FormColor form={form} />
              <FormTeam form={form} teams={teams} />
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="w-full py-6 text-xl my-10"
            >
              Submit
            </Button>
          </form>
        </Form>
        <p className="text-red-500 pt-4">{error && error}</p>
      </div>
    </div>
  );
};

export default ScheduleForm;
