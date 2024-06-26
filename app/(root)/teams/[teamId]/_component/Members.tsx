import { TeamMembership, User } from "@prisma/client";
import { Crown, List } from "lucide-react";
import Image from "next/image";
import RemoveUser from "./RemoveUser";
import Link from "next/link";

interface MembersProps {
  members: (TeamMembership & { user: User })[];
  isOwner: boolean;
}

const Members = ({ members, isOwner}: MembersProps) => {
 
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold flex items-center gap-1"><List/> Members</h2>
      <div className="rounded-md shadow-md  h-[300px] max-h-[300px] overflow-y-auto p-2">
        {members.map((member) => (
          <Link key={member.id} href={`/profile/${member.clerkId}`}>
          <div className="flex justify-between items-center border-b p-4">
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
              {member.role === "member" && isOwner ? (
                <RemoveUser userId={member.id}/>
              ) : (
                <p className="font-medium">
                  {member.role === "owner" ? (
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Members;
