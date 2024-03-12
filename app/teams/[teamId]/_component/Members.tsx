import { auth } from "@clerk/nextjs";
import { TeamMembership, User } from "@prisma/client";
import { Crown } from "lucide-react";
import Image from "next/image";
import RemoveUser from "./RemoveUser";

interface MembersProps {
  members: (TeamMembership & { user: User })[];
  ownerId: string;
}

const Members = ({ members, ownerId }: MembersProps) => {
  const { userId } = auth();

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Members</h2>
      <div className="max-w-[400px] border border-gray-100 rounded-md shadow-md">
        {members.map((member) => (
          <div key={member.id} className="flex justify-between items-center border-b p-4">
            <div className="flex gap-1">
              <Image
                className="rounded-full"
                src={member.user.photo}
                width={30}
                height={30}
                alt="user image"
              />
              <p className="text-lg">{member.user.username}</p>
            </div>

            <div>
              {userId === ownerId && member.user.clerkId !== ownerId ? (
                <RemoveUser userId={member.id}/>
              ) : (
                <p className="font-medium">
                  {member.user.clerkId === ownerId ? (
                    <span className="text-yellow-500 flex gap-1">
                      <Crown /> owner
                    </span>
                  ) : (
                    "member"
                  )}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
