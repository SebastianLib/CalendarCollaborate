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

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  date: z.date({
    required_error: "A date is required.",
  }),
  start: z.string(),
  end: z.string(),
});

const CalendarForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("")
    const { name, date, start, end } = { ...values };
    const currentDate = String(date);
    const stringMonth = currentDate.split(" ")[1];
    const day = parseInt(currentDate.split(" ")[2]);
    const year = parseInt(currentDate.split(" ")[3]);
    const month = shortcutMonths.findIndex(
      (month: string) => month === stringMonth
    );

    const startingTimeParts = start.split(":");
    const endingTimeParts = end.split(":");

    const startingHour = parseInt(startingTimeParts[0]);
    const startingMinute = parseInt(startingTimeParts[1]);
    const endingHour = parseInt(endingTimeParts[0]);
    const endingMinute = parseInt(endingTimeParts[1]);

    const totalStarting = startingHour * 60 + startingMinute;

    const totalEnding = endingHour * 60 + endingMinute;

    const timeDifferenceInMinutes =
      endingHour * 60 + endingMinute - (startingHour * 60 + startingMinute);
    const width = (timeDifferenceInMinutes / 15) * 30;
    totalStarting;
    totalEnding;

    if (totalStarting >= totalEnding) {
      return setError("The end time cannot be less than or equal to the start time");
     }

    try {
      setLoading(true);
      await axios.post("/api/create", {
        name,
        startingHour: start,
        endingHour,
        totalStarting,
        totalEnding,
        width,
        day,
        month,
        year,
      });
      toast.success("you have created a new task");
      router.push("/schedule")
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10">
      <div className="w-full container mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 items-center gap-10"
          >
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

            <Button
              disabled={loading}
              type="submit"
              className="col-span-2 py-6 text-xl"
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

export default CalendarForm;
