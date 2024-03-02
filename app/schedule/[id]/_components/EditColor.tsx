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
import { colors } from "@/lib/utils";
import { X } from "lucide-react";

interface EditColorProps {
  id: string;
  color: string;
}

const FormSchema = z.object({
  newColor: z.string(),
});

const EditColor = ({ id, color }: EditColorProps) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newColor: color,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let newData: { [key: string]: string } = {};
    newData["color"] = data.newColor;
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
        <div className="flex items-center gap-2 text-xl">
          <h2 className="font-bold text-md">Color:</h2>
          <div className="w-6 h-6 rounded-full" style={{background: color}}/>
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
          className={`${
            isEditing ? "flex flex-col sm:grid" : "hidden"
          } sm:grid-cols-2 items-center`}
        >
          <div className="flex items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="newColor"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color, index) => (
                        <SelectItem key={index} value={color}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ background: color }}
                            />{" "}
                            <p>{color}</p>
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

export default EditColor;
