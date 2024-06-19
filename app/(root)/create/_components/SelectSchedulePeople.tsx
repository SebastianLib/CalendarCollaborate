import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { X } from "lucide-react";
import Image from "next/image";
import {useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { CreateTaskSchemaType } from "@/schemas/createTask";

interface SelectSchedulePeopleProps {
  form: UseFormReturn<CreateTaskSchemaType> | UseFormReturn<CreateTaskSchemaType> ;
  people: User[];
}

const SelectSchedulePeople = ({ form, people }: SelectSchedulePeopleProps) => {
  const [search, setSearch] = useState("");
  const selectedPeople: User[] | undefined = form.watch("people");

  const removePerson = (id: string) => {
    // @ts-ignore
    form.setValue("people", selectedPeople.filter((p) => p.id !== id)
    );
  };

  const filteredPerson = people.filter(
    (person) =>
      person.username.toLowerCase().includes(search) &&
      !selectedPeople?.some(
        (selectedPerson: User) => selectedPerson.id === person.id
      )
  );

  return (
    <div className="flex flex-col gap-2">
      <FormField
        control={form.control}
        name="people"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Find People</FormLabel>
            <Input
              type="text"
              placeholder="Who do you want to add?"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
            <FormControl>
              <div>
                {filteredPerson.length > 0 ? (
                  <div>
                    {search &&
                      filteredPerson.slice(0, 5).map((person) => (
                        <div
                          key={person.id}
                          className="flex gap-2 cursor-pointer p-2 border my-1 shadow-sm"
                          // onClick={() => setSelectedPeople((prev) => [...prev, person])}
                          onClick={() => {
                            const currentPeople = form.getValues().people || [];
                            form.setValue("people", [...currentPeople, person]);
                            console.log(form.getValues().people);
                          }}
                        >
                          <Image
                            src={person.photo}
                            className="rounded-full"
                            height={30}
                            width={30}
                            alt="user image"
                          />
                          <p>{person.username}</p>
                        </div>
                      ))}
                    {filteredPerson.length > 5 && (
                      <p>{filteredPerson.length - 5} more</p>
                    )}
                  </div>
                ) : (
                  <p>No user found.</p>
                )}
                <div className="flex flex-col gap-2">
                  <h2>Added People:</h2>
                  {field.value?.length || 0 > 0 && (
                    <div className="grid p-4 sm:grid-cols-2 gap-2 bg-gray-100 ">
                      {field.value?.map((person: User) => (
                        <div
                          key={person.id}
                          className="flex justify-between items-center p-2 cursor-pointer bg-white"
                        >
                          <div className="flex gap-2">
                            <Image
                              src={person.photo}
                              className="rounded-full"
                              height={30}
                              width={30}
                              alt="user image"
                            />
                            <p>{person.username}</p>
                          </div>
                          <X
                            onClick={() => removePerson(person.id)}
                            className="text-black w-8"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SelectSchedulePeople;
