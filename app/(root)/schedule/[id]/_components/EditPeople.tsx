"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { PeopleTasks, User } from "@prisma/client";
import SelectPeople from "@/app/(root)/teams/_components/SelectPeople";
import Image from "next/image";

interface EditPeopleProps {
  isEditable: boolean;
  people: Array<PeopleTasks & { user: User }>;
  following?: User[];
}

const EditPeople = ({ isEditable, people, following }: EditPeopleProps) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<User[]>(
    people.map((person) => person.user)
  );
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  async function onSubmit() {
    const peopleIds = selectedPeople.map((person) => {return {clerkId:person.clerkId}}) 
    try {
      setLoading(true);
      await axios.put(`/api/schedule/${id}`, {type:"updatePeople", data:peopleIds});
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
          <h2 className="font-bold text-md">People:</h2>
          <div className="flex gap-2">
            {people.map((person) => (
              <Image
                key={person.id}
                src={person.user.photo}
                alt="person"
                width={30}
                height={30}
                className="rounded-full"
              />
            ))}
          </div>
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
      <div
        className={`${
          isEditing ? "flex flex-col sm:flex-row" : "hidden"
        } items-center gap-4`}
      >
        <div className="flex items-center justify-center sm:justify-start gap-4 w-full">
          <Select>
            <SelectTrigger className="w-[200px] md:w-[300px] ">
              <SelectValue placeholder="select people" />
            </SelectTrigger>

            <SelectContent>
              <SelectPeople
                people={following || []}
                selectedPeople={selectedPeople}
                setSelectedPeople={setSelectedPeople}
              />
            </SelectContent>
          </Select>
          <Button onClick={onSubmit} disabled={loading} type="submit">
            Submit
          </Button>
        </div>
        <div className="flex justify-center md:justify-end">
          <X
            onClick={() => setIsEditing(false)}
            className="w-10 h-10 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default EditPeople;
