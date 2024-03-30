"use client";
import { getSearchUsers } from "@/actions/getSearchUsers";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface SearchProfileProps {
  searchUsers: User[] | null | undefined;
  profileId: string;
}

const SearchProfile = ({ searchUsers, profileId }: SearchProfileProps) => {
  const [openSearchList, setOpenSearchList] = useState<boolean>(false);
  const [users, setUsers] = useState(searchUsers);
  const inputRef = useRef<HTMLInputElement>(null);
  let searchTimeout: ReturnType<typeof setTimeout>;

  const searchPeople = async () => {
    if (inputRef.current?.value === "") {
      setOpenSearchList(false);
    } else {
      setOpenSearchList(true);
    }
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      const input = inputRef.current?.value;
      const data = await getSearchUsers({ input, profileId });
      setUsers(data);
    }, 200);
  };

  return (
    <div className="mb-10 max-w-xl mx-auto space-y-2">
      <h2 className="text-xl text-center font-bold">Find other people</h2>
      <div className="flex items-center relative">
        <Input
          onChange={searchPeople}
          ref={inputRef}
          type="text"
          placeholder="Find user"
        />
        <Search
          onClick={() => inputRef.current?.focus()}
          className="bg-blue-500 text-white w-10 h-10 p-2 absolute right-0
      cursor-pointer rounded-r-lg"
        />
        <div
          className={`absolute ${openSearchList ? "" : "hidden"} py-4
        top-10 w-full bg-white border`}
        >
          {users?.length === 0 ? (
            <p className="text-center">Not user found</p>
          ) : (
            <ul>
              {users?.map((user) => (
                <li
                  key={user.id}
                  className="py-2 px-4 hover:bg-gray-100 transition-all"
                >
                  <Link
                    href={`/profile/${user.clerkId}`}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src={user.photo}
                      width={30}
                      height={30}
                      className="rounded-full"
                      alt="user"
                    />
                    <p>{user.username}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProfile;
