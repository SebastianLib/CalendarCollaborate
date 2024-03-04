import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

const SelectPeople = ({ people }: { people: User[] }) => {
    const [selectedPeople, setSelectedPeople] = useState([]); 
    const [search, setSearch] = useState(""); 
    console.log(search);
    
  return (
    <div className="flex flex-col gap-2">
        <h2>Find People</h2>
        
        <Input type="text" onChange={(e)=>setSearch(e.target.value)}/>

        {people.filter(person => person.username.includes(search)).map((person) => (
        <div key={person.id}>
          <p>{person.username}</p>
          <Image
            src={person.photo}
            className="rounded-full"
            height={30}
            width={30}
            alt="user image"
          />
        </div>
      ))}
    </div>
  );
};

export default SelectPeople;
