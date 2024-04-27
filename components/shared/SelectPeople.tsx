import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

interface SelectPeopleProps {
  people: User[];
  selectedPeople: User[];
  setSelectedPeople: Dispatch<SetStateAction<User[]>>;
}

const SelectPeople = ({
  people,
  selectedPeople,
  setSelectedPeople,
}: SelectPeopleProps) => {
  const [search, setSearch] = useState("");

  const removePerson = (id: string) => {
    setSelectedPeople((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredPerson = people.filter(
    (person) =>
      person.username.toLowerCase().includes(search) &&
      !selectedPeople.some(selectedPerson => selectedPerson.id === person.id)
  );
  
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm">Find People</h3>

      <Input
        type="text"
        placeholder="Who do you want to add?"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div>
        {filteredPerson.length > 0 ? (
          <div>
            {search && filteredPerson.slice(0, 5).map((person) => (
              <div
                key={person.id}
                className="flex gap-2 cursor-pointer p-2 border my-1 shadow-sm"
                onClick={() => setSelectedPeople((prev) => [...prev, person])}
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
      </div>
      <div className="flex flex-col gap-2">
        <h2>Added People:</h2>
        {selectedPeople.length > 0 && (
          <div className="grid p-4 sm:grid-cols-2 gap-2 bg-gray-100 ">
            {selectedPeople?.map((person) => (
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
  );
};

export default SelectPeople;
