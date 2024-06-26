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
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { renderHours } from "@/utils/renderHours";
import { X } from "lucide-react";

interface EditHourProps {
  hour: string;
  type: "startingHour" | "endingHour";
  secondHour: string;
  isEditable: boolean;
}

const FormSchema = z.object({
  newHour: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const EditHour = ({ hour, type, secondHour, isEditable }: EditHourProps) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const hours = renderHours().flat();
  const { id } = useParams<{ id: string }>();

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
    
    try {
      setLoading(true);
      await axios.put(`/api/schedule/${id}`, {type:"", data:newData});
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
          <h2 className="font-bold text-md">
            {type === "startingHour" ? "Starting Hour:" : "Ending Hour:"}
          </h2>
          <p>{hour}</p>
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
              name="newHour"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl className="w-[200px] md:w-[300px]">
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
};

export default EditHour;
