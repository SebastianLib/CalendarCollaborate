"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FormCalendar } from "./FormCalendar";
import FormStartedHour from "./FormHour";
import axios from "axios";
import { shortcutMonths } from "@/utils/arrays";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import FormColor from "./FormColor";
import { getInfo } from "@/actions/getInfo";
import { Team, User } from "@prisma/client";
import FormTeam from "./FormTeam";
import FormName from "./FormName";
import { Form } from "@/components/ui/form";
import FormDescriptionTeam from "./FormDescriptionTeam";
import SelectType from "./SelectType";
import { useState } from "react";
import { CreateTaskSchema, CreateTaskSchemaType } from "@/schemas/createTask";
import SelectSchedulePeople from "./SelectSchedulePeople";


interface ScheduleFormProps {
  teams: Team[];
  people: User[];
}

const ScheduleForm = ({ teams, people }: ScheduleFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedPeople, setSelectedPeople] = useState<User[]>([]);
  const router = useRouter();
  
  const form = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(CreateTaskSchema),
  });

  const { handleSubmit, watch } = form;

  const typeValue = watch("type");

  const onSubmit = async (values: CreateTaskSchemaType) => {
    const {date, startingHour, endingHour} = values;

    const currentDate = String(date).split(" ");
    const month = shortcutMonths.findIndex(
      (month: string) => month === currentDate[1]
    );
      const peopleIds = values.people.map((person) =>{return {clerkId: person.clerkId}})
    console.log(peopleIds);
    
    const { totalStarting, totalEnding } = getInfo(startingHour, endingHour);

    if (totalStarting >= totalEnding) {
      return setError(
        "The end time cannot be less than or equal to the start time"
      );
    }
    try {
      setLoading(true);
      await axios.post("/api/create", {
        day: parseInt(currentDate[2]),
        month,
        year: parseInt(currentDate[3]),
        peopleIds,
        ...values
      });
      toast.success("You have created a new task");
      router.push("/schedule");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setError("");
    }
  };

  return (
    <div className="mt-10">
      <div className="max-w-4xl container mx-auto">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <FormName form={form} />
              <FormCalendar form={form} />
              <FormDescriptionTeam form={form} />
              <FormColor form={form} />
              <FormStartedHour type={"startingHour"} form={form} />
              <FormStartedHour type={"endingHour"} form={form} />
              <SelectType form={form} />
              {typeValue === "teams" && <FormTeam form={form} teams={teams} />}
              {typeValue === "followers" && (
                <SelectSchedulePeople
                form={form} people={people}
                />
              )}
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
