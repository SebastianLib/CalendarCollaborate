"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { X } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const EditName = ({ name, id }: { name: string; id: string }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: name,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      await axios.put(`/api/schedule/${id}`, data);
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
          <h2 className="font-bold text-md">Name:</h2>
          <p>{name}</p>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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

export default EditName;