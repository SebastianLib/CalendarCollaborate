"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn, shortcutMonths } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";

interface EditCalendarProps {
  currentDate: Date;
  isEditable: boolean;
}

export function EditCalendar({ currentDate, isEditable }: EditCalendarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {id} = useParams<{ id: string }>();

  const FormSchema = z.object({
    dob: z.date().default(currentDate),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let newData: { [key: string]: string | number | Date } = {};
    newData["date"] = data.dob;

    const currentDate = String(data.dob);
    const stringMonth = currentDate.split(" ")[1];
    const day = parseInt(currentDate.split(" ")[2]);
    const month = shortcutMonths.findIndex(
      (month: string) => month === stringMonth
    );
    const year = parseInt(currentDate.split(" ")[3]);

    newData["day"] = day;
    newData["month"] = month;
    newData["year"] = year;

    try {
      setLoading(true);
      await axios.put(`/api/schedule/${id}`, newData);
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
          <h2 className="font-bold text-md">Date:</h2>
          <p>{format(currentDate, "PPP")}</p>
        </div>
        <div className="flex w-full justify-center md:justify-end">
        <Button
            className= {`w-[50%] sm:w-28 ${!isEditable && "hidden"}`}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`${isEditing ? "flex flex-col sm:flex-row" : "hidden"} items-center gap-4`}
        >
          <div className="flex items-center justify-center sm:justify-start gap-4 w-full">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-[200px] md:w-[300px]">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
            </div>
            <div className="flex w-full justify-center sm:justify-end">
              <X
                onClick={() => setIsEditing(false)}
                className="w-10 h-10 cursor-pointer"
              />
            </div>
        </form>
      </Form>
    </div>
  );
}
