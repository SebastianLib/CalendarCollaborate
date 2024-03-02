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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getAllHours } from "@/actions/getHours";
import { getInfo } from "@/actions/getInfo";
import { X } from "lucide-react";

interface EditHourProps {
  hour: string;
  id: string;
  type: "startingHour" | "endingHour";
  secondHour: string;
}

const FormSchema = z.object({
  newHour: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const EditHour = ({ hour, id, type, secondHour }: EditHourProps) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const hours = getAllHours();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newHour: hour,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let newData: { [key: string]: string | number } = {};

    newData = { [type]: data.newHour };
    if (type === "startingHour") {
      if (data.newHour > secondHour) {
        return toast.error(
          "Your starting hour cannot be greater than ending hour"
        );
      } else {
        newData["endingHour"] = secondHour;
      }
    } else {
      if (data.newHour < secondHour) {
        return toast.error(
          "Your ending hour cannot be lesser than starting hour"
        );
      } else {
        newData["startingHour"] = secondHour;
      }
    }
    const { totalStarting, totalEnding, width } = getInfo(
      newData["startingHour"].toString(),
      newData["endingHour"].toString()
    );

    (newData["totalStarting"] = totalStarting),
      (newData["totalEnding"] = totalEnding),
      (newData["width"] = width);

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
        } sm:grid-cols-2 items-center gap-4`}
      >
        <div className="flex gap-2 text-xl">
          <h2 className="font-bold text-md">
            {type === "startingHour" ? "Starting Hour" : "Ending Hour"}
          </h2>
          <p>{hour}</p>
        </div>
        <div className="flex w-full justify-center md:justify-end">
          <Button
            className="w-[50%] sm:w-28"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`${isEditing ? "flex" : "hidden"} items-center gap-4`}
        >
          <div className="flex items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="newHour"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`select ${
                            type === "startingHour" ? "starting" : "ending"
                          } time`}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hours.map((hour, index) => (
                        <SelectItem key={index} value={hour.toString()}>
                          {hour}
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
          <div className="flex w-full justify-center md:justify-end">
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

export default EditHour;
